# iOS-Style Calculator Web App with Transaction History

A web application that replicates the look and feel of the iOS calculator app with its characteristic dark theme and orange operation buttons. Now with backend integration to store calculation history in a Supabase database.

## Features

- iOS-inspired design with dark theme and orange operation buttons
- Basic arithmetic operations: addition, subtraction, multiplication, and division
- Additional iOS calculator functions: percentage and sign toggle
- Responsive design that mimics the iOS calculator layout
- Keyboard support
- Error handling for invalid operations
- Supabase database integration for storing calculation history
- Transaction history display with refresh functionality

## How to Use

### Setting Up the Application

1. Clone or download this repository
2. Open the project folder
3. Create a Python virtual environment:
   ```
   python3 -m venv venv
   ```
4. Activate the virtual environment:
   ```
   source venv/bin/activate
   ```
5. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
6. Create a table in Supabase using the SQL in `supabase-schema.sql`
7. Start the backend server:
   ```
   python app.py
   ```
8. In a separate terminal, start the frontend server:
   ```
   python -m http.server 8000
   ```
9. Open your browser and navigate to `http://localhost:8000`

## Deployment

For comprehensive deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md) which covers:
- Local production deployment
- Cloud platforms (Render, Heroku, Railway, Vercel)
- Production environment setup
- Security considerations
- Monitoring and troubleshooting

### Using the Calculator

- Click on the number buttons to input numbers
- Click on the operation buttons (+, −, ×, ÷) to perform operations
- Click on the equals (=) button to calculate the result
- Click on the AC button to clear the display
- Click on the +/- button to toggle between positive and negative numbers
- Click on the % button to convert a number to percentage
- View your calculation history in the Transaction History section below the calculator
- Click the "Refresh History" button to update the transaction history

### Keyboard Support

- Numbers: 0-9
- Operations: +, -, *, /
- Calculate: Enter or =
- Clear: Escape
- Toggle sign: 's' key
- Percentage: 'p' or '%' key

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- Supabase
- Flask-CORS (for cross-origin requests)

## Design Inspiration

- This calculator is designed to replicate the iOS calculator app appearance and functionality
- Features the characteristic dark theme with orange operation buttons
- Follows iOS calculator layout and interaction patterns

## File Structure

### Frontend
- `index.html` - The main HTML structure with iOS-style button layout and transaction history section
- `styles.css` - CSS styling to match iOS calculator appearance and transaction history display
- `script.js` - JavaScript functionality including iOS-specific features and API calls to backend

### Backend
- `app.py` - Flask server setup with API endpoints for transactions
- `db_connection.py` - Supabase client configuration
- `supabase-schema.sql` - SQL schema for the Supabase database
- `requirements.txt` - Python dependencies
- `README.md` - This file