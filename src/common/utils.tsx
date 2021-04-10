import { Cond } from "../interface/IndexState";
import Const from "./const";

/**
 * URLにURLパラメータを付与した文字列を返却します。
 * @param url URL(URLパラメータなし)
 * @param params URLパラメータをパラメータ名と値の連想配列で指定する
 * @return URL(URLパラメータあり)
 */
export function createURL(url: string, prams?: { [key: string]: any; }) {
    const host: string = getHost();
    let opt: string = "";
    if (prams !== undefined) {
        for (const key in prams) {
            if (prams[key] !== null) {
                opt += (opt === "" ? "?" : "&");
                opt += key + "=" + prams[key];
            }
        }
    }
    return host + url + opt
}

/**
 * 環境に応じたホスト名を返却する。
 * @return ホスト名
 */
export function getHost() {
    if (process.env.NODE_ENV === "production") {
        return Const.PRODUCT_HOST;
    } else {
        return Const.TEST_HOST;
    }
}

/**
 * 環境に応じたグーグルアナリティクスのIDを返却する。
 * @return アナリティクスのID
 */
export function getGAID() {
    if (process.env.NODE_ENV === "production") {
        return Const.GAID;
    } else {
        return "";
    }
}

/**
 * 現在のページ情報をもとにアナリティクスにデータを送信する。
 */
export function gtagconfig() {
    window.gtag('config', getGAID(), {
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
    })
}

/**
 * 文字列が有効かどうかを判別する。
 * @param params 検索する文字列
 * @return true:無効 false:有効
 */
export function isEnptystr(str: string | null | undefined) {
    return (str == null || str === undefined || str === "undefined" || str === "")
}

/**
 * 数値が有効かどうかを判別する。
 * @param params 検索する数値
 * @return true:無効 false:有効
 */
export function isEnptynum(i: number | null | undefined) {
    return (i == null || i === undefined || i === 0)
}

/**
 * 日付を”yyyy-mm-dd”形式の文字列に変換する。
 * @param params 変換する日付
 * @return 変換後の文字列
 */
export function formatDate(date: Date | undefined | null) {
    if (date === undefined || date === null) {
        return '';
    } else {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
}

/**
 * 日付を”YYYYMM”形式の文字列に変換する。
 * @param params 変換する日付
 * @return 変換後の文字列
 */
export function formatDateYYYYMM(date: Date) {
    if (date === undefined || date === null) {
        return '';
    } else {
        return date.getFullYear().toString().padStart(4, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0");
    }
}

/**
 * 日付を”YYYYMMhhmmss”形式の文字列に変換する。
 * @param params 変換する日付
 * @return 変換後の文字列
 */
export function formatDateYYYYMMhhmmss(date: Date) {
    if (date === undefined || date === null) {
        return '';
    } else {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
            + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }
}

/**
 * 現在のURLから記事のIDを取得する。
 * @return 記事のID
 */
export function getIdByUrlPrams() {
    let urlParamStr = window.location.search

    if (urlParamStr) {
        urlParamStr = urlParamStr.substring(1)
        let params = urlParamStr.split('&');
        for (let i = 0; i < params.length; i++) {
            const temp = params[i].split('=')
            // URLパラメータがConst.PRAM_KEY_IDで定義しているキーの時、その値を返却
            if (temp[0] === Const.PRAM_KEY_ID) return temp[1];
        }
    }
    // 取得できない場合は空文字
    return '';
}

/**
 * 現在のURLから固定ページのIDを取得する。
 * @return 固定ページのID
 */
export function getIdByFixedPath() {
    let urlPath = window.location.pathname
    // パス名から固定ページのIDを抜き出す
    if (Const.FIXED_PAGES.has(urlPath.replaceAll('/', ''))) {
        return Const.FIXED_PAGES.get(urlPath.replaceAll('/', ''));
    }
    // 取得できない場合は空文字
    return '';
}

/**
 * 現在のURLから検索キーワードとカテゴリを取得する。
 * @return 検索キーワードとカテゴリ
 */
export function getSearchCondByUrlPrams() {
    let urlParamStr = window.location.search
    let urlPathStr = window.location.pathname;
    let retVal: Cond = {
        category: '',
        keyword: '',
    }
    // カテゴリの取得
    if (urlPathStr && urlPathStr.indexOf('?') === -1) {
        urlPathStr = urlPathStr.replaceAll('/', '');
        urlPathStr = decodeURI(urlPathStr);
        if (Const.CATEGORYS.has(urlPathStr)) {
            retVal.category = Const.CATEGORYS.get(urlPathStr);
        }
    }
    // 検索キーワードの取得
    if (urlParamStr) {
        urlParamStr = urlParamStr.substring(1)
        let params = urlParamStr.split('&');
        for (let i = 0; i < params.length; i++) {
            const temp = params[i].split('=')
            if (temp[0] === Const.PRAM_SEARCH) retVal.keyword = temp[1];
        }
    }
    return retVal;
}

/**
 * prettify.jsに必要なクラス名を設定する。
 * @param 必要なクラス付与前の文字列
 * @return 必要なクラス付与後の文字列 
 */
export function setPrettySetting(str: string) {
    str = str.split('prism line-numbers')
        .join('prettyprint linenums lang-vb');
    let ret: string = '';
    let spstr = str.split('</h2>');
    for (let i = 0; i < spstr.length; i++) {
        if (i === 2) spstr[i] = spstr[i].replaceAll('<h2>' , Const.ADS + '<h2>');
     }
    ret = spstr.join('</h2>');
    return ret;
}

/**
 * MAPのValueからKeyを取得する
 * @param val:検索キーになる値、map：検索するMAP
 * @return Mapのキー
 */
export function getKeyByMap<T>(val: T, map: Map<string, T>) {
    for (const key of map.keys()) {
        if (map.get(key) === val) return key;
    }
    // 取得できない場合は空文字
    return '';
}


