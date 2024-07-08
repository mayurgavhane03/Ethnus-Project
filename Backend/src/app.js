const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');
const { databaseUrl } = require('./config');
const cors = require('cors')
const app = express();

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));
app.use(cors())
app.use(express.json());
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
