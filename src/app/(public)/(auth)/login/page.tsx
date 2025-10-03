"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).*$/, {
      message:
        "Password must contain at least one uppercase letter, one number, and one special character",
    }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        toast.error(res.error);
        // Optionally map error to field
        if (res.error.toLowerCase().includes("email")) {
          setError("email", { type: "server", message: res.error });
        } else if (res.error.toLowerCase().includes("password")) {
          setError("password", { type: "server", message: res.error });
        }
      } else {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: "admin@example.com",
        password: "Strong@Pssw0rd",
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Logged in as demo admin!");
        router.push("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login Here</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Your password"
            {...register("password")}
            className="w-full p-3 rounded-lg border border-white/30 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
              hover:from-indigo-600 hover:to-blue-500 text-white font-bold rounded-2xl 
              shadow-lg transition transform cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 
              hover:from-emerald-600 hover:to-green-500 text-white font-bold rounded-2xl 
              shadow-lg transition transform cursor-pointer"
          >
            Demo Admin Login
          </button>
        </div>
      </form>
    </div>
  );
}
