import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeRequest } from '../../store/employeeReducer';
import { Button, notification } from 'antd';
import { useEffect } from 'react';

function ConfirmDeleteModal(props) {
  const { id, name, setShowModalConfirm, setUpdateOrSaveSuccess } = props;
  const dispatch = useDispatch();
  const { deleteSuccess } = useSelector((state) => state.employeeReducer);

  const onDeleteEmployee = () => {
    dispatch(deleteEmployeeRequest(id));
  }

  useEffect(() => {
    if (deleteSuccess) {
      notification.open({
        message: 'Delete employee success!',
      });
      setUpdateOrSaveSuccess(true);
      setShowModalConfirm(false);
    }
  }, [deleteSuccess])

  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure delete {name}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={onDeleteEmployee} danger type="primary">
          Yes
        </Button>
        <Button onClick={() => setShowModalConfirm(false)} className="ms-2">
          No
        </Button>
      </Modal.Body>
    </Modal>
  )
}
export default ConfirmDeleteModal