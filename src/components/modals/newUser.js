import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

function NewUserModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data)
  }
console.log(errors.username)
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