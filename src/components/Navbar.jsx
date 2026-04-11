import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await axios.post(BASE_URL + "/logout", null, {
        withCredentials: true,
      });
      if (res.status == 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (err) {
      console.err("ERROR: ", err);
    }
  };
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl">
          🙍‍♂️ Mock App
        </Link>
      </div>
      {user && (
        <div className="gap-2 flex items-center">
          <div>
            <p>Welcome, {user.firstName}!</p>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Profile" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
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

              {/* <li>
                <a>Settings</a>
              </li> */}
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="ce">
        <input
          type="checkbox"
          value="light"
          className="toggle theme-controller"
        />
      </div>
    </div>
  );
};

export default Navbar;
