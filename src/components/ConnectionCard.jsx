import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeSingleRequest } from "../utils/requestsSlice";

// Updated UserCard component
const ConnectionCard = ({ user, type }) => {
  const dispatch = useDispatch();
  const reviewConnection = async (status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + user._id,
        {},
        { withCredentials: true },
      );
      dispatch(removeSingleRequest(user._id));
    } catch (err) {
      console.error(err);
    }
  };
  let item;
  if (type === "connections") {
    item = user; // Full user object for connections
  } else if (type === "requests") {
    item = user.fromUserId; // Nested user object
  } else if (type === "sent") {
    item = user.toUserId; // Nested user object
  }
  return (
    <div className="bg-base-200 border border-base-300 rounded-2xl p-5 flex flex-col gap-4">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-14 rounded-full ring ring-base-300">
              <img src={item.photoUrl} alt={item.firstName} />
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-base">
              {item.firstName + " " + item.lastName}
            </p>
            <p className="text-base-content/50 text-sm">
              {item.age + " ," + item.gender}
            </p>
          </div>
        </div>

        {/* Badge — View for connections, Pending for requests, Sent for sent */}
        {type === "connections" && (
          <button className="px-4 py-1.5 rounded-full bg-base-300 border border-base-content/10 text-white text-sm hover:bg-base-content/10 transition-colors">
            View
          </button>
        )}
        {type === "requests" && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Pending
          </span>
        )}
        {type === "sent" && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Sent
          </span>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {item.skills &&
          item.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-base-300 border border-base-content/10 text-white text-xs"
            >
              {skill}
            </span>
          ))}
      </div>

      {/* Action Buttons */}
      {type === "connections" && (
        <button className="w-full py-2.5 rounded-xl border border-base-300 text-white text-sm font-medium hover:bg-base-300 transition-colors">
          Message
        </button>
      )}
      {type === "requests" && (
        <div className="flex gap-3">
          <button
            onClick={() => reviewConnection("Accepted")}
            className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            Accept
          </button>
          <button
            onClick={() => reviewConnection("Rejected")}
            className="flex-1 py-2.5 rounded-xl bg-red-900/40 hover:bg-red-900/60 border border-red-700/40 text-red-400 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Decline
          </button>
        </div>
      )}
      {type === "sent" && (
        <button className="w-full py-2.5 rounded-xl border border-red-700/40 text-red-400 text-sm font-medium hover:bg-red-900/20 transition-colors">
          Cancel Request
        </button>
      )}
    </div>
  );
};

export default ConnectionCard;
