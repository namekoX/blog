import { createContext} from 'react'
import PostState from '../interface/PostState';

// 記事本文ページのContext
export const PostContext = createContext<PostState | undefined>(undefined);