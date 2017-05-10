/**
 * Created by admin on 2017/5/8.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import request from '../utils/request'

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 7
    },
    wrapperCol: {
        span: 16
    }
};

class UserEditor extends React.Component {

    componentDidMount () {
        const {editTarget, form} = this.props;
        if (editTarget) {
            form.setFieldsValue(editTarget);
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const {form, editTarget} = this.props;
        if (!formValid) {
            alert('Please input the correct user info!!');
            return;
        }

        form.validateFields((err, values) => {
           if(!err){
               let editType = "Add";
               let apiUrl = "http://localhost:3000/user";
               let method = "POST";
               if (editTarget) {
                   editType = "Edit";
                   apiUrl += "/" + editTarget.id;
                   method = "PUT";
               }

               request(method, apiUrl, values)
                   .then((res) => {
                       if (res.id) {
                           alert(editType + ' user success!!');
                           this.context.router.push("/user/list");
                           return;
                       } else {
                           alert(editType + ' user failed!!');
                       }
                   })
                   .catch((err) => console.error(err));
           } else {
               message.warn(err);
           }
        });
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;

        return (
            <div style={{width: '400px'}}>
                <Form  onSubmit={(e) => this.handleSubmit(e)}>
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
                            ]
                        })(
                            <Select placeholder="Please select">
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
            </div>
        );
    }
}

UserEditor.contextTypes = {
    router: PropTypes.object.isRequired
};

UserEditor = Form.create()(UserEditor);

export default UserEditor;