// メニュー用の型定義
interface Menu {
  title: string; // メニューのセクション名
  menulink: MenuLink[];
}

interface MenuLink {
  title: string;  // メニュー名
  link: string;  // 遷移先のパス
}

export default Menu;