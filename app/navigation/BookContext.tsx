import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface cho sách
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  year: string;
  image: any;
  description: string;
  available: boolean;
  pages: number;
  isbn: string;
  location: string;
}

// Interface cho sách đang mượn
export interface BorrowedBook {
  id: string;
  bookId: string;
  book: Book;
  borrowDate: string;
  dueDate: string;
  status: "active" | "returned" | "overdue";
  extended: boolean;
}

// Interface cho sách trong wishlist
export interface WishlistBook {
  id: string;
  bookId: string;
  book: Book;
  addedDate: string;
}

// Interface cho BookContext
interface BookContextType {
  books: Book[];
  borrowedBooks: BorrowedBook[];
  wishlistBooks: WishlistBook[];
  borrowBook: (book: Book) => Promise<boolean>;
  returnBook: (borrowId: string) => Promise<boolean>;
  extendBook: (borrowId: string) => Promise<boolean>;
  addToWishlist: (book: Book) => Promise<boolean>;
  removeFromWishlist: (bookId: string) => Promise<boolean>;
  isBookInWishlist: (bookId: string) => boolean;
  isBookBorrowed: (bookId: string) => boolean;
  getBorrowedBook: (bookId: string) => BorrowedBook | null;
}

// Context để quản lý sách và chức năng mượn/trả
const BookContext = createContext<BookContextType>({
  books: [],
  borrowedBooks: [],
  wishlistBooks: [],
  borrowBook: async () => false,
  returnBook: async () => false,
  extendBook: async () => false,
  addToWishlist: async () => false,
  removeFromWishlist: async () => false,
  isBookInWishlist: () => false,
  isBookBorrowed: () => false,
  getBorrowedBook: () => null,
});

// Hook để sử dụng BookContext
export const useBooks = () => useContext(BookContext);

