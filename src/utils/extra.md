// Feed.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Feed = () => {
  const [animating, setAnimating] = useState(null); // 'like' | 'pass' | null
  const navigate = useNavigate();

  // Replace with your Redux feed data
  const feed = useSelector((state) => state.feed.users) || dummyUsers;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = feed[currentIndex];

  const handleAction = (type) => {
    if (animating) return;
    setAnimating(type);
    setTimeout(() => {
      setAnimating(null);
      setCurrentIndex((i) => i + 1);
    }, 500);
  };

  // card tilt style
  const getCardStyle = () => {
    if (animating === "like") {
      return {
        transform: "rotate(8deg) translateX(60px)",
        opacity: 0,
        transition: "all 0.45s ease",
      };
    }
    if (animating === "pass") {
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

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-100 border-b border-base-300 px-8 py-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-white font-mono">
            &lt;/&gt; devTinder
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/connections" className="text-white font-medium hover:text-base-content/70 transition-colors">
            Connections
          </Link>
          <div className="avatar cursor-pointer" onClick={() => navigate("/profile")}>
            <div className="w-9 rounded-full ring ring-base-300">
              <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="profile" />
            </div>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="text-base-content/50 hover:text-white transition-colors"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </div>

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
                      <img src={currentUser.photo} alt={currentUser.name} />
                    </div>
                  </div>

                  {/* Name & Role */}
                  <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
                  <p className="text-base-content/50 text-sm mt-1">{currentUser.role}</p>
                  <p className="text-base-content/40 text-sm">{currentUser.location}</p>

                  {/* Bio */}
                  <p className="text-base-content/70 text-sm mt-5 text-left leading-relaxed w-full">
                    {currentUser.bio}
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
                  
                    href={`https://${currentUser.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base-content/40 text-sm hover:text-white transition-colors self-start"
                  >
                    {currentUser.github}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 mt-8">
              {/* Pass */}
              <button
                onClick={() => handleAction("pass")}
                disabled={!!animating}
                className="w-16 h-16 rounded-full bg-base-200 border border-red-500/40 flex items-center justify-center hover:bg-red-500/10 transition-all hover:scale-110 active:scale-95 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Like */}
              <button
                onClick={() => handleAction("like")}
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
  );
};

export default Feed;