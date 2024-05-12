import React, { useRef } from "react";
import "./Add.css";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/slices/transactionsSlice";

const Add = ({ setShow }) => {
  const fromRef = useRef();
  const toRef = useRef();
  const amountRef = useRef();

  const dispatch = useDispatch();

  return (
    <div className="add-wrapper">
      <h3>Add Transaction</h3>
      <div className="add-container">
        <div className="inputs">
          <input ref={fromRef} type="text" placeholder="from..." />
          <input ref={toRef} type="text" placeholder="to..." />
          <input ref={amountRef} type="number" placeholder="amount..." />
        </div>
        <button
          onClick={() => {
            return (
              dispatch(
                addTransaction({
                  from: fromRef.current.value,
                  to: toRef.current.value,
                  amount: amountRef.current.value,
                })
              ),
              setShow(false)
            );
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Add;
