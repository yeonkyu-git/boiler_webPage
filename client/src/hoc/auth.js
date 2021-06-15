import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      // To Know my current status, send Auth request
      dispatch(auth()).then(response => {
        // Not loggined in status
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login')
          }
          // loggined in status
        } else {
          // Supposed to be admin page, but not admin person wants to go inside
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          }
          // Logged in status, but try to go into log in page
          else {
            if (option === false) {
              props.history.push('/')
            }
          }
        }
      })
    }, [])

    return (
      <SpecificComponent {...props} user={user} />
    )
  }
  return AuthenticationCheck
}