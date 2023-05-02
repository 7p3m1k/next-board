import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  await db
    .collection("post")
    .updateOne(
      { _id: new ObjectId(props.params.id) },
      { $set: { title: result.title, content: result.content } }
    );
  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input
          type="text"
          name="title"
          placeholder="글제목"
          defaultValue={result.title}
        />
        <input
          type="text"
          name="content"
          placeholder="글내용"
          defaultValue={result.content}
        />
        <input
          style={{ display: "none" }}
          type="text"
          name="_id"
          defaultValue={result._id}
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
