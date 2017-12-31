import React, {Component} from 'react';
import {NoteCard} from './NoteCard';
import {NewNoteTemplate} from './NewNoteTemplate';


class UserPage extends Component{
    constructor(){
        super();
        this.state = {
            userName: '',
            notes: [],
            addingNew: false
        }

        this.doSomething = this.doSomething.bind(this);
        this.submitNewNote = this.submitNewNote.bind(this);
    }
 
    componentDidMount() {
        this.setState({userName: this.props.userData.userName});
        this.setState({notes: this.props.userData.notes});
    }

    doSomething(){
        this.setState((prevState) => ({
            addingNew: !prevState.addingNew
        }));
    }

    submitNewNote(data){
        console.log(data);
    }

    render(){
        const getNotes = this.state.notes.map((note, index) => {
            return <NoteCard cardTitle={note.title} cardContent={note.body} key={index} cardId={index}/>
        });

        return(
            <section className="section is-paddingless">
               <div className="columns">
                    <div className="column has-text-centered">
                        <h1 className="title">{this.state.userName}</h1>
                        <h4 className="subtitle has-text-primary">Welcome to the your Home page</h4>
                    </div>
               </div>
               <div className="columns is-multiline">
                    {getNotes}
                    <NewNoteTemplate 
                        addingNew={this.state.addingNew}
                        submitNewNote={this.submitNewNote}
                    />
                    {/* <div className="column is-3 has-text-centered">
                        <a className="button is-large is-danger is-outlined" onClick={this.doSomething}>Add</a>
                    </div> */}
               </div>
            </section>
        );
    }
};

export {UserPage};