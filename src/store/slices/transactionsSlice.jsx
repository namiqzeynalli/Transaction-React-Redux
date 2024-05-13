import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  loading: false,
  error: false,
};

export const getAllTransactions = createAsyncThunk("transactions", async () => {
  const response = await fetch(
    `https://acb-api.algoritmika.org/api/transaction`
  )
    .then((response) => response.json())
    .then((data) => data);
  return response;
});

export const addTransaction = createAsyncThunk(
  "add",
  async (transactionData) => {
    const response = await fetch(
      `https://acb-api.algoritmika.org/api/transaction/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      }
    );
    // location.reload();

    return await response.json();
  }
);

export const editTransaction = createAsyncThunk(
  "edit",
  async ([transactionId, transactionData]) => {
    const response = await fetch(
      `https://acb-api.algoritmika.org/api/transaction/${transactionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      }
    );
    // location.reload();

    return await response.json();
  }
);

export const deleteTransaction = createAsyncThunk(
  "delete",
  async (transactionId) => {
    // try {
    const response = await fetch(
      `https://acb-api.algoritmika.org/api/transaction/${transactionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }
);

export const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(getAllTransactions.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions = [action.payload, ...state.transactions];
    })
    builder.addCase(editTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload.id);
      state.transactions = [action.payload, ...state.transactions];
    })
  },

});

export const {} = transactionsSlice.actions;
export default transactionsSlice.reducer;
