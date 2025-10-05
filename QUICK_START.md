# 🚀 Quick Start Guide

## TL;DR - Get Running in 5 Minutes

### 1. Install Prerequisites
- **Node.js**: Download from [nodejs.org](https://nodejs.org/) (LTS version)
- **SQL Server**: Use Docker (easiest):
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```

### 2. Setup Project
```bash
# Navigate to project
cd C:\Users\Piyush\nodejs-crud-api

# Install dependencies
npm install

# Edit config.env with your SQL Server password
# Replace "YourStrong@Passw0rd" with your actual password
```

### 3. Run the Project
```bash
npm run dev
```

### 4. Test the API
```bash
# In another terminal
node test-api.js
```

**That's it!** Your API is running at `http://localhost:3000`

## 🔗 Quick API Test

Open your browser and go to:
- **API Info**: http://localhost:3000
- **Health Check**: http://localhost:3000/health

## 📝 Quick Test with cURL

```bash
# Create a user
curl -X POST http://localhost:3000/api/v1/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'

# Get all users
curl http://localhost:3000/api/v1/users
```

## ❗ Important Notes

1. **SQL Server Password**: Make sure to update the password in `config.env`
2. **Port 3000**: If it's busy, change PORT in `config.env` to 3001
3. **Database**: The app creates the database and table automatically

## 🆘 Need Help?

Check the full `SETUP_GUIDE.md` for detailed instructions and troubleshooting!
