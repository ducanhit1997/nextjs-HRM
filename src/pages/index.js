import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";

export default function Home(props) {

  return (
    <>
      <Layout />
      <div className="container text-center mt-5">
        <h1>
          Phần mềm quản lý nhân viên
        </h1>
        <h4>Thực hiện: Nguyễn Văn A</h4>
        <Link href="/employees">Truy cập</Link>
      </div>
    </>
  );
}