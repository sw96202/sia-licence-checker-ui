import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Logo from './LogoMain.png';

function App() {
  const [image, setImage] = useState(null);
  const [licenseData, setLicenseData] = useState(null);
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!image) {
      setError('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('https://your-backend-url/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setLicenseData(response.data);
    } catch (err) {
      setError('Failed to upload image or process license data.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <h1>Virtulum SIA Licence Checker</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
        {licenseData && (
          <div>
            <h2>Extracted Information</h2>
            <p><strong>Name:</strong> {licenseData.name}</p>
            <p><strong>License Number:</strong> {licenseData.licenseNumber}</p>
            <p><strong>Expiry Date:</strong> {licenseData.expiryDate}</p>
            <p><strong>License Status:</strong> {licenseData.isValidLicence ? 'Valid 👍' : 'Invalid 👎'}</p>
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
