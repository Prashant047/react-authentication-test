import React, {Component} from 'react';
import {UserPage} from './UserPage';

class Home extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="container has-text-centered">
                <h1 className="title">
                    HOME
                </h1>
                <h2 className="subtitle">
                    Welcome to Home page
                </h2>
                {/* <UserPage/> */}
            </div>
        );
    }
};

export {Home};