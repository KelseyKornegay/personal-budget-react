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
            await axios.delete(`http://18.189.17.100:3001/deleteBudget/${item._id}`);
            setBudgetItems(budgetItems.filter(budgetItem => budgetItem._id !== item._id));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const budgetData = { 
            title: budgetItem, 
            budget: budgetAmount,
            color: getRandomColor(),
            userID: localStorage.getItem('UserID') 
        };
        await axios.post('http://18.189.17.100:3001/addNewBudget', budgetData);
        setBudgetItem('');
        setBudgetAmount('');
    };

    useEffect(() => {
        const userID=localStorage.getItem('UserID');
        const fetchBudget = async () => {
            const response = await axios.post('http://18.189.17.100:3001/budget',{userID});
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
            <h2>Current Alloted Budget Items </h2>
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




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ConfigureBudget() {
//     const [budgetItem, setBudgetItem] = useState('');
//     const [budgetAmount, setBudgetAmount] = useState('');
//     const [budgetItems, setBudgetItems] = useState([]);

//     const token = localStorage.getItem('token'); // Get the user's token from local storage
//     const userId = localStorage.getItem('userId'); // Get the user's ID from local storage

//     const getRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//                 let color = '#';
//                 for (let i = 0; i < 6; i++) {
//                     color += letters[Math.floor(Math.random() * 16)];
//                 }
//                 return color;
//     };

//     const handleDelete = async (item) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this item?');
//         if (confirmDelete) {
//             await axios.delete(`http://localhost:3001/deleteBudget/${item._id}`);
//             setBudgetItems(budgetItems.filter(budgetItem => budgetItem._id !== item._id));
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const budgetData = { 
//             title: budgetItem, 
//             budget: budgetAmount,
//             color: getRandomColor(),
//             user: userId // Associate the budget item with the user
//         };
//         await axios.post('http://localhost:3001/addNewBudget', budgetData, {
//             headers: { Authorization: `Bearer ${token}` } // Send the user's token in the Authorization header
//         });
//         setBudgetItem('');
//         setBudgetAmount('');
//     };

//     useEffect(() => {
//         const fetchBudget = async () => {
//             const response = await axios.get(`http://localhost:3001/budget/${userId}`, { // Fetch only the user's budget items
//                 headers: { Authorization: `Bearer ${token}` } // Send the user's token in the Authorization header
//             });
//             setBudgetItems(response.data);
//         };
//         fetchBudget();
//     }, []);

//     return (
//         <div>
//             <h1>Configure Your Budget</h1>
//             <h2>Add New Budget Item</h2>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="budgetItem">Budget Item:</label>
//                 <input type="text" id="budgetItem" name="budgetItem" required value={budgetItem} onChange={e => setBudgetItem(e.target.value)} />
//                 <label htmlFor="budgetAmount">Budget Amount:</label>
//                 <input type="number" id="budgetAmount" name="budgetAmount" required value={budgetAmount} onChange={e => setBudgetAmount(e.target.value)} />
//                 <button type="submit">Add Budget Item</button>
//             </form>
//             <h2>Current Budget Items</h2>
//             {budgetItems.map(item => (
//                 <div key={item._id}>
//                 <h3>{item.title}: {item.budget}</h3>
//                 <button onClick={() => handleDelete(item)}>Delete</button>
//             </div>
// ))}
//         </div>
//     );
// }

// export default ConfigureBudget;

