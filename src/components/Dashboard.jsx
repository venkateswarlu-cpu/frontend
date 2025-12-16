// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch groups and expenses from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, expensesRes] = await Promise.all([
          axios.get("https://backend-999.onrender.com/api/groups"),
          axios.get("https://backend-999.onrender.com/api/expenses"),
        ]);
        setGroups(groupsRes.data);
        setExpenses(expensesRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h2>Groups</h2>
      {groups.length === 0 ? (
        <p>No groups yet</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group._id}>{group.name}</li>
          ))}
        </ul>
      )}

      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{expense.group?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
