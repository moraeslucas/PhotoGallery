import React from 'react';
import PropTypes from "prop-types";

function Photo(props) {
        const photo = props.photo;

        return (
                <figure className="figure">
                    <img className="photo" src={photo.imageLink} alt={photo.description} />
                    <figcaption>
                        <p>{photo.description}</p>
                    </figcaption>
                    <div className= "button-container">
                    <button onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this photo?'))
                                props.onDeletePhoto(photo)
                        }
                    }>
                            Delete
                        </button>
                    </div>
                </figure>
        );
}

Photo.propTypes = {
    photo: PropTypes.object.isRequired,
    onDeletePhoto: PropTypes.func.isRequired
}

export default Photo;