import React, { useState } from 'react';

const SearchBar = ({ setSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setSearch(e.target.value);
        console.log('Search term:',    e.target.value); 
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearch('');
    };

    return (
        <div className="flex">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search transaction"
                className="border rounded px-4 py-2"
            />
            <button
                onClick={clearSearch}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
            >
                Clear
            </button>
        </div>
    );
};

export default SearchBar;
