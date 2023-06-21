"use client";
import { useEffect, useState } from "react";
import "./blog.css";
import { useParams } from "next/navigation";
import axios from "axios";
import { AiOutlineComment } from "react-icons/ai";
import { toast } from "react-hot-toast";

function Blog() {
  const params = useParams();

  const [blog, setBlog] = useState({});

  const [show, setShow] = useState(false);

  async function fetchblog() {
    try {
      const { data } = await axios.get("/api/blog/blog?id=" + params.id);

      await setBlog(data.blog);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchblog();
  }, []);
  return (
    <div className="containerblog">
      <h1>{blog.title}</h1>
      {blog && (
        <div className="blogPage">
          {show && <CommentModal setShow={setShow} />}
          <div className="left">
            <img src={blog.image} alt="" />
            <p>{blog.description}</p>
            <p>By - {blog.ownername}</p>
            <button onClick={() => setShow(true)}>
              <span>
                <AiOutlineComment />
              </span>{" "}
              comments
            </button>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: blog.blog }}
            className="right"
          ></div>
        </div>
      )}
    </div>
  );
}

export default Blog;

function CommentModal({ setShow }) {
  const [comments, setComments] = useState("");
  const params = useParams();
  const [comment, setComment] = useState("");

  async function fetchComments() {
    try {
      const token =
        (await typeof window) !== "undefined"
          ? localStorage.getItem("token")
          : null;
      const { data } = await axios.get("/api/blog/comments?id=" + params.id, {
        headers: {
          token: token,
        },
      });

      await setComments(data.comments);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token =
        (await typeof window) !== "undefined"
          ? localStorage.getItem("token")
          : null;
      const { data } = await axios.post(
        "/api/blog/comment?id=" + params.id,
        {
          comment,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.message) {
        await toast.success(data.message);
        await setComment("");
        await fetchComments();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <div>
      <div className="commentbackground" onClick={() => setShow(false)}></div>
      <div className="commentmodal">
        <div className="top">
          <h1>Comments</h1>
          <button onClick={() => setShow(false)}>X</button>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Add Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button>Add +</button>
        </form>

        <div className="comments">
          {comments && comments.length > 0 ? (
            comments.map((i) => (
              <p key={i._id}>
                <span>{i.user}</span> - {i.comment}
              </p>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
