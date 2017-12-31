import React, {Component} from 'react';

class NewNoteTemplate extends Component{
    constructor(){
        super();
        this.state = {
            title:'',
            content:'',
            addingNew: false
        };

        // Bindings
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSave = this.onSave.bind(this);
        this.toggleView = this.toggleView.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    
    toggleView(){
        this.setState((prevState) => ({
            addingNew: !prevState.addingNew
        }));
    }

    onCancel(){
        this.setState({title: ''});
        this.setState({content: ''});
        this.setState({addingNew: false});
    }

    onChangeTitle(e){
        const title = e.target.value;
        this.setState({title});
    }

    onChangeContent(e){
        const content = e.target.value;
        this.setState({content});
    }

    onSave(){
        const {title, content} = this.state;
        this.props.submitNewNote({
            title,
            content
        });

        this.setState({title: ''});
        this.setState({content: ''});
        this.setState({addingNew: false});
    }

    render(){

        const aemplate = () => {
            if(this.state.addingNew){
                return(
                        <div class="card">
                            <header class="card-header">
                                <p class="card-header-title">
                                    <input 
                                        class="input" 
                                        type="text" 
                                        id="newTitle"
                                        placeholder="Title"
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}
                                    />
                                </p>
                            </header>
                            <div class="card-content is-marginless is-paddingless">
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
                            </div>
                            <footer class="card-footer">
                                <a href="#" class="card-footer-item" onClick={this.onSave}>Save</a>
                                <a href="#" class="card-footer-item" onClick={this.onCancel}>Cancel</a>
                            </footer>
                        </div>
                    
                );
            }

            return  (<div className="column is-3 has-text-centered">
                        <a className="button is-large is-primary is-outlined" onClick={this.toggleView}>Add</a>
                    </div>);
        };

        return(
            <div className="column is-3">
                {aemplate()}
            </div>
        );
    }
};

export {NewNoteTemplate};