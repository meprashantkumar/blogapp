"use client";
import { useEffect, useState } from "react";
import "./modal.css";
import { toast } from "react-hot-toast";
import axios from "axios";

const categories = [
  "Study",
  "Sports",
  "Politics",
  "Entertainment",
  "Technology",
  "Food",
  "Business",
  "Travel",
  "Health ",
];

function Modal({ setShow, setBlogs }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [blog, setBlog] = useState("");

  const [loading, setLoading] = useState(false);

  async function fetchblog() {
    try {
      const { data } = await axios.get("/api/blog/all");

      setBlogs(data.blogs);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createBlog() {
    try {
      setLoading(true);
      const token =
        (await typeof window) !== "undefined"
          ? localStorage.getItem("token")
          : null;
      const { data } = await axios.post(
        "/api/blog/new",
        {
          title,
          description,
          category,
          blog,
          image,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.message) {
        setLoading(false);
        toast.success(data.message);
        fetchblog();
        setCategory("");
        setTitle("");
        setDescription("");
        setImage("");
        setCategory("");
        setBlog("");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    createBlog();
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <div>
      <div className="background" onClick={() => setShow(false)}></div>
      <div className="modal">
        <div className="top">
          <h1>Add Blog</h1>
          <button onClick={() => setShow(false)}>X</button>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Image Url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <textarea
            rows={5}
            type="text"
            placeholder="Enter Blog"
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            required
          />
          <span>
            disclaimer - to give subheading use h2 tag and to make new paragraph
            use p tag and to make your font italic use i tag
          </span>
          <button>{loading ? "Adding" : "Add +"}</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
