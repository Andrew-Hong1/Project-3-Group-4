from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/', methods=['GET'])
def root():
    """List of available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/fetch_geojson<br/>"
    )

@app.route('/fetch_geojson', methods=['GET'])
def fetch_geojson():
    try:
        geojson_url = "https://s3.us-east-1.amazonaws.com/hdx-production-filestore/resources/7234d067-2d74-449a-9c61-22ae6d98d928/volcano.json?AWSAccessKeyId=AKIAXYC32WNAS5V67V55&Signature=CEYaPBMw7cZeR1gQuDfFRxWpv5A%3D&Expires=1696462535"
        response = requests.get(geojson_url)

        if response.status_code == 200:
            geojson_data = response.json()  # Assuming the response contains valid GeoJSON
            return jsonify(geojson_data), 200, {'Content-Type': 'application/json'}
        else:
            return jsonify({'error': 'Failed to fetch GeoJSON data'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

    