import React, { useState, useEffect } from 'react';

type Data = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const SoalTiga = () => {

    const [dataForm, setDataForm] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')



                if (!response.ok){
                    throw new Error("Fetch Error")
                }

                const data = await response.json()

                setDataForm(data)

            } catch (error) {
                setError("Something wrong")

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    if (loading) return <p>Loading ...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>

    return (
        <div>
            <ul style={{ padding: 0 }}>
                {dataForm.map((data) => (
                    <li
                        key={data.id}
                        style={{
                            // listStyle: "none",
                            // border: "1px solid #ddd",
                            // padding: "8px",
                            marginBottom: "10px",
                            // borderRadius: "6px",
                            // maxWidth: "600px",
                            textAlign: "left"
                        }}
                    >
                        <p>
                            <strong >User ID :</strong> {data.userId}
                        </p>
                        <p>
                            <strong>Title :</strong> {data.title}
                        </p>
                        <p>
                            <strong>Body :</strong> {data.body}
                        </p>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default SoalTiga;