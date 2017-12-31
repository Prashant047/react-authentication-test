import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

// Importing external components----
import {App} from './components/App';

class Layout extends Component{
    render(){
        return(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );
    }
}

const target = document.getElementById('app');
ReactDOM.render(<Layout/>,target);