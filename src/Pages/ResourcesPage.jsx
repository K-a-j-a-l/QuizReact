import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config"; // Import your Firebase configuration
import { collection, query, getDocs } from "firebase/firestore";
import { getBadgeColor, getRandomDifficulty } from "./QuizPage";
import Loader from "../Components/Loader";

const Hero = {
  backgroundImage:
    "url('https://t4.ftcdn.net/jpg/04/39/13/37/240_F_439133763_FrLdhZsd5aGC23r9ATARuKJBr8ifZjIe.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  paddingTop: "350px",
  backgroundPosition: "center",
};

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading]=useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const q = query(collection(db, "quizCourses"));
        const querySnapshot = await getDocs(q);
        const fetchedVideoData = querySnapshot.docs.map((doc) => ({
          language: doc.data().category,
          tutorials: doc.data().tutorials.map((tutorial) => ({
            title: tutorial.title,
            difficulty: tutorial.difficulty,
            url: tutorial.url,
            thumbnail: tutorial.thumbnail,
            description: tutorial.description,
          })),
        }));
        setVideoData(fetchedVideoData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video data:", error);
        setLoading(false);
      }
    };

    fetchVideoData();
  }, []);

  return (
    <div>
      <section>
        <div className="container-fluid pb-5" style={Hero}>
          <div className="container-md p-3 pb-5">
            <h1 className="quiz-title fs-1 ">Programming Language Resources</h1>
            <p className="quiz-desc fs-5">
              There are a lot of resources for you to explore and learn
              different programming languages for all levels.{" "}
            </p>
          </div>
        </div>
      </section>
      {loading ? (
        <Loader />
      ) : (
        <div className="language-section container mt-5">
          {videoData.map((languageData, index) => (
            <div key={index}>
              <h2 className="quiz-title mt-3">{languageData.language}</h2>
              <div className="row">
                {languageData.tutorials.map((tutorial, idx) => (
                  <div className="col-md-4 col-sm-12 p-2" key={idx}>
                    <div className="video-card">
                      <a
                        href={tutorial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={tutorial.thumbnail} alt="Video Thumbnail" />
                        <div className="overlay"></div>
                        <div
                          className={`badge m-3 ${getBadgeColor(
                            tutorial.difficulty
                          )}`}
                        >
                          {tutorial.title}
                        </div>
                      </a>
                      <p
                        className="quiz-desc text-dark mx-3"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {tutorial.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
