import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Image from 'material-ui-image';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import Carousel from 'nuka-carousel';
import { DataContext } from '@/providers/DataProvider';
import AddToCart from '@/components/cart/AddToCart';

import navigation from '@/data/navigation';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  name: {
    padding: theme.spacing(0, 0, 3),
  },
  carousel: {
    outline: 'none',
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const { url } = useParams();
  const { items } = useContext(DataContext);
  const product = items.find((item) => item.url === url);
  if (!product) {
    return (
      <Typography variant="body1">Product not found</Typography>
    );
  }

  const category = navigation.find((item) => item.id === product.catygory);

  return (
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" component={RouterLink} to="/" className={classes.link}>
            <HomeIcon className={classes.icon} />
          </Link>
          <Link
            color="inherit"
            component={RouterLink}
            to={category.path}
            className={classes.link}
          >
            {category.name}
          </Link>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12} sm={6}>
        {product.img.length > 1
          ? (
            <Carousel
              className={classes.carousel}
              renderCenterLeftControls={({ previousSlide }) => (
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <IconButton onClick={previousSlide}>
                    <NavigateBeforeIcon />
                  </IconButton>
                </Box>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <IconButton onClick={nextSlide}>
                    <NavigateNextIcon />
                  </IconButton>
                </Box>
              )}
            >
              {/* eslint-disable-next-line react/no-array-index-key */}
              {product.img.map((img, index) => <Image key={index} src={img} />)}
            </Carousel>
          )
          : <Image src={product.img[0]} />}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography component="h4" variant="h4" className={classes.name}>
          {product.name}
        </Typography>
        <AddToCart item={product} />
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
