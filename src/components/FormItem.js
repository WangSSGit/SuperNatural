/**
 * Created by admin on 2017/5/6.
 */
import React from 'react';

class FormItem extends React.Component{
    render(){
        const {label, children, valid, error} = this.props;
        return (
            <div>
                <label>{label} </label>
                {children}
                {!valid && <span>{error}</span>}
            </div>
        )
    }
}

export default FormItem;