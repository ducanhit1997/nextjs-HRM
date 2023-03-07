import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import { editEmployeeRequest } from '../../store/employeeReducer';
import { addEmployee } from '../../services/api/employee';

function ModalEmployee(props) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { data } = props;
  const dispatch = useDispatch();

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
    data ? dispatch(editEmployeeRequest(payloadUpdate)) : dispatch(addEmployee(payloadUpdate));
  }

  useEffect(() => {
    if(data) {
      setValue('name', data.name);
      setValue('address', data.address);
      setValue('phoneNumber', data.phoneNumber);
    }
  }, [data])

  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data ? 'Edit Employee' : 'Add Employee'}
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
              type="text"
              {...register("phoneNumber", { required: true })}
              required
            />
            {errors.phoneNumber && errors.phoneNumber.type === "required" && (
              <small className='text-danger'>
                Phone Number is required
              </small>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default ModalEmployee