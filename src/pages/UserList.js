/**
 * Created by admin on 2017/5/8.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {message, Table, Button, Popconfirm} from 'antd';
import {get, del} from '../utils/request'

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
    }

    componentWillMount() {
        get("http://localhost:3000/user")
            .then(res => {
                this.setState({userList: res})
            })
    }

    handleEdit(user) {
        this.context.router.push('/user/edit/' + user.id);
    }

    handleDel(user) {
        del("http://localhost:3000/user/" + user.id)
            .then(res => {
                this.setState({
                    userList: this.state.userList.filter(item => item.id != user.id)
                });
                alert("Delete success!!");
            })
            .catch(err => {
                console.err(err);
                alert("Delete failed!");
            });
        // const confirmed = confirm(`Are you sure you want to delete ${user.name}?`);
        // if(confirmed){
        //     del("http://localhost:3000/user/" + user.id)
        //         .then(res => {
        //             this.setState({
        //                 userList: this.state.userList.filter(item => item.id != user.id)
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
        const {userList} = this.state;

        const columns = [
            {
                title: 'User ID',
                dataIndex: 'id'
            },
            {
                title: 'User Name',
                dataIndex: 'name'
            },
            {
                title: 'Gender',
                dataIndex: 'gender'
            },
            {
                title: 'Age',
                dataIndex: 'age'
            },
            {
                title: 'Edit User',
                render: (text, record) => {
                    return (
                        <Button.Group type="ghost">
                            <Button size="small" onClick={() => this.handleEdit(record)}>Edit</Button>
                            <Popconfirm title="Are you sure you want to delete this user？"
                                        onConfirm={() => this.handleDel(record)}>
                                <Button size="small">Delete</Button>
                            </Popconfirm>
                        </Button.Group>
                    );
                }
            }
        ];
        return (
            <Table columns={columns} dataSource={userList} rowKey={row => row.id}/>
        );
    }
}

UserList.contextTypes = {
    router: PropTypes.object.isRequired
};

export default UserList;