import React, { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findTweetsById } from "../../Store/Tweet/Action";

const TweetDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const dispatch=useDispatch();
  const {id} =useParams()
  const {tweet, theme}=useSelector(store=>store)

  useEffect(()=>{
    if(id){
      dispatch(findTweetsById(id))
    }
  },[])
  return (
    <React.Fragment>
      <section className={`z-50 flex items-center sticky top-0 ${
          theme.currentTheme === "light" ? "bg-white" : "bg-[#0D0D0D]"
        } bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">{"Tweet"}</h1>
      </section>

      <section>
        {tweet.tweet && <TweetCard item={tweet.tweet}/>}
        <Divider sx={{margin:"2rem 0rem"}}/>
      </section>

      <section>
        {tweet.tweet?.replyTweets.map((item)=><TweetCard item={item}/>)}
      </section>
    </React.Fragment>
  );
};

export default TweetDetails;
