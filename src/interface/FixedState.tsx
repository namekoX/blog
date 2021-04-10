// 固定ページ用のstate
export default interface FixedState {
  subject: string;  // 件名
  contents: string; // 本文
  modified: Date;   // 更新日時
  id: string,       // 固定ページID
  errorMsg: string; // APIエラー時の文言
}
