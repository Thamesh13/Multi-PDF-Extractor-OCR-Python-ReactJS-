import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfPreview({ file }) {
  const [numPages, setNumPages] = useState(null);

  if (!file) return null;

  const handleLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="text-center my-4">
      <h4 className="mb-3">📄 Uploaded PDF Preview</h4>
      <div className="d-flex justify-content-center flex-wrap">
        <Document
          file={{ data: file }} // ✅ Required format
          onLoadSuccess={handleLoadSuccess}
          loading="Loading PDF..."
          error="⚠ Failed to load PDF."
        >
          {Array.from(new Array(numPages), (_, i) => (
            <div className="m-2 border rounded shadow" key={i}>
              <Page pageNumber={i + 1} width={300} />
              <p className="text-muted">Page {i + 1}</p>
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

export default PdfPreview;
