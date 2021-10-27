//import { Component } from "react/cjs/react.production.min";
import React, { Component } from 'react';

class NewPhoto extends Component{
    constructor() {
        super();

        this.state = {
            error : ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        //Prevents the page reload, which would erase the error message
        event.preventDefault();
        
        const link = event.target.elements.link.value;
        const description = event.target.elements.description.value;

        if (link.trim() === '' ||
            description.trim() === '')
        {
            this.setState({
                error: 'Please, enter a Link\\Description'
            });
            
            return false;
        }

        const newPost = {
            id: Number(new Date()),
            description: description,
            imageLink: link
        }

        if (link && description){
            this.props.onNewPhoto(newPost);
        }
    }
    
    render (){
        return (
            <div>
                <h1>Photogallery</h1>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Link" name="link" />
                        <input type="text" placeholder="Description" name="description" maxLength="20" />
                        {/* Since color uses colon ':' which is a reserved word from JS,
                          * you should use two braces '{' to indicate it's HTML in fact 
                          * (The reason is that one brace indicates it's JS)
                          */}
                        <span style={{ color: "red" }}>{this.state.error}</span>
                        <br />
                        <br />
                        <button>Post</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewPhoto;