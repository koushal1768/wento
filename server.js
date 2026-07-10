const https = require('https');
const app = require('./app.js');

const PORT = process.env.PORT || 5000;
const server = https.createServer(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
