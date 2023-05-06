import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (req.method === "POST") {
    if (req.body.title === "") {
      return res.status(500).json("제목을 입력해주세요");
    }
    if (req.body.content === "") {
      return res.status(500).json("내용을 입력해주세요");
    }
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").insertOne(req.body);
    return res.status(200).redirect(302, "/list");
  }
}
