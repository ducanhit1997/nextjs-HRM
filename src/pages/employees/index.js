import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout"
import { getListEmployeeRequest } from "../../store/employeeReducer";
import { Button, Space, Table, Tag } from 'antd';
import ModalEmployee from "../../components/modals/modalEmployee";

function Employees(props) {
  const dispatch = useDispatch();
  const { data, editSuccess } = useSelector((state) => state.employeeReducer);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [recordData, setRecordData] = useState();

  useEffect(() => {
    dispatch(getListEmployeeRequest());
  }, []);

  useEffect(() => {
    if (editSuccess) {
      setShowModalEmployee(false);
      dispatch(getListEmployeeRequest());
    }
  }, [editSuccess]);

  const openModal = (record) => {
    setRecordData(record);
    setShowModalEmployee(true);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => openModal(record)}>Edit</Button>
          <Button onClick={() => { }}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container">
        <Button onClick={() => openModal()}>Add new user</Button>
        <Table columns={columns} dataSource={data} className="mt-3" />
        <ModalEmployee
          show={showModalEmployee}
          onHide={() => setShowModalEmployee(false)}
          data={recordData}
        />
      </div>
    </Layout>
  )
}
export default Employees