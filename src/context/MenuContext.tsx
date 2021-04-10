import { createContext} from 'react'
import MenuState from '../interface/MenuState';

// メニューのContext
export const MenuContext = createContext<MenuState | undefined>(undefined);