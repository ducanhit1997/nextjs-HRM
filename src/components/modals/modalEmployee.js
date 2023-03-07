import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployeeRequest, editEmployeeRequest } from '../../store/employeeReducer';
import { Button, notification } from 'antd';

function ModalEmployee(props) {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const { data, setShowModalEmployee, setUpdateOrSaveSuccess, type } = props;
  const dispatch = useDispatch();
  const { addSuccess ,editSuccess } = useSelector((state) => state.employeeReducer);

  const onSubmit = values => {
    const payloadAddNew = {
      name: values.name,
      address: values.address,
      phoneNumber: values.phoneNumber,
    }
    const payloadUpdate = {
      id: data?.id,
      ...payloadAddNew
    }
    type === 'edit' ? dispatch(editEmployeeRequest(payloadUpdate)) : dispatch(addEmployeeRequest(payloadAddNew));
    setShowModalEmployee(false);
  }

  useEffect(() => {
    if (addSuccess) {
      notification.open({
        message: 'Add employee success!',
      });
      setUpdateOrSaveSuccess(true);
    }
  }, [addSuccess])

  useEffect(() => {
    if (editSuccess) {
      notification.open({
        message: 'Edit employee success!',
      });
      setUpdateOrSaveSuccess(true);
    }
  }, [editSuccess])

  useEffect(() => {
    if (type === 'edit') {
      setValue('name', data.name);
      setValue('address', data.address);
      setValue('phoneNumber', data.phoneNumber);
    } else {
      setValue('name', null);
      setValue('address', null);
      setValue('phoneNumber', null);
    }
  }, [data])

  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {type === 'edit' ? 'Edit Employee' : 'Add Employee'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
              required
            />
            {errors.name && errors.name.type === "required" && (
              <small className='text-danger'>
                Name is required
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              {...register("address", { required: true })}
              required
            />
            {errors.address && errors.address.type === "required" && (
              <small className='text-danger'>
                Address is required
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              {...register("phoneNumber", { required: true })}
              required
            />
            {errors.phoneNumber && errors.phoneNumber.type === "required" && (
              <small className='text-danger'>
                Phone Number is required
              </small>
            )}
          </Form.Group>
          <Button type="primary" htmlType='submit'>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default ModalEmployee