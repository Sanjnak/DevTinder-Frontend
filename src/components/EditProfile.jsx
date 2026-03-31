import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const inputClass =
    "w-full rounded-lg h-12 px-4 bg-base-300 border border-base-content/10 text-white placeholder:text-base-content/30 focus:outline-none focus:border-white/30 text-sm";

  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };
  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response.message);
      console.error(err);
    }
  };

  useEffect(() => {
  if (user) {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setPhotoUrl(user.photoUrl || "");
    setAbout(user.about || "");
    setSkills(user.skills || []);
  }
}, [user]);

  return (
    <>
      <div className="min-h-screen bg-base-100 flex flex-col">
        {/* Content */}
        <div className="max-w-3xl w-full mx-auto px-6 py-10 flex flex-col gap-5">
          {/* Avatar + Photo URL */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="avatar">
                <div className="w-28 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-4">
                  <img
                    src={
                      photoUrl ||
                      "https://randomuser.me/api/portraits/men/75.jpg"
                    }
                    alt="profile"
                    onError={(e) => {
                      e.target.src =
                        "https://randomuser.me/api/portraits/men/75.jpg";
                    }}
                  />
                </div>
              </div>
              {/* Camera icon badge */}
              <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-base-300 border border-base-content/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </div>
            </div>

            {/* Photo URL input */}
            <div className="w-full flex flex-col items-center gap-1">
              <input
                type="text"
                name="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://your-photo-url.com/photo.jpg"
                className="w-full max-w-lg rounded-lg h-11 px-4 bg-base-200 border border-base-content/10 text-white placeholder:text-base-content/30 focus:outline-none focus:border-white/30 text-sm text-center"
              />
              <p className="text-base-content/40 text-xs">
                Enter a URL for your profile picture
              </p>
            </div>
          </div>
          {/* Basic Info Card */}
          <div className="bg-base-200 border border-base-300 rounded-2xl p-7 flex flex-col gap-4">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className={inputClass}
              />
              <input
                type="text"
                name="name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className={inputClass}
              />
            </div>
            {/* Age */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="role"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Your Age"
                className={inputClass}
              />
              {/* Gender */}
              <input
                type="text"
                name="role"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Your Gender"
                className={inputClass}
              />
            </div>
            {/* Bio */}
            <textarea
              name="bio"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write a short bio..."
              rows={4}
              className="w-full rounded-lg px-4 py-3 bg-base-300 border border-base-content/10 text-white placeholder:text-base-content/30 focus:outline-none focus:border-white/30 text-sm resize-none"
            />
          </div>
          {/* Skills Card */}
          {skills && (
            <div className="bg-base-200 border border-base-300 rounded-2xl p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  Skills & Technologies
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      skillInput.trim() &&
                      !skills.includes(skillInput.trim())
                    ) {
                      setSkills([...skills, skillInput.trim()]);
                      setSkillInput("");
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-base-content/20 text-white text-xs hover:bg-base-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add
                </button>
              </div>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
                className={inputClass}
              />
              <div className="flex flex-wrap gap-2">
                {skills &&
                  skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-base-300 border border-base-content/10 text-white text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-base-content/40 hover:text-red-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5"
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
                      </button>
                    </span>
                  ))}
              </div>
            </div>
          )}
          {/* Bottom Save/Cancel */}
          <div className="flex gap-3 justify-end pb-6">
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              Save Changes
            </button>
            <Link to="/profile">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-base-300 text-white text-sm font-medium hover:bg-base-200 transition-colors">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
