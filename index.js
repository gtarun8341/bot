const express = require('express');
const app = express();
const webhook = require('./api/webhook');

app.use(express.json());
app.use('/api/webhook', webhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
