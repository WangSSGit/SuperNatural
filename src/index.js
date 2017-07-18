import React from 'react';
import dva, {connect} from 'dva';
import message from 'antd/lib/message';
// import createLoading from 'dva-loading';
import {Router, Route} from 'dva/router';

// 1. Initialize
const app = dva({
    onError: (e) => {
        message.error(e.message);
    }
});

//2. use
// app.use(createLoading());

// 3. Model
// app.model(model);
// 4. Router
 app.router(require('./router'));

// 5. Start
app.start('#root');