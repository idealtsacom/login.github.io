import React, { Fragment, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import avatar from "./avatar.png"
import Image from 'next/image';
import axios from 'axios';
const SignUp = () => {
    const [loading, setloading] = useState(false);
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(avatar);
    const [ImageUrl, setImageUrl] = useState('')
    const uploadImage = () => {
        setloading(true)
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "tarabs")
        data.append("cloud_name", "dr78vil92")
        fetch("https://api.cloudinary.com/v1_1/dr78vil92/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setImageUrl(data.url);
                setUrl(data.url)
                setloading(false)
            })
            .catch(err => console.log(err))
    }

    const validateSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Too Short!')
            .max(10, 'Too Long!').required('Password is required'),

    });
    const router = useRouter();
    const submitHandle = (values) => {
        console.log({ username: values.username, email: values.email, password: values.password, avatar: ImageUrl })
        axios.post('api/u',{ username: values.username, email: values.email, password: values.password, avatar: ImageUrl }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
        localStorage.setItem('email', values.email);
        localStorage.setItem('islogin', true);
        toast.info('successfully Login', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        router.push('/')



    }
    return (
        <Fragment><ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
            <Formik
                initialValues={{ username: '', email: '', password: '', cnfpassword: '', avatar: '' }}
                onSubmit={submitHandle}
                validationSchema={validateSchema}
            >
                {(props) => (
                    <Form className='d-flex flex-column col-md-4 m-auto shadow-sm py-3 px-2 mt-2 justify-content-center align-items-center'>
                        <h1>Signup</h1>

                        <div className='p-0 m-0'>
                            <div className="row p-0 m-0 ">     <div className='w-75 mx-auto p-0 my-2 '>   <Image src={url} className="rounded-circle" alt="profile image" width="100%" height={"100%"} layout="responsive" /></div></div>
                            <div className="row p-0 mx-0 mb-3">
                                <div className="col-9 p-0 m-0"> <input className='form-control ' type="file" name="avatar" onChange={(e) => {
                                    setImage(e.target.files[0])

                                }} />
                                </div>
                                <div className="col-3 p-0 m-0 d-flex justify-content-end"><button className="btn btn-primary" onClick={uploadImage}>Upload</button></div>
                            </div>
                        </div>
                        <Field type="username" name="username" placeholder="username" className="form-control mb-1" />
                        <ErrorMessage name="username" component="div" className=' text-danger' />
                        <Field type="email" name="email" placeholder="Email" className="form-control mb-1" />
                        <ErrorMessage name="email" component="div" className=' text-danger' />
                        <Field type="Password" name="password" placeholder="Password" className="form-control mb-1" />
                        <ErrorMessage name="password" component="div" className=' text-danger' />
                        <Field type="cnfpassword" name="cnfpassword" placeholder="cnfpassword" className="form-control mb-1" />
                        <ErrorMessage name="cnfpassword" component="div" className=' text-danger' />
                        <button type="submit" className=' form-control btn btn-primary mt-2' style={{ width: "120px" }}>Submit</button>
                    </Form>
                )}
            </Formik>
            {loading &&
                <div className=' position-absolute star-0 top-0 vh-100 vw-100 p-0 m-0 d-flex justify-content-center align-items-center' style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}><div className="spinner-border m-5" role="status">

                </div></div>}

        </Fragment>
    )
}
export default SignUp;