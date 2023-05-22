import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(res, req) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    .find({ parent: new ObjectId(res.query.id) })
    .toArray();
  req.status(200).json(result);
}
