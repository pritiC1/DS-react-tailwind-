from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  
CORS(app, resources={r"/search": {"origins": "http://127.0.0.1:5500"}})

API_KEY = "AIzaSyDuxRjT3F18cKXbEOd0lYqB_I2zvasJif0"
SEARCH_ENGINE_ID = "557ab21bc4c824390"

@app.route('/search', methods=['POST'])
def search():
    user_input = request.json.get('query')
    if not user_input:
        return jsonify({"error": "No query provided"}), 400

    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": API_KEY,
        "cx": SEARCH_ENGINE_ID,
        "q": user_input,
    }

    # Make a request to Google's Custom Search API
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        search_results = response.json()
        # Extract necessary fields from the response
        items = [
            {"title": item.get("title"), "link": item.get("link")}
            for item in search_results.get("items", [])
        ]
        return jsonify({"items": items})  # Send extracted results to the frontend
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to fetch results", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
