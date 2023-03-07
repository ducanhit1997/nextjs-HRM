import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout"
import { getListEmployeeRequest } from "../../store/employeeReducer";
import { Button, Space, Table, Tag } from 'antd';
import ModalEmployee from "../../components/modals/modalEmployee";
import ConfirmDeleteModal from "../../components/modals/confirmDelete";

function Employees(props) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.employeeReducer);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [recordData, setRecordData] = useState();

  useEffect(() => {
    dispatch(getListEmployeeRequest());
  }, []);

  const openModalNewOrEdit = (record) => {
    setRecordData(record);
    setShowModalEmployee(true);
  }

  const openModalConfirm = (record) => {
    setRecordData(record);
    setShowModalConfirm(true);
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
          <Button onClick={() => openModalNewOrEdit(record)}>Edit</Button>
          <Button onClick={() => openModalConfirm(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout secure>
      <div className="container">
        <Button onClick={() => openModalNewOrEdit()}>Add new user</Button>
        <Table columns={columns} dataSource={data} className="mt-3" />
        <ModalEmployee
          show={showModalEmployee}
          onHide={() => setShowModalEmployee(false)}
          data={recordData}
        />
        <ConfirmDeleteModal
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          id={recordData?.id}
          name={recordData?.name}
          setShowModalConfirm={setShowModalConfirm}
        />
      </div>
    </Layout>
  )
}
export default Employees