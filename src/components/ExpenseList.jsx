import React from 'react'

const ExpenseList = ({ expenses }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <ul>
          {expenses.map((e) => (
            <li key={e._id}>
              {e.name} - ${e.amount} ({e.group?.name || 'No Group'})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ExpenseList
