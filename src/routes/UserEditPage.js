/**
 * Created by admin on 2017/7/18.
 */
import React from "react";
import {connect} from "dva";
import {Form, Input, InputNumber, Select, Button, message} from "antd";
import {routerRedux} from "dva/router";
import UserEditor from "../components/UserEditor";

const UserEditPage = ({form, dispatch, userInfo}) => {
  const {validateFields} = form;
  return (
    <UserEditor
      form={form}
      userInfo={userInfo}
      onSubmit={
        (e) => {
          e.preventDefault();
          validateFields((err, values) => {
            if (!err) {
              dispatch({type: "users/edit", payload: {userInfo: values, id: userInfo.id}});
              dispatch(routerRedux.push("/user/list"));
            } else {
              message.warn(JSON.stringify(err));
            }
          });
        }
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.location.query.id;
  const {users} = state;
  for (let user of users) {
    if (user.id == userId) {
      return {
        userInfo: user
      };
    }
  }
  return {userInfo: {}};
};

export default connect(mapStateToProps)(Form.create()(UserEditPage));
