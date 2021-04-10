// 必須項目のチェックなどに使用する型
interface Validation {
  isError: boolean; // エラーとするかどうか
  msg: string; // エラーメッセージ
}
export default Validation;