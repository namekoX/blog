import { useState } from 'react';
import { MenuContext } from '../context/MenuContext';
import { useHistory } from "react-router-dom";
import Const from '../common/const';

const MenuProvider = ({ children }: { children: any }) => {
    
    const [keyword, setKeyword] = useState('')
    const history = useHistory();
    const onSearch = () => {
        if (keyword === ''){
            history.push('/');
        } else{
            history.push('/?' + Const.PRAM_SEARCH + '=' +  keyword);
            setKeyword('');
        }
    }
    return (
        <MenuContext.Provider
            value={{
                keyword,
                setKeyword,
                onSearch,
            }}
        >
            {children}
        </MenuContext.Provider >
    )
}

export default MenuProvider;