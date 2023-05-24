import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(res, req) {
  let session = await getServerSession(res, req, authOptions);
  if (res.method == "POST") {
    res.body = JSON.parse(res.body);

    let data = {
      content: res.body.comment,
      parent: new ObjectId(res.body._id),
      author: session.user.email,
      author_name: session.user.name,
    };

    const db = (await connectDB).db("forum");
    let result = await db.collection("comment").insertOne(data);
    req.status(200).json("저장완료");
  }
}
