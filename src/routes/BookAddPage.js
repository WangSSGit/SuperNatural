/**
 * Created by admin on 2017/5/18.
 */
import React from 'react';
import { connect } from 'dva';
import { Input, InputNumber, Form, Button, message, Select } from 'antd';
import {routerRedux} from 'dva/router';

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 7
    },
    wrapperCol: {
        span: 16
    }
};

const BookAddPage = ({form, dispatch, userList}) => {
    const {getFieldDecorator, validateFields} = form;
    return (
        <Form onSubmit={
            (e) => {
                e.preventDefault();
                validateFields((err, values) => {
                    if(!err){
                        values.id = (new Date().getTime() + "").substr(5, 6);
                        dispatch({type: 'books/add', book: values});
                    } else {
                        message.warn(JSON.stringify(err));
                    }
                });
            }
        } style={{width: '400px'}}>
            <FormItem label="Book Name:" {...formLayout}>
                {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true,
                            message: "Please input a book name!!"
                        }
                    ]
                })(<Input type="text"/>)}
            </FormItem>

            <FormItem label="Price:" {...formLayout}>
                {getFieldDecorator('price', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input a price',
                            type: 'number'
                        },
                        {
                            min: 1,
                            max: 99999,
                            type: 'number',
                            message: "Please input a price between 0 and 300!!"
                        }
                    ]
                })(<InputNumber/>)}
            </FormItem>
            <FormItem label="Owner:" {...formLayout}>
                {getFieldDecorator('owner_id', {
                    rules: [
                        {
                            required: true,
                            message: "Please select a owner!!"
                        }
                    ]
                })(
                    <Select>
                        <Select.Option value="">Please select a owner</Select.Option>
                        {userList.map((user) => {
                            return (
                                <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                            );
                        })}
                    </Select>
                )}
            </FormItem>
            <br/>
            <FormItem wrapperCol={{...formLayout.wrapperCol, offset: formLayout.labelCol.span}}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
        </Form >
    )
};

const mapStateToProps = (state) => {
    return {userList: state.users};
};

export default connect(mapStateToProps)(Form.create()(BookAddPage));