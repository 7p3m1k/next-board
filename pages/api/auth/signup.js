import { connectDB } from "@/util/database";
import * as bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    let db = (await connectDB).db("forum");
    await db.collection("user_card").insertOne(req.body);
    res.status(200).json("가입성공");
  }
}
