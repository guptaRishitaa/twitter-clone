
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Authentication from './Components/Authentication/Authentication';
import HomePage from './Components/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserProfile } from './Store/Auth/Action';
import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from './Theme/DarkTheme';
import lightTheme from './Theme/LightTheme';
import VerifiedSuccess from './Components/VerifiedSuccess/VerifiedSuccess';

function App() {

  const jwt = localStorage.getItem("jwt")
  const {auth} =useSelector(store=>store)
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const [currentTheme,setCurrentTheme]=useState("");
 const {theme}=useSelector(store=>store);


 useEffect(()=>{
  if(jwt){
    dispatch(getUserProfile(jwt))
    navigate("/")
  
  }
 }, [auth.jwt])

 useEffect(()=>{
  setCurrentTheme(localStorage.getItem("theme"))
    },[theme.currentTheme])

  console.log("theme ",theme.currentTheme)
  return (
    <ThemeProvider theme={currentTheme==="dark"? darkTheme:lightTheme} className="">
      <CssBaseline />
    <div className="">
      <Routes>
       <Route path="/*" element={auth.user?<HomePage/>:<Authentication/>}></Route>
       <Route path='/signin' element={<Authentication/>}></Route>
        <Route path='/signup' element={<Authentication/>}></Route>
        <Route path='/verified' element={<VerifiedSuccess/>}></Route>
      </Routes>
     
    </div>
    </ThemeProvider>
  );
}

export default App;
