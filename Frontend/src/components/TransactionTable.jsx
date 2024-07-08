import React from 'react';

const TransactionTable = ({ transactions }) => {
    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Category</th>
                    <th className="py-2 px-4 border-b">Sold</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction._id}>
                        <td className="py-2 px-4 border-b">{transaction._id}</td>
                        <td className="py-2 px-4 border-b">{transaction.title}</td>
                        <td className="py-2 px-4 border-b">{transaction.description}</td>
                        <td className="py-2 px-4 border-b">{transaction.price}</td>
                        <td className="py-2 px-4 border-b">{transaction.category}</td>
                        <td className="py-2 px-4 border-b">{transaction.sold ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
