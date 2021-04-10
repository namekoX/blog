import { createContext} from 'react'
import IndexState from '../interface/IndexState';

// 一覧ページ用のContext
export const IndexContext = createContext<IndexState | undefined>(undefined);