import { useState } from 'react';
import { format } from 'date-fns';

export default function ExpenseList({ expenses, onDelete }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Special sorting for amount (number) and date
  if (sortConfig.key === 'amount') {
    sortedExpenses.sort((a, b) => {
      return sortConfig.direction === 'ascending' 
        ? a.amount - b.amount 
        : b.amount - a.amount;
    });
  }

  if (sortConfig.key === 'date') {
    sortedExpenses.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortConfig.direction === 'ascending' 
        ? dateA - dateB 
        : dateB - dateA;
    });
  }

  return (
    <div className="list-card">
      <h2>Your expenses</h2>
      <div className="expense-table">
        <table>
          <thead>
            <tr>
            <th onClick={() => requestSort('expense')}>
                Expenses {sortConfig.key === 'expense' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => requestSort('description')}>
                Description {sortConfig.key === 'description' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => requestSort('category')}>
                Category {sortConfig.key === 'category' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => requestSort('amount')}>
                Amount(Ksh){sortConfig.key === 'amount' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th onClick={() => requestSort('date')}>
                Date {sortConfig.key === 'date' && (
                  <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.length > 0 ? (
              sortedExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.expense}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td className="amount-cell">KSh {expense.amount.toFixed(2)}</td>
                  <td>{format(new Date(expense.date), 'MMM dd, yyyy')}</td>
                  <td>
                    <button 
                      onClick={() => onDelete(expense.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-state">
                <td colSpan="5">
                  <div className="empty-message">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M3 3h18v18H3zM8 8v8m8-8v8" />
                    </svg>
                    <p>No expenses recorded yet</p>
                    <small>Add your first expense to get started</small>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}