from flask import Flask, request, jsonify, send_from_directory
import os
from dotenv import load_dotenv
from db_connection import supabase
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Serve static files
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

# API endpoint to save a transaction
@app.route('/api/transactions', methods=['POST'])
def save_transaction():
    data = request.json
    expression = data.get('expression')
    result = data.get('result')
    
    if not expression or not result:
        return jsonify({'error': 'Expression and result are required'}), 400
    
    try:
        response = supabase.table('transactions').insert({"expression": expression, "result": result}).execute()
        
        if hasattr(response, 'error') and response.error:
            raise Exception(response.error)
        
        return jsonify({
            'expression': expression,
            'result': result,
            'message': 'Transaction saved successfully'
        }), 201
    except Exception as e:
        print(f'Error saving transaction: {str(e)}')
        return jsonify({'error': 'Failed to save transaction'}), 500

# API endpoint to get all transactions
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    try:
        response = supabase.table('transactions').select('*').order('created_at', desc=True).execute()
        
        if hasattr(response, 'error') and response.error:
            raise Exception(response.error)
        
        return jsonify(response.data), 200
    except Exception as e:
        print(f'Error fetching transactions: {str(e)}')
        return jsonify({'error': 'Failed to fetch transactions'}), 500

# Start the server
if __name__ == '__main__':
    print('Database connection initialized')
    app.run(host='0.0.0.0', port=3000, debug=True)