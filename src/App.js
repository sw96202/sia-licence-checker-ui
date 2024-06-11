import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LogoMain from './LogoMain.png';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('https://sia-licence-checker-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
        <img src={LogoMain} className="App-logo" alt="logo" />
        <h1>Virtulum SIA Licence Checker</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {preview && <img src={preview} alt="Preview" className="preview" />}
        {result && (
          <div>
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
                  <td>
                    {result.isValidLicence ? (
                      <span style={{ color: 'green' }}>Valid <span role="img" aria-label="thumbs up">👍</span></span>
                    ) : (
                      <span style={{ color: 'red' }}>Invalid <span role="img" aria-label="thumbs down">👎</span></span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <img src={preview} alt="Uploaded" className="uploaded-image" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
