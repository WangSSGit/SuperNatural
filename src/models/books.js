/**
 * Created by admin on 2017/6/12.
 */
import {message} from 'antd';
import {routerRedux} from 'dva/router';

const delay = timeout => {
    new Promise(resolve => setTimeout(resolve, timeout)).then(() => {
        console.log("promise test");
    });
};

export default {
    namespace: 'books',
    state: [],
    reducers: {
        update (state, {books}){//这里的两个参数，第一个是什么？第二个是什么？
            console.log("state = " + state);
            console.log("books = " + books);
            return books;
        },

        // add(books, {book}){
        //     return books.concat([book]);
        // },
        // delete(books, {bookId}){
        //     let index = books.findIndex((book) => {
        //         return book.id == bookId;
        //     });
        //     if(index != -1){
        //         books.splice(index, 1);
        //     }
        //     return books;
        // },
        // edit(books, {book}){
        //     let oldBook = books.find((item) => {
        //         return item.id == book.id;
        //     });
        //     oldBook = Object.assign(oldBook, book);
        //     return books;
        // }
    },
    effects: {
        *add({book}, {select, put, take, call}) {//这里的两个参数，第一个就是action，第二个是redux-saga中间件对象，带了n多方法
            let books = yield select(state => state.books);//这里取的是什么state？当前module的state还是？
            console.log("books = " + books);
            console.log("book = " + book);
            console.log("promise start");
            yield call(delay, 2000);
            console.log("promise end");
            books = books.concat([book]);
            yield put({
                type: 'update',
                books: books
            });
            yield put(routerRedux.push('/book/list'));
            message.info("Add book success!!");
        },
        *delete({bookId}, {select, put, take}) {
            let books = yield select(state => state.books);
            let index = books.findIndex((book) => {
                return book.id == bookId;
            });
            if (index != -1) {
                books.splice(index, 1);
            }
            yield put({
                type: 'update',
                books: books
            });
        },
        *edit({book}, {select, put, take}) {
            let books = yield select(state => state.books);
            let oldBook = books.find((item) => {
                return item.id == book.id;
            });
            oldBook = Object.assign(oldBook, book);
            yield put({
                type: 'update',
                books: books
            });
        }
    },
    subscriptions: {
        setup({dispatch, history}){
            console.log("setup");
        },

        initTime(test){
            console.log("initTime");
            console.log(test);
        },
        function({dispatch, history}){
            // 监听 history 变化，当进入 `/` 时触发 `load` action
            return history.listen(({ pathname }) => {
                if (pathname === '/book/add') {
                    console.log("Welcome to add book page");
                    // dispatch({ type: 'load' });
                }
            });
        }
    }
};