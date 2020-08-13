import cloneDeep from 'lodash.clonedeep';

const filterOptions = (option, items, attributeId) => items.find((item) => {
  if (item.children) {
    return item.children.find((child) => child.attributes[attributeId] === option.id);
  }
  return item.attributes[attributeId] === option.id;
});

export const initCategoryPage = ({ initItems, initAttributes, category }) => {
  const items = initItems
    .filter((item) => item.catygory === category).map((item) => ({ ...item, display: true }));

  const visibility = 'filters';
  const attributes = cloneDeep(initAttributes)
    .filter((attribute) => attribute.visibility.includes(visibility));
  attributes.forEach((attribute, index) => {
    const options = attribute.options
      .filter((option) => filterOptions(option, items, attribute.id));

    options.forEach((option, optionIndex) => {
      const count = items.filter((item) => {
        if (item.children) {
          return item.children.find((child) => child.attributes[attribute.id] === option.id);
        }
        return item.attributes[attribute.id] === option.id;
      }).length;
      options[optionIndex] = { ...option, count, checked: false };
    });

    attributes[index].options = options;
  });

  return { attributes, items };
};

export const categoryPageReducer = (state, action) => {
  const { value, checked, attributeId } = action;
  const { attributes, items } = state;

  const filters = [];
  attributes.forEach((attribute, index) => {
    const filter = { id: attribute.id, values: [] };
    attribute.options.forEach((option, optionIndex) => {
      if (attribute.id === attributeId && option.id === value) {
        attributes[index].options[optionIndex].checked = checked;
      }

      if (attributes[index].options[optionIndex].checked) {
        filter.values.push(option.id);
      }
    });

    filters.push(filter);
  });

  attributes.forEach((attribute, index) => {
    if (attribute.id !== attributeId) {
      let filteredItems = cloneDeep(items);
      filters.forEach((filter) => {
        if (filter.values.length && filter.id !== attribute.id) {
          filteredItems = filteredItems.filter((item, index) => {
            if (item.children) {
              filteredItems[index].children = item.children
                .filter((child) => filter.values.includes(child.attributes[filter.id]));
              return filteredItems[index].children.length;
            }
            return filter.values.includes(item.attributes[filter.id]);
          });
        }
      });

      attribute.options.forEach((option, optionIndex) => {
        const count = filteredItems.filter((item) => {
          if (item.children) {
            return item.children.find((child) => child.attributes[attribute.id] === option.id);
          }
          return item.attributes[attribute.id] === option.id;
        }).length;

        if (!count) {
          attributes[index].options[optionIndex].checked = false;
        }

        attributes[index].options[optionIndex].count = count;
      });
    }
  });

  items.forEach((item, index) => {
    items[index].display = true;
    let children;
    if (item.children) {
      children = item.children;
    }

    filters.forEach((filter) => {
      if (!filter.values.length) {
        return;
      }

      if (children) {
        children = children.filter((child) => filter.values.includes(child.attributes[filter.id]));

        if (!children.length) {
          items[index].display = false;
        }

        return;
      }

      if (!filter.values.includes(item.attributes[filter.id])) {
        items[index].display = false;
      }
    });
  });

  return { ...state, attributes, items };
};
