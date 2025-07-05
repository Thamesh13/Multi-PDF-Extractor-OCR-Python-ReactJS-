import pytesseract
from pdf2image import convert_from_path
import os
import json

# 👇 Add the path manually here
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_fields(pdf_path):
    pages = convert_from_path(pdf_path)

    result = {
        "file": os.path.basename(pdf_path),
        "fields": [],
        "rawText": ""
    }

    all_text = ""

    for i, page in enumerate(pages):
        text = pytesseract.image_to_string(page)
        all_text += f"\n\n--- Page {i + 1} ---\n{text}"
        result["fields"].append({
            "page": i + 1,
            "pageText": text.strip()
        })

    result["rawText"] = all_text.strip()

    # ✅ Save the JSON
    output_folder = os.path.abspath(os.path.join(os.path.dirname(pdf_path), '..', 'extracted_data'))
    os.makedirs(output_folder, exist_ok=True)

    json_file_name = os.path.basename(pdf_path) + ".json"
    json_path = os.path.join(output_folder, json_file_name)

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=4)

    print(f"[✔] JSON saved to: {json_path}")

    return result
