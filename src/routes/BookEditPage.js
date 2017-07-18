/**
 * Created by admin on 2017/5/18.
 */
import React from 'react';
import {connect} from 'dva';
import {Input, InputNumber, Form, Button, message, Select} from 'antd';
import {routerRedux} from 'dva/router';

import BookEditor from '../components/BookEditor';

const BookEditPage = ({form, dispatch, userList, bookInfo}) => {
    const {validateFields} = form;
    return (
        <BookEditor
            onSubmit={
                (e) => {
                    e.preventDefault();
                    validateFields((err, values) => {
                        if (!err) {
                            dispatch({type: 'books/edit', payload: {bookInfo: values, id: bookInfo.id}});
                            dispatch(routerRedux.push("/book/list"));
                        } else {
                            message.warn(JSON.stringify(err));
                        }
                    });
                }
            }
            bookInfo = {bookInfo}
            userList={userList}
            form = {form}
        />
    )
};

const mapStateToProps = (state, ownProps) => {//dva提供的connect方法会把当前项目的state以及router信息都传递过来
    const bookId = ownProps.location.query.id;
    const {books, users} = state;
    for(let book of books){
        if(book.id == bookId){
            return {
                userList: users,
                bookInfo: book,
            }
        }
    }
    return {userList: users};
};

export default connect(mapStateToProps)(Form.create()(BookEditPage));