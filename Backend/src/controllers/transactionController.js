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

const listTransactions = async (req, res) => {
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
            query.$expr = {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
            };
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
};


const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;
        const query = {};

        if (month) {
            query.$expr = {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
            };
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
};


const getBarChart = async (req, res) => {
    try {
        const { month } = req.query;
        const query = {};

        if (month) {
            query.$expr = {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
            };
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
};


const getPieChart = async (req, res) => {
    try {
        const { month } = req.query;
        const query = {};

        if (month) {
            query.$expr = {
                $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
            };
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
};


async function getCombinedData(req, res) {
    try {
        const { month } = req.query;

        const [statistics, barChart, pieChart] = await Promise.all([
            getStatistics(req, res),
            getBarChart(req, res),
            getPieChart(req, res)
        ]);

        res.status(200).json({
            statistics,
            barChart,
            pieChart,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    initializeDatabase,
    listTransactions,
    getStatistics,
    getBarChart,
    getPieChart,
    getCombinedData,
};
