import cloneDeep from 'lodash.clonedeep';

const visibility = 'addtocart';

export const initAddToCart = ({ initItem, initAttributes }) => {
  const attributes = cloneDeep(initAttributes)
    .filter((attribute) => attribute.visibility.includes(visibility));

  attributes.forEach((attribute, index) => {
    const options = attribute.options
      .filter((option) => initItem.children && initItem.children.find(
        (child) => child[attribute.id] === option.id,
      ));

    options.forEach((option, optionIndex) => {
      options[optionIndex] = {
        ...option,
        count: initItem.children.filter((child) => child[attribute.id] === option.id).length,
      };
    });
    attributes[index].options = options;
  });
  const selectedAttributes = [];

  return {
    item: initItem,
    attributes,
    cartItem: initItem,
    selectedAttributes,
  };
};

export const addToCartReducer = (state, action) => {
  const { value, attributeId } = action;
  const { item, attributes } = state;
  let { selectedAttributes } = state;

  const selectedAttribute = selectedAttributes.find((attribute) => attribute.id === attributeId);
  if (selectedAttribute) {
    selectedAttribute.value = value;
    selectedAttributes = selectedAttributes
      .slice(0, selectedAttributes.indexOf(selectedAttribute) + 1);
  } else {
    selectedAttributes.push({ id: attributeId, value });
  }

  attributes.forEach((attribute, index) => {
    const selectedAttribute = selectedAttributes.find((option) => option.id === attribute.id);
    const selectedAttributeIndex = selectedAttributes.indexOf(selectedAttribute);
    attributes[index].value = null;
    if (selectedAttribute) {
      attributes[index].value = selectedAttribute.value;
    }

    let { children } = item;
    selectedAttributes.forEach((option, index) => {
      if (selectedAttributeIndex === -1 || index < selectedAttributeIndex) {
        children = children.filter((child) => child[option.id] === option.value);
      }
    });

    attribute.options.forEach((option, optionIndex) => {
      attributes[index].options[optionIndex] = {
        ...option,
        count: children.filter((item) => item[attribute.id] === option.id).length,
      };
    });
  });

  const cartItem = cloneDeep(item);
  if (selectedAttributes.length > 0) {
    selectedAttributes.forEach((selectedAttribute) => {
      cartItem.children = cartItem.children
        .filter((child) => child[selectedAttribute.id] === selectedAttribute.value);
    });
  }

  return {
    ...state,
    item,
    attributes,
    cartItem,
    selectedAttributes,
  };
};
