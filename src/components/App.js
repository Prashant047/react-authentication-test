import React, {Component} from 'react';
import {Route, Link, Redirect} from 'react-router-dom'

// Importing external components----
import {Home} from './Home';
import {Login} from './Login';
import {SignUp} from './Signup';
import {UserPage} from './UserPage';

class App extends Component{
    constructor(){
        super();
        this.state = {
            auth: false,
            userData: {}
        };

        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    isAuthenticated(value,userData){
        if(value){
            this.setState({auth: true});
            console.log('running');
            this.setState({userData: userData[0]});
        }
        else{
            this.setState({auth: false});
        }
    }

    onClickLogout(){
        this.setState({auth: false});
    }

    render(){

        const PrivateRoute = ({component: PComponent, ...rest}) => {
            return(
                <Route {...rest} render={(props) => (
                    this.state.auth?<PComponent {...props} userData={this.state.userData}/>:<Redirect to="/login"/>
                )}/>
            );
        };

        const login_signup = () => {
            if(this.state.auth){
                return(
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/userpage">UserPage</Link></li>
                        <li><a onClick={this.onClickLogout}>Logout</a></li>
                    </ul> 
                );
            }
            return(
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/userpage">UserPage</Link></li>
                </ul>
            );
        };

        return(
           <div className="container is-widescreen">
                {/* The main hero section----------------------- */}
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h1 className="title">
                                ReactAuth
                            </h1>
                            <h2 className="subtitle">
                                React Authentication Implementation
                            </h2>
                        </div>
                    </div>
                    <div class="hero-foot">
                        <nav class="tabs">
                            <div class="container">
                                {login_signup()}
                            </div>
                        </nav>
                    </div>
                </section>
                {/* -------------------------------------------- */}
                <section className="section">
                    <Route path='/' exact component={Home}/>
                    <Route path='/login' exact render={() => <Login isAuthenticated={this.isAuthenticated}/>}/>
                    <Route path='/signup' exact component={SignUp}/>
                    <PrivateRoute path='/userpage' component={UserPage}/>
                </section>
           </div> 
        );
    }
};

export {App};