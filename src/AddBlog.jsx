import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null); 
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title,
      author,
      content,
      date,
      likes: 0,
      comments: [],
      image: image, 
    };

    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(newBlog);

    localStorage.setItem('blogs', JSON.stringify(blogs));

    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Add a New Blog</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
