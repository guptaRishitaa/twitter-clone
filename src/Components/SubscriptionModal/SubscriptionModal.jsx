import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  outline:"none",
  boxShadow: 24,
  p: 4,
  borderRadius:4
};

const features=["Prioritized rankings in conversations and search",
"See approximately twice as many Tweets bewteen ads in your",
"No ads in the For You and Following timelines",
"Upload videos up to ~3 hours long and up to 8GB file size (1080p) "
]
export default function SubscriptionModal({handleClose, open}) {
  

  const [plan,setPlan]=React.useState("Annually")

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon />
                </IconButton>
              </div>

              <div className='flex justify-center py-10'>
                <div className='w-[80%] space-y-10'>
                    <div className='p-5 rounded-md flex items-center justify-between bg-slate-400 shadow-lg'>
                        <h1 className='text-xl pr-5'>Blue subscribers get verified if you have a verified phone number</h1>
                        <img className='w-24 h-24' src="https://img.freepik.com/free-vector/blue-star-check-mark_78370-4478.jpg?t=st=1709682769~exp=1709686369~hmac=d9b20dc82249e91b9b7e8291be31a7dd213a8e70b93318126a0bc0e78b873757&w=740" alt=""></img>
                        </div> 

                        <div className='flex justify-between border rounded-full px-5 py-3 border-gray-500'>
                            <div>
                                <span onClick={()=>setPlan("Annually")} className={`${plan==="Annually"?"text-black":"text-grey-400"} cursor-pointer`}>Annually</span>
                                <span className='text-green-500 text-sm ml-5'>SAVE 12%</span>
                            </div>
                            <p onClick={()=>setPlan("monthly")} className={`${plan==="monthly"?"text-black":"text-grey-400"} cursor-pointer`}>
                                Monthly
                            </p>

                        </div>

                        <div className='space-y-3'>
                         {features.map((item)=>
                         <div className='flex items-center space-x-5'>
                            <FiberManualRecordIcon sx={{width:"7px", height:"7px"}}/>
                            <p className='text-xs'>
                                {item}
                            </p>
                            </div>)}

                        </div>

                        <div className='cursor-pounter flex justify-center bg-gray-900 text-white rounded-full px-5 py-3'>
                            <span className='line-through italic'> $3/Month</span>
                            <span className='px-5'>$32/Year</span>
                        </div>


                </div>

              </div>
         
        </Box>
      </Modal>
    </div>
  );
}