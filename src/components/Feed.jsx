import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeSingleUserFeed } from "../utils/feedSlice";
import { Link } from "react-router-dom";
import { addSentRequests } from "../utils/sentSlice";


const Feed = () => {
  const [animating, setAnimating] = useState(null); // 'like' | 'pass' | null
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const userFeed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(userFeed.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = feed && feed[currentIndex];

  const handleAction = async(type, _id) => {
    if (animating) return;
    setAnimating(type);
    setTimeout(() => {
      setAnimating(null);
      setCurrentIndex((i) => i + 1);
    }, 500);

    try {
          const res = await axios.post(
            BASE_URL + "/request/send/" + type + "/" + _id,
            {},
            { withCredentials: true },
          );
          dispatch(addSentRequests(res.data.data));
          dispatch(removeSingleUserFeed(_id));
        } catch (err) {
          console.error(err);
        }
  };

  // card tilt style
  const getCardStyle = () => {
    if (animating === "Interested") {
      return {
        transform: "rotate(8deg) translateX(60px)",
        opacity: 0,
        transition: "all 0.45s ease",
      };
    }
    if (animating === "Ignored") {
      return {
        transform: "rotate(-8deg) translateX(-60px)",
        opacity: 0,
        transition: "all 0.45s ease",
      };
    }
    return {
      transform: "rotate(0deg) translateX(0px)",
      opacity: 1,
      transition: "all 0.1s ease",
    };
  };
  if(!feed) return;

  return (
    <>
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Card Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        {currentUser ? (
          <>
            {/* Tilt Stamp Labels */}
            <div className="relative w-full max-w-xl">

              {/* LIKE stamp — shows on like */}
              <div
                className="absolute top-8 left-6 z-10 border-4 border-green-400 text-green-400 font-extrabold text-2xl px-3 py-1 rounded-lg rotate-[-20deg] tracking-widest pointer-events-none transition-all duration-200"
                style={{ opacity: animating === "like" ? 1 : 0 }}
              >
                LIKE
              </div>

              {/* NOPE stamp — shows on pass */}
              <div
                className="absolute top-8 right-6 z-10 border-4 border-red-400 text-red-400 font-extrabold text-2xl px-3 py-1 rounded-lg rotate-[20deg] tracking-widest pointer-events-none transition-all duration-200"
                style={{ opacity: animating === "pass" ? 1 : 0 }}
              >
                NOPE
              </div>

              {/* Developer Card */}
              <div
                style={getCardStyle()}
                className="w-full bg-base-200 border border-base-300 rounded-2xl overflow-hidden"
              >
                <div className="p-8 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="avatar mb-5">
                    <div className="w-24 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                      <img src={currentUser.photoUrl} alt={currentUser.firstName} />
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h2 className="text-xl font-bold text-white">{currentUser.firstName}</h2>
                  <p className="text-base-content/50 text-sm mt-1">{currentUser.age}</p>
                  <p className="text-base-content/40 text-sm">{currentUser.gender}</p>

                  {/* Bio */}
                  <p className="text-base-content/70 text-sm mt-5 text-left leading-relaxed w-full">
                    {currentUser.about}
                  </p>

                  {/* Skills */}
                  <div className="w-full mt-5">
                    <p className="text-white font-semibold text-sm text-left mb-3">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-1.5 rounded-full bg-base-300 text-white text-sm border border-base-content/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-base-300 my-5" />

                  {/* GitHub */}
                  {/* <a
                    href={`https://${currentUser.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base-content/40 text-sm hover:text-white transition-colors self-start"
                  >
                    {currentUser.github}
                  </a> */}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 mt-8">
              {/* Pass */}
              <button
                onClick={() => handleAction("Ignored", currentUser._id)}
                disabled={!!animating}
                className="w-16 h-16 rounded-full bg-base-200 border border-red-500/40 flex items-center justify-center hover:bg-red-500/10 transition-all hover:scale-110 active:scale-95 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Like */}
              <button
                onClick={() => handleAction("Interested", currentUser._id)}
                disabled={!!animating}
                className="w-16 h-16 rounded-full bg-base-200 border border-green-500/40 flex items-center justify-center hover:bg-green-500/10 transition-all hover:scale-110 active:scale-95 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-400 group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-white">You're all caught up!</p>
            <p className="text-base-content/50 text-sm mt-2">
              No more developers to explore right now. Check back later!
            </p>
            <Link to="/connections">
              <button className="btn bg-white text-black hover:bg-gray-200 mt-6 px-8 rounded-lg">
                View Connections
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Feed;
