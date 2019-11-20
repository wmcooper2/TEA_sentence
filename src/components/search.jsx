import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import GradeBtns from "./gradeBtns";

const Search = props => {
  const { handleInput } = props;

  return (
    <React.Fragment>
      <div className="form-row" action="" id="userinput">
        <div className="input-group col-md-8">
          <div className="input-group-prepend">
            <button className="btn btn-primary" disabled>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder="Enter a sentence."
            onChange={event => {
              handleInput(event.target.value);
            }}
          />
        </div>
        <GradeBtns />
      </div>
    </React.Fragment>
  );
};

export default Search;