// Provider component
export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<WishlistBook[]>([]);

  // Dữ liệu sách mẫu
  const sampleBooks: Book[] = [
    {
      id: "1",
      title: "React Native Cơ Bản",
      author: "Nguyễn Văn A",
      category: "Lập trình",
      publisher: "NXB Giáo dục",
      year: "2023",
      image: require("../../assets/images/adaptive-icon.png"),
      description:
        "Sách hướng dẫn cơ bản về React Native, bao gồm các khái niệm nền tảng và các ví dụ thực tế để giúp bạn xây dựng ứng dụng di động chất lượng cao.",
      available: true,
      pages: 320,
      isbn: "978-604-123-456-7",
      location: "Khu A - Tầng 2 - Kệ 15",
    },
    {
      id: "2",
      title: "Học JavaScript",
      author: "Trần Thị B",
      category: "Lập trình",
      publisher: "NXB Khoa học",
      year: "2022",
      image: require("../../assets/images/adaptive-icon.png"),
      description:
        "Cuốn sách cung cấp kiến thức toàn diện về JavaScript từ cơ bản đến nâng cao, phù hợp cho cả người mới bắt đầu và lập trình viên có kinh nghiệm.",
      available: true,
      pages: 450,
      isbn: "978-604-987-654-3",
      location: "Khu B - Tầng 1 - Kệ 8",
    },
    {
      id: "3",
      title: "Thiết Kế Giao Diện",
      author: "Lê Văn C",
      category: "Thiết kế",
      publisher: "NXB Mỹ thuật",
      year: "2023",
      image: require("../../assets/images/adaptive-icon.png"),
      description:
        "Khám phá các nguyên tắc thiết kế giao diện người dùng hiện đại, từ lý thuyết đến thực hành với các công cụ thiết kế phổ biến.",
      available: false,
      pages: 280,
      isbn: "978-604-555-789-0",
      location: "Khu C - Tầng 3 - Kệ 22",
    },
    {
      id: "4",
      title: "Toán Học Đại Cương",
      author: "Phạm Thị D",
      category: "Khoa học",
      publisher: "NXB Đại học",
      year: "2021",
      image: require("../../assets/images/adaptive-icon.png"),
      description:
        "Giáo trình toán học đại cương cho sinh viên đại học, bao gồm đại số tuyến tính, giải tích và xác suất thống kê.",
      available: true,
      pages: 520,
      isbn: "978-604-111-222-3",
      location: "Khu A - Tầng 1 - Kệ 5",
    },
  ];

  // Load dữ liệu khi component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setBooks(sampleBooks);

      // Load borrowed books
      const borrowedData = await AsyncStorage.getItem("borrowedBooks");
      if (borrowedData) {
        setBorrowedBooks(JSON.parse(borrowedData));
      }

      // Load wishlist books
      const wishlistData = await AsyncStorage.getItem("wishlistBooks");
      if (wishlistData) {
        setWishlistBooks(JSON.parse(wishlistData));
      }
    } catch (error) {
      console.error("Error loading book data:", error);
    }
  };

  // Hàm mượn sách
  const borrowBook = async (book: Book): Promise<boolean> => {
    try {
      if (!book.available) {
        return false;
      }

      const borrowDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(borrowDate.getDate() + 14); // Mượn 14 ngày

      const borrowedBook: BorrowedBook = {
        id: Date.now().toString(),
        bookId: book.id,
        book: { ...book, available: false },
        borrowDate: borrowDate.toISOString(),
        dueDate: dueDate.toISOString(),
        status: "active",
        extended: false,
      };

      const newBorrowedBooks = [...borrowedBooks, borrowedBook];
      setBorrowedBooks(newBorrowedBooks);

      // Update book availability
      const updatedBooks = books.map((b) =>
        b.id === book.id ? { ...b, available: false } : b
      );
      setBooks(updatedBooks);

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        "borrowedBooks",
        JSON.stringify(newBorrowedBooks)
      );

      return true;
    } catch (error) {
      console.error("Error borrowing book:", error);
      return false;
    }
  };

  // Hàm trả sách
  const returnBook = async (borrowId: string): Promise<boolean> => {
    try {
      const updatedBorrowedBooks = borrowedBooks.map((borrow) =>
        borrow.id === borrowId
          ? { ...borrow, status: "returned" as const }
          : borrow
      );
      setBorrowedBooks(updatedBorrowedBooks);

      // Update book availability
      const returnedBook = borrowedBooks.find((b) => b.id === borrowId);
      if (returnedBook) {
        const updatedBooks = books.map((book) =>
          book.id === returnedBook.bookId ? { ...book, available: true } : book
        );
        setBooks(updatedBooks);
      }

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        "borrowedBooks",
        JSON.stringify(updatedBorrowedBooks)
      );

      return true;
    } catch (error) {
      console.error("Error returning book:", error);
      return false;
    }
  };

  // Hàm gia hạn sách
  const extendBook = async (borrowId: string): Promise<boolean> => {
    try {
      const updatedBorrowedBooks = borrowedBooks.map((borrow) => {
        if (borrow.id === borrowId && !borrow.extended) {
          const newDueDate = new Date(borrow.dueDate);
          newDueDate.setDate(newDueDate.getDate() + 7); // Gia hạn 7 ngày

          return {
            ...borrow,
            dueDate: newDueDate.toISOString(),
            extended: true,
          };
        }
        return borrow;
      });

      setBorrowedBooks(updatedBorrowedBooks);
      await AsyncStorage.setItem(
        "borrowedBooks",
        JSON.stringify(updatedBorrowedBooks)
      );

      return true;
    } catch (error) {
      console.error("Error extending book:", error);
      return false;
    }
  };

  // Hàm thêm vào wishlist
  const addToWishlist = async (book: Book): Promise<boolean> => {
    try {
      // Check if already in wishlist
      if (wishlistBooks.some((w) => w.bookId === book.id)) {
        return false;
      }

      const wishlistBook: WishlistBook = {
        id: Date.now().toString(),
        bookId: book.id,
        book: book,
        addedDate: new Date().toISOString(),
      };

      const newWishlistBooks = [...wishlistBooks, wishlistBook];
      setWishlistBooks(newWishlistBooks);

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        "wishlistBooks",
        JSON.stringify(newWishlistBooks)
      );

      return true;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return false;
    }
  };

  // Hàm xóa khỏi wishlist
  const removeFromWishlist = async (bookId: string): Promise<boolean> => {
    try {
      const newWishlistBooks = wishlistBooks.filter((w) => w.bookId !== bookId);
      setWishlistBooks(newWishlistBooks);

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        "wishlistBooks",
        JSON.stringify(newWishlistBooks)
      );

      return true;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return false;
    }
  };

  // Hàm kiểm tra sách có trong wishlist không
  const isBookInWishlist = (bookId: string): boolean => {
    return wishlistBooks.some((w) => w.bookId === bookId);
  };

  // Hàm kiểm tra sách đang được mượn không
  const isBookBorrowed = (bookId: string): boolean => {
    return borrowedBooks.some(
      (b) => b.bookId === bookId && b.status === "active"
    );
  };

  // Hàm lấy thông tin sách đang mượn
  const getBorrowedBook = (bookId: string): BorrowedBook | null => {
    return (
      borrowedBooks.find((b) => b.bookId === bookId && b.status === "active") ||
      null
    );
  };

  return (
    <BookContext.Provider
      value={{
        books,
        borrowedBooks,
        wishlistBooks,
        borrowBook,
        returnBook,
        extendBook,
        addToWishlist,
        removeFromWishlist,
        isBookInWishlist,
        isBookBorrowed,
        getBorrowedBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
