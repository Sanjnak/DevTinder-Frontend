import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-100 px-8 py-4 border-b border-base-300">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-white font-mono">&lt;/&gt;</span>
            <span className="text-white">devTinder</span>
          </Link>
        </div>
        <div className="flex flex-row gap-5">
          <Link to="/login">
            <button className="btn btn-ghost btn-sm text-white border border-base-content/30 rounded-lg px-5 ">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-sm bg-white text-black hover:bg-gray-200 rounded-lg px-5 font-semibold">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 flex-1">
        <h1 className="text-6xl font-extrabold text-white leading-tight">
          Connect with Developers
        </h1>
        <h2 className="text-6xl font-extrabold text-base-content/40 mt-2 text-gray-400">
          Around the World
        </h2>
        <p className="mt-6 text-base-content/60 max-w-xl text-lg leading-relaxed text-gray-400">
          devTinder is the platform where developers swipe right on collaboration,
          innovation, and building the future together.
        </p>
        <div className="flex gap-4 mt-10">
          <Link to="/signup">
            <button className="btn bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold text-base">
              Get Started
            </button>
          </Link>
          <button className="btn btn-outline text-white border border-gray-400 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-base">
            Learn More
          </button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-10">
        {/* Card 1 */}
        <div className="card bg-base-200 border border-base-300 rounded-2xl p-8">
          <div className="mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Find Your Team</h3>
          <p className="text-base-content/50 text-sm leading-relaxed">
            Discover developers with complementary skills for your next project
          </p>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-200 border border-base-300 rounded-2xl p-8">
          <div className="mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Build Connections</h3>
          <p className="text-base-content/50 text-sm leading-relaxed">
            Swipe to connect with developers who share your passion and interests
          </p>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-200 border border-base-300 rounded-2xl p-8">
          <div className="mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Start Collaborating</h3>
          <p className="text-base-content/50 text-sm leading-relaxed">
            Turn connections into collaborations and build amazing projects together
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;