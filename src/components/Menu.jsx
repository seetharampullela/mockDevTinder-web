import React from "react";
import { Link } from "react-router-dom";
import { Theme } from "./Settings/Theme";

const Menu = ({ logout, isSideMenu }) => {
  return (
    <div>
      <div>
        <li>
          <Link className="justify-between" to="/profile">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="/connections">Connections</Link>
        </li>
        <li>
          <Link to="/requests">Requests</Link>
        </li>
        <li>
          <Link to="/premium">Premium</Link>
        </li>
        <li>
          <a onClick={logout}>Logout</a>
        </li>
      </div>
      {isSideMenu && (
        <div>
          <li>
            <Link to="/sentRequests">Requests Sent</Link>
          </li>
          {/* <Theme /> */}
          <li>
            <Link to="/settings">
              Settings <span className="badge">In Work</span>
            </Link>
          </li>
        </div>
      )}
    </div>
  );
};

export default Menu;
