import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { removeSentRequests } from "../utils/sentSlice";
import {removeConnections} from "../utils/connectionsSlice";
import {removeFeed} from "../utils/feedSlice";
import {removeRequests} from "../utils/requestsSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const location = useLocation();

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      } else {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeFeed());
      dispatch(removeRequests());
      dispatch(removeSentRequests());

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
       <div className="navbar bg-base-100 border-b border-base-300 px-8 py-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-white font-mono">
            &lt;/&gt; DevConnect
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {(location.pathname == "/profile") && (
            <Link to="/editProfile">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-base-300 text-white text-sm font-medium hover:bg-base-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
            </svg>
            Edit Profile
          </button>
        </Link>
          )}
          {(location.pathname != "/connections" && location.pathname != "/login" && location.pathname != "/signup") && (
            <Link
            to="/connections"
            className="text-white font-medium hover:text-base-content/70 transition-colors"
          >
            Connections
          </Link>
          )}
          {(location.pathname != "/" && location.pathname != "/login" && location.pathname != "/signup") && (
            <Link
            to="/"
            className="text-white font-medium hover:text-base-content/70 transition-colors"
          >
            Feed
          </Link>
          )}
          {/* Avatar */}
          {(location.pathname != "/login" && location.pathname != "/signup") && (<div className="avatar cursor-pointer" onClick={() => navigate("/profile")}>
            <div className="w-9 rounded-full ring ring-base-300">
              <img src={userData?.photoUrl ||"https://randomuser.me/api/portraits/men/75.jpg"} alt="profile" />
            </div>
          </div>)}
          {/* Logout */}
          {(location.pathname != "/login" && location.pathname != "/signup") && (<button
            onClick={handleLogOut}
            className="text-base-content/50 hover:text-white transition-colors"
            title="Logout"

          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>)}
        </div>
      </div>
    </>
  );
};

export default NavBar;
