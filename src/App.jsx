import React, { useReducer, useState } from "react";
import Buttons from "./components/Buttons";
import { Wallet, Sun, Moon } from "lucide-react";
import Dialog from "./components/Dialog";

export const Actions = {
  EXPENSE_NAME: "add_expense",
  AMOUNT: "add_amount",
  SUBMIT: "submit",
  ADD_BALANCE: "add-balance",
};

const initialData = {
  expense_name: "test",
  amount: "",
  display: false,
  balance: 0,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.EXPENSE_NAME:
      return {
        ...state,
        expense_name: payload,
      };

    case Actions.AMOUNT:
      return {
        ...state,
        amount: payload,
      };

    case Actions.SUBMIT:
      if (state.amount == 0) {
        alert("Pls enter any amount");
        return {
          ...state,
        };
      }
      if (!state.expense_name.length > 0) {
        alert("Please Enter something"); // alert the user
        return state;
      }

      return {
        ...state,
        balance: state.balance - state.amount,
        display: true,
      };
    case Actions.ADD_BALANCE:
      return {
        ...state,
        balance: payload,
      };
  }
}

// const handleReload = () => {
//   window.location.reload();
// };

// ## Important - The reducer can't display things it can only change data

function App() {
  const [isWOpen, setIsWOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialData);

  return (
    <>
      <div className="app-shell">
        <div className="container">
          <div className="header-row">
            <h1 className="app-title">Expense Tracker</h1>
            <div className="navbar">
              <span className="nav-icon" aria-hidden="true">
                <Sun size={18} />
              </span>
              <button
                type="button"
                className="icon-button"
                aria-label="Add balance"
                onClick={() => setIsWOpen(true)}
              >
                <Wallet size={20} />
              </button>
              <span className="nav-icon" aria-hidden="true">
                <Moon size={18} />
              </span>
            </div>
          </div>

          <div className="display-grid">
            <div className="display-card current-balance">
              <span className="card-label">Current Balance</span>
              <p className="card-value">{state.balance}</p>
            </div>
            <div className="display-card income-balance">
              <span className="card-label">Income</span>
              <p className="card-value">0</p>
            </div>
            <div className="display-card expense-balance">
              <span className="card-label">Expense</span>
              <p className="card-value">0</p>
            </div>
          </div>

          <div className="form-card">
            <div className="form">
              <label htmlFor="expenseName" className="field-label">
                <span>Expense Name</span>
                <input
                  id="expenseName"
                  type="text"
                  value={state.expense_name}
                  placeholder="What's the expense"
                  onChange={(e) =>
                    dispatch({
                      type: Actions.EXPENSE_NAME,
                      payload: e.target.value,
                    })
                  }
                />
              </label>

              <label htmlFor="amount" className="field-label">
                <span>Amount</span>
                <input
                  id="amount"
                  type="number"
                  placeholder="Enter an amount"
                  onChange={(e) =>
                    dispatch({ type: Actions.AMOUNT, payload: e.target.value })
                  }
                />
              </label>
              <Buttons broker={dispatch} />
            </div>
          </div>

          {state.display && (
            <div className="entry-preview">
              <p>
                <span>Name:</span> {state.expense_name}
              </p>
              <p>
                <span>Amount:</span> {state.amount}
              </p>
            </div>
          )}

          <div className="history">Transaction history</div>
        </div>
      </div>

      <Dialog
        isOpen={isWOpen}
        onClose={() => setIsWOpen(false)}
        broker={dispatch}
      />
    </>
  );
}

export default App;
