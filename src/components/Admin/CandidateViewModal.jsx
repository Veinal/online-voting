import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CandidateViewModal(props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      {/* Heading Section */}
      <Typography 
        variant="h5" 
        component="h2" 
        className="text-2xl font-bold mb-6 text-center text-blue-700 uppercase"
      >
        Candidate Details
      </Typography>

      {/* Candidate Details Section */}
      <div className="space-y-4">
        {/* Name Section */}
        <div className="flex justify-between items-center border-b pb-2">
          <Typography className="text-lg font-semibold text-gray-900">
            Name:
          </Typography>
          <Typography className="text-gray-600">
            {props.selectedCand?.user_id?.userName || "No Username Available"}
          </Typography>
        </div>

        {/* Manifesto Section */}
        <div className="flex justify-between items-center border-b pb-2">
          <Typography className="text-lg font-semibold text-gray-900">
            Manifesto:
          </Typography>
          <Typography className="text-gray-600">
            {props.selectedCand?.manifesto || "No Manifesto Provided"}
          </Typography>
        </div>

        {/* Role Section */}
        <div className="flex justify-between items-center border-b pb-2">
          <Typography className="text-lg font-semibold text-gray-900">
            Role:
          </Typography>
          <Typography className="text-gray-600">
            {props.selectedCand?.role || "No Role Assigned"}
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
  );
}
