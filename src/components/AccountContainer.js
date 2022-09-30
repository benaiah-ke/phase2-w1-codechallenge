import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions,setTransactions] = useState([])
  const [keyword,setKeyword] = useState([])

  // If keyword has been set, filter by description
  const matching = transactions.filter((transaction) => {
    return keyword === '' || transaction.description.indexOf(keyword) !== -1;
  })

  // Fetch once when component renders
  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => response.json())
      .then((response) => {
        setTransactions(response);
      })
  }, [])

  function handleSearch(event){
    setKeyword(event.target.value)
  }

  return (
    <div>
      <Search handleSearch={handleSearch}/>
      <AddTransactionForm transactions={transactions} setTransactions={setTransactions}/>
      <TransactionsList transactions={matching} />
    </div>
  );
}

export default AccountContainer;
