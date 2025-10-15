interface Book{
  title: string;
  author: string;
  rating: number;
  id: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const books : Book[] = [
    {
      title: "アリエル",
      author: "jaemin",
      rating: 4,
      id: 1,
    },
    {
      title: "フランダー",
      author: "jeno",
      rating: 5,
      id: 2,
    },
    {
      title: "セバスチャン",
      author: "haechan",
      rating: 3,
      id: 3,
    },
    {
      title: "エリック",
      author: "renjun",
      rating: 5,
      id: 4,
    },
  ];

