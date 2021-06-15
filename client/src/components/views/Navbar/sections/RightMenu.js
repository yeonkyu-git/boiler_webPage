import React from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RightMenu = (props) => {
  const classes = props.styleClass;
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.post(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        window.location.replace("/");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    })
  }
  
  if (user.userData && !user.userData.isAuth) {
    return (
      <Button href="/login" color="primary" variant="outlined" className={classes.link}>
        Login
      </Button>
    )
  } else {
    return (
      <Button onClick={logoutHandler} color="primary" variant="outlined" className={classes.link}>
        Logout
      </Button>
    )
  }
}

export default withRouter(RightMenu);
