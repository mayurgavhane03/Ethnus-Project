const axios = require('axios');
const Transaction = require('../models/transaction');
const { apiUrl } = require('../config');

async function initializeDatabase(req, res) {
    try {
        const response = await axios.get(apiUrl);
        const transactions = response.data;
        
      //deleting older dataa
        await Transaction.deleteMany();

       //inserting new dta 
        await Transaction.insertMany(transactions);

        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    initializeDatabase,
};
