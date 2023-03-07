import jwt from 'jsonwebtoken';
import axios from 'axios';
import { API_URL } from '../../const/index'

const getListUser = () => {
  return axios.get(`${API_URL}/users`)
    .then(function (response) {
      return response.data; // return the data property of the response
    })
    .catch(function (error) {
      return []
    });
}

export default async function handler(
  req,
  res
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const listUser = await getListUser();
    const userLogin = listUser?.find((x) => x.username === username && x.password === password)
    if (userLogin) {
      return res.status(200).json({
        token: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          userId: userLogin.id,
        }, 'secret')
      });
    } else {
      return res.status(500).json({ message: "Sai thông tin đăng nhập?" });
    }
  }
  res.status(500).json({ message: "Lỗi server?" });
}