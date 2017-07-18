import fetch from 'dva/fetch';
// import { hashHistory } from 'react-router';

export default function request(method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
        // fetch的GET不允许有body，参数只能放在url中
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Token': sessionStorage.getItem('access_token') || '', // 从sessionStorage中获取access token
            'Access-Control-Allow-Origin': "*"
        },
        body
    }).then((res) => {
        if (res.status === 401) {
            // hashHistory.push('/login');
            return Promise.reject('Unauthorized.');
        } else {
            const token = res.headers.get('access-token');
            if (token) {
                sessionStorage.setItem('access_token', token);
            }
            return res.json();
        }
    });
}

export const requestGet = url => request('GET', url);
export const requestPost = (url, body) => request('POST', url, body);
export const requestPut = (url, body) => request('PUT', url, body);
export const requestDel = (url, body) => request('DELETE', url, body);

//获取URL地址的参数值。
//name为URL参数名
//例如：?param1=abc&param2=123
//当调用GetURLparam("param2"）时，获取到的值为：123
export const getUrlParam = (name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r != null)return r[2];
    return null;
};
