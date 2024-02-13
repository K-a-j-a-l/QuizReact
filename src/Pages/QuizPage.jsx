import React from "react";

const categories = [
  {
    id: 1,
    title: "JavaScript",
    difficulty: "beginner",
    description: "Test your JavaScript knowledge.",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_640.png",
    questions: 10,
    plays: 5000,
  },
  {
    id: 2,
    title: "Python",
    difficulty: "beginner",
    description: "Explore Python programming language.",
    image:
      "https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/python/logo.png",
    questions: 15,
    plays: 7000,
  },
  {
    id: 3,
    title: "Java",
    difficulty: "beginner",
    description: "Challenge yourself with Java quizzes.",
    image:
      "https://www.jrebel.com/sites/default/files/image/2020-05/image-blog-revel-top-java-tools.jpg",
    questions: 20,
    plays: 9000,
  },
  {
    id: 4,
    title: "C++",
    difficulty: "intermediate",
    description: "Challenge yourself with C++ quizzes.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsw7v5zOBRSTjLZIINcmFft1bLTQSfGGBIyo-GfGUjsg&s",
    questions: 12,
    plays: 6000,
  },
];

const Hero = {
  backgroundImage:
    "url('https://t4.ftcdn.net/jpg/04/39/13/37/240_F_439133763_FrLdhZsd5aGC23r9ATARuKJBr8ifZjIe.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  paddingTop: "350px",
  backgroundPosition: "center",
};

const getBadgeColor = (difficulty) => {
  switch (difficulty) {
    case "beginner":
      return "bg-info";
    case "intermediate":
      return "bg-warning";
    case "advanced":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

const QuizPage = () => {
  return (
    <div>
      <section>
        <div className="container-fluid pb-5" style={Hero}>
          <div className="container-md p-3 pb-5">
            <h1 className="quiz-title fs-1 ">Let's Play the Quiz!</h1>
            <p className="quiz-desc fs-5">
              Select your level and the domain and just get start to explore and
              learn with a competitive spirit!
            </p>
          </div>
        </div>
      </section>
      <div className="container mt-5">
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-4 col-sm-12" key={index}>
              <div className="quiz-category-card mb-5">
                <img
                  src={category.image}
                  alt="Category Image"
                  className="d-flex justify-content-center"
                />
                <div className="d-flex justify-content-between mx-4">
                  <p className="absolute bg-white p-1 rounded">
                    Q: {category.questions}
                  </p>
                  <p className="absolute bg-white p-1 rounded">
                    Plays:{" "}
                    {category.plays >= 1000
                      ? (category.plays / 1000).toFixed(0) + "K"
                      : category.plays}
                  </p>
                </div>

                <div>
                  <h6 className="mx-4 pb-1">{category.title}</h6>
                  <div
                    className={`badge mx-4 mb-2 ${getBadgeColor(
                      category.difficulty
                    )}`}
                  >
                    {category.difficulty}
                  </div>
                  <p
                    className="quiz-desc text-dark mx-4 mb-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {category.description}
                  </p>
                  <div className="d-flex justify-content-center m-2">
                    <button className="play-btn px-3 py-2">
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
