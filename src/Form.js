import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"
import './Form.css'
import API from "./API";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
export default function Form() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const url = 'http://10.85.25.50:5000/users'

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        dob: "",
        mobileNo: "",
        bloodGroup: "",
        gender: ""

    })

    useEffect(() => {
        if (state) {
            const handleEdit = () => {
                setEmployee(
                    {
                        name: state?.name || "",
                        email: state?.email || "",
                        dob: state?.dob || "",
                        mobileNo: state?.mobileNo || "",
                        bloodGroup: state?.bloodGroup || "",
                        gender: state?.gender || ""
                    }

                )
            }
            handleEdit();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target
        setEmployee(
            {
                ...employee,
                [name]: value
            }
        )
    }

    const [employeeData, setEmployeeData] = useState([]);
    const fetchAPI = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setEmployeeData(data))
            .then((data) => console.log(data));
    }

    const postAPI = () => {
        axios({
            method: 'post',
            url: url,
            data: {
                name: employee.name,
                email: employee.email,
                dob: employee.dob,
                mobileNo: employee.mobileNo,
                bloodGroup: employee.bloodGroup,
                gender: employee.gender
            }
        })
            .then(fetchAPI())
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        navigate('/home')
    }


    const updateEmp = (index) => {
        console.log(index)
        axios({
            method: 'put',
            url: ` ${url}/${index}`,
            data: {
                name: employee.name,
                email: employee.email,
                dob: employee.dob,
                mobileNo: employee.mobileNo,
                bloodGroup: employee.bloodGroup,
                gender: employee.gender
            }
        })
            // .then(function (response) {
            //     console.log("response", response);
            // })
            // .catch(function (error) {
            //     console.log(error);
            // })
            .then(fetchAPI());
        navigate('/home')
    }


    const errorMsg = document.getElementById('error');


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!employee.email || !employee.name || !employee.mobileNo || !employee.bloodGroup || !employee.dob || !employee.gender) {
            errorMsg.style.visibility = "visible";
            errorMsg.innerHTML = "Please fill all the values"
        }

        else {
            if (!validEmailRegex.test(employee.email) || !validMobileRegex.test(employee.mobileNo)) {
                errorMsg.style.visibility = "visible";
                errorMsg.innerHTML = "Input is Invalid \n Check your Email or Mobile Number";
            }
            else if (!validNameRegex.test(employee.name)) {
                errorMsg.style.visibility = "visible";
                errorMsg.innerHTML = "Please enter valid name";
            }

            else {
                if (state) {
                    console.log(employee.name);
                    console.log(state?.id);
                    updateEmp(state?.id);
                }
                else {
                    postAPI();
                    setEmployee(
                        {
                            name: "",
                            employeeId: "",
                            email: "",
                            dob: "",
                            mobileNo: "",
                            bloodGroup: "",
                            gender: ""
                        }
                    )
                    console.log("end")
                }
            }
        }

    }

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    const validMobileRegex = RegExp(
        /^(\+\d{1,3}[- ]?)?\d{10}$/
    );
    const validNameRegex = RegExp(
        /[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
    );

    return (
        <div className="container">
            <Navbar linkName="/home" />
            <div className='error-message' id='error'>

            </div>
            <form>
                <label htmlFor="name" >
                    Name:
                    <br />
                    <input autoComplete='off' placeholder='Enter your name' id='name' value={employee.name} type='text' onChange={handleChange} name='name' className="input_space" />
                </label>
                <br />

                <label htmlFor="email" >
                    Email:
                    <br />
                    <input autoComplete='off' placeholder='Enter your email' id='email' type='text' value={employee.email} onChange={handleChange} name='email' className="input_space" />
                </label>
                <br />

                <label htmlFor="dob">
                    DOB:
                    <br />
                    <input id='dob' type='date' value={employee.dob} onChange={handleChange} name='dob' className="input_space" />
                </label>
                <br />

                <label htmlFor="mobileNo" >
                    Mobile Number:
                    <br />
                    <input id='mobileNo' type='number' placeholder='Enter your Mobile Number' value={employee.mobileNo} onChange={handleChange} name='mobileNo' className="input_space" />
                </label>
                <br />

                <lable>BloodGroup:</lable><br />

                <select value={employee.bloodGroup} placeholder="---" onChange={handleChange} name='bloodGroup' className="input_space">

                    <option value="" disabled selected>Select your Blood Group</option>
                    <option>A+ve</option>
                    <option>B+ve</option>
                    <option>AB+ve</option>
                    <option>O+ve</option>
                    <option>A-ve</option>
                    <option>B-ve</option>
                    <option>AB-ve</option>
                    <option>O-ve</option>

                </select>

                <br />

                <label>Gender:</label>
                <br />

                <select value={employee.gender} onChange={handleChange} name='gender' className="input_space">

                    <option value="" disabled selected>Select your Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Not Specified</option>

                </select>
                <br />

                <button style={{ cursor: "pointer" }} onClick={handleSubmit}>{`${state ? 'Update' : 'Add Employee'}`}</button>
            </form>
            <br />


        </div>
    );
}