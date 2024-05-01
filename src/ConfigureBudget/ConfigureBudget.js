import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConfigureBudget() {
    const [budgetItem, setBudgetItem] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const [budgetItems, setBudgetItems] = useState([]);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const handleDelete = async (item) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            await axios.delete(`http://localhost:3001/deleteBudget/${item._id}`);
            setBudgetItems(budgetItems.filter(budgetItem => budgetItem._id !== item._id));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const budgetData = { 
            title: budgetItem, 
            budget: budgetAmount,
            color: getRandomColor()
        };
        await axios.post('http://localhost:3001/addNewBudget', budgetData);
        setBudgetItem('');
        setBudgetAmount('');
    };

    useEffect(() => {
        const fetchBudget = async () => {
            const response = await axios.get('http://localhost:3001/budget');
            setBudgetItems(response.data);
        };
        fetchBudget();
    }, []);

    return (
        <div>
            <h1>Configure Your Budget</h1>
            <h2>Add New Budget Item</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="budgetItem">Budget Item:</label>
                <input type="text" id="budgetItem" name="budgetItem" required value={budgetItem} onChange={e => setBudgetItem(e.target.value)} />
                <label htmlFor="budgetAmount">Budget Amount:</label>
                <input type="number" id="budgetAmount" name="budgetAmount" required value={budgetAmount} onChange={e => setBudgetAmount(e.target.value)} />
                <button type="submit">Add Budget Item</button>
            </form>
            <h2>Current Budget Items</h2>
            {budgetItems.map(item => (
                <div key={item._id}>
                <h3>{item.title}: {item.budget}</h3>
                <button onClick={() => handleDelete(item)}>Delete</button>
            </div>
))}
        </div>
    );
}

export default ConfigureBudget;