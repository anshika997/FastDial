 import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await axios.post(
        "https://experience-pavillion.com/api/v1/classuser/login/signup",
        {
          email: form.email,
          password: form.password,
          user_name: form.name
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <div>
          <label className="mb-1 block text-sm">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-[#443f80] px-3 py-2 outline-none placeholder-white/60"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-[#443f80] px-3 py-2 outline-none placeholder-white/60"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-[#443f80] px-3 py-2 outline-none placeholder-white/60"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-orange-500 px-4 py-2 font-medium hover:bg-orange-600"
        >
          Sign Up
        </button>

        <p className="pt-1 text-center text-sm text-white/80">
          Already have an account?{" "}
          <button
            type="button"
            className="text-orange-400 underline underline-offset-4 hover:text-orange-300"
            onClick={() => {
              onClose();
              onSwitchToLogin?.();
            }}
          >
            Log in
          </button>
        </p>
      </form>
    </Modal>
  );
};

export default SignupModal;