/**
 * Created by admin on 2017/6/12.
 */
import {message} from 'antd';
import {routerRedux} from 'dva/router';
import {requestGet, requestPost, requestDel, requestPut} from '../utils/request';

// const delay = timeout => {
//     new Promise(resolve => setTimeout(resolve, timeout)).then(() => {
//         console.log("promise test");
//     });
// };

export default {
    namespace: 'books',
    state: [],
    reducers: {
        update(state, {payload: books}){
            return books;
        }
    },
    effects: {
        *reload(action, {call, put}){
            const data = yield call(requestGet, "http://localhost:3000/book");
            yield put({
                type: "update",
                payload: data
            })
        },
        *add({payload: book}, {put, call}){
            yield call(requestPost, "http://localhost:3000/book", book);
            yield put({type: 'reload'});
            message.info("Add book success!!");
        },
        *delete({payload: id}, {put, call}){
            yield call(requestDel, `http://localhost:3000/book/${id}`);
            yield put({type: 'reload'});
            message.info("Delete book success!!");
        },
        *edit({payload: {bookInfo, id}}, {put, call}){
            yield call(requestPut, `http://localhost:3000/book/${id}`, bookInfo);
            yield put({type: 'reload'});
            message.info("Edit book success!!");
        }
    },
    subscriptions: {
        loadBooks({dispatch}){
            dispatch({type: "reload"});
        }
    }
};