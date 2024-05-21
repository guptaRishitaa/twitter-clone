import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import TweetDetails from "../TweetDetails/TweetDetails";
import { useSelector } from "react-redux";

const HomePage = () => {
  const {auth,theme}=useSelector(store=>store);
  return (
    <Grid container xs={12} className="px-5 lg:px-36 justify-between">
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation />
      </Grid>
      <Grid
        item
        xs={0}
        lg={6}
        className={`px-5 lg:px-9 hidden lg:block w-full relative
        ${theme.currentTheme==="dark"?"border-gray-800":""}`}
      >
        <Routes>
          <Route path="/" element={<HomeSection/>}></Route>
          <Route path="/home" element={<HomeSection/>}></Route>
          <Route path="/profile/:id" element={<Profile/>}></Route>
          <Route path="/tweet/:id" element={<TweetDetails/>}></Route>
        </Routes>
        
      </Grid>
      <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
        <RightPart />
      </Grid>
    </Grid>
  );
};

export default HomePage;
