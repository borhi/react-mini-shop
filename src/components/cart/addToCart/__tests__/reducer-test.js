import { initAddToCart, addToCartReducer } from '../reducer';

it('init test', () => {
  expect(initAddToCart({
    initItem: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
        }
      }],
    },
    initAttributes: [{
      id: 'attribute_1',
      options: [{ id: 1 }],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 1 }],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [{ id: 1 }],
      visibility: ['addtocart'],
    }],
  })).toEqual({
    item: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
        }
      }],
    },
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, count: 1 }],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 1, count: 1 }],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [],
      visibility: ['addtocart'],
    }],
    cartItem: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
        }
      }],
    },
    selectedAttributes: [],
  })
});

it('init test without children', () => {
  expect(initAddToCart({
    initItem: {
      attributes: {
        attribute_1: 1,
        attribute_2: 1,
      }
    },
    initAttributes: [{
      id: 'attribute_1',
      options: [{ id: 1 }],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 1 }],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [{ id: 1 }],
      visibility: ['addtocart'],
    }],
  })).toEqual({
    item: {
      attributes: {
        attribute_1: 1,
        attribute_2: 1,
      }
    },
    attributes: [{
      id: 'attribute_1',
      options: [],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [],
      visibility: ['addtocart'],
    }],
    cartItem: {
      attributes: {
        attribute_1: 1,
        attribute_2: 1,
      }
    },
    selectedAttributes: [],
  })
});

it('reducer test one checked', () => {
  expect(addToCartReducer({
    item: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 2,
          attribute_2: 2,
          attribute_3: 2,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, count: 2, id: 2, count: 1 }],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 1, count: 1, id: 2, count: 2 }],
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [{ id: 1, count: 2, id: 2, count: 1 }],
      visibility: ['addtocart'],
    }],
    cartItem: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 2,
          attribute_2: 2,
          attribute_3: 2,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    selectedAttributes: [],
  }, {attributeId: "attribute_1", value: 1})).toEqual({
    item: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 2,
          attribute_2: 2,
          attribute_3: 2,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 2, count: 1 }],
      value: 1,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 2, count: 1 }],
      value: null,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [{ id: 2, count: 0 }],
      value: null,
      visibility: ['addtocart'],
    }],
    cartItem: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    selectedAttributes: [{ id: "attribute_1", value: 1 }],
  });
});

it('reducer test second checked', () => {
  expect(addToCartReducer({
    item: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 2,
          attribute_2: 2,
          attribute_3: 2,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 2, count: 1 }],
      value: 1,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 2, count: 1 }],
      value: null,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [{ id: 2, count: 0 }],
      value: null,
      visibility: ['addtocart'],
    }],
    cartItem: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    selectedAttributes: [{ id: "attribute_1", value: 1 }],
  }, { attributeId: "attribute_2", value: 1 })).toEqual({
    item: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 2,
          attribute_2: 2,
          attribute_3: 2,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 2, count: 1 }],
      value: 1,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 2, count: 1 }],
      value: 1,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [{ id: 2, count: 0 }],
      value: null,
      visibility: ['addtocart'],
    }],
    cartItem: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }],
    },
    selectedAttributes: [{ id: "attribute_1", value: 1 }, { id: "attribute_2", value: 1 }],
  });
});

it('reducer test first rechecked', () => {
  expect(addToCartReducer({
    item: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 2,
          attribute_2: 2,
          attribute_3: 2,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 2, count: 1 }],
      value: 1,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 2, count: 1 }],
      value: null,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [{ id: 2, count: 0 }],
      value: null,
      visibility: ['addtocart'],
    }],
    cartItem: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }],
    },
    selectedAttributes: [{ id: "attribute_1", value: 1 }, { id: "attribute_2", value: 1 }],
  }, { attributeId: "attribute_1", value: 2 })).toEqual({
    item: {
      children: [{
        attributes: {
          attribute_1: 1,
          attribute_2: 1,
          attribute_3: 1,
        }
      }, {
        attributes: {
          attribute_1: 2,
          attribute_2: 2,
          attribute_3: 2,
        }
      }, {
        attributes: {
          attribute_1: 1,
          attribute_2: 2,
          attribute_3: 1,
        }
      }],
    },
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 2, count: 1 }],
      value: 2,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_2',
      options: [{ id: 2, count: 1 }],
      value: null,
      visibility: ['addtocart'],
    }, {
      id: 'attribute_3',
      options: [{ id: 2, count: 1 }],
      value: null,
      visibility: ['addtocart'],
    }],
    cartItem: {
      children: [{
        attributes: {
          attribute_1: 2,
          attribute_2: 2,
          attribute_3: 2,
        }
      }],
    },
    selectedAttributes: [{ id: "attribute_1", value: 2 }],
  });
});