import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";

export default function Home() {

  return (
    <>
      <Layout />
      <div className="container text-center mt-5">
        <h1>
          Phần mềm quản lý nhân viên
        </h1>
        <h4>Thực hiện: Nguyễn Văn A</h4>
      </div>
      <Link href="/employees">Click to go</Link>
      {/* {data?.map((item) => {
        return <h1 key={item.id}>{item.name}</h1>;
      })} */}

    </>
  );
}