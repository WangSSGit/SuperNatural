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

const mapStateToProps = ({state}) => {
    return {
        state
    };
};

export default connect(mapStateToProps)(App);

