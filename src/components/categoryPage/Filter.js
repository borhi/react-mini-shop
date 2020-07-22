import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme) => ({
  filter: {
    padding: theme.spacing(0, 0, 2),
  },
  filterButton: {
    margin: theme.spacing(0, 0, 3),
  },
  drawer: {
    flexGrow: 1,
  },
  filterConteiner: {
    padding: theme.spacing(3),
  },
}));

const Filter = ({ attributes, onChange }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const filters = attributes.map((attribute) => (attribute.options.length > 1
    && (
      <div key={attribute.id} className={classes.filter}>
        <FormControl component="fieldset">
          <FormLabel color="secondary" component="legend">{attribute.name}</FormLabel>
          <FormGroup>
            {attribute.options.map((option) => (
              <FormControlLabel
                key={option.id}
                control={(
                  <Checkbox
                    name={`option-${option.id}`}
                    checked={option.checked}
                    onChange={(event, checked) => onChange({
                      value: parseInt(event.target.value, 0),
                      checked,
                      attributeId: attribute.id,
                    })}
                    value={option.id}
                  />
                )}
                disabled={!option.count}
                label={`${option.label} (${option.count})`}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    )
  ));

  return (
    <div>
      <Box display={{ xs: 'none', sm: 'block' }}>
        {filters}
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <Button variant="outlined" startIcon={<FilterListIcon />} className={classes.filterButton} onClick={toggleDrawer(true)}>ФИЛЬТРЫ</Button>
        <Drawer anchor="left" className={classes.drawer} open={open} onClose={toggleDrawer(false)}>
          <Box className={classes.filterConteiner}>
            {filters}
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    visibility: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};
