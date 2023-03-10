import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout"
import { getListEmployeeRequest } from "../../store/employeeReducer";
import { Button, Space, Table, Alert, Spin } from 'antd';
import ModalEmployee from "../../components/modals/modalEmployee";
import ConfirmDeleteModal from "../../components/modals/confirmDelete";
import Cookies from "js-cookie";

function Employees(props) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.employeeReducer);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [recordData, setRecordData] = useState();
  const [hasToken, setHasToken] = useState();
  const [updateOrSaveSuccess, setUpdateOrSaveSuccess] = useState(false)
  const [typeModal, setTypeModal] = useState()

  useEffect(() => {
    dispatch(getListEmployeeRequest());
    setHasToken(Cookies.get('HRM_TOKEN'))
  }, []);

  useEffect(() => {
    if (updateOrSaveSuccess) {
      dispatch(getListEmployeeRequest());
      setHasToken(Cookies.get('HRM_TOKEN'))
      setUpdateOrSaveSuccess(false);
    }
  }, [updateOrSaveSuccess]);

  const openModalNewOrEdit = (record) => {
    setRecordData(record);
    setTypeModal(!record ? 'add' : 'edit')
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
    <Layout>
      <div className="container mt-5">
        {hasToken ?
          <>
            <Button onClick={() => openModalNewOrEdit(null)}>Add new user</Button>
            <Spin spinning={loading}>
              <Table columns={columns} dataSource={data || []} className="mt-3" pagination={{ pageSize: 5 }} />
            </Spin>
            <ModalEmployee
              show={showModalEmployee}
              onHide={() => setShowModalEmployee(false)}
              data={recordData}
              type={typeModal}
              setShowModalEmployee={setShowModalEmployee}
              setUpdateOrSaveSuccess={setUpdateOrSaveSuccess}
            />
            <ConfirmDeleteModal
              show={showModalConfirm}
              onHide={() => setShowModalConfirm(false)}
              id={recordData?.id}
              name={recordData?.name}
              setShowModalConfirm={setShowModalConfirm}
              setUpdateOrSaveSuccess={setUpdateOrSaveSuccess}
            />
          </> :
          <Alert message="B???n c???n ????ng nh???p ????? c?? th??? xem" type="warning" className="mt-5" />
        }
      </div>
    </Layout>
  )
}
export default Employees