import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      setError(err.response.message);
      console.error(err);
    }
  };

  const inputClass =
    "w-full rounded-lg h-12 px-4 bg-base-200 border border-base-300 text-white placeholder:text-base-content/30 focus:outline-none focus:border-white/40";

  return (
    <>
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center px-4 py-10">
      {/* Logo */}
      <div className="mb-8 text-2xl font-bold text-white font-mono tracking-tight">
        &lt;/&gt; DevConnect
      </div>

      <div className="w-full max-w-2xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-base-content/50 text-sm mt-1">
            Join thousands of developers connecting worldwide
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Row 1 — First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-white">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Alex"
                className={inputClass}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-white">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Shane"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Row 2 — Age & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-white">Age</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="22"
                min="18"
                max="100"
                className={inputClass}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-white">Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`${inputClass} cursor-pointer`}
                required
              >
                <option value="" disabled className="bg-base-300 text-base-content/50">
                  Select
                </option>
                <option value="male" className="bg-base-300 text-white">
                  Male
                </option>
                <option value="female" className="bg-base-300 text-white">
                  Female
                </option>
                <option value="other" className="bg-base-300 text-white">
                  Other
                </option>
              </select>
            </div>
          </div>

          {/* Row 3 — Password (full width) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-white">Email</label>
              <input
                type="email"
                name="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
                required
              />
            </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-white text-black hover:bg-gray-200 w-full rounded-lg h-12 font-semibold text-base mt-1"
            onClick={handleSignUp}
          >
            Create Account
          </button>
        </div>

        {/* Footer link */}
        <p className="text-center text-base-content/50 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default SignUp;
