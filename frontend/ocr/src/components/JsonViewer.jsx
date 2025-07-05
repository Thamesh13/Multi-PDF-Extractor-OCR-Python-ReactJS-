import React from 'react';

function JsonViewer({ data }) {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data.file || "ocr-output"}.json`;
    link.click();
  };

  return (
    <div className="container my-4 text-center">
      <h4 className="mb-4">Extracted Text</h4>

      <div className="text-start">
        {data.fields.map((field, index) => (
          <div className="card mb-3 mx-auto w-75 shadow" key={index}>
            <div className="card-header bg-light">
              <strong>Page {field.page}</strong>
            </div>
            <div className="card-body">
              <pre className="text-muted">{field.pageText}</pre>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-3" onClick={downloadJson}>
        Download JSON
      </button>
    </div>
  );
}

export default JsonViewer;
