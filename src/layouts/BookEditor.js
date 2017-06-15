/**
 * Created by admin on 2017/5/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Form, Button, message } from 'antd';
import request, {get} from '../utils/request';
import { connect } from 'dva';

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 7
    },
    wrapperCol: {
        span: 16
    }
};

const BookEditor = ({dispatch, form})=>{
    const {getFieldDecorator} = form;
    // const {userList} = this.state;
    const userList = [];
    return (
        <Form  onSubmit={(e) => console.log(e)} style={{width: '400px'}}>
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
                    <select>
                        <option value="">Please select a owner</option>
                        {userList.map((user) => {
                            return (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            );
                        })}
                    </select>
                )}
            </FormItem>
            <br/>
            <input type="submit" value="Submit"/>
        </Form >
    );
};





//
// class BookEditor extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             userList: []
//         };
//     }
//
//     componentWillMount(){
//         get("http://localhost:3000/user")
//             .then(res => {
//                 this.setState({userList: res})
//             })
//     }
//
//     componentDidMount () {
//         const {editTarget, form} = this.props;
//         if (editTarget) {
//             form.setFieldsValue(editTarget);
//         }
//     }
//
//     handleSubmit(e) {
//         e.preventDefault();
//
//         const {form, editTarget} = this.props;
//
//         form.validateFields((err, values) => {
//             if (err) {
//                 message.warn(err);
//                 return;
//             }
//             let editType = "Add";
//             let apiUrl = "http://localhost:3000/book";
//             let method = "POST";
//             if (editTarget) {
//                 editType = "Edit";
//                 apiUrl += "/" + editTarget.id;
//                 method = "PUT";
//             }
//
//             request(method, apiUrl, values)
//                 .then((res) => {
//                     if (res.id) {
//                         alert(editType + ' book success!!');
//                         this.context.router.push("/book/list");
//                         return;
//                     } else {
//                         alert(editType + ' book failed!!');
//                     }
//                 })
//                 .catch((err) => console.error(err));
//         });
//     }
//
//     render() {
//         const {form} = this.props;
//         const {getFieldDecorator} = form;
//         const {userList} = this.state;
//         return (
//             <Form  onSubmit={(e) => this.handleSubmit(e)} style={{width: '400px'}}>
//                 <FormItem label="Book Name:" {...formLayout}>
//                     {getFieldDecorator('name', {
//                         rules: [
//                             {
//                                 required: true,
//                                 message: "Please input a book name!!"
//                             }
//                         ]
//                     })(<Input type="text"/>)}
//                 </FormItem>
//
//                 <FormItem label="Price:" {...formLayout}>
//                     {getFieldDecorator('price', {
//                         rules: [
//                             {
//                                 required: true,
//                                 message: 'Please input a price',
//                                 type: 'number'
//                             },
//                             {
//                                 min: 1,
//                                 max: 99999,
//                                 type: 'number',
//                                 message: "Please input a price between 0 and 300!!"
//                             }
//                         ]
//                     })(<InputNumber/>)}
//                 </FormItem>
//                 <FormItem label="Owner:" {...formLayout}>
//                     {getFieldDecorator('owner_id', {
//                         rules: [
//                             {
//                                 required: true,
//                                 message: "Please select a owner!!"
//                             }
//                         ]
//                     })(
//                         <select>
//                             <option value="">Please select a owner</option>
//                             {userList.map((user) => {
//                                 return (
//                                     <option key={user.id} value={user.id}>{user.name}</option>
//                                 );
//                             })}
//                         </select>
//                     )}
//                 </FormItem>
//                 <br/>
//                 <input type="submit" value="Submit"/>
//             </Form >
//         );
//     }
// }

// BookEditor.contextTypes = {
//     router: PropTypes.object.isRequired
// }

// BookEditor = Form.create()(BookEditor);

const mapStateToProps = (state) => {
    return {state};
};

export default connect(mapStateToProps)(Form.create()(BookEditor));
