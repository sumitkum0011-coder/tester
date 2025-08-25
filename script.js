// Initialize the calculator
window.onload = function() {
    clearResult();
    fetchTransactionHistory();
};

// Get the result input element
const resultInput = document.getElementById('result');

// Track if we're starting a new input after calculation
let startNewInput = false;

// Function to append characters to the result
function appendToResult(value) {
    // If we're starting a new input after calculation and the input is a number
    if (startNewInput && /[0-9]/.test(value)) {
        resultInput.value = value;
        startNewInput = false;
        return;
    }
    
    // If we're starting a new input after calculation and the input is an operator
    if (startNewInput && /[+\-*/]/.test(value)) {
        startNewInput = false;
    }
    
    // If the current value is '0', replace it with the new value (except for decimal point)
    if (resultInput.value === '0' && value !== '.') {
        resultInput.value = value;
    } else {
        resultInput.value += value;
    }
}

// Function to clear the result
function clearResult() {
    resultInput.value = '0';
    startNewInput = false;
}

// Function to toggle the sign (positive/negative)
function toggleSign() {
    if (resultInput.value !== '0') {
        if (resultInput.value.startsWith('-')) {
            resultInput.value = resultInput.value.substring(1);
        } else {
            resultInput.value = '-' + resultInput.value;
        }
    }
}

// Function to calculate percentage
function calculatePercent() {
    try {
        const value = parseFloat(resultInput.value);
        resultInput.value = (value / 100).toString();
    } catch (error) {
        resultInput.value = 'Error';
        setTimeout(clearResult, 1500);
    }
}

// Function to save transaction to the backend
async function saveTransaction(expression, result) {
    try {
        const apiUrl = window.location.origin.includes('localhost') ? 'http://localhost:5001' : '';
        const response = await fetch(`${apiUrl}/api/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression, result })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save transaction');
        }
        
        const data = await response.json();
        console.log('Transaction saved:', data);
        
        // Refresh the transaction history after saving
        fetchTransactionHistory();
    } catch (error) {
        console.error('Error saving transaction:', error);
    }
}

// Function to fetch and display transaction history
async function fetchTransactionHistory() {
    try {
        const apiUrl = window.location.origin.includes('localhost') ? 'http://localhost:5001' : '';
        const response = await fetch(`${apiUrl}/api/transactions`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }
        
        const transactions = await response.json();
        const historyContainer = document.getElementById('transaction-history');
        
        // Clear previous history
        historyContainer.innerHTML = '';
        
        if (transactions.length === 0) {
            historyContainer.innerHTML = '<p>No transactions yet.</p>';
            return;
        }
        
        // Create a table to display transactions
        const table = document.createElement('table');
        table.className = 'history-table';
        
        // Add table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Expression</th>
                <th>Result</th>
                <th>Time</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Add table body with transactions
        const tbody = document.createElement('tbody');
        
        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            
            // Format the timestamp
            const date = new Date(transaction.created_at || transaction.timestamp);
            const formattedDate = date.toLocaleString();
            
            row.innerHTML = `
                <td>${transaction.expression}</td>
                <td>${transaction.result}</td>
                <td>${formattedDate}</td>
            `;
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        historyContainer.appendChild(table);
        
    } catch (error) {
        console.error('Error fetching transactions:', error);
        document.getElementById('transaction-history').innerHTML = 
            '<p>Failed to load transaction history. Please try again later.</p>';
    }
}

// Function to calculate the result
function calculate() {
    try {
        // Get the original expression for saving to database
        const originalExpression = resultInput.value;
        
        // Replace × with * and − with - for JavaScript evaluation
        let expression = originalExpression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            throw new Error('Division by zero');
        }
        
        // Format the result to avoid extremely long decimals
        if (result.toString().includes('.')) {
            result = parseFloat(result.toFixed(8));
        }
        
        // Save the transaction to the backend
        saveTransaction(originalExpression, result.toString());
        
        resultInput.value = result;
        startNewInput = true; // Set flag to start new input after calculation
    } catch (error) {
        resultInput.value = 'Error';
        setTimeout(clearResult, 1500);
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and operators
    if (/[0-9+\-*/.=]/.test(key)) {
        event.preventDefault();
        if (key === '=') {
            calculate();
        } else if (key === '*') {
            appendToResult('*');
        } else if (key === '/') {
            appendToResult('/');
        } else {
            appendToResult(key);
        }
    }
    
    // Enter key for calculation
    else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    }
    
    // Escape key for clear
    else if (key === 'Escape') {
        event.preventDefault();
        clearResult();
    }
    
    // 'p' key for percentage
    else if (key === 'p' || key === '%') {
        event.preventDefault();
        calculatePercent();
    }
    
    // 's' key for sign toggle
    else if (key === 's') {
        event.preventDefault();
        toggleSign();
    }
});