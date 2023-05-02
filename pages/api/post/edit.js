import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let editData = { title: req.body.title, content: req.body.content };
    if (req.body.title === "") {
      return res.status(500).json("제목을 입력해주세요");
    }
    if (req.body.content === "") {
      return res.status(500).json("내용을 입력해주세요");
    }
    const db = (await connectDB).db("forum");
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: editData });
    res.status(200).redirect(302, "/list");
  }
}
