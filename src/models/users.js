/**
 * Created by admin on 2017/6/12.
 */
import {message} from "antd";
import {requestGet, requestPost, requestDel, requestPut} from "../utils/request";

export default {
  namespace: "users",
  state: [],
  reducers: {
    update(state, {payload: newUsers}){
      return newUsers;
    }
  },
  effects: {
    *reload(action, {call, put}){
      const data = yield call(requestGet, "http://localhost:3000/user");
      yield put({
        type: "update",
        payload: data
      });
    },
    *add({payload: user}, {call, put}){
      yield call(requestPost, "http://localhost:3000/user", user);
      yield put({type: "reload"});
      message.info("Add user success!!");
    },
    *delete({payload: id}, {call, put}){
      yield call(requestDel, `http://localhost:3000/user/${id}`);
      yield put({type: "reload"});
      message.info("Delete user success!!");
    },
    *edit({payload: {userInfo, id}}, {call, put}){
      yield call(requestPut, `http://localhost:3000/user/${id}`, userInfo);
      yield put({type: "reload"});
      message.info("Edit user success!!");
    }
  },
  subscriptions: {
    loadUsers({dispatch}){
      dispatch({type: "reload"});
    }
  },

};
