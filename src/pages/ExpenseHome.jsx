import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ExpenseHome.css";

export default function ExpenseHome() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  const [expenses, setExpenses] = useState(() => {
    if (!userEmail) return [];
    const saved = localStorage.getItem(`expenses_${userEmail}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // 🔐 Protect page
  useEffect(() => {
    if (!token || !userEmail) {
      navigate("/login");
    }
  }, [token, userEmail, navigate]);

  // ✅ Save expenses per user
  useEffect(() => {
    if (!userEmail) return;
    localStorage.setItem(
      `expenses_${userEmail}`,
      JSON.stringify(expenses)
    );
  }, [expenses, userEmail]);

  // ➕ Add expense
  const addExpense = () => {
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount,
      category,
      date,
    };

    setExpenses(prev => [...prev, newExpense]);

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Expense Splitter 💸</h1>

      {/* INPUT ROW */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Education">Education</option>
          <option value="Bills">Bills</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Medical">Medical</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <button onClick={addExpense}>Add Expense</button>
      </div>

      {/* TABLE OUTPUT */}
      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="5" align="center">No expenses yet</td>
            </tr>
          ) : (
            expenses.map(exp => (
              <tr key={exp.id}>
                <td>{exp.title}</td>
                <td>₹ {exp.amount}</td>
                <td>{exp.category}</td>
                <td>{exp.date}</td>
                <td>
                  <button onClick={() => deleteExpense(exp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        className="logout"
        onClick={logout} 
      >
        Logout
      </button>
    </div>
  );
}
