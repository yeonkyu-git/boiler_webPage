import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { 
  Container, 
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import useStyles from './styles';
import Copyright from '../../utils/Copyright';


const LoginPage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememeberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememeberMe(!rememberMe);
    console.log(formErrorMessage)
  };

  const handleFocus = () => {
    setFormErrorMessage('');
  }

  const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';

  return (
    <Formik
      initialValues = {{
        email: initialEmail,
        password: '',
      }}
      validationSchema = {Yup.object().shape({
        email: Yup.string()
          .email('이메일이 유효하지 않아요')
          .required('이메일을 입력해주세요'),
        password: Yup.string()
          .min(6, '비밀번호는 최소 6글자 이상으로 해주세요')
          .required('비밀번호를 입력해주세요'),
      })}
      onSubmit = {(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.email);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push('/')
              } else {
                values.password = ''
                setFormErrorMessage('이메일이나 비밀번호를 다시 한번 확인해주세요');
                setTimeout(() => {
                  setFormErrorMessage("");
                }, 3000);
              }              
            })
            .catch(err => {
              setFormErrorMessage('이메일이나 비밀번호를 다시 한번 확인해주세요');
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                로그인
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <div className={classes.inputFeedback}>{errors.email}</div>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <div className={classes.inputFeedback}>{errors.password}</div>
                )}

                {formErrorMessage && (
                  <label>
                    <p 
                      style={{ 
                        color: '#ff0000bf', 
                        fontSize: '0.7rem', 
                        border: '1px solid', 
                        padding: '1rem', 
                        borderRadius: '10px'
                      }}
                    >  
                      {formErrorMessage}
                    </p>
                  </label>
                )}


                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  onChange={handleRememberMe}
                  className={classes.rememberCheckBoxk}
                  checked={rememberMe}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  로그인
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      비밀번호를 잊어버렸나요?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"회원가입"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        )
      }}
    </Formik>
  )

}

export default LoginPage;