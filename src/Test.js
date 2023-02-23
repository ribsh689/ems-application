import React from "react";
import { ReactDOM } from "react";
import axios from "axios";

export default function Test() {

    const fetchAPI = () => {
        fetch('http://localhost:3000/employees')
            .then((res) => res.json())
            .then((data) => console.log(data));
    }


    const putAPI = (id) => {
        axios({
            url: `http://localhost:3000/employees/${id}`,
            method: 'put',
            data: {
                name: "Ramesh",
                email: "ramesh@mail.com",
                dob: "2000-01-09",
                mobileNo: "9128292289",
                bloodGroup: "AB+ve",
                gender: "Male"
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (<>
        <button onClick={putAPI(2)}> PUT </button>
        <button onClick={fetchAPI}> FETCH </button>
    </>
    )
}