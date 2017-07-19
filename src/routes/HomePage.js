/**
 * Created by admin on 2017/5/17.
 */
import React from "react";
import {connect} from "dva";

const HomePage = ({dispatch}) => {
  return (
    <div>Welcome</div>
  );
};

HomePage.contextTypes = {};

const mapStateToProps = (state) => {
  return {state};
};

export default connect(mapStateToProps)(HomePage);
