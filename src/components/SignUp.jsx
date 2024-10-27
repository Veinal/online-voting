import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signUpImg from '../signUpImg.jpg'
import { useState } from 'react';
import Axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Sign() {
  const [signUpState,setSignState]=useState();
  const navigate=useNavigate()
  
  const HandleChange=(e)=>{
    setSignState({...signUpState,[e.target.name]:e.target.value})
  }
  console.log(signUpState,'signState')

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    Axios.post('http://localhost:7000/api/userreg/register',signUpState)
    .then((res)=>{
      console.log(res.data)
      navigate('/signin')
    }).catch((err)=>{
      console.log(err)
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${signUpImg})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 6,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Full Name"
                name="userName"
                autoComplete="name"
                onChange={(e)=>HandleChange(e)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                onChange={(e)=>HandleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>HandleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                onChange={(e)=>HandleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type='number'
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                onChange={(e)=>HandleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type='file'
                id="picture"
                label="Picture"
                name="picture"
                autoComplete="picture"
                onChange={(e)=>HandleChange(e)}
              />
              
              <Select
                fullWidth
                name="role"
                value={signUpState?.role || ''}
                onChange={HandleChange}
                displayEmpty
                sx={{ mt: 2 }}
              >
                <MenuItem value="" disabled>
                  Choose a role
                </MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" className='text-blue-700' variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link to='/signin' className='text-blue-700' variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}