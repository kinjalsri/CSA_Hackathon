import React, { useState, useEffect } from "react";

function AddAlert() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [news, setNews] = useState([]);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API and log the response
    fetch("http://localhost:4000/api/data")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data: ", error));

    // Fetch news from the backend
    fetch("http://localhost:4000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data.articles || []))
      .catch((err) => console.error("Error fetching news:", err));
  }, []); // Runs once when the component mounts

  const addData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/add-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(`Alert added with ID: ${data.id}`);
      } else {
        setResponse("Error adding alert");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setResponse("Failed to connect to backend");
    }
  };

  const playAlertSound = () => {
    if (!audio) {
      const sound = new Audio("http://localhost:4000/api/audio"); // Fetch from backend
      setAudio(sound);
      sound.play();
    } else {
      audio.play();
    }
  };

  return (
    <div>
      <h1>Add Alert</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={addData}>Add Alert</button>
      <button onClick={playAlertSound}>Play Alert Sound</button>
      <p>{response}</p>

      <h2>Latest News</h2>
      <ul>
        {news.length > 0 ? (
          news.map((article, index) => (
            <li key={index}>
              <strong>{article.title}</strong>
              <p>{article.description}</p>
            </li>
          ))
        ) : (
          <p>No news available</p>
        )}
      </ul>
    </div>
  );
}

export default AddAlert;