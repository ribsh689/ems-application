import { useState, useEffect } from "react";
import Profile from "./Profile";
import Navbar from "./Navbar";
import axios from "axios";
import { useAuth } from "./auth";
export default function Home() {
    const [employeeData, setEmployeeData] = useState([]);

    const url = "http://10.85.25.50:5000/";
    const fetchAPI = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setEmployeeData(data));
    }
    const auth = useAuth()



    useEffect(() => {
        fetchAPI();
        console.log(employeeData);
    }, [])

    const handleDelete = (id) => {
        console.log(id);
        if (auth.user) {
            axios({
                method: 'delete',
                url: ` ${url}/${id}`
            })
                .then(() => fetchAPI())
        }
    }


    return (
        <>
            <div><Navbar linkName="/add" /></div>
            {employeeData?.map((employee, index) => {
                return <Profile employee={employee} index={index} handleDelete={handleDelete} />
            })}
        </>
    )
}
