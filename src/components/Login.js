import React, {Component} from 'react';
import {validate} from 'email-validator';
import axios from 'axios';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            isEmailValid: false,
            password: '',
            serverMessage: '',
            isFilled: false,
            isLoading: false,
            isDone: false,
            success: false
        };

        // Bindings
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onBtnClick = this.onBtnClick.bind(this);
        // this.validateEmail = this.validateEmail.bind(this);
    }

    checkfilled(){
        const {email, password} = this.state;
        if(email.length != 0 && password.length != 0){
            this.setState({isFilled: true});
        }
        else{
            this.setState({isFilled: false});
        }
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

    onChangeEmail(e){
        let value = e.target.value;
        this.setState({email: value});
    
        this.checkfilled();
        this.validateEmail();
    }

    onChangePass(e){
        let value = e.target.value;
        this.setState({password: value});

        this.checkfilled();
    }
    
    onBtnClick(){
        const {email, password} = this.state;
        if(this.state.isEmailValid){
            this.setState({isLoading: true});
            axios.post('/auth/login',{
                email,
                password
            }).then((res) => {
                
                if(res.data.success){
                    this.setState({success: true});
                    this.setState({serverMessage: res.data.message});
                    this.setState({isDone:true});
                    this.setState({isLoading: false});
                    this.props.isAuthenticated(true,res.data.userData);
                }else{
                    this.setState({success: false});
                    this.setState({serverMessage: res.data.message});
                    this.setState({isDone:false});
                    this.setState({isLoading: false});
                }

            }).catch((error) => {
                console.log('client post error');
                this.setState({isLoading: false});
            });
        }else{
            console.log('nope');
        }
    }

    render(){

        const btn = () => {
            if(this.state.isDone){
                return (
                    <a className="button is-large is-success">
                        <span class="icon is-large">
                            <i class="fas fa-check"></i>
                        </span>
                    </a>
                );
            }
            else if(this.state.isLoading){
                return <a className="button is-large is-primary is-loading">Login</a>;
            }
            else if(this.state.isFilled){
                return <a className="button is-large is-primary" onClick={this.onBtnClick}>Login</a>;
            }
            else{
                return <a className="button is-large is-primary" disabled>Login</a>;
            }
        };

        const emailMessage = () => {
            if(this.state.email.length == 0){
                return <p className="help">Enter your registered email-id</p>
            }
            else if(this.state.isEmailValid){
                return <p className="help is-success">This email-id is valid</p>
            }else{
                return <p className="help is-danger">This email-id is invalid</p>
            }
        };

        return(
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <div className="has-text-centered">
                        <h4 class="title is-4">Login</h4>
                        <h4 
                            className={`subtitle ${this.state.success?'has-text-success':'has-text-danger'}`}
                        >{this.state.serverMessage}</h4>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                            <input 
                                class={`input ${this.state.email.length?(this.state.isEmailValid?'is-success':'is-danger'):''}`} 
                                type="email" 
                                placeholder="Email" 
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
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
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={this.onChangePass} 
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-key"></i>
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

export {Login};