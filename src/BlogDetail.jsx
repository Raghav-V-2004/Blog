import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaRegComment } from 'react-icons/fa';

function BlogDetail() {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null); 
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

 
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogData = storedBlogs.find((b) => b.id === parseInt(id));
    if (blogData) {
      setBlog(blogData);
      setLikes(blogData.likes);
      setComments(blogData.comments || []);
    } else {
      setBlog(null); 
    }
  }, [id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const updatedBlogs = storedBlogs.map((b) =>
      b.id === parseInt(id) ? { ...b, likes: newLikes } : b
    );
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  const handleCommentChange = (e) => setCommentText(e.target.value);

  const handleAddComment = () => {
    if (commentText) {
      const newComments = [...comments, commentText];
      setComments(newComments);
      setCommentText('');
      
      const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
      const updatedBlogs = storedBlogs.map((b) =>
        b.id === parseInt(id) ? { ...b, comments: newComments } : b
      );
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    }
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-blue-200 to-purple-200">
      <h2 className="text-3xl font-bold">{blog.title}</h2>
      <p className="text-sm text-gray-500">{blog.author} | {blog.date}</p>
      <div className="mt-4 text-lg">{blog.content}</div>

   
      <div className="mt-6 flex items-center space-x-6">
        <div className="flex items-center">
          <FaThumbsUp className="text-blue-500 cursor-pointer" onClick={handleLike} />
          <span className="ml-2">{likes}</span>
        </div>
        <div className="flex items-center">
          <FaRegComment className="text-gray-500" />
          <span className="ml-2">{comments.length}</span>
        </div>
      </div>

    
      <div className="mt-6">
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          className="w-full p-2 border rounded-md"
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md">
          Add Comment
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold">Comments:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="mt-2">{comment}</li>
          ))}
        </ul>
      </div>

      <button 
        onClick={() => navigate(-1)} 
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        Go Back
      </button>
    </div>
  );
}

export default BlogDetail;
