import React from "react";

const videoData = [
  {
    language: "Python",
    tutorials: [
      {
        title: "Beginner",
        difficulty: "beginner",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw&vl=en",
        thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg",
        description: "This course will give you a full introduction into all of the core concepts in python. Follow along with the videos and you'll be a python programmer in no time!",
      },
      {
        title: "Intermediate",
        difficulty: "intermediate",
        url: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
        thumbnail: "https://i.ytimg.com/vi/HGOBQPFzWKo/maxresdefault.jpg",
        description: "Take your Python skills to the next level with this intermediate Python course. First, you will get a review of basic concepts such as lists, strings, and dictionaries, but with an emphasis on some lesser known capabilities.",
      },
      {
        title: "Advanced",
        difficulty: "advanced",
        url: "https://www.youtube.com/watch?v=O1gZc-erLjg",
        thumbnail: "https://skillxprss.com/wp-content/uploads/2021/12/Advanced-Python-batch-01-website.jpg",
        description: "This video on Advanced Python tutorial covers all the important aspects of using Python for advanced use-cases and purposes. It establishes all of the concepts like system programming ,shell programming, pipes and forking to show how wide of a spectrum Python offers to the developers. ",
      },
    ],
  },
  {
    language: "Java",
    tutorials: [
      {
        title: "Beginner",
        difficulty: "beginner",
        url: "https://youtu.be/7WiJGTPuVeU",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1lVeuVqoEfcoL5iM-_NvuO3g17OAC5pXiFg&usqp=CAU",
        description: "The absolute basics of getting started with Java, Understand the components of the Java platform (JVM, JDK, JRE), the basics of an IDE and the features it offers to help with Java programming and foundational Java programming syntax that form the building blocks of Java programs.",
      },
      {
        title: "Intermediate",
        difficulty: "intermediate",
        url: "https://www.youtube.com/watch?app=desktop&v=vIXcT4hbR0U",
        thumbnail: "https://blob.sololearn.com/assets/java-intermediate-web-og-v1.png",
        description: "This video is based on Java intermediate and is designed and curated in collaboration with real-time industry experts to ensure the critical java fundamentals are covered. The learners are industry ready according to the current IT standards meeting the requirements of the top MNC recruiters.",
      },
      {
        title: "Advanced",
        difficulty: "advanced",
        url: "https://www.youtube.com/watch?v=Ae-r8hsbPUo",
        thumbnail: "https://i.ytimg.com/vi/Ae-r8hsbPUo/maxresdefault.jpg",
        description: "This video on Advance Java Full Course is dedicated to helping Beginners and Professionals with detailed Fundamentals on all the major concepts based on Advanced Java. The Tutorial also includes practical sessions to provide a better learning experience.",
      },
    ],
  },
  {
    language: "Web Development",
    tutorials: [
      {
        title: "HTML",
        difficulty: "beginner",
        url: "https://www.youtube.com/watch?app=desktop&v=88PXJAA6szs",
        thumbnail: "https://i.ytimg.com/vi/88PXJAA6szs/maxresdefault.jpg",
        description: "This video on HTML will provide you with a detailed and comprehensive knowledge about HTML. In this HTML Tutorial for Beginners you will learn HTML concepts from scratch and also how to create your first web page using HTML Tags.",
      },
      {
        title: "CSS",
        difficulty: "beginner",
        url: "https://www.youtube.com/watch?app=desktop&v=Edsxf_NBFrw",
        thumbnail: "https://i.ytimg.com/vi/ywBg3YV2PJU/maxresdefault.jpg",
        description: "In this CSS3 tutorial in Hindi we will learn everything you need to learn about CSS from scratch. We will first discuss why we need CSS and what CSS is after which we will gradually build pace and learn several intermediate to advanced level concepts.",
      },
      {
        title: "JavaScript",
        difficulty: "beginner",
        url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        thumbnail: "https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg",
        description: "This JavaScript tutorial is for beginners will teach you everything you need to know to get started with the JavaScript programming language.",
      },
    ],
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
        return "bg-danger"
    default:
      return "bg-secondary"; 
  }
};

const ResourcesPage = () => {
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
                      <div className={`badge m-3 ${getBadgeColor(tutorial.difficulty)}`}>{tutorial.title}</div>
                    </a>
                    <p className="quiz-desc text-dark mx-3" style={{fontSize:"0.9rem"}} >
                      {tutorial.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <hr/>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
