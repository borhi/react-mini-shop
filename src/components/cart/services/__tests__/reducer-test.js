import cart from '../reducer';
import * as types from '../actionTypes';

it('add to cart test', () => {
  expect(cart({
    items: [],
    totalQty: 0,
    totalPrice: 0,
  }, {
    type: types.CART_ADD,
    item: { id: 1, price: 10, children: [{ id: 1 }] },
  })).toEqual({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  });
});

it('add to cart test second item', () => {
  expect(cart({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  }, {
    type: types.CART_ADD,
    item: { id: 1, price: 10, children: [{ id: 1 }] },
  })).toEqual({
    items: [{
      id: 1, qty: 2, price: 10, children: [{ id: 1, qty: 2 }],
    }],
    totalQty: 2,
    totalPrice: 20,
  });
});

it('add to cart test second item with new child', () => {
  expect(cart({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  }, {
    type: types.CART_ADD,
    item: { id: 1, price: 10, children: [{ id: 2 }] },
  })).toEqual({
    items: [{
      id: 1, qty: 2, price: 10, children: [{ id: 1, qty: 1 }, { id: 2, qty: 1 }],
    }],
    totalQty: 2,
    totalPrice: 20,
  });
});

it('cart delete', () => {
  expect(cart({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  }, {
    type: types.CART_DELETE,
    itemId: 1,
  })).toEqual({
    items: [],
    totalQty: 0,
    totalPrice: 0,
  });
});

it('cart delete child', () => {
  expect(cart({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  }, {
    type: types.CART_DELETE,
    itemId: 1,
    childId: 1,
  })).toEqual({
    items: [],
    totalQty: 0,
    totalPrice: 0,
  });
});

it('cart delete not exist item', () => {
  expect(cart({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  }, {
    type: types.CART_DELETE,
    itemId: 2,
  })).toEqual({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  });
});

it('cart increase qty', () => {
  expect(cart({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  }, {
    type: types.CART_INCREASE_QTY,
    itemId: 1,
    childId: 1,
    qty: 1,
  })).toEqual({
    items: [{
      id: 1, qty: 2, price: 10, children: [{ id: 1, qty: 2 }],
    }],
    totalQty: 2,
    totalPrice: 20,
  });
});

it('cart increase qty not exist item', () => {
  expect(cart({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  }, {
    type: types.CART_INCREASE_QTY,
    itemId: 2,
    qty: 1,
  })).toEqual({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  });
});

it('cart decrease qty', () => {
  expect(cart({
    items: [{
      id: 1, qty: 2, price: 10, children: [{ id: 1, qty: 2 }],
    }],
    totalQty: 2,
    totalPrice: 20,
  }, {
    type: types.CART_DECREASE_QTY,
    itemId: 1,
    childId: 1,
    qty: 1,
  })).toEqual({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  });
});

it('cart decrease qty not exist item', () => {
  expect(cart({
    items: [{
      id: 1, qty: 2, price: 10, children: [{ id: 1, qty: 2 }],
    }],
    totalQty: 2,
    totalPrice: 20,
  }, {
    type: types.CART_DECREASE_QTY,
    itemId: 2,
    qty: 1,
  })).toEqual({
    items: [{
      id: 1, qty: 2, price: 10, children: [{ id: 1, qty: 2 }],
    }],
    totalQty: 2,
    totalPrice: 20,
  });
});

it('cart decrease qty not exist child', () => {
  expect(cart({
    items: [{
      id: 1, qty: 2, price: 10, children: [{ id: 1, qty: 2 }],
    }],
    totalQty: 2,
    totalPrice: 20,
  }, {
    type: types.CART_DECREASE_QTY,
    itemId: 1,
    childId: 2,
    qty: 1,
  })).toEqual({
    items: [{
      id: 1, qty: 2, price: 10, children: [{ id: 1, qty: 2 }],
    }],
    totalQty: 2,
    totalPrice: 20,
  });
});

it('empty cart', () => {
  expect(cart({
    items: [{
      id: 1, qty: 1, price: 10, children: [{ id: 1, qty: 1 }],
    }],
    totalQty: 1,
    totalPrice: 10,
  }, {
    type: types.CART_EMPTY,
  })).toEqual({
    items: [],
    totalQty: 0,
    totalPrice: 0,
  });
});

it('default', () => {
  expect(cart({
    items: [],
    totalQty: 0,
    totalPrice: 0,
  }, {
    type: 'not_exist',
  })).toEqual({
    items: [],
    totalQty: 0,
    totalPrice: 0,
  });
});
