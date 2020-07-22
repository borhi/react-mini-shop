import * as types from '@/components/cart/services/actionTypes';

export const addToCart = (item) => ({
  type: types.CART_ADD,
  item,
});

export const itemIncreaseQty = (itemId, qty, childId) => ({
  type: types.CART_INCREASE_QTY,
  itemId,
  qty,
  childId,
});

export const itemDecreaseQty = (itemId, qty, childId) => ({
  type: types.CART_DECREASE_QTY,
  itemId,
  qty,
  childId,
});

export const itemDelete = (itemId, childId) => ({
  type: types.CART_DELETE,
  itemId,
  childId,
});

export const emptyCart = () => ({
  type: types.CART_EMPTY,
});
