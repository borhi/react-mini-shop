import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { DataContext } from '@/providers/DataProvider';
import Item from '@/components/Item';
import Filter from '@/components/categoryPage/Filter';
import { categoryPageReducer, initCategoryPage } from '@/components/categoryPage/reducer';

const sortByWeight = (a, b) => b.weight - a.weight;

const useStyles = makeStyles((theme) => ({
  grid: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100% + 24px)',
      flexBasis: 'calc(100% + 24px)',
    },
  },
}));

const CategoryPage = ({ category }) => {
  const classes = useStyles();
  const { items, attributes } = useContext(DataContext);

  const [state, dispatch] = useReducer(
    categoryPageReducer,
    { initItems: items, initAttributes: attributes, category },
    initCategoryPage,
  );

  return (
    <Grid container>
      {state.items.length > 0
        ? (
          <>
            <Grid item xs={12} sm={3}>
              <Filter attributes={state.attributes} onChange={dispatch} />
            </Grid>
            <Grid item xs={12} sm={9} container spacing={3} className={classes.grid}>
              {state.items.sort(sortByWeight)
                .map((item) => item.display && <Item key={item.id} item={item} />)}
            </Grid>
          </>
        )
        : <Typography>Oh, not filled yet...</Typography>}
    </Grid>
  );
};

CategoryPage.propTypes = {
  category: PropTypes.number.isRequired,
};

export default CategoryPage;
