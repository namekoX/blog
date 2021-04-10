import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PostContext } from '../context/PostContext'
import axios from 'axios';
import { createURL, getIdByUrlPrams, gtagconfig, isEnptystr, setPrettySetting } from '../common/utils';
import Const from '../common/const';
import GetPostDataResult, { Reply } from '../interface/GetPostDataResult';
import Validation from '../interface/Validation';
import { useHistory } from 'react-router-dom';
declare global {
    interface Window { adsbygoogle: any; PR: any; }
}

const PostProvider = ({ children }: { children: any }) => {

    const history = useHistory();
    const postComment = async (comment: string) => {
        setInfoMsg('');
        setErrorMsg('');
        const vd = PostCommentValidchk(comment);
        if (vd.isError) {
            setErrorMsg(vd.msg);
            return Promise.resolve();
        } else {
            const body: { [key: string]: string; } = {
                comment: comment,
                submit: 'コメントを送信',
                comment_post_ID: id,
                comment_parent: '0',
            };
            const fd = new FormData();
            for (let key in body) {
                fd.append(key, body[key]);
            }
            try {
                await axios({
                    method: 'POST',
                    url: createURL(Const.URLS.POST_COMMENT),
                    data: fd,
                });
                setComment('');
                getPost(id);
                setInfoMsg('コメントを送信しました');
            } catch (error) {
                console.log(error);
                setErrorMsg('コメント送信で予期せぬエラーが発生しました');
            }
        };
    };

    const getPost = async (id: string) => {
        try {
            const response: GetPostDataResult = await axios({
                method: 'GET',
                url: createURL(Const.URLS.GET_POST + id + '?_embed'),
            });
            setSubject(response.data.title.rendered);
            setId(id);
            setContents(setPrettySetting(response.data.content.rendered));
            setModified(new Date(response.data.modified));
            setCategory_name(response.data.category_name);
            setEyecatch({
                eyecatch: response.data._embedded['wp:featuredmedia'] !== undefined ?
                    response.data._embedded['wp:featuredmedia'][0].media_details.sizes.full : Const.NO_IMAGE
            });
            response.data._embedded.replies !== undefined && setReply(response.data._embedded.replies[0]);
            setExcerpt(response.data.excerpt.rendered.replaceAll('<p>', '').replaceAll('&#8230;</p>', ''));
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 0)
        } catch (error) {
            console.log(error);
            setErrorMsg('記事取得で予期せぬエラーが発生しました');
        }
    };

    function PostCommentValidchk(comment: string): Validation {
        let vd: Validation = {
            isError: false,
            msg: "",
        }

        if (isEnptystr(comment)) {
            vd = {
                isError: true,
                msg: "コメントは必須です",
            };
            return vd;
        }
        return vd;
    }

    const [subject, setSubject] = useState('')
    const [contents, setContents] = useState('')
    const [modified, setModified] = useState(new Date())
    const [category_name, setCategory_name] = useState('')
    const [eyecatch, setEyecatch] = useState({
        eyecatch: {
            source_url: '',
            height: 0,
            width: 0,
        }
    })
    const [id, setId] = useState('')
    const [comment, setComment] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [infoMsg, setInfoMsg] = useState('')
    const [reply, setReply]: [Reply[], Dispatch<SetStateAction<Reply[]>>]
        = useState([{
            id: '',
            parent: '',
            author_name: '',
            date: new Date(),
            content: {
                rendered: '',
            }
        }])
    const [excerpt, setExcerpt] = useState('')

    useEffect(() => {
        const id = getIdByUrlPrams();
        if (id !== '') {
            getPost(id);
        }
        gtagconfig();
    }, [window.location.href]);

    useEffect(() => {
        if (contents !== '') {
            if (window.adsbygoogle && process.env.NODE_ENV === "production") {
                window.adsbygoogle.push({});
            }
            window.PR.prettyPrint();
        }
    }, [contents]);

    return (
        <PostContext.Provider
            value={{
                subject,
                contents,
                modified,
                category_name,
                ...eyecatch,
                id,
                comment,
                errorMsg,
                infoMsg,
                reply,
                onComment: postComment,
                setComment: setComment,
                excerpt,
            }}
        >
            {children}
        </PostContext.Provider >
    )
}

export default PostProvider;