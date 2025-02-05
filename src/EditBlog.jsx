import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

      
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const currentBlog = blogs.find((blog) => blog.id === parseInt(id));
    setBlog(currentBlog);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const updatedBlogs = blogs.map((b) =>
      b.id === blog.id ? { ...b, title: blog.title, content: blog.content } : b
    );
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

    navigate('/');
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
