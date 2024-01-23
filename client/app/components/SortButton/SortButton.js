import React from "react";

const SortButton = ({ sortOrder, handleSort }) => {
    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={handleSort}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
                {`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
            </button>
        </div>
    );
};

export default SortButton;
