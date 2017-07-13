/**
 * Created by admin on 2017/6/12.
 */
import {message} from 'antd';
import {routerRedux} from 'dva/router';
import {get, post} from '../utils/request';

// const delay = timeout => {
//     new Promise(resolve => setTimeout(resolve, timeout)).then(() => {
//         console.log("promise test");
//     });
// };

export default {
    namespace: 'books',
    state: [],
    reducers: {
        add(state, {payload: book}){
            return state.concat([book]);
        },
        delete(state, {payload: bookId}){
            let index = state.findIndex((book) => {
                return book.id == bookId;
            });
            if (index != -1) {
                state.splice(index, 1);
            }
            return state;
        },
        update(state, {payload: newBook}){
            let oldBook = state.find((item) => {
                return item.id == newBook.id;
            });
            oldBook = Object.assign(oldBook, newBook);
            return state;
        },
        init(_, {payload: books}){
            return books;
        }
    },
    effects: {
        *reload(action, {call, put}){
            const data = yield call(get, "http://localhost:3000/book");
            yield put({
                type: "init",
                payload: data
            })
        },
        *addBook({payload: book}, {put, call}){

            yield call(post, "http://localhost:3000/book", book);
            yield put({type: 'reload'});
        }
        // *add({book}, {select, put, take, call}) {//这里的两个参数，第一个就是action，第二个是redux-saga中间件对象，带了n多方法
        //     let books = yield select(state => state.books);//这里取的是什么state？当前module的state还是？
        //     console.log("books = " + books);
        //     console.log("book = " + book);
        //     console.log("promise start");
        //     yield call(delay, 2000);
        //     console.log("promise end");
        //     books = books.concat([book]);
        //     yield put({
        //         type: 'update',
        //         books: books
        //     });
        //     yield put(routerRedux.push('/book/list'));
        //     message.info("Add book success!!");
        // },
        // *delete({bookId}, {select, put, take}) {
        //     let books = yield select(state => state.books);
        //     let index = books.findIndex((book) => {
        //         return book.id == bookId;
        //     });
        //     if (index != -1) {
        //         books.splice(index, 1);
        //     }
        //     yield put({
        //         type: 'update',
        //         books: books
        //     });
        // },
        // *edit({book}, {select, put, take}) {
        //     let books = yield select(state => state.books);
        //     let oldBook = books.find((item) => {
        //         return item.id == book.id;
        //     });
        //     oldBook = Object.assign(oldBook, book);
        //     yield put({
        //         type: 'update',
        //         books: books
        //     });
        // }
    },
    subscriptions: {
        function({dispatch, history}){
            return history.listen((listenObj) => {
                const {pathname} = listenObj;
                if (pathname === '/book/list') {
                    dispatch({type: "reload"});
                }
            });
        }
    }
};