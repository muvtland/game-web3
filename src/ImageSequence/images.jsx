import React from 'react';
import ImageAnimation from './ImageAnimation';

const Images = () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Подставьте свои изображения

    return (
        <div>
            <h1>Анимация изображений</h1>
            <ImageAnimation images={images} />
        </div>
    );
};
