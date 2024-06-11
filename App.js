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
          <div className="result">
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{result.name}</td>
                </tr>
                <tr>
                  <td>License Number:</td>
                  <td>{result.licenceNumber}</td>
                </tr>
                <tr>
                  <td>Expiry Date:</td>
                  <td>{result.expiryDate}</td>
                </tr>
                <tr>
                  <td>License Status:</td>
                  <td>
                    {result.isValidLicence ? (
                      <span style={{ color: 'green' }}>
                        Valid <span role="img" aria-label="thumbs up">👍</span>
                      </span>
                    ) : (
                      <span style={{ color: 'red' }}>
                        Invalid <span role="img" aria-label="thumbs down">👎</span>
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {selectedFile && (
              <div>
                <h2>Uploaded Image</h2>
                <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
