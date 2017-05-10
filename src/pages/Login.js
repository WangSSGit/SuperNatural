/**
 * Created by admin on 2017/5/9.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Form, Input, Button, message} from 'antd';
import {post} from '../utils/request';
import style from '../styles/login-page.less'

const FormItem = Form.Item;

class Login extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                post('http://localhost:3000/login', values)
                    .then((res) => {
                        if (res) {
                            message.info('Login success!');
                            this.context.router.push('/');
                        } else {
                            message.info('Login failed, Wrong account or password!!');
                        }
                    });
            }
        });
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <div className={style.wrapper}>
                <div className={style.body}>
                    <header className={style.header}>
                        ReactManager
                    </header>
                    <section className={style.form}>
                        <Form onSubmit={this.handleSubmit}>
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
    }
}
Login.contextTypes = {
    router: PropTypes.object.isRequired
};
Login = Form.create()(Login);

export default Login;