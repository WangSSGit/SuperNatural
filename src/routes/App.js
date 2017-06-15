/**
 * Created by admin on 2017/5/16.
 */
import React from 'react';
import { connect } from 'dva';

const App = ({children}) => {
    return (
        <div>{children}</div>
    )
};

const mapStateToProps = ({state}) => {// 该方法名已经非常形象的说明了 connect 的作用在于 State -> Props 的转换，同时自动注册一个 dispatch 的方法，用以触发 action
    return {
        state
    };
};

export default connect(mapStateToProps)(App);

