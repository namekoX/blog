import Menu from "../interface/Menu";

/**
 * 定数を指定するクラスです。
 */
export default class Const {
  // ローカル実行時のAPIのホスト
  static TEST_HOST = 'https://vbaexcel.slavesystems.com';
  
  // 本番時のAPIのホスト
  static PRODUCT_HOST = 'https://vbaexcel.slavesystems.com';

  // 一覧ページに表示する記事数
  static INDEX_PER_PAGE = 10;

  // APIのパス WordPressの標準APIに準拠しています
  static URLS = {
    // 記事取得
    GET_POST: '/wp-json/wp/v2/posts/',
    // 固定ページ取得
    GET_FIXED_PAGE: '/wp-json/wp/v2/pages/',
    // 記事取得(10件)
    GET_LATEST10: '/wp-json/wp/v2/posts?_embed&per_page=' + Const.INDEX_PER_PAGE + '&page=',
    // コメント送信
    POST_COMMENT: '/wp-comments-post.php',
    // トップページのロゴ
    SITE_LOGO: 'https://vbaexcel.slavesystems.com/wp-content/uploads/2020/04/1.png',
  }

  // Googleアナリティクスの管理ID（空白にすると無効化）
  static GAID = 'UA-166130091-1';

  // GoogleAdSenseの管理ID（空白にすると無効化）
  static ADID = 'ca-pub-3210646574890109';
  static ADSLOT = '6825408743';

  // GoogleAdsenseの広告ブロック
  static ADS = `
  <ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-3210646574890109"
    data-ad-slot="6825408743"
    data-ad-format="auto"
    data-full-width-responsive="true">
  </ins>`;

  // トップページのパス
  static SITE_ROOT = '/';

  // タイトル（Windowタイトルに使用）
  static SITE_NAME = 'プログラマー向けEXCEL活用術ブログ';

  // メニューの名称と接続先のパス
  static MENU_LIST: Menu[] = [{
    title: '運営情報',
    menulink: [
      {
        title: 'サイトマップ',
        link: '/sitemap',
      },
      {
        title: 'プライバシーポリシー',
        link: '/privacy',
      },
      {
        title: 'プロフィール',
        link: '/profile',
      },
      {
        title: '問い合わせ',
        link: '/contact',
      },
    ]
  }]

  // 記事取得を行うURLパラメータ名
  static PRAM_KEY_ID = 'p';
  
  // 記事検索を行うURLパラメータ名
  static PRAM_SEARCH = 's';

  // カテゴリ別ページのパス（カテゴリ名を全部許可する）
  static POST_SLAG = '(vba|excel-function|excel-setting|Excel設定|Excel関数|VBA)'
  
  // 固定ページのパス
  static FIXED_PAGE = '(sitemap|privacy|profile|contact)'

  // 画像が見つからない場合の代替画像
  static NO_IMAGE = {
    source_url: Const.PRODUCT_HOST + '/wp-content/themes/albatros/library/images/noimg.png',
    height: 300,
    width: 450,
  }

  // カテゴリ名とカテゴリIDの紐付け
  static CATEGORYS = new Map()
    .set('Excel設定', 2)
    .set('Excel関数', 6)
    .set('VBA', 4)
    .set('excel-setting', 2)
    .set('excel-function', 6)
    .set('vba', 4)

  // コテページと固定ページの紐付け
  static FIXED_PAGES = new Map()
    .set('sitemap', 632)
    .set('privacy', 638)
    .set('profile', 639)
    .set('contact', 636)
}