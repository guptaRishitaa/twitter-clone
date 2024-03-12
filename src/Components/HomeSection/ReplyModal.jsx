import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TweetCard from "./TweetCard";
import { useFormik } from 'formik';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline:"none",
  borderRadius:4
};

export default function ReplyModal({handleClose, open}) {
  const navigate=useNavigate()
 

  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectedImage] = useState("");

  const handleSubmit=(values)=>{
    console.log("handle submit", values)
  }

  const formik=useFormik({
    initialValues:{
        content:"",
        image:"",
        tweetId:4
    },
    onSubmit:handleSubmit

  })

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="flex space-x-5">
        <Avatar
          onClick={() => navigate(`/profile/${6}`)}
          className="cursor-pointer"
          alt="username"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmW78VpyB8SVmox3yBreQwV-hSh3Cc68Z6vQdaL02ojg&s"
        />

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">Code with Zosh</span>
              <span className="text-gray-600">@codewithzosh . 2m</span>
              <img
                className="ml-2 w-5 h-5"
                src="https://img.freepik.com/premium-vector/verification-checkmark-blue-circle-star-vector-icon-isolated-white-background_261737-745.jpg?size=338&ext=jpg&ga=GA1.1.384202588.1708904478&semt=sph"
                alt=""
              />
            </div>

          </div>

          <div className="mt-2">
            <div onClick={()=>navigate(`/tweet/${3}`)} className="cursor-pointer">
              <p className="mb-2 p-0">brutal but who cares</p>
              
            </div> 
          </div>
        </div>

       
      </div>
      <section className={"py-10"}>
        <div className="flex space-x-5">
          <Avatar
            alt="username"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmW78VpyB8SVmox3yBreQwV-hSh3Cc68Z6vQdaL02ojg&s"
          />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening"
                  className={"border-none outline-none text-xl bg-transparent"}
                  {...formik.getFieldProps("content")} />
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500"> {formik.errors.content}</span>
                )}
              </div>

              {/* <div>
                        <img src=''></img>
                    </div> */}
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex item-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name='imageFile'
                      className='hidden'
                      onChange={handleSelectImage}
                    />
                  </label>

                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" />
                </div>

                <div>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "20px",
                      paddingY: "8px",
                      paddingX: "20px",
                      bgcolor: "#1e88e5",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Tweet
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
        </Box>
      </Modal>
    </div>
  );
}