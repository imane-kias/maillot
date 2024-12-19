import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Could not fetch the data for that resource");
                }
                const result = await response.json();
                console.log("result :", result)
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsPending(false);
            }
        };
        
        fetchData();
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;