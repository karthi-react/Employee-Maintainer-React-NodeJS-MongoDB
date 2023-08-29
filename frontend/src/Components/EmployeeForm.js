
import { useFormik } from "formik";
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmployeeForm(props) {
    console.log(props)
    const navigate = useNavigate()

    const loginSchema = Yup.object().shape({
        name: Yup.string().required("Studnt Name is required"),
        email: Yup.string().email().required("Student Class is required"),
        name: Yup.string().required("Studnt Name is required"),
        name: Yup.string().required("Studnt Name is required"),
        name: Yup.string().required("Studnt Name is required"),
        name: Yup.string().required("Studnt Name is required"),

    });

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        navigate("/")
      }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile_no: '',
            designation: '',
            gender: '',
            course: '',
            image: ''
        },

        // validationSchema: loginSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                console.log(values)
                   const data = {
                    name:'jhd0',
                    email:'jndj'
                   }
                axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/studentDetails/student/add`, values)
                .then((res) => {
                  console.log(res, "res");
              
                      if (res?.data?.status === true) {
                          toast.success(res?.data?.message);                        
                      }
                    
                  
                })
                .catch((err) => {
console.log(JSON.stringify(err)+'hhhhhhhhhh')
                });
            } catch (error) {

            }
        },
    });


    const addCourse = (val) => {
        if (values.course.includes(val)) {
            const remove = values.course.filter((item) => item !== val)
            setFieldValue('course', remove)
        } else {
            setFieldValue('course', [...values.course, val])
        }
    }


    const {
        values,
        setFieldValue,
    } = formik;


    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', margin: "20px 0" }}>
                <div onClick={()=>{navigate("/dashboard")}}>
                    <button className='btn btn-primary'>Back</button>
                </div>
                <h3 style={{ margin: "auto" }}>Create Employee</h3>
                <div onClick={()=>{handleLogout()}}>
                    <button className='btn btn-primary'>Logout</button>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', margin: "40px 0" }}>
                <Card style={{ width: '28rem' }}>
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    placeholder="Enter Name"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder="Enter Email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    name="mobile_no"
                                    value={formik.values.mobile_no}
                                    onChange={formik.handleChange}
                                    placeholder="Enter Mobile Number"
                                />
                            </Form.Group>

                            <Form.Select onChange={(e) => {
                                if (e.target.value !== 'Select Designation') {
                                    setFieldValue('designation', e.target.value)
                                    console.log('hi')
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
                                />
                                <Form.Check
                                    type='radio'
                                    label='Female'
                                    checked={values?.gender === 'Female' ? true : false}
                                    onClick={(e) => { setFieldValue('gender', 'Female') }}
                                // id={`disabled-default-${type}`}
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
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='BCA'
                                    checked={values?.course === 'BCA' ? true : false}
                                    onClick={() => { setFieldValue('course','BCA') }}
                                // id={`disabled-default-${type}`}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='BSC'
                                    checked={values?.course === 'BSC' ? true : false}
                                    onClick={() => { setFieldValue('course','BSC') }}
                                // id={`disabled-default-${type}`}
                                />

                            </div>
                            <Form.Label>Image</Form.Label>

                            <Form.Control style={{ marginBottom: '10px' }} type="file" />
                            <Button style={{ width: '100%' }} variant="primary" type="submit">
                                {/* {studentForm === 'add' ? 'Add' : 'Edit'} */}
                                submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>



        </div>
    )
}

export default EmployeeForm