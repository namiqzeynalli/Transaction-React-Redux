import React, { useState } from "react";
import "./Edit.css";
import { useDispatch } from "react-redux";
import { editTransaction } from "../store/slices/transactionsSlice";

const Edit = ({ setIsShowing, id, transaction }) => {
  //   const { transactions } = useSelector((store) => store.transaction);
  const [data, setData] = useState({
    from: transaction.from,
    to: transaction.to,
    amount: transaction.amount,
  });

  const dispatch = useDispatch();

  return (
    <>
      {setIsShowing && (
        <div className="edit-container">
          <h3>Edit</h3>
          <div className="add-container">
            <div className="inputs">
              <input
                onChange={(e) => {
                  data.from = e.target.value;
                  return setData({ ...data });
                }}
                type="text"
                placeholder="from..."
                value={data.from}
              />
              <input
                onChange={(e) => {
                  data.to = e.target.value;
                  return setData({ ...data });
                }}
                type="text"
                placeholder="to..."
                value={data.to}
              />
              <input
                onChange={(e) => {
                  data.amount = e.target.value;
                  return setData({ ...data });
                }}
                type="number"
                placeholder="amount..."
                value={data.amount}
              />
            </div>
            <button
              onClick={() => {
                setIsShowing(false)
                return dispatch(editTransaction([id, data]));
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
