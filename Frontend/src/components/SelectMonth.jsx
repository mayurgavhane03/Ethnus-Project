import React from 'react';

const SelectMonth = ({ setMonth }) => {
    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    return (
        <select
            onChange={(e) => setMonth(e.target.value)}
            defaultValue="03"
            className="border rounded px-4 py-2"
        >
            {months.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
            ))}
        </select>
    );
};

export default SelectMonth;
