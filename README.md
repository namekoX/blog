# このプロジェクトについて

WordPressで作成されたブログのUIをSPA(React)で再構築しました。  
以下のブログで使用しているソースになります  
[https://vbaexcel.slavesystems.com/](https://vbaexcel.slavesystems.com/)  

ソース内の定数などを置き換えることで他のブログなどに適用可能です。  
（パーマリンクをカスタマイズしている場合は、固定値以外も修正が必要になります）  

## カテゴリ名を取得できるようにfunction.phpを修正する
Word Press APIの標準だとカテゴリ名の取得ができないため  
wp-includesフォルダに有るfunction.phpに以下を追記します。  

```function.php
add_action( 'rest_api_init', 'register_category_name' );
function register_category_name() {
    register_rest_field( 'post',
        'category_name',
        array(
            'get_callback'    => 'get_category_name'
        )
    );
}
function get_category_name( $object ) {
    $category = get_the_category($object[ 'id' ]);
    $cat_name = $category[0]->cat_name;
    return $cat_name;
}
```  

※以下サイトを参考にさせていただきました。  
https://qiita.com/yumayamada1029/items/c40e40200899330f957b

## 固定値の修正
ブログごとに設定が必要な固定値は、以下ソースで管理しています  
https://github.com/namekoX/blog/blob/master/src/common/const.tsx  

ブログのパーマリンクが以下のようになっていることを前提に固定値を設定しています。  
https://ブログトップページURL/カテゴリ名/?p=記事ID  
(例)https://vbaexcel.slavesystems.com/vba/?p=897  

検索クエリをpage、カテゴリに「sports、cooking」を設定するには下記のように設定変更します。  

```const.tsx  
  // 記事取得を行うURLパラメータ名
  static PRAM_KEY_ID = 'page';
```  

```const.tsx  
  // カテゴリ別ページのパス（カテゴリ名を全部許可する）
  static POST_SLAG = '(sports|cooking)'
```  

カテゴリや固定ページのIDは  
クライアント側で紐付けを定義しています。  

```const.tsx  
  // カテゴリ名とカテゴリIDの紐付け
  static CATEGORYS = new Map()
    .set('Excel設定', 2)
    .set('Excel関数', 6)
    .set('VBA', 4)
    .set('excel-setting', 2)
    .set('excel-function', 6)
    .set('vba', 4)
```  

※カテゴリのIDは、WordPressの管理画面のカテゴリのURLから判断できます。  
![image](https://user-images.githubusercontent.com/55214427/114272923-07dfc280-9a53-11eb-937b-9a06fe8b6bbc.png)  
↑上記はカテゴリIDは2になります。  

### 見た目の修正



To learn React, check out the [React documentation](https://reactjs.org/).
