import React from 'react';
import { SequenceAnimator } from 'react-sequence-animator';
import { images } from "./import-all-images.js";
import './style.css';
import { useImagePreloader } from "./hooks/useImagePreloader.js";
import Loading from "../interface/Loading.jsx";
import useWindowSize from "./hooks/useWindowSize.js";
const ImageSequence = () => {
    const { imagesPreloaded } = useImagePreloader(images);
    const windowSize = useWindowSize();
    if (!imagesPreloaded){
        return <Loading type="loading" />
    }

    return (
        <div className="image-sequence">
            <SequenceAnimator autoplay={true} loop={false} duration={4000}>
                {images.map((item, index) => <img src={item} alt={`cerber-${index + 1}`} style={{width: windowSize.width > 1199 ? 600 : 400 }} />)}
            </SequenceAnimator>
        </div>

    );
};

export default ImageSequence;
