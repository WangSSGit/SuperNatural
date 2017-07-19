/**
 * Created by admin on 2017/5/18.
 */
import React from "react";
import {connect} from "dva";
import {Input, InputNumber, Form, Button, message, Select} from "antd";
import {routerRedux} from "dva/router";

import BookEditor from "../components/BookEditor";

const BookAddPage = ({form, dispatch, userList}) => {
  const {validateFields} = form;
  return (
    <BookEditor
      onSubmit={
        (e) => {
          e.preventDefault();
          validateFields((err, values) => {
            if (!err) {
              dispatch({type: "books/add", payload: values});
              dispatch(routerRedux.push("/book/list"));
            } else {
              message.warn(JSON.stringify(err));
            }
          });
        }
      }
      userList={userList}
      form={form}
    />
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {userList: state.users};
};

export default connect(mapStateToProps)(Form.create()(BookAddPage));
