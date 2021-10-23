//import { Component } from "react/cjs/react.production.min";
import React, { Component } from 'react';

class NewPhoto extends Component{
    constructor() {
        super();
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        const link = event.target.elements.link.value;
        const description = event.target.elements.description.value;
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
                        <input type="text" placeholder="Link" name="link"/>
                        <input  type="text" placeholder="Description" name="description"/>
                        <button>Post</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewPhoto;