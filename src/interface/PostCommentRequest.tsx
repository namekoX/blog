// コメント送信時のパラメータ
interface PostCommentRequest {
  comment: string; // コメント本文
  submit: string;  // "submit"を固定で送信する
  comment_post_ID: string; // コメントする記事のID
  comment_parent: string;　// コメントの返信元ID
} 

export default PostCommentRequest;