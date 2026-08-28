import React, { useState, useEffect } from 'react';
import { PageId, Book, Author } from './types';
import { BOOKS, AUTHORS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookModal } from './components/BookModal';
import { AuthorModal } from './components/AuthorModal';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { AboutPage } from './pages/AboutPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { ContactPage } from './pages/ContactPage';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAuthorById = (authorId: string) => {
    const author = AUTHORS.find((a) => a.id === authorId);
    if (author) {
      setSelectedAuthor(author);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#0F2C2C] font-sans selection:bg-[#0F2C2C] selection:text-[#FDFBF7]">
      
      {/* Global Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Render based on Current Page */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            books={BOOKS}
            authors={AUTHORS}
            onNavigate={handleNavigate}
            onOpenBookModal={(book) => setSelectedBook(book)}
            onOpenAuthorModal={(author) => setSelectedAuthor(author)}
            onFilterCategory={handleFilterCategory}
          />
        )}

        {currentPage === 'catalog' && (
          <CatalogPage
            books={BOOKS}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onOpenBookModal={(book) => setSelectedBook(book)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'authors' && (
          <AuthorsPage
            authors={AUTHORS}
            books={BOOKS}
            onNavigate={handleNavigate}
            onOpenAuthorModal={(author) => setSelectedAuthor(author)}
            onOpenBookModal={(book) => setSelectedBook(book)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onFilterCategory={handleFilterCategory}
      />

      {/* Book Details & Preview Modal */}
      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onSelectAuthor={handleSelectAuthorById}
        onShowToast={showToast}
      />

      {/* Author Details & Bio Modal */}
      <AuthorModal
        author={selectedAuthor}
        books={BOOKS}
        onClose={() => setSelectedAuthor(null)}
        onSelectBook={(book) => setSelectedBook(book)}
      />

      {/* Global Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        books={BOOKS}
        authors={AUTHORS}
        onSelectBook={(book) => {
          setSelectedBook(book);
          setIsSearchOpen(false);
        }}
        onSelectAuthor={(author) => {
          setSelectedAuthor(author);
          setIsSearchOpen(false);
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          id="global-toast"
          className="fixed bottom-6 right-6 z-50 max-w-md bg-[#0F2C2C] text-[#FDFBF7] px-4 py-3 rounded-sm shadow-2xl border border-[#D9D1C5]/30 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#D9D1C5] flex-shrink-0" />
            <span className="text-xs font-semibold text-[#FDFBF7]">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#E8E2D9] hover:text-[#FDFBF7] p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
