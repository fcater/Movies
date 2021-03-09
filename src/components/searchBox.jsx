import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control m-2 fixed-top w-25"
      placeholder="搜索..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      style={{ left: "60vw" }}
    />
  );
};

export default SearchBox;
