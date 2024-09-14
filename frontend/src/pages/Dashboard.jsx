import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import useSWR from "swr"

export const Dashboard =  () => {
    // const [balance, setBalance] = useState(0); // State to store balance
    // const [loading, setLoading]=useState(true);
    console.log("Dashboard Render")
    // useEffect(() => {
    //     // Fetch the balance when the component mounts
    //     async function fetchData() {
    //         try {
    //             const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
    //                 headers: {
    //                     Authorization: "Bearer " + localStorage.getItem("token"),
    //                 },
    //             });
    //             setBalance(response.data.balance);
    //         } catch (error) {
    //             console.error("Error fetching balance:", error);
    //         } 
    //     }

    //     fetchData();
    // },[]);


    const fetcher=async (url)=>{
        const response= await axios.get(url,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })

        return response.data.balance;
    }

    const {data: balance, error, loading}=useSWR("http://localhost:3000/api/v1/account/balance",fetcher,{
        refreshInterval: 10000 // Poll every 10 seconds
    });
    return <div>
        <Appbar />
        <div className="m-8">
            {loading ? <p>Loading..</p>: <Balance value={balance} />}
            <Users />
        </div>
    </div>
}