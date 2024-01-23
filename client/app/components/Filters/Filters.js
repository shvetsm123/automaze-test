import React from "react";

const Filters = ({ setFilter, filter }) => {
    return (
        <div className="flex justify-center space-x-2">
            <button
                onClick={() => setFilter("all")}
                className={`px-4 py-1 rounded ${
                    filter === "all"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-200"
                }`}
            >
                All
            </button>
            <button
                onClick={() => setFilter("done")}
                className={`px-4 py-1 rounded ${
                    filter === "done"
                        ? "bg-green-500 text-white"
                        : "hover:bg-green-200"
                }`}
            >
                Done
            </button>
            <button
                onClick={() => setFilter("undone")}
                className={`px-4 py-1 rounded ${
                    filter === "undone"
                        ? "bg-red-500 text-white"
                        : "hover:bg-red-200"
                }`}
            >
                Undone
            </button>
        </div>
    );
};

export default Filters;
