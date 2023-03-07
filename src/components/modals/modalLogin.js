import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { saveInfoUserLogin } from '@/store/userReducer';
import { useRouter } from 'next/router';

function ModalLogin(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [inValidAccount, setInValidAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userReducer);

  const onSubmit = data => {
    const payload = {
      username: data.username,
      password: data.password
    }
    setLoading(true);
    axios.post(`http://localhost:3000/api/login`, payload)
      .then((response) => {
        Cookies.set('HRM_TOKEN', response.data.token)
        const tokenPayload = jwt_decode(response.data.token);
        dispatch(saveInfoUserLogin(tokenPayload));
        setInValidAccount(false)
        props.setShowModalNewUser(false)
      })
      .catch((error) => {
        setInValidAccount(true);
      })
      .finally(() => {
        setLoading(false);
        window.location.reload()
      });
  }
  return (
    <Modal
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login to my app
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          {inValidAccount &&
            <Alert variant="danger">
              Invalid account
            </Alert>
          }
          <Form.Group className="mb-2">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              {...register("username", { required: true })}
              required
            />
            {errors.username && errors.username.type === "required" && (
              <small className='text-danger'>
                Username is required
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password", { required: true })}
              required
            />
            {errors.password && errors.password.type === "required" && (
              <small className='text-danger'>
                Password is required
              </small>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default ModalLogin