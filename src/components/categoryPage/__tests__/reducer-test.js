import { initCategoryPage, categoryPageReducer } from '../reducer';

it('init test', () => {
  expect(initCategoryPage({
    initItems: [{
      attribute_1: 1,
    }, {
      children: [{
        attribute_1: 1,
        attribute_2: 1,
      }],
    }],
    initAttributes: [{
      id: 'attribute_1',
      options: [{ id: 1 }],
      visibility: ['filters'],
    }, {
      id: 'attribute_2',
      options: [{ id: 1 }],
      visibility: ['filters'],
    }, {
      id: 'attribute_3',
      options: [{ id: 1 }],
      visibility: ['filters'],
    }],
  })).toEqual({
    items: [{
      attribute_1: 1,
      display: true,
    }, {
      children: [{
        attribute_1: 1,
        attribute_2: 1,
      }],
      display: true,
    }],
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, checked: false, count: 2 }],
      visibility: ['filters'],
    }, {
      id: 'attribute_2',
      options: [{ id: 1, checked: false, count: 1 }],
      visibility: ['filters'],
    }, {
      id: 'attribute_3',
      options: [],
      visibility: ['filters'],
    }],
  });
});

it('reducer test one checked', () => {
  expect(categoryPageReducer({
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, count: 1, checked: false }, { id: 2, count: 1, checked: false }],
    }],
    items: [{
      attribute_1: 1,
    }, {
      children: [{
        attribute_1: 2,
      }],
    }],
  }, { value: 1, checked: true, attributeId: 'attribute_1' })).toEqual({
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, count: 1, checked: true }, { id: 2, count: 1, checked: false }],
    }],
    items: [{
      attribute_1: 1,
      display: true,
    }, {
      children: [{
        attribute_1: 2,
      }],
      display: false,
    }],
  });
});

it('reducer test second checked', () => {
  expect(categoryPageReducer({
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, count: 2, checked: true }, { id: 2, count: 1, checked: false }],
    }, {
      id: 'attribute_2',
      options: [{ id: 1, count: 1, checked: false }, { id: 2, count: 1, checked: false }],
    }, {
      id: 'attribute_3',
      options: [{ id: 1, count: 2, checked: false }, { id: 2, count: 0, checked: false }],
    }],
    items: [{
      children: [{
        attribute_1: 1,
        attribute_2: 2,
        attribute_3: 1,
      }],
      display: true,
    }, {
      attribute_1: 1,
      attribute_2: 1,
      attribute_3: 1,
      display: true,
    }, {
      attribute_1: 2,
      attribute_2: 1,
      attribute_3: 2,
      display: false,
    }],
  }, { value: 1, checked: true, attributeId: 'attribute_2' })).toEqual({
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, count: 1, checked: true }, { id: 2, count: 1, checked: false }],
    }, {
      id: 'attribute_2',
      options: [{ id: 1, count: 1, checked: true }, { id: 2, count: 1, checked: false }],
    }, {
      id: 'attribute_3',
      options: [{ id: 1, count: 1, checked: false }, { id: 2, count: 0, checked: false }],
    }],
    items: [{
      children: [{
        attribute_1: 1,
        attribute_2: 2,
        attribute_3: 1,
      }],
      display: false,
    }, {
      attribute_1: 1,
      attribute_2: 1,
      attribute_3: 1,
      display: true,
    }, {
      attribute_1: 2,
      attribute_2: 1,
      attribute_3: 2,
      display: false,
    }],
  });
});

it('reducer test second checked with first uncheck', () => {
  expect(categoryPageReducer({
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, count: 1, checked: true }, { id: 2, count: 1, checked: true }],
    }, {
      id: 'attribute_2',
      options: [{ id: 1, count: 1, checked: false }, { id: 2, count: 1, checked: false }],
    }],
    items: [{
      attribute_1: 1,
      attribute_2: 2,
      display: true,
    }, {
      children: [{
        attribute_1: 2,
        attribute_2: 1,
      }],
      display: true,
    }],
  }, { value: 1, checked: true, attributeId: 'attribute_2' })).toEqual({
    attributes: [{
      id: 'attribute_1',
      options: [{ id: 1, count: 0, checked: false }, { id: 2, count: 1, checked: true }],
    }, {
      id: 'attribute_2',
      options: [{ id: 1, count: 1, checked: true }, { id: 2, count: 1, checked: false }],
    }],
    items: [{
      attribute_1: 1,
      attribute_2: 2,
      display: false,
    }, {
      children: [{
        attribute_1: 2,
        attribute_2: 1,
      }],
      display: true,
    }],
  });
});
