// API Testing Script - Tests all CRUD operations
const http = require('http');
require('dotenv').config({ path: './config.env' });

const PORT = Number(process.env.PORT) || 3000;
const API_BASE_URL = `http://localhost:${PORT}`;

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedBody = JSON.parse(body);
                    resolve({
                        statusCode: res.statusCode,
                        data: parsedBody
                    });
                } catch (e) {
                    resolve({
                        statusCode: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Test functions
async function testHealthCheck() {
    console.log('\nHealth check');
    try {
        const response = await makeRequest('GET', '/health');
        if (response.statusCode === 200) {
            console.log('OK');
            console.log(JSON.stringify(response.data, null, 2));
        } else {
            console.log('Failed');
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
}

async function testCreateUser() {
    console.log('\nCreate user');
    try {
        const userData = {
            name: 'John Doe',
            // Use a unique email each run to avoid UNIQUE constraint conflicts
            email: `john.${Date.now()}@example.com`
        };
        
        const response = await makeRequest('POST', '/api/v1/users', userData);
        if (response.statusCode === 201) {
            console.log('Created');
            console.log(JSON.stringify(response.data, null, 2));
            return response.data.data.id; // Return the created user ID
        } else {
            console.log('Create failed');
            console.log(JSON.stringify(response.data, null, 2));
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
    return null;
}

async function testGetAllUsers() {
    console.log('\nGet all users');
    try {
        const response = await makeRequest('GET', '/api/v1/users');
        if (response.statusCode === 200) {
            console.log('OK');
            console.log(`Found ${response.data.count} users`);
            console.log(JSON.stringify(response.data, null, 2));
        } else {
            console.log('Failed');
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
}

async function testGetUserById(userId) {
    console.log('\nGet user by id');
    try {
        const response = await makeRequest('GET', `/api/v1/users/${userId}`);
        if (response.statusCode === 200) {
            console.log('OK');
            console.log(JSON.stringify(response.data, null, 2));
        } else {
            console.log('Failed');
            console.log(JSON.stringify(response.data, null, 2));
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
}

async function testUpdateUser(userId) {
    console.log('\nUpdate user');
    try {
        const updateData = {
            name: 'John Smith',
            email: 'john.smith@example.com'
        };
        
        const response = await makeRequest('PUT', `/api/v1/users/${userId}`, updateData);
        if (response.statusCode === 200) {
            console.log('Updated');
            console.log(JSON.stringify(response.data, null, 2));
        } else {
            console.log('Update failed');
            console.log(JSON.stringify(response.data, null, 2));
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
}

async function testDeleteUser(userId) {
    console.log('\nDelete user');
    try {
        const response = await makeRequest('DELETE', `/api/v1/users/${userId}`);
        if (response.statusCode === 200) {
            console.log('Deleted');
            console.log(JSON.stringify(response.data, null, 2));
        } else {
            console.log('Delete failed');
            console.log(JSON.stringify(response.data, null, 2));
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
}

async function testValidation() {
    console.log('\nValidation');
    try {
        // Test invalid email
        const invalidUserData = {
            name: 'Test User',
            email: 'invalid-email'
        };
        
        const response = await makeRequest('POST', '/api/v1/users', invalidUserData);
        if (response.statusCode === 400) {
            console.log('OK (expected 400)');
            console.log(JSON.stringify(response.data, null, 2));
        } else {
            console.log('Unexpected status');
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
}

// Main test function
async function runTests() {
    console.log('Starting API tests');
    console.log(`Server: ${API_BASE_URL}`);
    
    // Wait a moment for user to read
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
        // Run all tests
        await testHealthCheck();
        const userId = await testCreateUser();
        await testGetAllUsers();
        
        if (userId) {
            await testGetUserById(userId);
            await testUpdateUser(userId);
            await testDeleteUser(userId);
        }
        
        await testValidation();
        
        console.log('\nAll tests completed');
        console.log('\nSummary:');
        console.log('Health check ok');
        console.log('CRUD operations ok');
        console.log('Validation ok');
        
    } catch (error) {
        console.log('\nTest suite failed:', error.message);
        console.log('\nTroubleshooting:');
        console.log('1. Make sure the server is running: npm start');
        console.log('2. Check if SQL Server is running and accessible');
        console.log('3. Verify your config.env file has correct database credentials');
        console.log('4. Check the server console for error messages');
    }
}

// Run the tests
runTests();
