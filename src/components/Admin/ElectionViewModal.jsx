import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function ElectionViewModal(props) {
  
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-lg overflow-auto">
        <h2 id="election-modal-title" className="text-2xl font-bold mb-4 text-center uppercase">
          {props.selectedElect.electionName}
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          {props.selectedElect.description}
        </p>

        <div className="border-t border-gray-300 pt-4">
          <p className="text-gray-700 mb-2">
            <strong className="text-lg">Batch:</strong> <span className="text-gray-600">{props.selectedElect.batch}</span>
          </p>
          <p className="text-gray-700 mb-2">
            <strong className="text-lg">Start Date:</strong> <span className="text-gray-600">{new Date(props.selectedElect.startDate).toLocaleDateString()}</span>
          </p>
          <p className="text-gray-700 mb-4">
            <strong className="text-lg">End Date:</strong> <span className="text-gray-600">{new Date(props.selectedElect.endDate).toLocaleDateString()}</span>
          </p>
          <p className="text-gray-700 mb-4">
          <strong className="text-lg">Candidates:</strong>
            <span className="text-gray-600">
                {props.selectedElect?.candidate_id.map((candidate) => {
                    // Access the candidate's userName from the user_id object
                    return candidate?.user_id?.userName || 'Unknown';
                }).join(', ')} {/* Join the names with commas if multiple candidates */}
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          <button 
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
            onClick={props.handleClose2}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
