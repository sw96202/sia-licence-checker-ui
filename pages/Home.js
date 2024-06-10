import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import Result from '../components/Result';

function Home() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
  };

  return (
    <div>
      <h1>SIA Licence Checker</h1>
      <UploadForm onResult={handleResult} />
      {result && <Result data={result} />}
    </div>
  );
}

export default Home;
