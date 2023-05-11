import { connectDB } from "@/util/database";
import * as bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.name === "") {
      res.status(500).json("아이디를 입력해주세요.");
    }

    if (req.body.email === "") {
      res.status(500).json("이메일을 입력해주세요.");
    }

    if (req.body.password === "") {
      res.status(500).json("비밀번호를 입력해주세요.");
    }

    let hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    let db = (await connectDB).db("forum");

    let emailCheck = await db
      .collection("user_cred")
      .findOne({ email: req.body.email });

    // 이메일 중복 체크
    if (emailCheck) {
      if (req.body.email === emailCheck.email) {
        res.status(500).json("중복된 이메일 입니다.");
      }
    } else {
      await db.collection("user_cred").insertOne(req.body);
      res.status(200).json("가입성공");
    }
  }
}
