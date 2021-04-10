import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IndexContext } from '../context/IndexContext'
import axios from 'axios';
import { createURL, getHost, getSearchCondByUrlPrams, gtagconfig, isEnptystr } from '../common/utils';
import Const from '../common/const';
import { Cond, Post } from '../interface/IndexState';
import GetIndexDataResult from '../interface/GetIndexDataResult';
import { useHistory } from 'react-router-dom';
declare var gtagPageview: (pathname: string) => void;

const IndexProvider = ({ children }: { children: any }) => {

    const history = useHistory();
    const getPosts = async (pageCount: number) => {
        try {
            let req = createURL(Const.URLS.GET_LATEST10 + pageCount);
            let params = getSearchCondByUrlPrams();

            if (!isEnptystr(params.category)) {
                req = req + '&categories=' + params.category
            }
            if (!isEnptystr(params.keyword)) {
                req = req + '&search=' + params.keyword
            }

            const response: GetIndexDataResult = await axios({
                method: 'GET',
                url: req,
            });
            const postlist = response.data.map((entry) => {
                const post: Post = {
                    subject: entry.title.rendered,
                    contents: '',
                    modified: new Date(entry.date),
                    category_name: entry.category_name,
                    eyecatch: entry._embedded['wp:featuredmedia'] !== undefined ?
                        entry._embedded['wp:featuredmedia'][0].media_details.sizes.full
                        : Const.NO_IMAGE,
                    id: entry.id,
                    excerpt: entry.excerpt.rendered.replaceAll('<p>', '').replaceAll('&#8230;</p>', ''),
                    link: entry.link.replace(getHost(), ''),
                }
                return (post);
            });
            setPosts(postlist);
            setTotalPage(response.headers['x-wp-totalpages']);
            setCurPage(pageCount);
            setCond(params);
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 0)
        } catch (error) {
            console.log(error);
            setErrorMsg('記事一覧の取得で予期せぬエラーが発生しました');
        }
    };

    const [posts, setPosts]: [Post[], Dispatch<SetStateAction<Post[]>>]
        = useState([{
            subject: '',
            contents: '',
            modified: new Date(),
            category_name: '',
            eyecatch: {
                source_url: '',
                height: 0,
                width: 0,
            },
            id: '',
            excerpt: '',
            link: '',
        }])
    const [cond, setCond]: [Cond, Dispatch<SetStateAction<Cond>>]
        = useState({
            category: '',
            keyword: '',
        })
    const [errorMsg, setErrorMsg] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        getPosts(curPage);
        gtagconfig();
    }, [window.location.href]);

    return (
        <IndexContext.Provider
            value={{
                posts,
                errorMsg,
                totalPage,
                curPage,
                getPosts,
                cond,
            }}
        >
            {children}
        </IndexContext.Provider >
    )
}

export default IndexProvider;