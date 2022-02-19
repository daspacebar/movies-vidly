import React, { Component } from 'react'


class Like extends Component {
    state = {  } 
    render() { 
        let classes = "bi bi-suit-heart"
        if(!this.props.liked){
            classes += "-fill";
        }
        return (
            <i className={classes} style={{cursor: 'pointer'}} onClick={this.props.onClick}></i>
        );
    }
}
 
export default Like;
