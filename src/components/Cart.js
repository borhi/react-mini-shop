import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import Image from 'material-ui-image';
import {
  itemDelete,
  itemIncreaseQty,
  itemDecreaseQty,
  emptyCart,
} from '@/components/cart/services/actions';
import { DataContext } from '@/providers/DataProvider';
import Availability from '@/components/productDetail/Availability';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100px',
  },
  name: {
    padding: theme.spacing(0, 0, 0, 3),
  },
  total: {
    padding: theme.spacing(0, 2),
    textAlign: 'right',
  },
  contactConteiner: {
    padding: theme.spacing(0, 2),
    margin: theme.spacing(6, 0, 0),
  },
  contact: {
    width: '100%',
  },
  actions: {
    textAlign: 'right',
    padding: theme.spacing(0, 2),
  },
  button: {
    margin: theme.spacing(3, 0, 0, 3),
  },
  price: {
    padding: theme.spacing(0, 3, 0, 0),
  },
  activeText: {
    padding: theme.spacing(3),
  },
}));

const Cart = ({
  cart,
  itemIncreaseQty,
  itemDecreaseQty,
  itemDelete,
  emptyCart,
}) => {
  const visibility = 'cart';
  const attributes = useContext(DataContext).attributes
    .filter((attribute) => attribute.visibility.includes(visibility));
  const classes = useStyles();
  const [contactMassage, setContactMassage] = useState('');
  const [formError, setFormError] = useState({});
  const [response, setResponse] = useState({
    success: false,
    error: false,
  });

  const convertCartToOrder = (cart) => {
    const order = {
      totalPrice: cart.totalPrice,
      totalQty: cart.totalQty,
      contactMassage,
      items: [],
    };
    cart.items.forEach((item) => {
      const orderItem = {
        name: item.name,
        qty: item.qty,
        price: item.price,
        attributes: '',
      };
      if (item.children) {
        item.children.forEach((child) => {
          attributes.forEach((attribute) => {
            const option = attribute.options.find((option) => option.id === child[attribute.id]);
            if (option) {
              orderItem.attributes += `${attribute.name}: ${option.label}\n`;
            }
          });
          orderItem.attributes += `Quantity: ${child.qty}\n`;
        });
      }
      order.items.push(orderItem);
    });

    return order;
  };

  const submitOrder = (event) => {
    event.preventDefault();
    const errors = {};
    if (!contactMassage.length) {
      errors.contactMassage = { status: true };
    }

    if (!Object.keys(errors).length) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (!xhr.response) {
          setResponse({ ...response, error: true });
          return;
        }

        setResponse({ ...response, [xhr.response.status]: true });
        if (xhr.response.status === 'success') {
          emptyCart();
        }
      });
      xhr.addEventListener('error', () => {
        setResponse({ ...response, error: true });
      });

      xhr.open('POST', 'api/order');
      xhr.send(JSON.stringify(convertCartToOrder(cart)));
    }

    setFormError(errors);
  };

  if (cart.items.length === 0) {
    return (
      <>
        <Typography component="span" variant="body1">Cart is empty</Typography>
        <Snackbar
          open={response.success}
          onClose={() => setResponse({ ...response, success: false })}
          autoHideDuration={3000}
        >
          <Alert severity="success">
            The order has been sent. You will be contacted soon.
          </Alert>
        </Snackbar>
      </>
    );
  }

  const items = cart.items.map((item) => {
    if (item.children) {
      return item.children.map((child) => (
        <Item
          key={child.id}
          item={item}
          itemIncreaseQty={itemIncreaseQty}
          itemDecreaseQty={itemDecreaseQty}
          itemDelete={itemDelete}
          attributes={attributes}
          child={child}
        />
      ));
    }

    return (
      <Item
        key={item.id}
        item={item}
        itemIncreaseQty={itemIncreaseQty}
        itemDecreaseQty={itemDecreaseQty}
        itemDelete={itemDelete}
        attributes={attributes}
      />
    );
  });

  return (
    <div>
      <List>
        {items}
      </List>
      {cart.totalPrice > 0
        && (
        <Box display="flex" alignItems="center" className={classes.total}>
          <Typography component="span" variant="h6">YOU WILL PAY: ₴{cart.totalPrice}</Typography>
        </Box>
        )}
      <div>
        <form onSubmit={submitOrder}>
          <div className={classes.contactConteiner}>
            <TextField
              error={formError.contactMassage ? formError.contactMassage.status : false}
              id="standard-multiline-flexible"
              label="How can I contact you?"
              multiline
              rows="4"
              rowsMax="4"
              className={classes.contact}
              value={contactMassage}
              onChange={(event) => { setContactMassage(event.target.value); }}
            />
          </div>
          <div className={classes.actions}>
            <Button className={classes.button} variant="contained" disableElevation type="submit" color="primary">Checkout</Button>
          </div>
        </form>
      </div>
      <Snackbar
        open={response.error}
        onClose={() => setResponse({ ...response, error: false })}
        autoHideDuration={3000}
      >
        <Alert severity="error">
          An error has occurred. Try a little later.
        </Alert>
      </Snackbar>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.array.isRequired,
    totalQty: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  itemIncreaseQty: PropTypes.func.isRequired,
  itemDecreaseQty: PropTypes.func.isRequired,
  itemDelete: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  itemIncreaseQty: (itemId, qty, childId) => () => dispatch(itemIncreaseQty(itemId, qty, childId)),
  itemDecreaseQty: (itemId, qty, childId) => () => dispatch(itemDecreaseQty(itemId, qty, childId)),
  itemDelete: (itemId, childId) => () => dispatch(itemDelete(itemId, childId)),
  emptyCart: () => dispatch(emptyCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const Item = ({
  item,
  itemIncreaseQty,
  itemDecreaseQty,
  itemDelete,
  attributes,
  child,
}) => {
  const classes = useStyles();
  const qty = (() => (child ? child.qty : item.qty))();
  const attributesConteiner = attributes.map((attribute) => {
    if (child) {
      const option = attribute.options.find((option) => option.id === child.attributes[attribute.id]);
      if (option) {
        return (
          <React.Fragment key={`${attribute.id}-${option.id}`}>
            <Typography component="span" variant="body2">{attribute.name}: {option.label}</Typography><br />
          </React.Fragment>
        );
      }
    }
    return '';
  });

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <div className={classes.image}>
            <Link component={RouterLink} to={`${item.url}`}>
              <Image src={item.img[0]} />
            </Link>
          </div>
        </ListItemIcon>
        <ListItemText
          className={classes.name}
          primary={<Link component={RouterLink} to={`${item.url}`}>{item.name}</Link>}
          secondary={(
            <>
              {attributesConteiner}
              <Availability key="availability" item={child || item} />
            </>
          )}
        />
        <Box display={{ xs: 'none', sm: 'block' }}>
          <ListItemSecondaryAction>
            {item.price > 0
              && <Typography className={classes.price} component="span" variant="body1">₴{item.price * qty}</Typography>}
            <IconButton aria-label="previous" onClick={itemDecreaseQty(item.id, 1, child ? child.id : null)}>
              <RemoveIcon />
            </IconButton>
            <Typography component="span">{qty}</Typography>
            <IconButton aria-label="next" onClick={itemIncreaseQty(item.id, 1, child ? child.id : null)}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={itemDelete(item.id, child ? child.id : null)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </Box>
      </ListItem>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <ListItem className={classes.activeText}>
          {item.price
            && <ListItemText primary={<Typography className={classes.price} component="span" variant="body1">₴{item.price * qty}</Typography>} />}
          <ListItemSecondaryAction>
            <IconButton aria-label="previous" onClick={itemDecreaseQty(item.id, 1, child ? child.id : null)}>
              <RemoveIcon />
            </IconButton>
            <Typography component="span">{qty}</Typography>
            <IconButton aria-label="next" onClick={itemIncreaseQty(item.id, 1, child ? child.id : null)}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={itemDelete(item.id, child ? child.id : null)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Box>
    </>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
  }).isRequired,
  itemIncreaseQty: PropTypes.func.isRequired,
  itemDecreaseQty: PropTypes.func.isRequired,
  itemDelete: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    visibility: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  child: PropTypes.shape({
    id: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
  }),
};

Item.defaultProps = {
  child: null,
};
