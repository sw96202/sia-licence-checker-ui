import React, { useState } from 'react';
import './App.css';
import logo from './LogoMain.png'; // Make sure you have your logo image in the src folder

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file)); // Set preview image
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);

    try {
      const response = await fetch('http://localhost:10000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <img src={logo} alt="Virtulum Logo" className="logo" />
        <h1>Virtulum SIA Licence Checker</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" id="upload" onChange={handleImageChange} />
        <label htmlFor="upload">Choose an image</label>
        {preview && <img src={preview} alt="Selected" className="preview-image" />}
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
      {result && (
        <div className="result-container">
          <h2>Result:</h2>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>License Number:</strong> {result.licenseNumber}</p>
          <p><strong>Expiry Date:</strong> {result.expiryDate}</p>
          <p><strong>License Status:</strong> {result.isValidLicence ? <span style={{ color: 'green' }}>Valid 👍</span> : <span style={{ color: 'red' }}>Invalid 👎</span>}</p>
          {result.imageUrl && <img src={`http://localhost:10000${result.imageUrl}`} alt="Uploaded" className="result-image" />}
        </div>
      )}
    </div>
  );
};

export default App;
