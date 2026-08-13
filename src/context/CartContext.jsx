import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Prevent adding if out of stock completely
      if (action.payload.stock !== undefined && action.payload.stock < 1) {
        return state;
      }
      const existing = state.items.find(
        item => item.id === action.payload.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.payload.id) {
              // Cap at available stock
              const maxStock = item.stock !== undefined ? item.stock : Infinity;
              return { ...item, quantity: Math.min(item.quantity + 1, maxStock) };
            }
            return item;
          }),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1) return state;
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
             const maxStock = item.stock !== undefined ? item.stock : Infinity;
             return { ...item, quantity: Math.min(action.payload.quantity, maxStock) };
          }
          return item;
        }),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: JSON.parse(localStorage.getItem('glamaura_cart') || '[]'),
    isOpen: false,
  });

  useEffect(() => {
    localStorage.setItem('glamaura_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
