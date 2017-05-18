/**
 * Created by admin on 2017/5/17.
 */
import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import { connect } from 'dva';

const HomePage = ({dispatch}) => {
    return (
        <HomeLayout>
            Welcome
        </HomeLayout>
    )
};

HomePage.contextTypes = {

};

const mapStateToProps = (state) => {
    return {state};
};

export default connect(mapStateToProps)(HomePage);