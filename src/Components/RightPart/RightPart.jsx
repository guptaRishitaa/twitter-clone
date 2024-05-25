import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Avatar, Button } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeTheme } from "../../Store/Theme/Action";
import { searchUser } from "../../Store/Auth/Action";

const RightPart = () => {
  const { theme, auth } = useSelector((store) => store);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSubscriptionModel, setOpenSubscriptionModel] =
    React.useState(false);
  const handleOpenSubscriptionModel = () => setOpenSubscriptionModel(true);
  const handleCloseSubscriptionModel = () => setOpenSubscriptionModel(false);

  const handleChangeTheme = () => {
    dispatch(changeTheme(theme.currentTheme === "dark" ? "light" : "dark"));
    console.log("handle right side change theme");
  };

  const handleSearchUser = (event) => {
    setSearch(event.target.value);
    dispatch(searchUser(event.target.value));
  };

  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };
  return (
    <div className="py-5 sticky top-0 overflow-y-hidden">
      <div className="relative flex items-center">
        <input
          value={search}
          onChange={handleSearchUser}
          type="text"
          placeholder="Search Twitter"
          className={`py-3 rounded-full text-gray-500 w-full pl-12 outline-none ${
            theme.currentTheme === "light" ? "bg-slate-300" : "bg-[#151515]"
          }`}
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>
        {search && 
          <div
            className={` overflow-y-scroll hideScrollbar absolute z-50 top-14  border-gray-700 h-[40vh] w-full rounded-md ${
              theme.currentTheme === "light"
                ? "bg-white"
                : "bg-[#151515] border"
            }`}
          >
            {auth.searchResult.map((item) => (
              <div
                onClick={() => navigateToProfile(item.id)}
                className="flex items-center hover:bg-slate-800 p-3 cursor-pointer"
              >
                <Avatar alt={item.fullName} src={item.image} />
                <div className="ml-2">
                  <p>{item.fullName}</p>
                  <p className="text-sm text-gray-400">
                    @{item.fullName?.split(" ").join("_").toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        }
        <Brightness4Icon
          className="ml-3 cursor-pointer"
          onClick={handleChangeTheme}
        />
      </div>

      <section
        className={`my-5 ${
          theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
        }`}
      >
        <h1 className="text-xl font-bold">Get Verified</h1>
        <h1 className="font-bold my-2">Subscribe to unlock new features</h1>
        <Button
          variant="contained"
          sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}
          onClick={handleOpenSubscriptionModel}
        >
          {" "}
          Get Verified
        </Button>
      </section>

      <section
        className={`mt-7 space-y-5 ${
          theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
        }`}
      >
        <h1 className="font-bold text-xl py-1">What's Happening</h1>
        <div>
          <p className="text-sm">FIFA World Cup .. Live</p>
          <p className="font-bold"> Phillipenes v/s Argentina</p>
        </div>

        {[1, 1, 1].map((item) => (
          <div className="flex justify-between w-full">
            <div>
              <p>Entertainment Trending</p>
              <p className="font-bold"> Dunki Box Office collection</p>
              <p>34.3k Tweets</p>
            </div>
            <MoreHorizIcon />
          </div>
        ))}
      </section>

      <section>
        <SubscriptionModal
          open={openSubscriptionModel}
          handleClose={handleCloseSubscriptionModel}
        />
      </section>
    </div>
  );
};

export default RightPart;
