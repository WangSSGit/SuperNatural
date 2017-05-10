/**
 * Created by admin on 2017/5/6.
 */
import React from 'react';
import BookEditor from '../components/BookEditor'

class BookAdd extends React.Component {
    render() {
        return (
            <div title="Add a new Book">
                <BookEditor />
            </div>
        );
    }
}

export default BookAdd;