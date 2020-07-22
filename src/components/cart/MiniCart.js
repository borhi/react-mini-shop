import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  minicart: {
    position: 'fixed',
    top: 0,
    right: 0,
    padding: theme.spacing(3),
    zIndex: '1100',
  },
}));

const MiniCart = ({ cart }) => {
  const classes = useStyles();
  return (
    <div>
      <IconButton component={RouterLink} to="/cart" className={classes.minicart}>
        <Badge badgeContent={cart.totalQty} color="secondary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
    </div>
  );
};

MiniCart.propTypes = {
  cart: PropTypes.shape({
    totalQty: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(MiniCart);
