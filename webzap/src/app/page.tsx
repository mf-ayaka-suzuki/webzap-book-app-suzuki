'use client';

import React, { useEffect, useMemo, useState } from 'react';
import BookCard from '@/components/BookCard';
import { books } from '@/data/books';

const STORAGE_KEY = 'favoriteBooks';
const CUSTOM_BOOKS_KEY = 'customBooks';

export default function Home() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [customBooks, setCustomBooks] = useState<Array<{ title: string; author: string; rating: number; id: number }>>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'none' | 'rating-asc' | 'rating-desc'>('none');

  // 初期化
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setFavoriteIds(JSON.parse(saved));
    }
    const savedCustom = localStorage.getItem(CUSTOM_BOOKS_KEY);
    if (savedCustom) {
      setCustomBooks(JSON.parse(savedCustom));
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

  // フィルタリングとソート処理
  const filteredAndSortedBooks = useMemo(() => {
    let allBooks = [...books, ...customBooks];
    
    // お気に入りフィルタリング
    if (showFavoritesOnly) {
      allBooks = allBooks.filter(book => favoriteIds.includes(book.id));
    }
    
    // ソート処理
    if (sortBy === 'rating-asc') {
      allBooks = [...allBooks].sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'rating-desc') {
      allBooks = [...allBooks].sort((a, b) => b.rating - a.rating);
    }
    
    return allBooks;
  }, [books, customBooks, favoriteIds, showFavoritesOnly, sortBy]);

  return (
    <div>
      {/* フィルターとソートコントロール */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* お気に入りフィルター */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">お気に入りのみ表示</span>
          </label>
          
          {/* ソート選択 */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">並び順:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'none' | 'rating-asc' | 'rating-desc')}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="none">デフォルト</option>
              <option value="rating-desc">評価高い順</option>
              <option value="rating-asc">評価低い順</option>
            </select>
          </div>
        </div>
      </div>

      {/* 書籍一覧 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filteredAndSortedBooks.map((book) => (
          <BookCard 
            key={book.id} 
            {...book}
            isFavorite={favoriteIds.includes(book.id)}
            onToggleFavorite={() => toggleFavorite(book.id)}
          />
        ))}
      </div>
      
      {/* 結果が0件の場合のメッセージ */}
      {filteredAndSortedBooks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {showFavoritesOnly ? 'お気に入りの書籍がありません' : '書籍が見つかりません'}
        </div>
      )}
    </div>
  );
}
