import { useEffect, useState } from 'react'
import axios from 'axios';
import { createURL,  getIdByFixedPath, gtagconfig } from '../common/utils';
import Const from '../common/const';
import GetPostDataResult  from '../interface/GetPostDataResult';
import { FixedContext } from '../context/FixedContext';
import { useHistory } from 'react-router-dom';

const FixedProvider = ({ children }: { children: any }) => {

    const history = useHistory();
    const getFixedPage = async (id: string) => {
        try {
            const response: GetPostDataResult = await axios({
                method: 'GET',
                url: createURL(Const.URLS.GET_FIXED_PAGE + id + '?_embed'),
            });
            setSubject(response.data.title.rendered);
            setId(id);
            setContents(response.data.content.rendered);
            setModified(new Date(response.data.modified));
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0)
        } catch (error) {
            console.log(error);
            setErrorMsg('固定ページ取得で予期せぬエラーが発生しました');
        }
    };

    const [subject, setSubject] = useState('')
    const [contents, setContents] = useState('')
    const [modified, setModified] = useState(new Date())
    const [id, setId] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const id = getIdByFixedPath();
        if (id !== '') {
            getFixedPage(id);
        }
        gtagconfig();

    }, [window.location.href]);

    return (
        <FixedContext.Provider
            value={{
                subject,
                contents,
                modified,
                id,
                errorMsg,
            }}
        >
            {children}
        </FixedContext.Provider >
    )
}

export default FixedProvider;