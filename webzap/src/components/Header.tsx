import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
            🔱ブックコレクション🔱
          </Link>
          
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              📚 書籍一覧
            </Link>
            <Link href="/favorite" className="hover:text-gray-300 transition-colors">
              ❤️ お気に入り
            </Link>
            <Link href="/add" className="hover:text-gray-300 transition-colors">
              ➕ 新規追加
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
