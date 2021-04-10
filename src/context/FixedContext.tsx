import { createContext} from 'react'
import FixedState from '../interface/FixedState';

// 固定ページ用のContext
export const FixedContext = createContext<FixedState | undefined>(undefined);