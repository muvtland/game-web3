import React, { useRef, useEffect } from 'react';
import './style.css'; // Создайте файл ImageSequence.css для стилей
const ImageSequence = ({ basePath = '/ImageSequence/assets/homer-', numFrames }) => {
    const containerRef = useRef();

    useEffect(() => {
        const container = containerRef.current;
        let currentFrame = 1;
        // console.log(`url(${basePath}${currentFrame}.jpg)`)
        // console.log(basePath)
        const updateFrame = () => {
            container.style.backgroundImage = `url(${basePath}${currentFrame}.png)`;
            if (currentFrame === 10){
                currentFrame =  1;
            }else {
                currentFrame =  currentFrame + 1;
            }
        };

        const intervalId = setInterval(updateFrame, 100); // Задайте интервал смены кадров

        return () => clearInterval(intervalId); // Очистите интервал при размонтировании компонента
    }, [basePath, numFrames]);

    return <div ref={containerRef} className="image-sequence" style={{display: "flex" }}/>;
};

export default ImageSequence;
