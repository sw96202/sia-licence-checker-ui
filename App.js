import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LogoMain from './LogoMain.png';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Failed to upload image or process license data.');
    } finally {
      setIsLoading(false);
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
          <div>
            <label htmlFor="file">Upload an image:</label>
            <input type="file" id="file" onChange={handleFileChange} />
          </div>
          <button type="submit" disabled={isLoading}>Submit</button>
        </form>
        {isLoading && <p>Loading...</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {result && (
          <div>
            <h2>Result</h2>
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>License Number:</strong> {result.licenceNumber}</p>
            <p><strong>Expiry Date:</strong> {result.expiryDate}</p>
            <p><strong>License Status:</strong> 
              {result.isValidLicence ? (
                <span style={{ color: 'green' }}>Valid <span>&#128077;</span></span>
              ) : (
                <span style={{ color: 'red' }}>Invalid <span>&#128078;</span></span>
              )}
            </p>
            <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
