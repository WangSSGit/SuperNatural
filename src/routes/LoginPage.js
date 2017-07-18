/**
 * Created by admin on 2017/5/17.
 */
/**
 * Created by admin on 2017/5/16.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Form, Input, Button, message} from 'antd';
import {requestPost} from '../utils/request';
import style from './login-page.less'
import {routerRedux} from 'dva/router';
import { connect } from 'dva';

const FormItem = Form.Item;

const LoginPage = ({form, dispatch}) => {
    const {getFieldDecorator, validateFields} = form;
    return (
        <div className={style.wrapper}>
            <div className={style.body}>
                <header className={style.header}>
                    ReactManager
                </header>
                <section className={style.form}>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        validateFields((err, values) => {
                            if (!err) {
                                window.console.log('Received values of form: ', values);
                                dispatch(routerRedux.push('/home'));
                                {/*post("http://localhost:3000/login", values)*/}
                                    {/*.then((res) => {*/}
                                        {/*if (res) {*/}
                                            {/*message.info('Login success!');*/}
                                            {/*dispatch(routerRedux.push('/home'));*/}
                                        {/*} else {*/}
                                            {/*message.info('Login failed, Wrong account or password!!');*/}
                                        {/*}*/}
                                    {/*});*/}
                            }
                        });
                    }}>
                        <FormItem>
                            {getFieldDecorator('account', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input manager account',
                                        type: 'string'
                                    }
                                ]
                            })(
                                <Input type="text" addonBefore={<Icon type="user"/>}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input password',
                                        type: 'string'
                                    }
                                ]
                            })(
                                <Input type="password" addonBefore={<Icon type="lock"/>}/>
                            )}
                        </FormItem>
                        <Button className={style.btn} type="primary" htmlType="submit">Sign In</Button>
                    </Form>
                </section>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {state};
};

export default connect(mapStateToProps)(Form.create()(LoginPage));
