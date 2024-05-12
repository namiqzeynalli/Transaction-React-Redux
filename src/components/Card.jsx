import React, { useState } from "react";
import "./Card.css";
import edit from "../assets/images/edit.png";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../store/slices/transactionsSlice";
import Edit from "./Edit";

const Card = ({ transaction, id }) => {
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <div className="card-wrapper">
        <div className="card-container">
          <div className="fromToText">
            From {transaction.from} to {transaction.to} {transaction.amount}$
          </div>{" "}
          <div className="buttons">
            <button onClick={() => setIsShowing(true)}>
              <img src={edit} width={15} alt="edit" />
            </button>
            <button onClick={() => dispatch(deleteTransaction(id))}>x</button>
          </div>
        </div>
      </div>
      {isShowing && <Edit setIsShowing={setIsShowing} transaction={transaction} id={id} />}
    </>
  );
};

export default Card;
