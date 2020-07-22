import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DataContext } from '@/providers/DataProvider';
import Item from '@/components/Item';

export const Home = () => {
  const { items } = useContext(DataContext);
  return (
    <Grid container spacing={3}>
      {items.sort((a, b) => b.weight - a.weight).map((item) => <Item key={item.id} item={item} />)}
    </Grid>
  );
};

export const NotFound = () => (
  <Typography variant="body1">Page not found</Typography>
);
