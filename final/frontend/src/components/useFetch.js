import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() =>{
        axios.get(url)
            .then(res => {
                return res;
            })
            .then(res => {
                setIsPending(false);
                setData(res.data);
            })
    }, [url])

    return ({ data, isPending });
}
 
export default useFetch;