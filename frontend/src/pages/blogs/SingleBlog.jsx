import { apiUrl } from "../../config/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleBlog.css";

const SingleBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        let res = await axios.get(
          apiUrl(`/api/public/blogs/${slug}`)
        );
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    console.log("Blog data:", blog);
  }, [blog]);

  // Helper function to format date as mm/dd/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 mt-[80px] single-blog">
      {blog ? (
        <div className="flex gap-4 flex-col">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover brightness-75 max-h-[600px]"
          />

          <p className="text-sm text-primaryPurple-400">
            Posted on {formatDate(blog.createdAt)}
          </p>

          <h1 className="text-5xl font-bold mb-8">{blog.title}</h1>

          <div
            className="text-gray-300 text-lg body-container"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default SingleBlog;
