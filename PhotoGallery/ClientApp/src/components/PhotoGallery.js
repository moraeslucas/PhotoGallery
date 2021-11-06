import React from 'react';
import Photo from "./Photo";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function Photogallery(props){
    return (
        <div>
            <Link className="addIcon" to="/NewPhoto" />
            {/* <button className="addIcon" onClick={props.onNavigation}></button> */}

            <div className="photo-grid">
                {/* Example which sorts the array in descending order */}
                {props.posts
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .map((post) => <Photo key = {post.photoId}
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