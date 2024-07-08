const axios = require('axios');
const Transaction = require('../models/transaction');
const { apiUrl } = require('../config');

async function initializeDatabase(req, res) {
    try {
        const response = await axios.get(apiUrl);
        const transactions = response.data;

        // Clear existing data
        await Transaction.deleteMany();

        // Insert new data
        await Transaction.insertMany(transactions);

        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listTransactions(req, res) {
    try {
        const { page = 1, perPage = 10, search = '', month } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: parseFloat(search) }
            ];
        }

        if (month) {
            query.dateOfSale = { $regex: `-${month}-` };
        }

        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        const total = await Transaction.countDocuments(query);

        res.status(200).json({
            transactions,
            total,
            page: parseInt(page),
            perPage: parseInt(perPage),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getStatistics(req, res) {
    try {
        const { month } = req.query;
        const query = {};

        if (month) {
            query.dateOfSale = { $regex: `-${month}-` };
        }

        const transactions = await Transaction.find(query);

        const totalSaleAmount = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
        const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
        const totalNotSoldItems = transactions.filter(transaction => !transaction.sold).length;

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getBarChart(req, res) {
    try {
        const { month } = req.query;
        const query = {};

        if (month) {
            query.dateOfSale = { $regex: `-${month}-` };
        }

        const transactions = await Transaction.find(query);
        const ranges = [
            { min: 0, max: 100, count: 0 },
            { min: 101, max: 200, count: 0 },
            { min: 201, max: 300, count: 0 },
            { min: 301, max: 400, count: 0 },
            { min: 401, max: 500, count: 0 },
            { min: 501, max: 600, count: 0 },
            { min: 601, max: 700, count: 0 },
            { min: 701, max: 800, count: 0 },
            { min: 801, max: 900, count: 0 },
            { min: 901, max: Infinity, count: 0 },
        ];

        transactions.forEach(transaction => {
            ranges.forEach(range => {
                if (transaction.price >= range.min && transaction.price <= range.max) {
                    range.count += 1;
                }
            });
        });

        res.status(200).json(ranges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getPieChart(req, res) {
    try {
        const { month } = req.query;
        const query = {};

        if (month) {
            query.dateOfSale = { $regex: `-${month}-` };
        }

        const transactions = await Transaction.find(query);

        const categoryCount = transactions.reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json(categoryCount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getCombinedData = async (req, res) => {
    const { month } = req.query;

    const filter = {};
    if (month) {
        const start = new Date(Date.UTC(2021, month - 1, 1));
        const end = new Date(Date.UTC(2021, month, 0, 23, 59, 59));
        filter.dateOfSale = { $gte: start, $lte: end };
    }

    try {
        const transactions = await Transaction.find(filter);

        // Statistics
        const totalSaleAmount = transactions.reduce((sum, t) => t.sold ? sum + t.price : sum, 0);
        const totalSoldItems = transactions.filter(t => t.sold).length;
        const totalNotSoldItems = transactions.filter(t => !t.sold).length;

        // Bar Chart Data
        const priceRanges = [
            { range: '0-100', count: 0 },
            { range: '101-200', count: 0 },
            // ... define other ranges ...
        ];

        transactions.forEach(transaction => {
            const price = transaction.price;
            if (price <= 100) priceRanges[0].count++;
            else if (price <= 200) priceRanges[1].count++;
            // ... update counts for other ranges ...
        });

        // Pie Chart Data
        const categoryCounts = transactions.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + 1;
            return acc;
        }, {});

        // Send the combined data as a single response
        res.json({
            statistics: { totalSaleAmount, totalSoldItems, totalNotSoldItems },
            barChart: priceRanges,
            pieChart: categoryCounts
        });

    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ error: 'Failed to fetch combined data' });
    }
};

module.exports = {
    initializeDatabase,
    listTransactions,
    getStatistics,
    getBarChart,
    getPieChart,
    getCombinedData,
};
