import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("req", req);
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (username === "admin" && password === "123456") {
      return res.status(200).json({ 
        token: jwt.sign({
          username
        }, 'HRM')
       });
    } else {
      return res.status(500).json({ message: "Sai thông tin đăng nhập?" });
    }
  }
  res.status(500).json({ message: "Lỗi server?" });
}