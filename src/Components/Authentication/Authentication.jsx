import { Button, Grid } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import AuthModal from './AuthModel'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithGoogleAction } from '../../Store/Auth/Action'
import { useLocation, useNavigate } from 'react-router-dom'

const Authentication = () => {

  const [openAuthModel, setOpenAuthModel]=useState(false);
  const handleOpenAuthModel=()=>setOpenAuthModel(true);
  const handleCloseAuthModel=()=>setOpenAuthModel(false)
  const {auth} = useSelector((store)=>store)
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loginWithGoole = (res) => {
    console.log("res : ", res);
    dispatch(loginWithGoogleAction(res));
    // return
  };

  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setOpenAuthModel(true);
    }
  }, [location.pathname]);

  return (
    <div>
      <Grid className='overflow-y-hidden' container>
        <Grid className='hidden lg:block' item lg={7}>

          <img className='w-full h-screen'
          src='https://pbs.twimg.com/media/F10FoBXaIAEMNKP.jpg'
          alt=''/>

          <div className='absolute top-[29%] left-[19%]'>

          <svg height="250"
          width="250"
           viewBox="0 0 24 24" 
           aria-hidden="true" 
           class="r-jwli3a r-4qtqp9 r-yyyyoo r-labphf r-1777fci r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
              </path></g>
              </svg>

          </div>

        </Grid>

        <Grid className='px-10' item lg={5} xs={12}>
        <div className="py-10">
            <img
              className="w-16"
              src="https://pbs.twimg.com/media/F1iAD_iaYAAu7I3?format=jpg&name=small"
              alt=""
            />
          </div>
          <h1 className='font-bold text-7xl'> Happening Now</h1>
          <h1 className='font-bold text-3xl py-16'> Join X today </h1>

          <div className='w-[60%]'>
            <div className='w-full'>

              <GoogleLogin width={330}
              onSuccess={loginWithGoole}
              onError={() => {
                console.log("Login Failed");
              }}/>
              <p className='py-5 text-center'> OR</p>

              <Button onClick={handleOpenAuthModel} fullWidth variant='contained' size='large' sx={
                {
                  width: "100%",
                  borderRadius:"29px",
                  py:"7px",
                }

              }> Create Account</Button>

              <p className='text-sm mt-2'>By signing up, you agree to the Terms of Service and Privacy Policy, including cookies.  </p>

            </div>

            <div className='mt-10'>
              <h1 className='font-bold text-xl mb-5'>Already have Account?</h1>
            <Button onClick={handleOpenAuthModel} fullWidth variant='outlined' size='large' sx={
                {
                  borderRadius:"29px",
                  py:"7px",
                }

              }> Login</Button>
            </div>

          </div>

        </Grid>

      </Grid>
      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel}/>
    </div>
  )
}

export default Authentication