// React
import React from "react";
import "./CheckPasswords.css";

// Material UI
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

// Self written
import validyChecks from "./validyChecks";

function CheckPasswords({ password, passwordRepeat }) {
  return (
    <div>
      <div className="password__check__container">
        {validyChecks.checkPasswordLength(password) ? (
          <div className="password__validity__check">
            <div className="display__single__check">
              <DoneIcon fontSize="small" style={{ fill: "green" }} />
            </div>
            <div className="display__single__check">
              Password is long enough!
            </div>
          </div>
        ) : (
          <div className="password__validity__check">
            <div className="display__single__check">
              <CloseIcon fontSize="small" style={{ fill: "red" }} />
            </div>
            <div className="display__single__check">At least 8 characters!</div>
          </div>
        )}

        {validyChecks.checkPasswordEqual(password, passwordRepeat) ? (
          <div className="password__validity__check">
            <div className="display__single__check">
              <DoneIcon fontSize="small" style={{ fill: "green" }} />
            </div>
            <div className="display__single__check">Password matches!</div>
          </div>
        ) : (
          <div className="password__validity__check">
            <div className="display__single__check">
              <CloseIcon fontSize="small" style={{ fill: "red" }} />
            </div>
            <div className="display__single__check">
              Passwords doesn't match!
            </div>
          </div>
        )}

        {validyChecks.checkPasswordLowercase(password) ? (
          <div className="password__validity__check">
            <div className="display__single__check">
              <DoneIcon fontSize="small" style={{ fill: "green" }} />
            </div>
            <div className="display__single__check">
              Password contains lowercase!
            </div>
          </div>
        ) : (
          <div className="password__validity__check">
            <div className="display__single__check">
              <CloseIcon fontSize="small" style={{ fill: "red" }} />
            </div>
            <div className="display__single__check">
              Must contain lowercase!
            </div>
          </div>
        )}

        {validyChecks.checkPasswordUppercase(password) ? (
          <div className="password__validity__check">
            <div className="display__single__check">
              <DoneIcon fontSize="small" style={{ fill: "green" }} />
            </div>
            <div className="display__single__check">
              Password contains uppercase!
            </div>
          </div>
        ) : (
          <div className="password__validity__check">
            <div className="display__single__check">
              <CloseIcon fontSize="small" style={{ fill: "red" }} />
            </div>
            <div className="display__single__check">
              Must contain uppercase!
            </div>
          </div>
        )}

        {validyChecks.checkPasswordNumber(password) ? (
          <div className="password__validity__check">
            <div className="display__single__check">
              <DoneIcon fontSize="small" style={{ fill: "green" }} />
            </div>
            <div className="display__single__check">
              Password contains number!
            </div>
          </div>
        ) : (
          <div className="password__validity__check">
            <div className="display__single__check">
              <CloseIcon fontSize="small" style={{ fill: "red" }} />
            </div>
            <div className="display__single__check">Must contain number!</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckPasswords;
