import React, { useState } from "react";
import { Actions } from "../App";

function Dialog({ isOpen, onClose, broker }) {
  if (!isOpen) return null;

  const [money, setMoney] = useState(0);

  return (
    <div className="dialog-overlay" role="presentation">
      <dialog open className="wallet">
        <div className="header">Add Money</div>
        <div className="title">
          <input
            className="wallet-input"
            type="text"
            placeholder="Enter an Amount"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div className="wallet-actions">
          <button
            type="button"
            className="add-wallet"
            onClick={() => broker({ type: Actions.ADD_BALANCE, payload: money })}
          >
            Add
          </button>
          <button type="button" className="secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default Dialog;
