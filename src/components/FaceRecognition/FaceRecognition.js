import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {

    const face_boxes = boxes.map((box, i) => {
        return <div className="bounding-box"
                    id={i}
                    key={i}
                    style={{top: box.top_row, 
                            right: box.right_col, 
                            bottom: box.bottom_row,
                            left: box.left_col}}>
                </div>
    })

    return (
        <div className="center ma2">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
                {face_boxes}
            </div>
        </div>
    );
}

export default FaceRecognition;