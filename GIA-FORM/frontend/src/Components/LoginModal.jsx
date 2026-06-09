import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import toast from "react-hot-toast";

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://experience-pavillion.com/api/v1/classuser/login/request",
        { email: form.email, password: form.password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { accessToken, user } = data || {};
      console.log("Login successful:", { accessToken, user });

      if (accessToken && user) {
        // Persist auth
        localStorage.setItem("ep_access_token", accessToken);
        localStorage.setItem("ep_user", JSON.stringify(user));

        // Optional: set default Authorization header for future axios calls
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        toast.success(`Welcome, ${user?.name || "user"}!`);
        setTimeout(onClose, 800);
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed. Please check your credentials.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome back">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={loading}
          className="w-full rounded-md bg-orange-500 px-4 py-2 font-medium hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center justify-between text-sm text-white/80">
          <button type="button" className="hover:text-white/95">
            Forgot password?
          </button>
          <button
            type="button"
            className="text-orange-400 underline underline-offset-4 hover:text-orange-300"
            onClick={() => {
              onClose();
              onSwitchToSignup?.();
            }}
          >
            Create account
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
