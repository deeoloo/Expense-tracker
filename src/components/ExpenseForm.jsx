import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const categories = ['Food', 'Utilities', 'Shopping', 'Transport', 'Finance', 'Other'];

export default function ExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    expense: '',  // Changed from 'Expenses' to 'expense' for consistency
    description: '',
    amount: '',
    category: '', // Initialize with first category
    date: null // Initialize as null for DatePicker
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date) {
      alert('Please select a date');
      return;
    }

    const newExpense = {
      id: uuidv4(),
      expense: formData.expense,
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: format(formData.date, 'MM/dd/yyyy'), // Properly format the date
    };

    onSubmit(newExpense);
    setFormData({
      expense: '',
      description: '',
      amount: '',
      category: '',
      date: null
    });
  };

  return (
    <div className="expense-form-card">
      <h2>AddExpense</h2>
      <h4>Enter your expense details below</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="expense"
            value={formData.expense}
            onChange={handleChange}
            placeholder="Enter your expense"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter your expense description"
            required
          />
        </div>

        <div className="form-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
              <option value="" disabled>Expense category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter the amount"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <div className="date-picker-wrapper">
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              placeholderText="MM/dd/yyyy"
              dateFormat="MM/dd/yyyy"
              className="date-input"
              required
            />
            <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}