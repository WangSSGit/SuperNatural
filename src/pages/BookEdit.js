/**
 * Created by admin on 2017/5/6.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BookEditor from '../components/BookEditor'
import {get} from '../utils/request'

class BookEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            book: null
        }
    }

    componentWillMount(){
        const bookId = this.context.router.params.id;

        get("http://localhost:3000/book/" + bookId)
            .then(res => {
                this.setState({book : res});
            });
    }

    render() {
        const {book} = this.state;
        return (
            <div title="Edit Book">
                {
                    book ? <BookEditor editTarget={book} /> : "loading"
                }
            </div>
        );
    }
}

BookEdit.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BookEdit;