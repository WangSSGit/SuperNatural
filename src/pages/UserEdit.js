/**
 * Created by admin on 2017/5/6.
 */
import React from 'react';
import PropTypes from 'prop-types';
import UserEditor from '../components/UserEditor'
import {get} from '../utils/request'

class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null
        }
    }

    componentWillMount(){
        const userId = this.context.router.params.id;

        get("http://localhost:3000/user/" + userId)
            .then(res => {
                this.setState({user : res});
            });
    }

    render() {
        const {user} = this.state;
        return (
            <div title="Edit User">
                {
                    user ? <UserEditor editTarget={user} /> : "loading"
                }
            </div>
        );
    }
}

UserEdit.contextTypes = {
    router: PropTypes.object.isRequired
};

export default UserEdit;