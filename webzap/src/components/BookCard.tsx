'use client';

import React from "react";
import { useEffect, useState } from 'react';

interface BookProps{
  title: string;
  author: string;
  rating: number;
  id: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function BookCard({
    title, 
    author, 
    rating, 
    id,
    isFavorite = false,
    onToggleFavorite = () => {},
}:BookProps){
    const [userRating, setUserRating] = useState(0);

    return (
         <div className="border border-gray-300 rounded-lg p-4 m-4 max-w-sm">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600">著者：{author}</p>
            <p className="text-yellow-500">評価：{rating}</p>
            <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className={`text-xl ${
                            star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                >
                    ⭐
                </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
                {userRating > 0 ? `あなたの評価: ${userRating}` : '評価してください'}
            </span>
        </div>
            {/* <p className="text-gray-600">{id}</p> */}
            <div className="mt-4 space-x-2">
                <button
                    onClick={onToggleFavorite}
                    className={`mt-2 px-3 py-1 rounded ${
                        isFavorite ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    {isFavorite ? '♡ お気に入り済' : '♡ お気に入り'}
                </button>
            </div>
        </div>
        
    );
}