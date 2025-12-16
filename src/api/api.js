const BASE_URL = "https://backend-999.onrender.com"; // backend URL

export const getExpenses = async () => {
  const res = await fetch(`https://backend-999.onrender.com/api/expenses`);
  return res.json();
};

export const addExpense = async (data) => {
  const res = await fetch(`https://backend-999.onrender.com/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};
