from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from ocr_engine import extract_fields

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Perform OCR + save JSON
    json_data = extract_fields(file_path)

    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
