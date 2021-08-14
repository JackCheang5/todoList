import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "99%",
  },
  title: {
    flexGrow: 1,
  },
}))

function Header(props) {
  const classes = useStyles();

  return (
    <Grid item>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6">
            {props.content}
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;