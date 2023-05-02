import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();
  let create = await db.collection("post").insertOne(req.body);
  let remove = await db.collection("post").deleteOne(req.body);
  if (req.method === "POST") return res.status(200).json(create, "처리완료");
  if (req.method === "GET") return res.status(200).json(result);
  if (req.method === "DELETE") return res.status(200).json(remove, "삭제완료");
}
