import React, { useState } from "react";
import { Actions } from "../App";

function Dialog({ isOpen, onClose, broker }) {
  if (!isOpen) return null;

  const [money, setMoney] = useState(0);

  return (
    <div className="dialog-overlay" role="presentation" onClick={onClose}>
      <dialog open className="wallet" onClick={(e) => e.stopPropagation()}>
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
            onClick={() => {
              broker({ type: Actions.ADD_BALANCE, payload: money });
              onClose();
            }}
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

// The true/false you mentioned is the caputure paramete in the addEventListner , When true
// the event goes top  ==> bottom first (called capturing phase) In react you rarely need to
// worry about this React handles events in the bubbling phase by default
  