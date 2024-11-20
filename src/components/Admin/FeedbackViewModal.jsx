import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function FeedbackViewModal(props) {
  
  return (
    <div>
      <div className="bg-white p-6 rounded-lg max-w-lg mx-auto">
      {/* Heading Section */}
      <Typography 
        variant="h5" 
        component="h2" 
        className="text-2xl font-bold mb-6 text-center text-blue-700 uppercase"
      >
        Feedback Details
      </Typography>

      {/* Candidate Details Section */}
      <div className="space-y-4 mt-5">
        {/* Name Section */}
        <div className="flex justify-between items-center border-b pb-2">
          <Typography className="text-lg font-semibold text-gray-900">
            Feedback:
          </Typography>
          <Typography className="text-gray-600">
            {props.selectedFeed?.feedback || "No Username Available"}
          </Typography>
        </div>

        {/* Manifesto Section */}
        <div className="flex justify-between items-center border-b pb-2">
          <Typography className="text-lg font-semibold text-gray-900">
            User Name:
          </Typography>
          <Typography className="text-gray-600">
            {props.selectedFeed?.user_id?.userName || "No User Found"}
          </Typography>
        </div>

        {/* Role Section */}
        <div className="flex justify-between items-center border-b pb-2">
          <Typography className="text-lg font-semibold text-gray-900">
            Role:
          </Typography>
          <Typography className="text-gray-600">
            {props.selectedFeed?.user_id?.role || "No Role Found"}
          </Typography>
        </div>

        
      </div>

      {/* Close Button */}
      <div className="mt-8 flex justify-center">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={props.handleClose2} 
          className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600 transition duration-300"
        >
          Close
        </Button>
      </div>
    </div>
    </div>
  );
}
