import React from 'react';
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';

function Photo(props) {
        const photo = props.photo;
        const history = useHistory();

        return (
            <figure className="figure">
                    <img className="photo" src={photo.imageLink} alt={photo.description} />

                    <figcaption>
                        <p>{photo.description}</p>
                    </figcaption>
                    
                    <div className="button-container">
                        <button className="button-edit"
                        onClick={() =>
                            /*Encodes the 2nd parameter, so characters like '+' won't be
                              decoded to '%2B' by queryString.parse (located on EditPhoto)*/
                            history.push(`/EditPhoto/?id=${photo.photoId}&row=${encodeURIComponent(photo.rowVersion)}`)
                        }>
                            Edit
                        </button>

                        <div className="divider" />
                        
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