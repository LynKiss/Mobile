import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface cho sách từ API
export interface Book {
  ma_sach: string;
  tieu_de: string;
  tac_gia: string;
  ma_the_loai?: string;
  ma_nxb?: string;
  nam_xuat_ban?: string;
  hinh_bia?: string;
  mo_ta?: string;
  so_luong: number;
  ISBN?: string;
  gia_tri?: string;
  ma_khu_vuc?: string;
  ma_ngon_ngu?: string;
  so_trang?: number;
  tags?: string[];
}

// Interface cho sách trong giỏ hàng
export interface CartItem {
  id: string; // id duy nhất trong giỏ
  bookId: string;
  book: Book;
  quantity: number;
  addedDate: string;
}

// Interface cho thông tin mượn
export interface BorrowInfo {
  expectedBorrowDate: string;
  notes: string;
}

// Interface cho BookContext
interface BookContextType {
  cartItems: CartItem[];
  borrowInfo: BorrowInfo;
  addToCart: (book: Book, quantity?: number) => Promise<boolean>;
  removeFromCart: (cartItemId: string) => Promise<boolean>;
  updateCartItemQuantity: (
    cartItemId: string,
    quantity: number
  ) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  isBookInCart: (bookId: string) => boolean;
  getCartItem: (bookId: string) => CartItem | null;
  getCartTotalItems: () => number;
  updateBorrowInfo: (borrowInfo: Partial<BorrowInfo>) => Promise<boolean>;
}

const BookContext = createContext<BookContextType>({
  cartItems: [],
  borrowInfo: { expectedBorrowDate: "", notes: "" },
  addToCart: async () => false,
  removeFromCart: async () => false,
  updateCartItemQuantity: async () => false,
  clearCart: async () => false,
  isBookInCart: () => false,
  getCartItem: () => null,
  getCartTotalItems: () => 0,
  updateBorrowInfo: async () => false,
});

export const useBooks = () => useContext(BookContext);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [borrowInfo, setBorrowInfo] = useState<BorrowInfo>({
    expectedBorrowDate: "",
    notes: "",
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem("cartItems");
      if (data) {
        setCartItems(JSON.parse(data));
      }
    } catch (e) {
      console.error("Error loading cart:", e);
    }
  };

  // ✅ Thêm vào giỏ
  const addToCart = async (
    book: Book,
    quantity: number = 1
  ): Promise<boolean> => {
    try {
      const existingItem = cartItems.find(
        (item) => item.bookId === book.ma_sach
      );
      let newCartItems: CartItem[];

      if (existingItem) {
        newCartItems = cartItems.map((item) =>
          item.bookId === book.ma_sach
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: Date.now().toString(),
          bookId: book.ma_sach,
          book,
          quantity,
          addedDate: new Date().toISOString(),
        };
        newCartItems = [...cartItems, newItem];
      }

      setCartItems(newCartItems);
      await AsyncStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return true;
    } catch (e) {
      console.error("Error addToCart:", e);
      return false;
    }
  };

  // ✅ Xóa 1 item khỏi giỏ
  const removeFromCart = async (cartItemId: string): Promise<boolean> => {
    try {
      const newCartItems = cartItems.filter((item) => item.id !== cartItemId);
      setCartItems(newCartItems);
      await AsyncStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return true;
    } catch (e) {
      console.error("Error removeFromCart:", e);
      return false;
    }
  };

  // ✅ Cập nhật số lượng
  const updateCartItemQuantity = async (
    cartItemId: string,
    quantity: number
  ): Promise<boolean> => {
    try {
      const newCartItems = cartItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      );
      setCartItems(newCartItems);
      await AsyncStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return true;
    } catch (e) {
      console.error("Error updateCartItemQuantity:", e);
      return false;
    }
  };

  // ✅ Xóa toàn bộ giỏ
  const clearCart = async (): Promise<boolean> => {
    try {
      setCartItems([]);
      await AsyncStorage.removeItem("cartItems");
      return true;
    } catch (e) {
      console.error("Error clearCart:", e);
      return false;
    }
  };

  // Kiểm tra sách có trong giỏ không
  const isBookInCart = (bookId: string): boolean => {
    return cartItems.some((item) => item.bookId === bookId);
  };

  // Lấy thông tin item trong giỏ
  const getCartItem = (bookId: string): CartItem | null => {
    return cartItems.find((item) => item.bookId === bookId) || null;
  };

  // Tổng số lượng sách trong giỏ
  const getCartTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const updateBorrowInfo = async (
    borrowInfoUpdate: Partial<BorrowInfo>
  ): Promise<boolean> => {
    try {
      setBorrowInfo((prev) => ({ ...prev, ...borrowInfoUpdate }));
      return true;
    } catch (e) {
      console.error("Error updateBorrowInfo:", e);
      return false;
    }
  };

  return (
    <BookContext.Provider
      value={{
        cartItems,
        borrowInfo,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        isBookInCart,
        getCartItem,
        getCartTotalItems,
        updateBorrowInfo,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
