import React from 'react';
import Paper from '@mui/material/Paper';

export default function AdminDashboard() {
  return (
    <div className='flex bg-gray-900 h-screen'>
      <div className="p-4 sm:ml-64 flex-1">
        <h1 className="text-white text-2xl mb-5">Hello, ADMIN</h1>
        <div className="flex flex-wrap justify-center items-center gap-5">
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0"
          />
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0"
          /> 
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0"
          />
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0"
          />
          <Paper 
            sx={{ bgcolor: 'white', width: { xs: '150px', sm: '200px' }, height: { xs: '120px', sm: '150px' } }} 
            elevation={5}
            className="flex-shrink-0"
          />
        </div>
        <div id="graph" className="mt-5">
          {/* Graph content goes here */}
        </div>
      </div>
    </div>
  );
}
