import React, {Component} from 'react';
import {validate} from 'email-validator';
import axios from 'axios';

class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            userName: '',
            serverMessage: '',
            isEmailValid: false,
            isFilled: false,
            isLoading: false,
            isDone: false
        };

        // BINDINGS
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    validateEmail(){
        const {email} = this.state;
        if(validate(email)){
            this.setState({isEmailValid: true});
        }
        else{
            this.setState({isEmailValid: false});
        }
    }

    checkfilled(){
        const {email, password, userName} = this.state;
        if(email.length && password.length && userName.length){
            this.setState({isFilled: true});
        }
        else{
            this.setState({isFilled: false});
        }
    }

    onChangeUserName(e){
        const value = e.target.value;
        this.setState({userName: value});
        this.checkfilled();
    }

    onChangePass(e){
        const value = e.target.value;
        this.setState({password: value});
        this.checkfilled();
    }

    onChangeEmail(e){
        const value = e.target.value;
        this.setState({email: value});
        this.checkfilled();
        this.validateEmail();
    }

    onClickHandler(){
        const {email, password, userName} = this.state;
        
        if(this.state.isEmailValid){
            this.setState({isLoading: true});
            // console.log({email,password,userName});
            axios.post('/auth/signup',{
                email,
                password,
                userName
            }).then((response) => {
                if(response.status == 200){
                    this.setState({isDone: true});
                    this.setState({serverMessage:response.data.message});
                    setTimeout(() => {
                        this.props.history.push('/login');
                    },1000);
                }
            }).catch((error) => {
                console.log('Error saving on the database', error);
            });
        }else{
            console.log('nope');
        }
    }

    render(){

        const btn = () => {
            if(this.state.isDone){
                return (
                    <a className="button is-medium is-success">
                        <span class="icon is-large">
                            <i class="fas fa-check"></i>
                        </span>
                    </a>
                );
            }
            else if(this.state.isLoading){
                return <a className="button is-medium is-primary is-loading">Submit</a>;
            }
            else if(this.state.isFilled){
                return <a className="button is-medium is-primary" onClick={this.onClickHandler}>Submit</a>;
            }
            else {
                return <a className="button is-medium is-primary" disabled>Submit</a>;
            }
        };

        const emailMessage = () => {
            if(this.state.email.length == 0){
                return <p className="help">example@example.com</p>;
            }
            else if(this.state.isEmailValid){
                return <p className="help is-success">This email-id is valid</p>;
            }else{
                return <p className="help is-danger">This email-id is invalid</p>;
            }
        };

        return(
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <div className="has-text-centered">
                        <h4 class="title is-4">SignUp</h4>
                        <h4 className="subtitle has-text-success">{this.state.serverMessage}</h4>
                    </div>
                    <div class="field">
                        <label class="label">User Name</label>
                        <div class="control has-icons-left">
                            <input 
                                class="input" 
                                type="text" 
                                placeholder="User Name"
                                value={this.state.userName}
                                onChange={this.onChangeUserName} 
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                            <input 
                                class={`input ${this.state.email.length?this.state.isEmailValid?'is-success':'is-danger':''}`}
                                type="email" 
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.onChangeEmail} 
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                        {emailMessage()}
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control has-icons-left">
                            <input 
                                class="input"
                                type="password" 
                                placeholder="password"
                                value={this.state.password} 
                                onChange={this.onChangePass}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-key"></i>
                            </span>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column has-text-centered">
                            {btn()}
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
};

export {SignUp};