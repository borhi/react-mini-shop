import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MiniCart from '@/components/cart/MiniCart';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(8, 0, 6),
  },
  logoConteiner: {
    position: 'relative',
    height: '50px',
    textAlign: 'center',
  },
  sitename: {
    color: '#000',
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.logoConteiner}>
      <Link className={classes.logoLink} color="textPrimary" underline="none" component={RouterLink} to="/">
        <Typography component="span" className={classes.sitename}>
          <Box textAlign="center" letterSpacing={5} fontSize="h6.fontSize" fontWeight="fontWeightMedium" m={3.5}>REACT SHOP</Box>
        </Typography>
      </Link>
      <MiniCart />
    </div>
  );
};

export default Header;
