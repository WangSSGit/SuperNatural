/**
 * Created by admin on 2017/6/9.
 */
import React from 'react';
import {connect} from 'dva';
import {message, Table, Button, Popconfirm} from 'antd';

//这里可以传入什么参数？this.props
const UserListPage = ({dispatch, userList}) => {
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
                        <Button size="small" onClick={() => message.info("Edit user")}>Edit</Button>
                        <Popconfirm title="Are you sure you want to delete this user？"
                                    onConfirm={
                                        () => {
                                            dispatch({type: 'users/delete', payload: record.id});
                                        }
                                    }>
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
};

//question:这个state是整个项目的state，还是这个组件对应的state片段？
const mapStateToProps = (state) => {
    return {userList: state.users};
};

export default connect(mapStateToProps)(UserListPage);