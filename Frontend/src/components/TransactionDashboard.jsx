import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionTable from './TransactionTable';
import SearchBar from './SearchBar';
import SelectMonth from './SelectMonth';

const TransactionDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [month, setMonth] = useState('03'); // Default to March
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(2);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/transactions', {
                params: {
                    page,
                    perPage,
                    search,
                    month,
                }
            });
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error('Error fetching transactions', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [search, month, page,perPage]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Transaction Dashboard</h1>
            <div className="flex justify-between mb-4">
                <SearchBar setSearch={setSearch} />
                <SelectMonth setMonth={setMonth} />
            </div>
            <TransactionTable transactions={transactions} />
            <div className="flex justify-between mt-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>
                <span>Page No: {page}</span>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Next
                </button>
            </div>
            <div className="mt-4">
                <span>Per Page: </span>
                <select
                    value={perPage}
                    onChange={(e) => setPerPage(parseInt(e.target.value))}
                    className="border rounded px-2 py-1"
                >
                    {[2, 5, 10, 15, 20].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TransactionDashboard;
