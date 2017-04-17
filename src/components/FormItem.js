/**
 * Created by dongwei on 2017/3/20.
 */
import React from 'react';

class FormItem extends React.Component{
    render(){
        // console.log('FormItem',this.props);
        const {label, children, valid, error } = this.props;
        return (
            <div>
                <label>{label}</label>
                {children}
                {!valid&&<span>{error}</span>}
            </div>
        )
    }

}

export default FormItem;