import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

export default function EditPhoto(props) {
    //'useLocation' is similar to a state which returns the current URL
    const { search } = useLocation();
    //This parses it into an object. Then we can get the query strings (e.g. params.id)
    const params = queryString.parse(search);

    //#region editPost = props.posts.filter...
    //const postToEdit = props.posts.filter((post) =>
    //    //'toString()' due to 'id' being a string
    //    post.photoId.toString() === params.id
    //);
    ///*You should use 'toString()' so it works in 'console.log'*/uselocation 
    ////console.log(props.posts[0].photoId.toString());
    //#endregion

    //'useState' is a Hook that lets you add React state to function components.
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    // Similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.
    useEffect(() => {
        console.log('Went into useEffect');

        /*It fetches the latest record at the begining, because the user info
          could be outdated (e.g. user was browsing on the main page for some time*/
        axios.get(props.environment + params.id)
            .then((json) => {
                setLink(json.data.imageLink);
                setDescription(json.data.description);
            })
            .catch(function (error) {
                //This catch is exectuded in case of 404 status code
                console.log(error);
            });
        
    }, [params.id, props.environment]); //Only re-run 'useEffect' IF one of these 2 change

    const handleSubmit = (event) => {
        //Prevents the page reload, which would erase the error message
        event.preventDefault();

        if (link.trim() === '' ||
            description.trim() === '')
        {
            setError('Please, enter a Link\\Description');

            return false;
        }

        /*This is how you get the value outside a specific input*/
        //...= event.target.elements.link.value;

        const postEditted = {
            photoId: params.id,
            imageLink: link,
            description: description,
            timestamp: new Date()
        }

        props.onEditPhoto(postEditted);
    };

    return (
        <div>
            <h1>Photogallery</h1>
            <h2>(Edit)</h2>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="text"
                           placeholder="Link"
                           name="link" 
                           value={link}
                           //Since it's inside a specific input, it can get the value directly
                           onChange={(event) => setLink(event.target.value)}
                    />

                    <input type="text"
                           placeholder="Description" 
                           name="description" 
                           maxLength="20"
                           value={description}
                           onChange={(event) => setDescription(event.target.value)}
                    />

                    {/* Since color uses colon ':' which is a reserved word from JS,
                      * you should use two braces '{' to indicate it's HTML in fact 
                      * (The reason is that one brace indicates it's JS)
                      */}
                    <span style={{ color: "red" }}>{error}</span>
                    <br />
                    <br />
                    <button>Post</button>
                </form>
            </div>
        </div>
    );
}