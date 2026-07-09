import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

const BlogDetail = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);

    async function fetchBlog() {
        try {
            const response = await api.get(`/blogs/${id}`);

            setBlog(response.data);
        } catch(error) {
            console.error(error);
        }
    };

    async function fetchUser() {
        try {
            const response = await api.get("/accounts/user/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                }
            });

            setUser(response.data);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBlog();
        fetchUser();
    }, []);

    async function handleDelete() {
        const confirmDelete = confirm("Are you sure?");

        if(!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/blogs/delete/${id}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`
                }
            });

            alert("Blog Deleted");
            navigate("/")
        } catch(error) {
            console.error(error);
        }
    }

    if(!blog) {
        return (
            <div className="container mt-5">
                <h5>Loading...</h5>
            </div>
        );
    }

  return (
    <div className='container mt-5 '>
        <div className="card shadow">
            <div className="card-body">
                <h1 className="mb-3">{blog.title}</h1>

                {/* <div className="d-flex gap-3 mb-4 text-muted">
                    <small>Author: {blog.autho}</small>

                    <small>
                        {new Date(blog.created_at).toLocaleDateString()}
                    </small>
                </div> */}

                <p style={{lineHeight: "1.8"}}>{blog.content}</p>

                {blog.images.length > 0 && (
                    <div>
                        <hr />

                        <div className="row">
                            {blog.images.map((image) => (
                                <div className="col-12 col-lg-4 col-md-6 mb-3" key={image.id}>
                                    <img src={image.image} alt="Blog" className='img-fluid rounded' style={{height: "18rem", width: "100%"}} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="d-flex gap-2 mt-4">
                    <Link to="/" className='btn btn-sm btn-primary'>Back to Home</Link>

                    {
                        user && user.id === blog.author && (
                            <div className="d-flex gap-2">
                                <Link to={`/update-blog/${blog.id}`} className='btn btn-sm btn-warning'>Edit Blog</Link>

                                <button onClick={handleDelete} className="btn btn-sm btn-danger">Delete Blog</button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    </div>
  )
}

export default BlogDetail