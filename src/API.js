import axios from "axios";

const API = () => {


    const fetchAPI = async () => {
        try {
            await axios.get('http://localhost:3000/employees')
                .then(res => {
                    const ans = res.data
                    console.log(ans);
                })
        }
        catch (error) {
            console.log(error);
        }


    }

    const postAPI = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/employees',
            data: {
                first_name: 'Finn',
                last_name: 'Williams'
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deleteAPI = async () => {
        axios.delete('http://localhost:3000/employees/7')
            .then(function (response) {
                console.log(response);
                fetchAPI();
            })
    }

    return (
        <>
            functionName();
        </>
    )
}

export default API;