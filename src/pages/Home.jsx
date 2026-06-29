import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Home = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchBlogs() {
    try {
      const response = await api.get(`/blogs/?search=${search}`);

      setBlogs(response.data);
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    try {
      await api.post("/blogs/create-blog/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
        }
      });

      alert("Blog Created");
      fetchBlogs();
    }catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="container mt-5">

      <div className="row my-5">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={fetchBlogs}>
            Search
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between my-4">
        <h3>Blogs</h3>

        <p
          className="fw-bold post"
          data-bs-toggle="modal"
          data-bs-target="#modalId"
        >
          Post a Blog
        </p>
        
        <div
          className="modal fade"
          id="modalId"
          tabIndex="-1"
          
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitleId">
                  Create Blog
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCreateBlog}>
                  <input type="text" name="title" placeholder="Title" className="form-control mb-3" />

                  <textarea name="content" rows="5" placeholder="Content" className="form-control mb-3" />

                  <input type="file" name="images" multiple className="form-control mb-3" />

                  <button className="w-100 btn btn-sm btn-primary my-3">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <script>
          const myModal = new bootstrap.Modal(
            document.getElementById("modalId"),
            options,
          );
        </script>
        
      </div>

      <div className="row">
        {blogs.map((blog) => (
          <div className="col-12 col-lg-4 col-md-6" key={blog.id}>
            <div className="card h-100 shadow">
              {blog.images.length > 0 && (
                <img src={`${backendUrl}${blog.images[0].image}`} className="card-img-top" alt={blog.title} style={{height: "16rem"}} />
              )}
              <div className="card-body">
                <h5>{blog?.title}</h5>

                <p>{blog.content.slice(0,100)}...</p>

                <Link to={`/blog/${blog.id}`} className="btn btn-sm btn-primary">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home