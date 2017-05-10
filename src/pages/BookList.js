/**
 * Created by admin on 2017/5/9.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { message, Table, Button, Popconfirm } from 'antd';
import {get, del} from '../utils/request'

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: []
        };
    }

    componentWillMount() {
        get("http://localhost:3000/book")
            .then(res => {
                this.setState({bookList: res})
            })
    }

    handleEdit(book){
        this.context.router.push('/book/edit/' + book.id);
    }

    handleDel(book){
            del("http://localhost:3000/book/" + book.id)
                .then(res => {
                    this.setState({
                        bookList: this.state.bookList.filter(item => item.id != book.id)
                    });
                    alert("Delete success!!");
                })
                .catch(err =>{
                    console.err(err);
                    alert("Delete failed!");
                })

        // const confirmed = confirm(`Are you sure you want to delete ${book.name}?`);
        // if(confirmed){
        //     del("http://localhost:3000/book/" + book.id)
        //         .then(res => {
        //             this.setState({
        //                 bookList: this.state.bookList.filter(item => item.id != book.id)
        //             });
        //             alert("Delete success!!");
        //         })
        //         .catch(err =>{
        //             console.err(err);
        //             alert("Delete failed!");
        //         })
        // }
    }

    render() {
        const {bookList} = this.state;

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
                        <Button size="small" onClick={() => this.handleEdit(record)}>Edit</Button>
                        <Popconfirm title="Are you sure you want to delete this book？" onConfirm={() => this.handleDel(record)}>
                            <Button size="small">Delete</Button>
                        </Popconfirm>
                    </Button.Group>
                )
            }
        ];
        return (
            <Table columns={columns} dataSource={bookList} rowKey={row => row.id}/>
        );
    }
}

BookList.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BookList;