/** URL操作 **/
import { IsEmptyArray, IsEmptyObject } from "../common/type";

/**
 * @name URL参数反序列化
 */
function ParseUrlSearch() {
	let match;
	const params = {};
	const reg = /([^&=]+)=?([^&]*)/g;
	const search = location.search.substr(1);
	const decode = str => decodeURIComponent(str.replace(/\+/g, " "));
	while ((match = reg.exec(search))) {
		params[decode(match[1])] = decode(match[2]);
	}
	return params;
	// 单个参数
	// const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
	// const result = location.search.substr(1).match(reg);
	// return result ? decodeURIComponent(result[2]) : null;
}

/**
 * @name URL参数删除
 * @param {array} search 参数集合
 */
function RemoveUrlSearch(...search) {
	if (IsEmptyArray(search)) return;
	const url = location.origin + location.pathname;
	const hash = location.hash;
	const oldSearch = ParseUrlSearch();
	search.forEach(v => Reflect.deleteProperty(oldSearch, v));
	const newSearchStr = StringifyUrlSearch(oldSearch);
	history.pushState({}, null, url + newSearchStr + hash);
}

/**
 * @name URL参数设置
 * @param {object} [search={}] 参数集合
 */
function SetUrlSearch(search = {}) {
	if (IsEmptyObject(search)) return;
	const url = location.origin + location.pathname;
	const hash = location.hash;
	const oldSearch = ParseUrlSearch();
	const newSearch = Object.assign({}, oldSearch, search);
	const newSearchStr = StringifyUrlSearch(newSearch);
	history.pushState({}, null, url + newSearchStr + hash);
}

/**
 * @name URL参数序列化
 * @param {object} [search={}] 参数集合
 */
function StringifyUrlSearch(search = {}) {
	return Object.entries(search).reduce(
		(t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
		IsEmptyObject(search) ? "" : "?"
	).replace(/&$/, "");
}

export {
	ParseUrlSearch,
	RemoveUrlSearch,
	SetUrlSearch,
	StringifyUrlSearch
};

export default {
	ParseUrlSearch,
	RemoveUrlSearch,
	SetUrlSearch,
	StringifyUrlSearch
};