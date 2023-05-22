"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div>댓글목록 보여질 부분</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(comment);
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
