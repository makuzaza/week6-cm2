import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const SignupComponent = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setAddress((prev) => ({
        ...prev,
        [key]: value,
      }));
      return;
    }

    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "phone_number") setPhoneNumber(value);
    if (name === "gender") setGender(value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone_number,
          gender,
          address,
        }),
      });

      const data = await response.json();
      console.log("signup status:", response.status);
      console.log("signup response:", data);

      if (!response.ok) {
        const msg = data?.error || data?.message || "Signup failed";
        setError(msg);
        toast.error(msg);
        return;
      }

      if (data?.token) localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data?.user || data));

      if (typeof setIsAuthenticated === "function") {
        setIsAuthenticated(true);
      }

      toast.success("Signup successful");
      navigate("/");
    } catch (err) {
      const msg = "Error during signup";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSignup}>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="border rounded w-full py-2 px-3"
                placeholder="Your full name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="border rounded w-full py-2 px-3"
                placeholder="you@example.com"
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border rounded w-full py-2 px-3"
                placeholder="Create a password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                className="border rounded w-full py-2 px-3"
                placeholder="+358401234567"
                value={phone_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Gender
              </label>
              <select
                name="gender"
                className="border rounded w-full py-2 px-3"
                value={gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <h3 className="text-2xl mb-5">Address</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Street
              </label>
              <input
                type="text"
                name="address.street"
                className="border rounded w-full py-2 px-3"
                placeholder="Street address"
                value={address.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">City</label>
              <input
                type="text"
                name="address.city"
                className="border rounded w-full py-2 px-3"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Zip Code
              </label>
              <input
                type="text"
                name="address.zipCode"
                className="border rounded w-full py-2 px-3"
                placeholder="Zip code"
                value={address.zipCode}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupComponent;
