import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

export default function UserViewModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box className="bg-white p-6 rounded-lg shadow-lg">
          {/* Uncomment the below line to display the profile picture */}
          <div className='flex justify-center items-center'>
            <img src={props?.selectedUser?.profilePic} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          </div>
          
          <Typography id="user-name" variant="h6" component="h2" className="text-xl font-semibold mb-4">
            {props?.selectedUser?.userName}
          </Typography>
          
          <Typography id="user-details" sx={{ mt: 2 }} className="text-gray-700">
            <p><strong>Email:</strong> {props?.selectedUser?.email}</p>
            <p><strong>Phone:</strong> {props?.selectedUser?.phone}</p>
            <p><strong>Age:</strong> {props?.selectedUser?.age}</p>
            <p><strong>Role:</strong> {props?.selectedUser?.role}</p>
          </Typography>
          
          <Button onClick={props.handleClose2} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Close
          </Button>
        </Box>
    </div>
  );
}
