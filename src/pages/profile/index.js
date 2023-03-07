import Layout from "../../components/layout";
import Card from 'react-bootstrap/Card';
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { API_URL } from '../../const/index'
import axios from "axios";
import jwt_decode from 'jwt-decode';

import Cookies from "js-cookie";

function Profile(props) {
  const { register, handleSubmit, clearErrors, setValue, formState: { errors } } = useForm();
  const [inValidAccount, setInValidAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [tokenData, setTokenData] = useState();
  const token = Cookies.get('HRM_TOKEN')

  const onSubmit = data => {
    const payload = {
      username: data.username,
      address: data.address,
      phoneNumber: data.phoneNumber,
    }
    setLoading(true);
    axios.put(`${API_URL}/users/${tokenData.userId}`, payload)
    .then((response) => {
      setInValidAccount(false)
      clearErrors()
    })
    .catch((error) => {
      setInValidAccount(true);
    })
    .finally(() => {
      setLoading(false);
    });
  }
  
  const getUserDetail = (id) => {
    axios.get(`${API_URL}/users/${id}`)
      .then((response) => {
        setInValidAccount(false)
        setUserData(response.data)
        clearErrors()
      })
      .catch((error) => {
        setInValidAccount(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (token) {
      const tokenPayload = jwt_decode(token);
      setTokenData(tokenPayload);
      getUserDetail(tokenPayload.userId);
    }
  }, [])

  useEffect(() => {
    if(userData) {
      setValue('username', userData.username);
      setValue('address', userData.address);
      setValue('phoneNumber', userData.phoneNumber);
    }
  }, [userData])


  return (
    <Layout>
      <div className="container">
        <Card>
          <Card.Title>Thông tin cá nhân</Card.Title>
          <Card.Body>
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
                />
                {errors.username && errors.username.type === "required" && (
                  <small className='text-danger'>
                    Username is required
                  </small>
                )}
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  {...register("address", { required: true })}
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
                />
                {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                  <small className='text-danger'>
                    Phone Number is required
                  </small>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading &&
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                }
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  )
}
export default Profile