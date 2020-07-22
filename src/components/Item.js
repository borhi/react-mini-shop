import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';

const Item = ({ item }) => (
  <Grid item xs={6} sm={4}>
    <Link component={RouterLink} to={`${item.url}`}>
      <Image src={item.img[0]} />
    </Link>
  </Grid>
);

export default Item;

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
