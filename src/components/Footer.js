import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3),
    margin: theme.spacing(3, 0, 0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Typography variant="body1" className={classes.footer}>© All rights reserved {`${new Date().getFullYear()}`}</Typography>
  );
};

export default Footer;
