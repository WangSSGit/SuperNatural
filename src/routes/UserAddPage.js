/**
 * Created by admin on 2017/6/9.
 */
import React from 'react';
import {connect} from 'dva';
import {Form, Input, InputNumber, Select, Button, message} from 'antd';
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

const UserAddPage = ({form, dispatch}) => {
    const {getFieldDecorator, validateFields} = form;
    return (
        <Form onSubmit={
            (e) => {
                e.preventDefault();
                validateFields((err, values) => {
                    if (!err) {
                        dispatch({type: 'users/add', payload: values});
                        dispatch(routerRedux.push("/user/list"));
                    } else {
                        message.warn(JSON.stringify(err));
                    }
                });
            }
        } style={{width: '400px'}}>
            <FormItem label="User Name:" {...formLayout}>
                {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true,
                            message: "Please input a name!"
                        },
                        {
                            pattern: /^.{1,20}$/,
                            message: "No more than 20 characters!"
                        }
                    ]
                })(
                    <Input type="text"/>
                )}
            </FormItem>
            <FormItem label="Age:" {...formLayout}>
                {getFieldDecorator('age', {
                    rules: [
                        {
                            required: true,
                            message: "Please input an age",
                            type: 'number'
                        },
                        {
                            min: 1,
                            max: 1200,
                            message: "Please input an age between 0 and 1200!!",
                            type: 'number'
                        }
                    ]
                })(
                    <InputNumber/>
                )}
            </FormItem>
            <FormItem label="Gender:" {...formLayout}>
                {getFieldDecorator('gender', {
                    rules: [
                        {
                            required: true,
                            message: "Please select user's gender!!"
                        }
                    ],
                    initialValue: ""
                })(
                    <Select placeholder="Please select">
                        <Select.Option value="">Please select user's gender</Select.Option>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                )}
            </FormItem>
            <br/>
            <FormItem wrapperCol={{...formLayout.wrapperCol, offset: formLayout.labelCol.span}}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
        </Form>
    );
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(Form.create()(UserAddPage));