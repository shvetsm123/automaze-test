import React from "react";

const SearchInput = ({ searchText, setSearchText }) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-2 py-1 border rounded my-2 focus:outline-none focus:border-blue-500 w-full"
        />
    );
};

export default SearchInput;
