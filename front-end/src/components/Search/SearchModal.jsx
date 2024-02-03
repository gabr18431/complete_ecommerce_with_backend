import { useEffect, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useTheme } from "@mui/material";

const SearchModal = ({ query, setQuery, setShowSearch, data }) => {
  const theme = useTheme();
  // @ts-ignore
  const navigate = useNavigate();
  let filteredData = [];
  if (query !== "") {
    filteredData = data?.filter((pro) =>
      pro.attributes.filters.toLowerCase().includes(query.toLowerCase())
    );
  }
  return (
    <div
      className="search-modal"
      style={{
        backgroundColor:
          theme.palette.mode === "light"
            ? // @ts-ignore
              theme.palette.myColor.main
            : "rgb(29 32 33)",
      }}
    >
      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Close className="close-btn" onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        {query === "" ? (
          <div className="start-msg">
            Start typing to see products you are looking for.
          </div>
        ) : !filteredData.length ? (
          <div className="start-msg">There are no products to display.</div>
        ) : (
          <div className="search-results">
            {filteredData?.map((item) => (
              <div
                key={item.id}
                className="search-result-item"
                onClick={() => {
                  setShowSearch(false);
                  setQuery('')
                  navigate(`/product/${item.id}`);
                }}
              >
                <div className="image-container">
                  <img
                    // @ts-ignore
                    src={`${
                      item.attributes.img.data[0].attributes.url
                    }`}
                    alt="img"
                  />
                </div>
                <div className="prod-details">
                  <span className="name">{item.attributes.title}</span>
                  <span className="desc">{item.attributes.desc}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
