import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkUserIsAdmin } from "../utils/index";

function useAdminAuth(props) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push("/login");
      return;
    }
  }, [currentUser]);
  return currentUser;
}

export default useAdminAuth;
