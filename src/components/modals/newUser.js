import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Alert } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

function NewUserModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [inValidAccount, setInValidAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    const payload = {
      username: data.username,
      password: data.password
    }
    setLoading(true);
    axios.post(`http://localhost:3000/api/login`, payload)
      .then((response) => {
        Cookies.set('HRM_TOKEN', response.data.token)
        setInValidAccount(false)
        window.location.reload();
      })
      .catch((error) => {
        setInValidAccount(true);
      })
      .finally(() => {
        setLoading(false);
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
export default NewUserModal