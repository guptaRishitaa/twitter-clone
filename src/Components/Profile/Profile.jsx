import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, followUserAction } from "../../Store/Auth/Action";
import { findTweetsByLikesContainsUser, getUsersTweet } from "../../Store/Tweet/Action";
import SnackbarComponent from "../Snackbar/SnackbarComponent";

const Profile = () => {
    const [tabValue, setTabValue]=useState("1")
  const [openProfileModal, setOpenProfileModal]=useState();
  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);
  const {auth, tweet} = useSelector(store=>store)
  const dispatch =useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const navigate = useNavigate();

// to acess the id in params
const {id} = useParams()
const param = useParams();


  const handleBack = () => {
    navigate(-1);
  };


  const handleFollowUser = () => {
    dispatch(followUserAction(id))
    console.log("Follow user");
  };

  const handleTabChange=(event, newValue)=>{
    setTabValue(newValue)

    if(newValue===4){
      dispatch(findTweetsByLikesContainsUser(param.id));
    }
    else if(newValue===1){
      dispatch(getUsersTweet(param.id));
    }
  }

  useEffect(() => {
    if(auth.updateUser){
      setOpenSnackBar(true);
      console.log("Inside Snackbar")
    }
    
    
  }, [auth.updateUser]);

  const handleCloseSnackBar = () => setOpenSnackBar(false);

  useEffect(()=>{

    dispatch(findUserById(id))
    dispatch(getUsersTweet(id))
  },[id])
  return (
    <div>
      <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">{auth.findUser?.fullName}</h1>
      </section>
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://img.freepik.com/free-photo/seoraksan-mountains-is-covered-by-morning-fog-sunrise-seoul-korea_335224-313.jpg?t=st=1709248481~exp=1709252081~hmac=8528fe535ea7c819eb0f405f0e1b4ee099024772b2a7a520c41391b0cd52c9a7&w=900"
          alt=""
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="rishita"
            src={auth.findUser?.image}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />

          {auth.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfileModel}
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              className="rounded-full"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              {auth.findUser?.followed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        <div className="flex items-center">
          <h1 className="font-bold text-lg"> {auth.findUser?.fullName}</h1>
          {true && (
            <img
              className="ml-2 w-5 h-5"
              src="https://img.freepik.com/premium-vector/verification-checkmark-blue-circle-star-vector-icon-isolated-white-background_261737-745.jpg?size=338&ext=jpg&ga=GA1.1.384202588.1708904478&semt=sph"
              alt=""
            />
          )}
        </div>
        <div>
          <h1 className="text-gray-500">@{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}</h1>
        </div>

        <div className="mt-2 space-y-3">
          <p> {auth.findUser?.bio}</p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2"> Education</p>
            </div>

            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2"> {auth.findUser?.location}</p>
            </div>

            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2"> Joined Jun 2022</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
          
          <div className="felx items-center space-x-1 font-semibold">
          <span>{auth.findUser?.following?.length}</span>
                <span className="text-gray-500">Following</span>

            </div>

            <div className="flex items-center space-x-1 font-semibold">
                <span>{auth.findUser?.followers?.length}</span>
                <span className="text-gray-500">Followers</span>

            </div>

          </div>
        </div>
      </section>

      <section className="py-5">
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Tweets" value="1" />
            <Tab label="Replies" value="2" />
            <Tab label="Media" value="3" />
            <Tab label="Likes" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
            {tweet.tweets.map((item)=>(<TweetCard item={item}/>))}
        </TabPanel>
        <TabPanel value="2">Replies</TabPanel>
        <TabPanel value="3">Media</TabPanel>
        <TabPanel value="4">Likes</TabPanel>
      </TabContext>
    </Box>
      </section>

      <section>
        <ProfileModal handleClose={handleCloseProfileModal} open={openProfileModal}/>
      </section>

      <section>
        <SnackbarComponent
          handleClose={handleCloseSnackBar}
          open={openSnackBar}
          message={"user updated successfully"}
        />
      </section>
    </div>
  );
};

export default Profile;
