/**
 * Created by admin on 2017/6/9.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {message, Table, Button, Popconfirm} from 'antd';
import {requestGet, requestDel} from '../utils/request'
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

const BookListPage = ({dispatch, bookList}) => {

    const columns = [
        {
            title: 'Book ID',
            dataIndex: 'id'
        },
        {
            title: 'Book Name',
            dataIndex: 'name'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (text, record) => <span>&yen;{record.price}</span>
        },
        {
            title: 'Owner ID',
            dataIndex: 'owner_id'
        },
        {
            title: 'Edit Book',
            render: (text, record) => (
                <Button.Group type="ghost">
                    <Button size="small" onClick={
                        () => {
                            dispatch(routerRedux.push(`/book/edit?id=${record.id}`));
                        }
                    }>Edit</Button>
                    <Popconfirm title="Are you sure you want to delete this book？"
                                onConfirm={
                                    () => {
                                        dispatch({type: 'books/delete', payload: record.id});
                                    }
                                }>
                        <Button size="small">Delete</Button>
                    </Popconfirm>
                </Button.Group>
            )
        }
    ];
    return (
        <Table columns={columns} dataSource={bookList} rowKey={row => row.id}/>
    );
};

const mapStateToProps = (state) => {
    return {bookList: state.books};
};

export default connect(mapStateToProps)(BookListPage);