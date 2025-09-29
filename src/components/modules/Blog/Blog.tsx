/* eslint-disable @typescript-eslint/no-explicit-any */
export const blogPosts = [
  {
    id: 1,
    title: "What is the MERN Stack?",
    date: "September 1, 2025",
    explain:
      "MERN Stack combines MongoDB, Express.js, React, and Node.js — enabling full-stack JavaScript development with a unified language across the stack.",
    link: "https://docs.google.com/document/d/1equoCg0qGXtJgJtCu560TbpyXESrknlW76YTwo4W8J8/edit?usp=sharing",
  },
  {
    id: 2,
    title: "Why Use TypeScript in Web Apps?",
    date: "August 25, 2025",
    explain:
      "TypeScript offers static typing, better tooling, and more robust code — reducing runtime errors and improving scalability in large codebases.",
    link: "https://docs.google.com/document/d/1equoCg0qGXtJgJtCu560TbpyXESrknlW76YTwo4W8J8/edit?usp=sharing",
  },
  {
    id: 3,
    title: "Understanding JWT (JSON Web Token)",
    date: "August 15, 2025",
    explain:
      "JWT is a compact, URL-safe token used for authentication. It ensures secure data transmission between client and server without maintaining sessions.",
    link: "https://docs.google.com/document/d/1equoCg0qGXtJgJtCu560TbpyXESrknlW76YTwo4W8J8/edit?usp=sharing",
  },
  {
    id: 4,
    title: "Getting Started with Redux Toolkit",
    date: "August 5, 2025",
    explain:
      "Redux Toolkit simplifies state management in React apps by providing a standard way to write Redux logic with less boilerplate.",
    link: "https://docs.google.com/document/d/1equoCg0qGXtJgJtCu560TbpyXESrknlW76YTwo4W8J8/edit?usp=sharing",
  },
];

const Blog = () => {
  return (
    <section
      id="blog"
      className="w-full px-4 py-20 md:px-12 text-white"
      style={{
        background: `linear-gradient(
          135deg,
          rgba(8, 13, 32, 0.8),
          rgba(5, 8, 24, 0.9),
          rgba(23, 37, 84, 0.8)
        )`,
      }}
    >
      <div className="w-full px-4 md:px-6 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Blog & Articles
        </h2>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-12" />

        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post: any) => (
            <div
              key={post.id}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 backdrop-blur-lg"
            >
              {/* Blog Title */}
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                {post.title}
              </h3>

              {/* Date */}
              <p className="text-sm text-gray-400 mb-3">{post.date}</p>

              {/* explain */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {post.explain}
              </p>

              {/* Read More Link */}
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 font-medium hover:underline hover:text-blue-300 transition"
              >
                Read More
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
