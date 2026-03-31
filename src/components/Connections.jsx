import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConnectionCard from "./ConnectionCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { addRequests } from "../utils/requestsSlice";
import { addSentRequests } from "../utils/sentSlice";
import { BASE_URL } from "../utils/constants";


const Connections = () => {
  const [activeTab, setActiveTab] = useState("connections");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections);
  const requestsData = useSelector((store) => store.requests);
  const sentData = useSelector((store) => store.sent);

  const getConnections = async () => {
    if (connectionsData) {
      return;
    }
    try{
        const userConnections = await axios.get(BASE_URL+"/user/connections", {withCredentials: true});
        dispatch(addConnections(userConnections.data.data));
    } catch(err) {
        console.error(err);
    }
  }

  const getRequests = async () => {
    if (requestsData) {
      return;
    }
    try{
        const userRequests = await axios.get(BASE_URL+"/user/requests/recieved", {withCredentials: true});
        dispatch(addRequests(userRequests.data.data));
    } catch(err) {
        console.error(err);
    }
  }

  const getSentRequests = async () => {
    if (sentData) {
      return;
    }
    try{
        const sentRequests = await axios.get(BASE_URL+"/user/requests/sent", {withCredentials: true});
        dispatch(addSentRequests(sentRequests.data.data));
        
    } catch(err) {
        console.error(err);
    }
  }

  useEffect(()=> {
    getConnections();
    getRequests();
    getSentRequests();
  }, []);

  const tabs = [
    { key: "connections", label: "Connections", data: connectionsData },
    { key: "requests", label: "Requests", data: requestsData },
    { key: "sent", label: "Sent", data: sentData },
  ];
  const activeData = tabs.find((t) => t.key === activeTab)?.data || [];


  return (
    <div className="min-h-screen bg-base-100 flex flex-col">

      {/* Content */}
      <div className="max-w-5xl w-full mx-auto px-8 py-10">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-white">Your Network</h1>
        <p className="text-base-content/50 text-sm mt-1">
          Manage your connections and collaboration opportunities
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-0 mt-8 border-b border-base-300">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-white text-white"
                  : "border-transparent text-base-content/40 hover:text-white"
              }`}
            >
              {tab.label}
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.key
                    ? "bg-white text-black"
                    : "bg-base-300 text-base-content/50"
                }`}
              >
                {tab.data &&  tab.data.length}
              </span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {activeData.length > 0 ? (
            activeData.map((user) => (
              <ConnectionCard key={user._id} user={user} type={activeTab} />
            ))
          ) : (
            <div className="col-span-2 text-center py-16 text-base-content/40">
              <p className="text-lg font-medium text-white">Nothing here yet</p>
              <p className="text-sm mt-1">
                {activeTab === "connections"
                  ? "Start swiping to make connections!"
                  : activeTab === "requests"
                    ? "No pending requests."
                    : "You haven't sent any requests yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;
