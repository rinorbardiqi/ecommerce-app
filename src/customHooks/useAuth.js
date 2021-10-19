import  { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const useAuth = () => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [currentUser,history]);
  return currentUser;
};
export default useAuth;
