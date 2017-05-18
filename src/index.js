import React from 'react';
import dva, {connect} from 'dva';
import message from 'antd/lib/message';
import {Router, Route, browserHistory } from 'dva/router';

// 1. Initialize
const app = dva({
    history: browserHistory,
    onError: (e) => {
        message.error(e.message);
    }
});

// 2. Model
app.model(require('./models/count'));

// 3. Plugins ? View

// 4. Router
 app.router(require('./router'));


// 5. Start
app.start('#root');