import React, { useState } from 'react';
import './App.css';
import { states, statesWith8PercentTax, statesWith5PercentTax } from './store/data';

const App = () => {
  const [items, setItems] = useState([{ name: '', cost: '' }]);
  const [selectedState, setSelectedState] = useState('');
  const [total, setTotal] = useState(0);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    calculateTotal(newItems, selectedState);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', cost: '' }]);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    calculateTotal(items, state);
  };

  const calculateTotal = (items, state) => {
    const subtotal = items.reduce((acc, item) => {
      const cost = parseFloat(item.cost);
      return acc + (isNaN(cost) ? 0 : cost);
    }, 0);

    let taxRate = 0;
    if (statesWith8PercentTax.includes(state)) {
      taxRate = 0.08;
    } else if (statesWith5PercentTax.includes(state)) {
      taxRate = 0.05;
    }

    const totalWithTax = subtotal + subtotal * taxRate;
    setTotal(totalWithTax.toFixed(2));
  };

  return (
    <div className="App">
      <h1>Purchase Tax Calculator</h1>
      <div className="item-list">
        {items.map((item, index) => (
          <div key={index} className="item-input">
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Item Cost"
              value={item.cost}
              onChange={(e) => handleItemChange(index, 'cost', e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <div className="state-select">
        <label>Select State: </label>
        <select onChange={handleStateChange} value={selectedState}>
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="total-display">
        <h2>Total: ${total}</h2>
      </div>
    </div>
  );
};

export default App;
