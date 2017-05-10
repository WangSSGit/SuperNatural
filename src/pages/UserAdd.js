/**
 * Created by admin on 2017/5/6.
 */
import React from 'react';
import UserEditor from '../components/UserEditor'

class UserAdd extends React.Component {
    render() {
        return (
            <div title="Add a new user">
                <UserEditor />
            </div>
        );
    }
}

export default UserAdd;