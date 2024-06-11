import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import LogoMain from './LogoMain.png';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(`${backendUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error:', error.message);
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
                    <div>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {previewUrl && (
                    <div>
                        <h2>Image Preview:</h2>
                        <img src={previewUrl} alt="Selected File" style={{ width: '300px', height: 'auto' }} />
                    </div>
                )}
                {result && (
                    <div>
                        <h2>Results:</h2>
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
                                            <span style={{ color: 'green' }}>Valid <span role="img" aria-label="thumbs up">👍</span></span>
                                        ) : (
                                            <span style={{ color: 'red' }}>Invalid <span role="img" aria-label="thumbs down">👎</span></span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
