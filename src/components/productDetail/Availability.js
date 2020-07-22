import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DataContext } from '@/providers/DataProvider';

const visibility = 'availability';

const Availability = ({ item }) => {
  const { attributes } = useContext(DataContext);
  const [state, setState] = useState({ availabilityAttributes: [] });
  useEffect(() => {
    const availabilityAttributes = attributes
      .filter((attribute) => attribute.visibility.includes(visibility));
    setState({ availabilityAttributes });
  }, [attributes]);

  let availability;
  if (state.availabilityAttributes.length) {
    const availabilityAttribute = state.availabilityAttributes[0];
    const options = availabilityAttribute.options.filter((option) => {
      if (item.children) {
        return item.children
          .find((child) => child[availabilityAttribute.id] === option.id);
      }

      return item[availabilityAttribute.id] === option.id;
    });
    availability = options[0] ? options[0] : '';
  }

  return (
    <>
      {availability && (
        <Box color={availability.id > 1 ? 'error.main' : 'success.main'} component="span">
          <Typography component="span" variant="body2">{availability.label}</Typography>
        </Box>
      )}
    </>
  );
};

Availability.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })),
  }).isRequired,
};

export default Availability;
