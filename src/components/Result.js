import React from 'react';

function Result({ data }) {
  return (
    <div>
      <h2>Extracted Information</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>License Number:</strong> {data.licenseNumber}</p>
      <p><strong>Expiry Date:</strong> {data.expiryDate}</p>
      <p><strong>License Status:</strong> 
        {data.isValidLicence ? (
          <span style={{ color: 'green' }}>Valid <span>&#128077;</span></span>
        ) : (
          <span style={{ color: 'red' }}>Invalid <span>&#128078;</span></span>
        )}
      </p>
      <h3>Uploaded Image</h3>
      <img src={data.imageUrl} alt="Uploaded" style={{ width: '100%' }} />
    </div>
  );
}

export default Result;
