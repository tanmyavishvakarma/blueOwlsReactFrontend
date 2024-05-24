
# Project Name
Tanmya Vishvakarma Blue Owls Frontend

## Prerequisites
Make sure you have the following software installed on your machine:
- Git
- Node.js (which includes npm)

## Getting Started

### Step 1: Clone the Repository
First, you need to clone the repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/tanmyavishvakarma/blueOwlsReactFrontend.git
```
### Step 2: Navigate to the Project Directory
Change your directory to the project folder:

```bash
cd blueOwlsReactFrontend
```
### Step 3: Install Dependencies
Once you are in the project directory, install the necessary dependencies using npm:

```bash
npm install
```

### Step 4: Start the React Application
After the dependencies are installed, you can start the React application with the following command:

```bash
npm start
```

### Step 5: To connect to local FastApi server
Change 
```bash
const API_URL = 'https://blueowlsfastapibackend.onrender.com';
```
to
```bash
const API_URL = 'http://127.0.0.1:8000';
```
in ```src/api/index.js```

You have to handle ```CORS``` in your browswer using a chrome extention or a browser script
