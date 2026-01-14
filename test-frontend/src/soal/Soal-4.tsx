import React, { useState } from 'react';

type PaginationProps = {
    items: string[];
    itemsPerPage: number;
}

const ItemsPagination = ({ items, itemsPerPage }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemPageActive = items.slice(startIndex, endIndex);

    const totalPages = Math.ceil(items.length / itemsPerPage);


    return (
        <div style={{ textAlign: "left" }}>
            <div>Page {currentPage} : </div>
            <ul>
                {itemPageActive.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <div>
                <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        style={{
                            fontWeight: currentPage === i + 1 ? "bold" : "normal",
                        }}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

        </div>
    )
}

export default ItemsPagination;