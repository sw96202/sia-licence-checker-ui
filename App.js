import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './LogoMain.png';

function App() {
    const [image, setImage] = useState(null);
    const [licenseData, setLicenseData] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setError('Please select an image to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('https://sia-licence-checker-backend.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLicenseData(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to upload image or process license data.');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} alt="Virtulum Logo" className="App-logo" />
                <h1>Virtulum SIA Licence Checker</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button type="submit">Upload Image</button>
                </form>
                {error && <p className="error">{error}</p>}
                {licenseData && (
                    <div className="results">
                        <h2>Extracted Information</h2>
                        <p><strong>Name:</strong> {licenseData.name}</p>
                        <p><strong>License Number:</strong> {licenseData.licenseNumber}</p>
                        <p><strong>Expiry Date:</strong> {licenseData.expiryDate}</p>
                        <p><strong>License Status:</strong> {licenseData.status === 'Valid' ? (
                            <span style={{ color: 'green' }}>Valid <span>&#128077;</span></span>
                        ) : (
                            <span style={{ color: 'red' }}>Invalid <span>&#128078;</span></span>
                        )}</p>
                        {licenseData.imagePath && (
                            <div>
                                <h3>Uploaded Image</h3>
                                <img src={`https://sia-licence-checker-backend.onrender.com/${licenseData.imagePath}`} alt="Uploaded" />
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
