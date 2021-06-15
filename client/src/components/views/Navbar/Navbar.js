import React from 'react'
import { AppBar, Link, Typography, CssBaseline, Toolbar } from '@material-ui/core';
import useStyles from './styles';
import RightMenu from './sections/RightMenu';

const Navbar = (props) => {
  const classes = useStyles();

  const homeHandler = () => {
    window.location.replace("/")
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography onClick={homeHandler} variant="h6" color="primary" noWrap className={classes.toolbarTitle}>
            Logo
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Features
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Enterprise
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Support
            </Link>
          </nav>
          <RightMenu styleClass={classes} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Navbar;
