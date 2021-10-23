import React from 'react';
import Photo from "./Photo";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

function Photogallery(props){
    return (
        <div>
            {/* <button className="addIcon" onClick={props.onNavigation}></button> */}
            <Link className="addIcon" to="/NewPhoto" />
            <div className="photo-grid">
                {/* This sorts the array in descending order */}
                {props.posts
                    .sort((a, b) => b.id - a.id)
                    .map((post) => <Photo key = {post.id}
                                                 photo = {post}
                                                 onDeletePhoto = {props.onDeletePhoto} />)}
            </div>
        </div>
    );
}

//To validade this component receive the correct data type
Photogallery.propTypes = {
    posts: PropTypes.array.isRequired,
    onDeletePhoto: PropTypes.func.isRequired
}

export default Photogallery;