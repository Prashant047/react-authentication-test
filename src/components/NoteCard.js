import React, {Component} from 'react';

class NoteCard extends Component{
    constructor(){
        super();
        this.state = {
            isEditing: false,
            title: '',
            content: '',
            prevTitle:'',
            prevContent:''
        };

        // Bindings
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
    }
    
    componentDidMount() {
        this.setState({title: this.props.cardTitle});
        this.setState({content: this.props.cardContent});
    }
    
    onChangeContent(e){
        const content = e.target.value;
        this.setState({content});
    }

    onChangeTitle(e){
        const title = e.target.value;
        this.setState({title});
    }

    onClickSave(){
        this.setState({prevContent: ''});
        this.setState({prevTitle: ''});
        this.setState({isEditing: false});
    }

    onClickEdit(){
        this.setState({prevTitle: this.state.title});
        this.setState({prevContent: this.state.content});
        this.setState({isEditing: true});

    }

    onClickCancel(){
        this.setState({title: this.state.prevTitle});
        this.setState({content: this.state.prevContent});
        this.setState({isEditing: false});
    }

    onClickDelete(){

    }

    render(){

        const title = () => {
            if(this.state.isEditing){
                return(
                    <p class="card-header-title">
                        <input 
                            class="input" 
                            type="text" 
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </p>
                );
            }

            return(
                <p class="card-header-title">
                    {this.state.title}
                </p>
            );
        };

        const content = () => {
            if(this.state.isEditing){
                return(
                    <div class="content">
                        <textarea 
                            class="textarea" 
                            rows="6"
                            placeholder="content"
                            value={this.state.content}
                            onChange={this.onChangeContent}
                        >
                        </textarea>
                    </div>
                );
            }

            return(
                <div class="content">
                    {this.state.content}
                </div>
            );
        };

        const footer = () => {
            if(this.state.isEditing){
                return(
                    <footer className="card-footer">
                        <a class="card-footer-item" onClick={this.onClickSave}>Save</a>
                        <a class="card-footer-item" onClick={this.onClickCancel}>Cancel</a>
                    </footer>
                );
            }
            return (
                <footer className="card-footer">
                    <a class="card-footer-item" onClick={this.onClickEdit}>Edit</a>
                    <a class="card-footer-item">Delete</a>
                </footer>
            );
        };


        return(
            <div className="column is-3">
                <div class="card">
                    <header class="card-header">
                        {title()}
                    </header>
                    <div class="card-content">
                        {content()}
                    </div>
                    {footer()}
                </div>
            </div>
        );
    }
};

export {NoteCard};