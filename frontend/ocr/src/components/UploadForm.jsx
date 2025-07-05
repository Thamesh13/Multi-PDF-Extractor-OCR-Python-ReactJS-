import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({ onResult, onFileSelect }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file.");
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://127.0.0.1:5000/upload", formData);
    onResult(res.data);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      const reader = new FileReader();
      reader.onload = () => {
        const typedArray = new Uint8Array(reader.result);
        onFileSelect(typedArray); // ✅ Pass byte array to PdfPreview
      };
      reader.readAsArrayBuffer(selected);
    }
  };

  return (
    <div className="text-center my-5">
      <h3 className="mb-4">📤 Upload PDF for OCR</h3>
      <input
        type="file"
        accept=".pdf"
        className="form-control w-50 mx-auto mb-3"
        onChange={handleFileChange}
      />
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload & Extract
      </button>
    </div>
  );
}

export default UploadForm;
