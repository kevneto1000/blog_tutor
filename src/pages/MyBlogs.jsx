import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const MyBlogs = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [blogs, setBlogs] = useState([]);

    async function fetchMyBlogs() {

        try {
            const response = await api.get("blogs/my-blogs/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });

            setBlogs(response.data);
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, [])

  return (
    <div className='container mt-5'>
        <h2 className="mb-4">
            My Blogs
        </h2>

        <div className="row">
            {blogs.length === 0 ? (
                <h4>You haven't created any blog yet.</h4>
            ) : (
                blogs.map((blog) => (
                    <div className="col-12 col-lg-4 col-md-6 mb-4" key={blog.id}>
                        <div className="card h-100 shadow">
                            {blog.images.length > 0 && (
                                <img src={`${backendUrl}${blog.images[0].image}`} className="card-img-top" alt={blog.title} style={{height: "16rem"}} />
                            )}
                            <div className="card-body">
                                <h5>{blog?.title}</h5>

                                <p>{blog.content.slice(0, 80)}...</p>

                                <div className="d-flex gap-2">
                                    <Link to={`/blog/${blog.id}`} className="btn btn-sm btn-primary">Read More</Link>

                                    <Link to={`/update-blog/${blog.id}`} className='btn btn-sm btn-warning'>Edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  )
}

export default MyBlogs