'use client';

import { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import { books } from '@/data/books';

const STORAGE_KEY = 'favoriteBooks';

export default function FavoriteBooks() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // 初期化
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setFavoriteIds(JSON.parse(saved));
    }
  }, []);

  // お気に入りをトグル
  const toggleFavorite = (id: number) => {
    const updated = favoriteIds.includes(id)
      ? favoriteIds.filter(fid => fid !== id)
      : [...favoriteIds, id];
    setFavoriteIds(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const favoriteBooks = books.filter(b => favoriteIds.includes(b.id));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">❤️ お気に入り一覧</h2>
      {favoriteBooks.length === 0 ? (
        <p className="text-gray-600">まだお気に入りはありません。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteBooks.map(book => (
            <BookCard
              key={book.id}
              {...book}
              isFavorite={favoriteIds.includes(book.id)}
              onToggleFavorite={() => toggleFavorite(book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}