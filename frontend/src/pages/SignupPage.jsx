import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    street: "",
    city: "",
    zipCode: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone_number,
          gender: formData.gender,
          address: {
            street: formData.street,
            city: formData.city,
            zipCode: formData.zipCode,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Redirect to login after successful signup
      navigate("/login");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="phone_number" placeholder="Phone Number" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="gender" placeholder="Gender" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="street" placeholder="Street" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="city" placeholder="City" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="zipCode" placeholder="Zip Code" onChange={handleChange} className="w-full border p-2 rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupPage;