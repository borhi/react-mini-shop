import React, { useState } from 'react';
import ReactGA from 'react-ga';
import Config from 'Config';
import {
  Route,
  Switch,
  NavLink,
  Link as RouterLink,
  useHistory,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, NotFound } from '@/components/Page';
import CategoryPage from '@/components/CategoryPage';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';

import navigation from '@/data/navigation';

if (Config.mode === "production") {
  ReactGA.initialize(Config.ga);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  navigation: {
    padding: theme.spacing(0, 0, 4),
  },
  link: {
    textDecoration: 'none',
  },
  menu: {
    position: 'fixed',
    top: 0,
    left: 0,
    padding: theme.spacing(3),
    zIndex: '1100',
  },
  menuText: {
    textAlign: 'center',
  },
  drawer: {
    flexGrow: 1,
  },
}));

const Navigation = () => {
  if (Config.mode === "production") {
    ReactGA.pageview(window.location.pathname + window.location.search);
    const history = useHistory();
    history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  return (
    <>
      <Box display={{ xs: 'none', sm: 'block' }}>
        <Grid container className={classes.navigation}>
          {navigation.map((value) => (
            <Grid key={value.id} item xs={12} sm={3} className={classes.paper}>
              <NavLink className={classes.link} to={value.path}><Button size="large">{value.name}</Button></NavLink>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <IconButton className={classes.menu} onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer anchor="top" className={classes.drawer} open={isOpen} onClose={toggleDrawer(false)}>
          <List component="nav">
            {navigation.map((value) => (
              <ListItem
                key={value.id}
                button
                component={RouterLink}
                to={value.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemText className={classes.menuText} primary={value.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Switch>
        <Route path="/" component={Home} exact />
        {navigation.map((value) => (
          <Route
            key={value.id}
            path={"/" + value.path}
            render={() => <CategoryPage category={value.id} />}
          />
        ))}
        <Route path="/cart" component={Cart} />
        <Route path="/:url" component={ProductDetail} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Navigation;
