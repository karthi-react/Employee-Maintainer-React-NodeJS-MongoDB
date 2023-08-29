import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeTable() {
  const [getTable, setGetTable] = useState([]);
  const [getSingleData, setGetSingleData] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [employeeForm, setEmployeeForm] = useState("add")
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState()

  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteClose = () => {
    setShowDelete(false)
  };
  const handleDeleteShow = () => setShowDelete(true);

  const getEmployee = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee`)
      .then((res) => setGetTable(res))
      .catch((err) => console.log(err));
  };

  const getEmployeeSingle = async (id) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee/${id}`)
      .then((res) => setGetSingleData(res))
      .catch((err) => console.log(err));
  };


  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Studnt Name is required"),
    email: Yup.string().email().required("Studnt Name is required"),
    mobile_no: Yup.string().required("Mobile number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 5 digits')
    .max(10, 'Must be exactly 5 digits'),
    designation: Yup.string().required("Studnt Name is required"),
    gender: Yup.string().required("Studnt Name is required"),
    course: Yup.string().required("Studnt Name is required"),
    image: Yup.string().required("Studnt Name is required"),
    // name: Yup.string().required("Studnt Name is required"),
  });

  const initialValues = {
    name: getSingleData?.data?.data?.name ? getSingleData?.data?.data?.name : '',
            email: getSingleData?.data?.data?.email ? getSingleData?.data?.data?.email : '',
            mobile_no: getSingleData?.data?.data?.mobile_no ? getSingleData?.data?.data?.mobile_no : '',
            designation: getSingleData?.data?.data?.designation ? getSingleData?.data?.data?.designation : '',
            gender: getSingleData?.data?.data?.gender ? getSingleData?.data?.data?.gender : '',
            course: getSingleData?.data?.data?.course ? getSingleData?.data?.data?.course : '',
            image: getSingleData?.data?.data?.image ? getSingleData?.data?.data?.image : ''
  };

  const editInitialValues = {
    name: '',
    email: '',
    mobile_no: '',
    designation: '',
    gender:'',
    course: '',
    image: ''  
  };



  const onSubmit = (values) => {
    console.log( "values")

    setLoading(true);
    console.log(errors, "values")
    axios
      .post(employeeForm === "add" ? `${process.env.REACT_APP_BACKEND_URL}/employee/add` : `${process.env.REACT_APP_BACKEND_URL}/employee/${getSingleData?.data?.data?._id}`, values)
      .then((res) => {

        if (res?.data?.status === true) {


          toast.success(res?.data?.message)
          handleClose()
          getEmployee()


        }


      })
      .catch((err) => { });
  };
  // const validationSchema = loginSchema;
  const formik = useFormik({
    initialValues: employeeForm === "add" ? editInitialValues : initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true
  });
  const {
    values,
    errors,
    touched,
    setFieldValue,
} = formik;


  const handleDelete = async () => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/employee/${employeeId}`)
      .then((res) => {

        if (res?.data?.status === true) {

          toast.success(res?.data?.message)
          handleDeleteClose()
          getEmployee()

        }
      })
      .catch((err) => { });
  };




  useEffect(() => {
    getEmployee();
  }, []);




  return (
    <div>
      <div style={{ float: 'right', margin: "20px 0" }}>
        <button className="btn btn-primary" onClick={() => {
          // navigate("/employeereg")
          setEmployeeForm("add"); handleShow()

        }}>Add Employee form</button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Created At</th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody>

            {
              getTable?.data?.data?.map((e, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td></td>
                  <td>{e?.name}</td>
                  <td>{e?.email}</td>
                  <td>{e?.mobile_no}</td>
                  <td>{e?.designation}</td>
                  <td>{e?.gender}</td>
                  <td>{e?.course}</td>
                  <td>{JSON.stringify(new Date(e?.createdDate).toDateString())}</td>

                  <td className="alignItem">
                    <button className="btn btn-success" onClick={() => {
                      setEmployeeForm("edit"); handleShow(); 
                      getEmployeeSingle(e?._id);
                      // navigate("/employeereg",{e})

                    }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => {
                      handleDeleteShow();
                      setEmployeeId(e?._id)
                    }}>Delete</button>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </Table>
        {getTable?.length === 0 &&
          <div style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            No Employee
          </div>
        }
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{employeeForm === 'add' ? 'Add' : 'Edit'} Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card style={{ width: '28rem' }}>
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    placeholder="Enter Name"
                                    isInvalid={touched.name && errors.name}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder="Enter Email"
                                    isInvalid={touched.email && errors.email}
                                />
                            </Form.Group> 

                            <Form.Group className="mb-3">
                                <Form.Control
                                    name="mobile_no"
                                    value={formik.values.mobile_no}
                                    onChange={formik.handleChange}
                                    placeholder="Enter Mobile Number"
                                    isInvalid={touched.mobile_no && errors.mobile_no}
                                />
                            </Form.Group>

                            <Form.Select
                                    isInvalid={touched.designation && errors.designation}
                                    onChange={(e) => {
                                if (e.target.value !== 'Select Designation') {
                                    setFieldValue('designation', e.target.value)
                                }
                            }} aria-label="Default select example">
                                {values.designation ? null : 
                                <option>Select Designation</option>
}
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </Form.Select>
                            <Form.Label style={{ marginTop: 10 }}>Gender</Form.Label>

                            <div style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-around', marginBottom: '10px' }}>


                                <Form.Check
                                    type='radio'
                                    label='Male'
                                    checked={values?.gender === 'Male' ? true : false}
                                    onClick={(e) => { setFieldValue('gender', 'Male') }}
                                // id={`disabled-default-${type}`}
                                isInvalid={touched.gender && errors.gender}

                                />
                                <Form.Check
                                    type='radio'
                                    label='Female'
                                    checked={values?.gender === 'Female' ? true : false}
                                    onClick={(e) => { setFieldValue('gender', 'Female') }}
                                // id={`disabled-default-${type}`}
                                isInvalid={touched.gender && errors.gender}

                                />

                            </div>

                            <Form.Label>Course</Form.Label>

                            <div style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-around', marginBottom: '5px' }}>


                                <Form.Check
                                    type='checkbox'
                                    label='MCA'
                                    checked={values?.course === 'MCA' ? true : false}
                                    onClick={() => { setFieldValue('course','MCA') }}
                                // id={`disabled-default-${type}`}
                                isInvalid={touched.course && errors.course}

                                />
                                <Form.Check
                                    type='checkbox'
                                    label='BCA'
                                    checked={values?.course === 'BCA' ? true : false}
                                    onClick={() => { setFieldValue('course','BCA') }}
                                // id={`disabled-default-${type}`}
                                isInvalid={touched.course && errors.course}

                                />
                                <Form.Check
                                    type='checkbox'
                                    label='BSC'
                                    checked={values?.course === 'BSC' ? true : false}
                                    onClick={() => { setFieldValue('course','BSC') }}
                                // id={`disabled-default-${type}`}
                                isInvalid={touched.course && errors.course}

                                />

                            </div>
                            <Form.Label>Image</Form.Label>

                            <Form.Control
                            onChange={(e)=>{setFieldValue('image',e.target.value.split('\\').pop())}}
                            accept=".png,.jpg"
                             style={{ marginBottom: '10px' }} type="file" 
                                                            isInvalid={touched.image && errors.image}

                            />
                            <Button style={{ width: '100%' }} variant="primary" type="submit">
                                {/* {studentForm === 'add' ? 'Add' : 'Edit'} */}
                                submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() =>
            handleDelete()
          }>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default EmployeeTable;
