import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul
      className="fixed-top m-0"
      style={{ backgroundColor: "rgb(51,51,51)", top: "50px" }}
    >
      <div className="d-flex">
        {items.map((item) => (
          <a
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "text-light p-2 bg-warning clickable"
                : "text-secondary p-2 clickable"
            }
            style={{ listStyle: "none", backgroundColor: "rgb(51,51,51)" }}
          >
            {item[textProperty]}
          </a>
        ))}
      </div>
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
