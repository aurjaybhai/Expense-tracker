import React, { useEffect, useReducer, useState, useRef } from "react";
import Buttons from "./components/Buttons";
import { Wallet, Sun, Moon } from "lucide-react";
import Dialog from "./components/Dialog";

export const Actions = {
  EXPENSE_NAME: "add_expense",
  AMOUNT: "add_amount",
  SUBMIT: "submit",
  ADD_BALANCE: "add-balance",
  CHECKBOX: "checkbox",
  LOAD_TRANSACTIONS: "load",
};

const initialData = {
  expense_name: "",
  amount: "",
  display: false,
  balance: 0,
  expense: 0,
  income: 0,
  switch: false,
  transaction: [],
};

function reducer(state, { type, payload }) {
  const entry = {
    id: crypto.randomUUID(),
    name: state.expense_name,
    amount: state.amount,
    type: state.switch ? "income" : "expense",
  };

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

      if (!state.switch) {
        return {
          ...state,
          expense: state.expense + state.amount,
          balance: state.balance - state.amount,
          display: true,
          transaction: [entry, ...state.transaction],
        };
      } else {
        return {
          ...state,
          income: state.income + state.amount,
          balance: state.balance + state.amount,
          display: true,
          transaction: [entry, ...state.transaction],
        };
      }

    case Actions.CHECKBOX:
      return {
        ...state,
        switch: payload,
      };

    case Actions.ADD_BALANCE:
      const amount = parseFloat(payload);

      return {
        ...state,
        balance: state.balance + amount,
      };
      0;

    case Actions.LOAD_TRANSACTIONS:
      if (payload == null) {
        return state;
      }

      return {
        ...state,
        transaction: payload,
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
  const [isDark, setIsDark] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("record")); // string ==> json
    dispatch({ type: Actions.LOAD_TRANSACTIONS, payload: records });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem("record", JSON.stringify(state.transaction)); // json ==> string
  }, [state.transaction]);

  return (
    <>
      <div className={`app-shell ${isDark ? "" : "light-mode"}`}>
        <div className="container">
          <div className="header-row">
            <h1 className="app-title">Expense Tracker</h1>
            <div className="navbar">
              <span className="nav-icon" aria-hidden="true"></span>
              <button
                type="button"
                className="icon-button"
                aria-label="Add balance"
                onClick={() => setIsWOpen(true)}
              >
                <Wallet size={20} />
              </button>
              {isDark ? (
                <Moon size={25} onClick={() => setIsDark(false)} />
              ) : (
                <Sun size={25} onClick={() => setIsDark(true)} />
              )}
              <span className="nav-icon" aria-hidden="true"></span>
            </div>
          </div>

          <div className="display-grid">
            <div className="display-card current-balance">
              <span className="card-label">Current Balance</span>
              <p className="card-value">{state.balance}</p>
            </div>
            <div className="display-card income-balance">
              <span className="card-label">Income</span>
              <p className="card-value">{state.income}</p>
            </div>
            <div className="display-card expense-balance">
              <span className="card-label">Expense</span>
              <p className="card-value">{state.expense}</p>
            </div>
          </div>
          <div className="form-card">
            <div className="form">
              <div className="toggle-row">
                <span
                  className={`toggle-label ${!state.switch ? "active" : ""}`}
                >
                  Expense
                </span>
                <div className="toggle">
                  <input
                    type="checkbox"
                    id="switch"
                    checked={state.switch}
                    onChange={(e) =>
                      dispatch({
                        type: Actions.CHECKBOX,
                        payload: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="switch" className="toggle-slider"></label>
                </div>
                <span
                  className={`toggle-label ${state.switch ? "active" : ""}`}
                >
                  Income
                </span>
              </div>

              <label htmlFor="expenseName" className="field-label">
                <span>Name</span>
                <input
                  id="expenseName"
                  type="text"
                  value={state.expense_name}
                  placeholder="What did you spend on?"
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
                  placeholder="$ 0.00"
                  onChange={(e) =>
                    dispatch({
                      type: Actions.AMOUNT,
                      payload: parseFloat(e.target.value),
                    })
                  }
                />
              </label>
              <Buttons broker={dispatch} />
            </div>
          </div>

          <div className="history">
            <h3 className="history-title">Transaction History</h3>
            {state.transaction.length > 0 ? (
              <ul className="transaction-list">
                {state.transaction.map((item) => (
                  <li
                    key={item.id}
                    className={`history-entry ${item.type === "income" ? "entry-income" : "entry-expense"}`}
                  >
                    <div className="entry-left">
                      <span className="entry-name">{item.name}</span>
                      <span className="entry-type">{item.type}</span>
                    </div>
                    <span
                      className={`entry-amount ${item.type === "income" ? "amount-positive" : "amount-negative"}`}
                    >
                      {item.type === "income" ? "+" : "−"}${item.amount}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="history-empty">
                No transactions yet. Add one above!
              </p>
            )}
          </div>
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
