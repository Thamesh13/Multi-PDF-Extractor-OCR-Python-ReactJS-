import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import PdfPreview from './components/PdfPreview';
import JsonViewer from './components/JsonViewer';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="container text-center py-4">
      <h2 className="mb-4">🧠 Smart OCR Dashboard</h2>
      <UploadForm onResult={setJsonData} onFileSelect={setSelectedFile} />
      {/* <PdfPreview file={selectedFile} /> */}
      {jsonData && <JsonViewer data={jsonData} />}
    </div>
  );
}

export default App;
