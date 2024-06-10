import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LogoMain from './LogoMain.png';

const App = () => {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    }

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await axios.post('http://localhost:10000/upload', data);
      setResult(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={LogoMain} className="App-logo" alt="logo" />
        <h1>Virtulum SIA Licence Checker</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="file-input-label">
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Preview" className="image-preview" />
            ) : (
              'Upload Image'
            )}
          </label>
          {file && <button type="submit">Submit</button>}
        </form>
        {loading && <p>Loading...</p>}
        {result && (
          <div>
            <h2>Extracted Information</h2>
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{result.name}</td>
                </tr>
                <tr>
                  <td>License Number:</td>
                  <td>{result.licenseNumber}</td>
                </tr>
                <tr>
                  <td>Expiry Date:</td>
                  <td>{result.expiryDate}</td>
                </tr>
                <tr>
                  <td>License Status:</td>
                  <td style={{ color: result.isValidLicence ? 'green' : 'red' }}>
                    {result.isValidLicence ? 'Valid 👍' : 'Invalid 👎'}
                  </td>
                </tr>
              </tbody>
            </table>
            <img src={imagePreviewUrl} alt="Uploaded" className="uploaded-image" />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
