import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f3">
                This magic brain will detect faces in your pictures. Try it now!
            </p>
            <div className="form center pa4 br3 shadow-5 w-60">
                <input 
                    type="text" 
                    className="f4 pa2 w-80 center"
                    onChange={onInputChange}>
                </input>
                <button 
                    className="w-20 grow f4 link ph3 pv2 dib white bg-light-purple"
                    onClick={onButtonSubmit}>
                        Go
                </button>
            </div>
        </div>
    )
}

export default ImageLinkForm;