// components/modules/Blog/Blog.tsx
import Link from "next/link";
export interface IBlog {
  id?: string;
  title: string;
  content: string;
  slug: string;
  published?: boolean;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BlogProps {
  blogs: IBlog[];
}

const BlogManagement = ({ blogs }: BlogProps) => {
  console.log(blogs);
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
          {blogs.map((post) => (
            <div
              key={post.id}
              className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 backdrop-blur-lg"
            >
              {/* Blog Title */}
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                {post.title}
              </h3>

              {/* Date */}
              <p className="text-sm text-gray-400 mb-3">
                {new Date(post.createdAt!).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              {/* Explain */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {post.content.slice(0, 150)}...
              </p>

              {/* Read More Link */}
              <Link
                href={`/blog/${post.id}`}
                className="inline-flex items-center gap-1 text-blue-400 font-medium hover:underline hover:text-blue-300 transition"
              >
                Read More
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogManagement;
