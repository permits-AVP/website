const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure requests directory exists
const requestsDir = path.join(__dirname, 'requests');
if (!fs.existsSync(requestsDir)) {
    fs.mkdirSync(requestsDir);
}

// Handle form submission
app.post('/submit-request', (req, res) => {
    const { name, email, service, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `request_${timestamp}.txt`;
    const filePath = path.join(requestsDir, filename);

    const fileContent = `
Request Received: ${new Date().toLocaleString()}
------------------------------------------------
Name: ${name}
Email: ${email}
Service: ${service || 'Not specified'}
Message:
${message || 'No message provided'}
------------------------------------------------
`;

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error saving file:', err);
            return res.status(500).json({ error: 'Failed to save request' });
        }
        console.log(`Request saved: ${filename}`);
        res.status(200).json({ message: 'Request submitted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
