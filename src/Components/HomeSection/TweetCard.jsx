import React, { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ReplyModal from "./ReplyModal";
import { useDispatch, useSelector } from "react-redux";
import { createReTweet, deleteTweet, likeTweet } from "../../Store/Tweet/Action";

const TweetCard = ({item}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openReplyModal, setOpenReplyModal]=useState(false)
  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const dispatch = useDispatch();
  const {auth} = useSelector((store)=>store);
  const [isLiked, setIsLiked] = useState(item.liked);
  const [likes, setLikes] = useState(item.totalLikes);
  const [isRetweet, setIsRetweet] = useState(
    item.retweetUserId.includes(auth.user.id)
  );
  const [retweet, setRetweet] = useState(item.totalRetweets);
  const location = useLocation();

  const openDeleteMenu = Boolean(anchorEl);

  const handleOpenDeleteMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDeleteMenu = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTweet = () => {
    dispatch(deleteTweet(item.id))
    console.log("delete tweet");
    handleCloseDeleteMenu();
  };


  const handleCreateRetweets = () => {
    dispatch(createReTweet(item?.id))
    setRetweet(isRetweet ? retweet - 1 : retweet + 1);
    setIsRetweet(!retweet);
    console.log("handle create retweets");
  };

  const handleLikeTweet = () => {
    dispatch(likeTweet(item?.id))
    // setIsLiked(!isLiked);
    // setLikes(likes+num);
    console.log("handle like tweet");
  };

  const handleNavigateToTweetDetail = () => {
    console.log("handleNavigate tweetcard")
    navigate(`/tweet/${item.id}`);}

  
  return (
    <React.Fragment>
     { auth.user?.id !== item.user.id &&
        location.pathname === `/profile/${auth.user?.id}` && (<div className='flex items-center font-semibold text-gray-700 py-2'>
            <RepeatIcon/>
            <p className="ml-3">You Retweet</p>
        </div>)}

      <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${item?.user.id}`)}
          className="cursor-pointer"
          alt="username"
          src={item.user.image}
        />

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div  onClick={() => navigate(`/profile/${item.user.id}`)}
             className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-600">@{item?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
              {item.user.verified && (
              <img
                className="ml-2 w-5 h-5"
                src="https://img.freepik.com/premium-vector/verification-checkmark-blue-circle-star-vector-icon-isolated-white-background_261737-745.jpg?size=338&ext=jpg&ga=GA1.1.384202588.1708904478&semt=sph"
                alt=""
              />)}
            </div>
            <div>
              <Button
               
                onClick={handleOpenDeleteMenu}
              >
                <MoreHorizIcon
                 id="basic-button"
                 aria-controls={openDeleteMenu ? "basic-menu" : undefined}
                 aria-haspopup="true"
                 aria-expanded={openDeleteMenu ? "true" : undefined} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openDeleteMenu}
                onClose={handleCloseDeleteMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {item.user.id ===auth.user.id && <MenuItem onClick={handleDeleteTweet}> Delete </MenuItem>}
                <MenuItem onClick={()=>navigate(`/tweet/${item.id}`)}>Details</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            <div onClick={handleNavigateToTweetDetail} className="cursor-pointer">
              <p className="mb-2 p-0">{item?.content}</p>
             { item.image && <img
                className="w-[28rem] border border-gray-400 p-5 rounded-md"
                src={item?.image}
                alt=""
              />}

{item.video &&  <div className="flex flex-col items-center w-full border border-gray-400 rounded-md">
<video className="max-h-[40rem] p-5"  controls src={item.video}/>
              </div>}
            </div>
            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
               {item.totalReplies>0 &&<p>{item?.totalReplies}</p>}
              </div>

              <div
                className={`${
                  item?.retweet ? "text-gray-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <RepeatIcon
                  className="cursor-pointer"
                  onClick={handleCreateRetweets}
                />
                <p>{item?.totalRetweets}</p>
              </div>

              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteIcon
                    className="cursor-pointer"
                    onClick={handleLikeTweet}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="cursor-pointer"
                    onClick={handleLikeTweet}
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>430</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal item={item} open={openReplyModal} handleClose={handleCloseReplyModal}/>
      </section>
    </React.Fragment>
  );
};

export default TweetCard;
