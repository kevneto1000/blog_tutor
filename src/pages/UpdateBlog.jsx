import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import api from '../api/axios'

const UpdateBlog = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [blog, setBlog] = useState({
        title: "",
        content: "",
    });

    const fetchBlog = async () => {
        try {
            const response = await api.get(`/blogs/${id}/`);
            setBlog({
                title: response.data.title,
                content: response.data.content
            });
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    const handleChange = async (e) => {
        setBlog({
            ...blog,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.patch(`/blogs/update/${id}/`, blog, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });

            alert("Blog Updated Successfully");

            navigate(`/blog/${id}`);
        } catch(error) {
            console.error(error);
        }
    };

  return (
    <div className='container mt-5'>
        <h2>Edit Blog</h2>

        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name='title'
                value={blog.title}
                onChange={handleChange}
                className='form-control mb-3' 
            />

            <textarea
                name="content"
                value={blog.content}
                onChange={handleChange}
                rows="8"
                className='form-control mb-3'
            />

            <button className="btn btn-sm btn-warning">Update Blog</button>
        </form>
    </div>
  )
}

export default UpdateBlog