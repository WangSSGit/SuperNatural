/**
 * Created by admin on 2017/6/9.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { message, Table, Button, Popconfirm } from 'antd';
import {get, del} from '../utils/request'
import { connect } from 'dva';

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
            render: (text, record) => <span>&yen;{record.price / 100}</span>
        },
        {
            title: 'Owner ID',
            dataIndex: 'owner_id'
        },
        {
            title: 'Edit Book',
            render: (text, record) => (
                <Button.Group type="ghost">
                    <Button size="small" onClick={() => message.info("Edit book")}>Edit</Button>
                    <Popconfirm title="Are you sure you want to delete this book？"
                                onConfirm={
                                    () => {
                                        dispatch({type: 'books/delete', bookId: record.id});
                                        message.info("Delete book success!!");
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