import React from 'react';

export default function AboutUs() {
  return (
    <div className="bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-5 text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to our online voting platform, a solution designed to make the voting process easy, secure, and accessible from anywhere. Our mission is to provide a seamless experience for all users while ensuring transparency and security in every vote.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To deliver an easy-to-use platform that ensures every vote counts, regardless of geographical barriers or mobility issues. We believe in a future where everyone can participate in decision-making processes, free from limitations.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where democracy is strengthened through innovative and secure digital solutions, enabling a greater reach and inclusivity in the voting process.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Integrity and Transparency</li>
              <li>Security and Privacy</li>
              <li>Innovation and Inclusivity</li>
              <li>User-Friendly Solutions</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-5">Meet the Team</h2>
          <p className="text-lg text-gray-600">
            We are a group of dedicated developers, designers, and innovators working to bring modern, secure voting technology to the masses. Our team values collaboration, creativity, and the power of every individual vote.
          </p>
        </div>
      </div>
    </div>
  );
}
