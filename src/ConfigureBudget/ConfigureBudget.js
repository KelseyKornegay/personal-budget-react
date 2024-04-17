import React from 'react';

function ConfigureBudget() {
    return (
        <div>
            <h1>Configure Your Budget</h1>
            <h2>Add New Budget Item</h2>
            <form>
                <label htmlFor="budgetItem">Budget Item:</label>
                <input type="text" id="budgetItem" name="budgetItem" required />
                <label htmlFor="budgetAmount">Amount:</label>
                <input type="number" id="budgetAmount" name="budgetAmount" required />
                <button type="submit">Add Budget Item</button>
                </form>
        </div>

    );
}

export default ConfigureBudget;