import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LogoMain from './LogoMain.png';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    // Show image preview
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={LogoMain} alt="Virtulum SIA Licence Checker" />
        <h1>Virtulum SIA Licence Checker</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Selected" style={{ marginTop: '20px', maxHeight: '300px' }} />}
        {result && (
          <div className="Result">
            <h2>Extracted Information</h2>
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>License Number:</strong> {result.licenseNumber}</p>
            <p><strong>Expiry Date:</strong> {result.expiryDate}</p>
            <p><strong>License Status:</strong> {result.isValidLicence ? <span style={{ color: 'green' }}>Valid <span>&#128077;</span></span> : <span style={{ color: 'red' }}>Invalid <span>&#128078;</span></span>}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
