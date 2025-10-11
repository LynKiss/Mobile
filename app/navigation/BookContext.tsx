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
  hinh_bia?: string | null;
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

// Interface cho sách yêu thích
export interface WishlistItem {
  id: string;
  ma_sach: string;
  book: Book;
  addedDate: string;
}

// Interface cho BookContext
interface BookContextType {
  cartItems: CartItem[];
  borrowInfo: BorrowInfo;
  wishlistItems: WishlistItem[];
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
  // Wishlist functions
  addToWishlist: (book: Book) => Promise<boolean>;
  removeFromWishlist: (bookId: string) => Promise<boolean>;
  isBookInWishlist: (bookId: string) => boolean;
  getWishlistItems: () => Promise<WishlistItem[]>;
  loadWishlist: () => Promise<void>;
}

const BookContext = createContext<BookContextType>({
  cartItems: [],
  borrowInfo: { expectedBorrowDate: "", notes: "" },
  wishlistItems: [],
  addToCart: async () => false,
  removeFromCart: async () => false,
  updateCartItemQuantity: async () => false,
  clearCart: async () => false,
  isBookInCart: () => false,
  getCartItem: () => null,
  getCartTotalItems: () => 0,
  updateBorrowInfo: async () => false,
  addToWishlist: async () => false,
  removeFromWishlist: async () => false,
  isBookInWishlist: () => false,
  getWishlistItems: async () => [],
  loadWishlist: async () => {},
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
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    loadCart();
    loadWishlist();
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

  const loadWishlist = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;

      const response = await fetch("http://localhost:3000/api/sach_yeu_thich", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const wishlistData = await response.json();
        console.log("Wishlist API response:", wishlistData);

        // Handle different data structures from the API
        let formattedWishlist: WishlistItem[] = [];

        if (Array.isArray(wishlistData) && wishlistData.length > 0) {
          // If it's an array of books directly
          if (wishlistData[0].ma_sach && wishlistData[0].tieu_de) {
            formattedWishlist = wishlistData.map(
              (book: any, index: number) => ({
                id: book.id ? book.id.toString() : (index + 1).toString(),
                ma_sach: book.ma_sach.toString(),
                book: {
                  ma_sach: book.ma_sach.toString(),
                  tieu_de: book.tieu_de || "",
                  tac_gia: book.tac_gia || "",
                  ma_the_loai: book.ma_the_loai,
                  ma_nxb: book.ma_nxb,
                  nam_xuat_ban: book.nam_xuat_ban,
                  hinh_bia: book.hinh_bia
                    ? `http://localhost:3000/uploads/${book.hinh_bia}`
                    : null,
                  mo_ta: book.mo_ta,
                  so_luong: book.so_luong || 0,
                  ISBN: book.ISBN,
                  gia_tri: book.gia_tri,
                  ma_khu_vuc: book.ma_khu_vuc,
                  ma_ngon_ngu: book.ma_ngon_ngu,
                  so_trang: book.so_trang,
                  tags: book.tags,
                },
                addedDate: book.ngay_them || new Date().toISOString(),
              })
            );
          }
          // If it's the expected structure with id, ma_sach, sach, created_at
          else if (wishlistData[0].id && wishlistData[0].sach) {
            formattedWishlist = wishlistData
              .filter(
                (item: any) => item && item.id && item.ma_sach && item.sach
              )
              .map((item: any) => ({
                id: item.id.toString(),
                ma_sach: item.ma_sach,
                book: item.sach,
                addedDate: item.created_at || new Date().toISOString(),
              }));
          }
        }

        console.log("Formatted wishlist:", formattedWishlist);
        setWishlistItems(formattedWishlist);
      } else {
        console.error("Failed to fetch wishlist:", response.status);
      }
    } catch (e) {
      console.error("Error loading wishlist:", e);
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

  // ✅ Thêm vào wishlist
  const addToWishlist = async (book: Book): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return false;

      const response = await fetch(`http://localhost:3000/api/sach_yeu_thich`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ma_sach: book.ma_sach,
        }),
      });

      if (response.ok) {
        await loadWishlist(); // Reload wishlist to get updated data
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error addToWishlist:", e);
      return false;
    }
  };

  // ✅ Xóa khỏi wishlist
  const removeFromWishlist = async (bookId: string): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return false;

      const response = await fetch(
        `http://localhost:3000/api/sach_yeu_thich/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await loadWishlist(); // Reload wishlist to get updated data
        return true;
      }
      return false;
    } catch (e) {
      console.error("Error removeFromWishlist:", e);
      return false;
    }
  };

  // Kiểm tra sách có trong wishlist không
  const isBookInWishlist = (bookId: string): boolean => {
    return wishlistItems.some((item) => item.ma_sach === bookId);
  };

  // Lấy danh sách wishlist
  const getWishlistItems = async (): Promise<WishlistItem[]> => {
    await loadWishlist();
    return wishlistItems;
  };

  return (
    <BookContext.Provider
      value={{
        cartItems,
        borrowInfo,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        isBookInCart,
        getCartItem,
        getCartTotalItems,
        updateBorrowInfo,
        addToWishlist,
        removeFromWishlist,
        isBookInWishlist,
        getWishlistItems,
        loadWishlist,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
