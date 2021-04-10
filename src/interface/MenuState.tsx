import { Dispatch, SetStateAction } from "react";

// メニュー用のState
interface MenuState {
  keyword: string; // 検索キーワード
  setKeyword: Dispatch<SetStateAction<string>>;  // 検索窓の更新用関数
  onSearch: () => void;  // 検索実行用関数
}

export default MenuState;