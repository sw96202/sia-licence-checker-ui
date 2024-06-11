import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './LogoMain.png';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('https://sia-licence-checker-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image or process license data.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Virtulum SIA Licence Checker</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" capture="camera" />
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div className="result">
          <h2>Result</h2>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>License Number:</strong> {result.licenseNumber}</p>
          <p><strong>Expiry Date:</strong> {result.expiryDate}</p>
          <p><strong>License Status:</strong> {result.isValidLicence ? 'Valid 👍' : 'Invalid 👎'}</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" className="uploaded-image" />
        </div>
      )}
    </div>
  );
}

export default App;
