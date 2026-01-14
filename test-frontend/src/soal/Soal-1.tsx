import { useState } from "react";
type ItemListProps = {
    items: string[];
};

const MyItemList = ({ items }: ItemListProps) => {
    const [list, setList] = useState(items);

    return (
        <ul>
            {list.map((item, index) => (
                <li
                    key={index}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 7px",
                    }}
                >
                    {item}
                    <button
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "6px 6px",
                        }}
                        onClick={() => {
                            const newList = [...list];
                            newList.splice(index, 1);
                            setList(newList);
                        }}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default MyItemList;
