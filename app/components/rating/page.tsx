"use client"

import React, { useEffect, useState } from 'react';
import "./rating.css";

const getRating = async () => {
    const rating = await fetch("https://9389-66-181-164-203.ngrok-free.app/api/rating", {
        method: "GET"
    });

    return rating.json();
}

export default function Rating() {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchRating = async () => {
            const fetchedRating = await getRating();

            setRating(fetchedRating.rating);
        };

        fetchRating();
    }, []);


    return (
        <div className='rating'>
            <p>Дундаж үнэлгээ: {rating} </p>
            &nbsp;
            <img src={'/img/icons8-rating-32-4.png'} alt="rating icon" />
        </div>
    )
}
