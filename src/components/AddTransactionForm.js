import React, {useState} from "react";

function AddTransactionForm({transactions, setTransactions}) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
  })

  // Feedback message after adding a transaction
  const [message, setMessage] = useState('')

  function handleAddTransaction(event){
    event.preventDefault();

    fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then((resp) => resp.json())
    .then((object) => {
      // Feedback
      setMessage('Transaction added successfully')

      // Add transaction to list
      setTransactions([...transactions, object])

      // Clear form
      setFormData({
        date: '',
        description: '',
        amount: '',
        category: '',
      })
    })
  }

  function handleDateChange(event){
    setFormData({...formData, date: event.target.value})
  }

  function handleDescriptionChange(event){
    setFormData({...formData, description: event.target.value})
  }

  function handleCategoryChange(event){
    setFormData({...formData, category: event.target.value})
  }

  function handleAmountChange(event){
    setFormData({...formData, amount: event.target.value})
  }

  return (
    <div className="ui segment">
      <span>{message}</span>
      <form className="ui form" onSubmit={handleAddTransaction}>
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={handleDateChange} />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleDescriptionChange}/>
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleCategoryChange} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={formData.amount} onChange={handleAmountChange} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
