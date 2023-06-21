import Link from "next/link";
import "./home.css";

function HomePage() {
  return (
    <>
      <div className="container">
        <div className="home">
          <h1>The Reading Retreat</h1>
          <p>Your Go-to Source</p>
          <Link href={"/blogs"}>View Blogs</Link>
        </div>
      </div>

      <div className="about">
        <div className="content">
          <h2>About</h2>
          <p>
            For years, I have served as a useful source of motivation, help or
            advice. I finally decided to own that role and be intentional about
            it. I started The Reading Retreat with a mission to give others a
            taste of my thoughts and experiences, and I have been at it ever
            since. What started as weekly posts has evolved into a rich site
            filled with information about various topics that are near and dear
            to my heart. Take some time to explore the blog and find what sparks
            your interest. Feel free to reach out if you would like to
            collaborate on a project together. Read on and enjoy!
          </p>
        </div>
        <div className="image">
          <img src="/about.jpg" alt="" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
