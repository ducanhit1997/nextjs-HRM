import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import Cookies from 'js-cookie'

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const hasToken = Cookies.get('HRM_TOKEN')
    setIsLogin(hasToken)
  }, [])

  return (
    <>
      <Layout />
      <div className="container text-center mt-5">
        <h1>
          Phần mềm quản lý nhân viên
        </h1>
        <h4>Thực hiện: Nguyễn Văn A</h4>
        {isLogin ? <Link href="/employees">Truy cập</Link> : 'Vui lòng login để truy cập'}
      </div>
    </>
  );
}