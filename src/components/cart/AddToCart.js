import React, { useState, useContext, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { DataContext } from '@/providers/DataProvider';
import Availability from '@/components/productDetail/Availability';
import { addToCart } from '@/components/cart/services/actions';
import { addToCartReducer, initAddToCart } from '@/components/cart/addToCart/reducer';

const useStyles = makeStyles((theme) => ({
  attributes: {
    margin: theme.spacing(0, 0, 2),
  },
  availability: {
    padding: theme.spacing(0, 0, 3),
  },
}));

const AddToCart = ({ item, addToCart }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { attributes } = useContext(DataContext);
  const [state, dispatch] = useReducer(
    addToCartReducer, { initItem: item, initAttributes: attributes }, initAddToCart,
  );

  const [formError, setFormError] = useState({});

  const addToCartSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const errors = {};
    state.attributes.forEach((attribute) => {
      if (attribute.options.length > 0 && !formData.get(attribute.id)) {
        errors[attribute.id] = { status: true, text: `Choose ${attribute.name.toLowerCase()}` };
      }
    });
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      addToCart(state.cartItem);
      setOpen(true);
    }
  };

  return (
    <>
      <div className={classes.availability}>
        <Availability item={state.cartItem} />
      </div>
      <form onSubmit={addToCartSubmit}>
        <div>
          {state.attributes.map((attribute) => (attribute.options.length > 0
            && (
              <div key={attribute.id} className={classes.attributes}>
                <FormControl error={formError[attribute.id] ? formError[attribute.id].status : false} component="fieldset">
                  <FormLabel component="legend">{attribute.name}</FormLabel>
                  <RadioGroup
                    row
                    aria-label={attribute.name}
                    value={attribute.value ? attribute.value : null}
                    onChange={(_event, value) => dispatch({
                      value: parseInt(value, 0),
                      attributeId: attribute.id,
                    })}
                  >
                    {attribute.options.map((option) => (option.count > 0
                      && (
                        <FormControlLabel
                          key={option.id}
                          value={option.id}
                          control={<Radio name={attribute.id} />}
                          label={option.label}
                        />
                      )
                    ))}
                  </RadioGroup>
                  <FormHelperText>{formError[attribute.id] ? formError[attribute.id].text : ''}</FormHelperText>
                </FormControl>
              </div>
            )
          ))}
        </div>
        <div>
          <Box display="flex" alignItems="center">
            {item.price && (
              <Box width="100%">
                <Typography component="span" variant="h4">₴{item.price}</Typography>
              </Box>
            )}
            <Box flexShrink={1}>
              <IconButton type="submit">
                <AddShoppingCartIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </div>
      </form>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <Alert severity="success">
          Product added to cart
        </Alert>
      </Snackbar>
    </>
  );
};

AddToCart.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect(null, { addToCart })(AddToCart);
