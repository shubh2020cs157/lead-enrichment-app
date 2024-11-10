from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app) 

# Define your third-party API URL and API Key
API_URL = "https://linkedin-bulk-data-scraper.p.rapidapi.com/private_company_insights_2"
API_KEY = "d51356500dmsh1e05aea5f04271ep171f97jsn6ec1a519e713"

@app.route('/api/enrich', methods=['POST'])
def enrich_data():
    try:
        # Get JSON data from the request
        data = request.json
        company_name = data.get('company_name')
        website_url = data.get('website_url')

        # Validate the input data
        if not company_name or not website_url:
            return jsonify({"error": "Company name and website URL are required."}), 400

        # Make the API request to the third-party API
        response = requests.get(API_URL, params={
            'company_name': company_name,
            'website_url': website_url
        }, headers={
            'Authorization': f"Bearer {API_KEY}"
        })

        # Check if the third-party API responded successfully
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"error": "Failed to fetch enriched data."}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
