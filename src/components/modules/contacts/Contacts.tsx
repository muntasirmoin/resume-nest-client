"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // setSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
    }, 1500);
  };

  return (
    <section
      id="contacts"
      className="min-h-screen w-full px-4 py-16 md:px-8 text-white"
      style={{
        background: `linear-gradient(
      135deg,
      rgba(8, 13, 32, 0.8),
      rgba(5, 8, 24, 0.9),
      rgba(23, 37, 84, 0.8)
    )`,
      }}
    >
      <div className="w-full px-4 md:px-10 mx-auto">
        <h2 className="text-3xl font-bold sm:text-4xl text-center mb-6">
          Contact Me
        </h2>
        <div className="mt-2 h-1 w-20 mx-auto bg-blue-500 rounded-full mb-10" />

        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left: Image */}
          <div className="md:w-1/2 w-full">
            <div className="w-full h-[400px] aspect-square rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1756676617/contactfrom-Photoroom_bwdnor.png"
                alt="Contact Illustration"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:w-1/2 w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg space-y-6"
            >
              {/* <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"> */}
              {/* <div className="md:w-1/2"> */}
              <div>
                <div className="">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                {/* <div className="md:w-1/2"> */}
                <div className="mt-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="Leave a message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-between align-center max-w-md text-white">
          {/* Email Block */}
          <div className="flex flex-col items-start text-left">
            <strong className="text-sm md:text-base mb-1">Email</strong>
            <span className="text-xs md:text-sm break-all">
              muntasirmoinchowdhury099@gmail.com
            </span>
          </div>

          {/* Location Block */}
          <div className="flex flex-col items-start">
            <strong className="text-sm md:text-base mb-1">Phone</strong>
            <span className="text-xs md:text-sm">+8801768968938</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
