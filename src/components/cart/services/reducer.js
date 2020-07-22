import {
  CART_ADD,
  CART_DELETE,
  CART_INCREASE_QTY,
  CART_DECREASE_QTY,
  CART_EMPTY,
} from '@/components/cart/services/actionTypes';

const initialState = {
  items: [],
  totalQty: 0,
  totalPrice: 0,
};

const calculateTotals = (items) => {
  let totalQty = 0;
  let totalPrice = 0;

  items.forEach((item) => {
    totalQty += item.qty;
    if (item.price) {
      totalPrice += item.price * item.qty;
    }
  });

  return { totalQty, totalPrice };
};

const cart = (state = initialState, action) => {
  const { items } = state;
  switch (action.type) {
    case CART_ADD: {
      let productAlreadyInCart = false;
      const item = items.find((item) => item.id === action.item.id);
      if (item) {
        item.qty += 1;
        if (item.children) {
          const child = item.children.find((child) => child.id === action.item.children[0].id);
          if (child) {
            child.qty += 1;
          } else {
            item.children.push({ ...action.item.children[0], ...{ qty: 1 } });
          }
        }

        productAlreadyInCart = true;
      }

      if (!productAlreadyInCart) {
        const newItem = action.item;
        if (newItem.children) {
          newItem.children[0].qty = 1;
        }
        items.push({ ...newItem, ...{ qty: 1 } });
      }

      return { ...state, items, ...calculateTotals(items) };
    }
    case CART_DELETE: {
      const item = items.find((item) => item.id === action.itemId);
      if (!item) {
        return state;
      }

      if (action.childId) {
        const child = item.children.find((child) => child.id === action.childId);
        item.children.splice(item.children.indexOf(child), 1);
        item.qty -= child.qty;
        if (item.qty <= 0) {
          items.splice(items.indexOf(item), 1);
        }
      } else {
        items.splice(items.indexOf(item), 1);
      }

      return { ...state, items, ...calculateTotals(items) };
    }
    case CART_INCREASE_QTY: {
      const item = items.find((item) => item.id === action.itemId);
      if (!item) {
        return state;
      }
      item.qty += action.qty;

      if (action.childId) {
        const child = item.children.find((child) => child.id === action.childId);
        if (child) {
          child.qty += action.qty;
        }
      }

      return { ...state, items, ...calculateTotals(items) };
    }
    case CART_DECREASE_QTY: {
      const item = items.find((item) => item.id === action.itemId);
      if (!item || item.qty - action.qty <= 0) {
        return state;
      }

      if (action.childId) {
        const child = item.children.find((child) => child.id === action.childId);
        if (!child || child.qty - action.qty <= 0) {
          return state;
        }

        child.qty -= action.qty;
      }
      item.qty -= action.qty;

      return { ...state, items, ...calculateTotals(items) };
    }
    case CART_EMPTY:
      return {
        items: [],
        totalQty: 0,
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export default cart;
