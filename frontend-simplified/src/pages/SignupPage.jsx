import { useState } from "react";

const SignupPage = () => {
  const [formatData, setFormatData] = useState({
    username: "",
    email: "",
    password: "",
    Phone_number: "",
    Gender : "",
    Street_address: "",
    City: "",
    State: "",
    Zip_code: "",
  });


  const handleChange = (e) => {
    setFormatData({
      ...formatData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formatData);
  };

  return (  
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="phone_number" placeholder="Phone Number" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="gender" placeholder="Gender" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="street" placeholder="Street" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="city" placeholder="City" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="zipCode" placeholder="Zip Code" onChange={handleChange} className="w-full border p-2 rounded" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Register
        </button>
      </form>
    </div>
  );
};
export default SignupPage;