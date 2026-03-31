import { useSelector } from "react-redux";

const Profile = () => {
    const userData = useSelector(store => store.user);
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">

      {/* Content */}
      <div className="max-w-3xl w-full mx-auto px-6 py-10 flex flex-col gap-5">

        {/* Avatar */}
        <div className="flex justify-center mb-2">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-4">
              <img src={userData?.photoUrl } alt={userData?.firstName + " " + userData?.lastName} />
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-7 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{userData?.firstName + " " + userData?.lastName}</h1>
            <p className="text-base-content/50 text-sm mt-0.5">{userData?.age+ ", " + userData?.gender}</p>
          </div>

          {/* Location & Email */}
          <div className="flex items-center gap-6 flex-wrap">
            <span className="flex items-center gap-1.5 text-base-content/50 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              New Delhi
            </span>
            <span className="flex items-center gap-1.5 text-base-content/50 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {userData?.emailId}
            </span>
          </div>

          {/* GitHub & LinkedIn buttons */}
          <div className="flex gap-3 flex-wrap">
            <a href="/" target="_blank" rel="noreferrer">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-base-300 text-white text-sm font-medium hover:bg-base-300 transition-colors">
                {/* GitHub icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </a>
            <a href= "/" target="_blank" rel="noreferrer">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-base-300 text-white text-sm font-medium hover:bg-base-300 transition-colors">
                {/* LinkedIn icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </a>
          </div>

          {/* Bio */}
          <p className="text-base-content/60 text-sm leading-relaxed">{userData?.about}</p>
        </div>

        {/* Skills Card */}
        <div className="bg-base-200 border border-base-300 rounded-2xl p-7">
          <h2 className="text-lg font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {userData?.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-1.5 rounded-full bg-base-300 border border-base-content/10 text-white text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience Card */}
        {/* <div className="bg-base-200 border border-base-300 rounded-2xl p-7">
          <h2 className="text-lg font-bold text-white mb-5">Experience</h2>
          <div className="flex flex-col gap-6">
            {user.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-base-content/20 pl-4 flex flex-col gap-1">
                <p className="text-white font-semibold text-sm">{exp.title}</p>
                <p className="text-base-content/40 text-xs">{exp.company} • {exp.period}</p>
                <p className="text-base-content/60 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Featured Projects Card */}
        {/* <div className="bg-base-200 border border-base-300 rounded-2xl p-7">
          <h2 className="text-lg font-bold text-white mb-5">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.projects.map((project) => (
              <div
                key={project.id}
                className="bg-base-300 border border-base-content/10 rounded-xl p-4 flex flex-col gap-3"
              >
                <p className="text-white font-semibold text-sm">{project.name}</p>
                <p className="text-base-content/50 text-xs leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-base-200 border border-base-content/10 text-white text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default Profile;