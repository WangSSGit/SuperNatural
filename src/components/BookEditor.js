/**
 * Created by admin on 2017/5/18.
 */
import React from "react";
import {Input, InputNumber, Form, Button, message, Select} from "antd";
import {connect} from "dva";

const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 16
  }
};

export default ({form, userList = [], bookInfo = {}, onSubmit}) => {
  const {name = "", price = "", owner_id: ownerId = ""} = bookInfo;
  const {getFieldDecorator} = form;
  return (
    <Form onSubmit={onSubmit} style={{width: "400px"}}>
      <FormItem label="Book Name:" {...formLayout}>
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
              message: "Please input a book name!!"
            }
          ],
          initialValue: name
        })(<Input type="text"/>)}
      </FormItem>

      <FormItem label="Price:" {...formLayout}>
        {getFieldDecorator("price", {
          rules: [
            {
              required: true,
              message: "Please input a price",
              type: "number"
            },
            {
              min: 1,
              max: 99999,
              type: "number",
              message: "Please input a price between 0 and 300!!"
            }
          ],
          initialValue: price
        })(<InputNumber />)}
      </FormItem>
      <FormItem label="Owner:" {...formLayout}>
        {getFieldDecorator("owner_id", {
          rules: [
            {
              required: true,
              message: "Please select a owner!!"
            }
          ],
          initialValue: String(ownerId)
        })(
          <Select>
            <Select.Option value="">Please select a owner</Select.Option>
            {userList.map((user) => {
              return (
                <Select.Option key={user.id} value={String(user.id)}>{user.name}</Select.Option>
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
  );
};
