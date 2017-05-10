/**
 * Created by admin on 2017/5/6.
 */
import React from 'react';
import {Link} from 'react-router';
import style from '../styles/home-page.less'

class Home extends React.Component{
    render(){
        return(
            <div className={style.welcome}>
                Welcome
            </div>
        );
    }
}

export default Home;