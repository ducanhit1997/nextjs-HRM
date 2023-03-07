import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteEmployeeRequest } from '../../store/employeeReducer';
import { Button } from 'antd';

function ConfirmDeleteModal(props) {
  const { id, name, setShowModalConfirm } = props;
  const dispatch = useDispatch();

  const onDeleteEmployee = () => {
   dispatch(deleteEmployeeRequest(id));
  }

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
        <Button onClick={onDeleteEmployee}>
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