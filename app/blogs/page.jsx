"use client";
import Link from "next/link";
import "./blog.css";
import { AiFillDelete } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import { Context } from "../providers";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading/Loading";

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

function Blogs() {
  const [show, setShow] = useState(false);
  const [blogs, setBlogs] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  async function fetchblog(search, category) {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "/api/blog/all?search=" + search + "&category=" + category
      );

      setLoading(false);

      setBlogs(data.blogs);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchblog(search, category);
  }, [search, category]);

  const { user } = useContext(Context);
  return (
    <div>
      <div className="blogs">
        {show && <Modal setShow={setShow} setBlogs={setBlogs} />}
        <div className="top">
          <h1 className="heading">Blogs</h1>
          {user && user._id && (
            <button onClick={() => setShow(true)}>+ Add Blog</button>
          )}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Search With Category</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>

        {loading ? (
          <Loading />
        ) : (
          <div className="blogContainer">
            {blogs && blogs.length > 0 ? (
              blogs.map((i) => (
                <Blog user={user} key={i._id} blog={i} setBlogs={setBlogs} />
              ))
            ) : (
              <p>No Blogs Yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;

function Blog({ user, blog, setBlogs }) {
  const [loading, setLoading] = useState(false);
  async function fetchblog() {
    try {
      const { data } = await axios.get("/api/blog/all");

      setBlogs(data.blogs);
    } catch (error) {
      console.log(error.message);
    }
  }
  const deleteHandler = async () => {
    if (confirm("Are You Sure You Want to delete this Blog.") === true) {
      setLoading(true);
      const token =
        (await typeof window) !== "undefined"
          ? localStorage.getItem("token")
          : null;
      try {
        const { data } = await axios.delete("/api/blog/delete?id=" + blog._id, {
          headers: {
            token: token,
          },
        });

        if (data.message) {
          setLoading(false);
          await toast.success(data.message);
          await fetchblog();
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="blog">
      <img src={blog.image} alt="" />
      <hr className="line" />
      <span>{blog.title}</span>
      {user && user._id === blog.owner ? (
        <button onClick={deleteHandler}>
          <AiFillDelete />
        </button>
      ) : null}
      <p>{blog.category}</p>
      <Link href={"/blog/" + blog._id}>View Blog</Link>
    </div>
  );
}
