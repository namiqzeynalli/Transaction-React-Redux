import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../store/slices/transactionsSlice";
import Card from "./Card";
import "./Transactions.css";
import Add from "./Add";

const Transactions = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(
    (store) => store.transaction
  );

  useEffect(() => {
    dispatch(getAllTransactions());
  }, []);

  return (
    <div className="wrapper">
      <h1>Transaction-App</h1>
      {!show && (
        <button className="addBtn" onClick={() => setShow(true)}>
          Add Transaction
        </button>
      )}
      {show && <Add setShow={setShow} />}
      <div className="transactions-list">
        <h3>Transactions</h3>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">Error!</div>}
        {transactions &&
          transactions.map((transaction) => {
            return (
              <Card
                key={transaction.id}
                transaction={transaction}
                id={transaction.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Transactions;
