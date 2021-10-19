import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useSelector } from "react-redux";
import { checkUserIsAdmin } from "../../utils/index";

function AdminToolBar(props) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = checkUserIsAdmin(currentUser);
  if(!isAdmin) return null;
  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">My Admin</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminToolBar;
