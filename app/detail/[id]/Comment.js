"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/comment/list?id=" + props._id)
      .then((r) => r.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <div>
      <hr />
      {data.length > 0
        ? data.map((a, i) => (
            <div>
              <span k={i}>[ {a.author_name} ]</span>
              <span style={{ color: "blue" }} key={i}>
                {a.content}
              </span>
            </div>
          ))
        : "댓글없음"}
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: props._id }),
          });
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
