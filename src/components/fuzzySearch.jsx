import React from "react";

const FuzzyVerbs = (props) => {
  const resultItems = props.props;
  const results = [];

  if (resultItems.length > 0) {
    for (let item of resultItems) {
      const resultWord = item[0].word;
      const entry = item[0].entry;

      //performed a base noun search
      if (item[0].hasOwnProperty("verbBase")) {
        const verbBase = item[0].verbBase;
        let verbEntry = item[0].hasOwnProperty("verbBaseEntry")
          ? item[0].verbBaseEntry
          : "none";

        results.push(
          <div key={resultItems.indexOf(item)} className="resultColumn">
            <span>{verbBase}</span>
            <span className="badge badge-primary badge-pill">
              {verbEntry === undefined ? "" : verbEntry.page}
            </span>
          </div>
        );
      } else {
        // no base noun search performed, but still need the divs for spacing
        results.push(
          <div key={resultItems.indexOf(item)} className="resultColumn">
            <span style={{ color: "white" }}>{resultWord}</span>

            <span
              className="badge badge-primary badge-pill"
              style={{ backgroundColor: "white" }}
            >
              {entry.page}
            </span>
          </div>
        );
      }
    }
  } else {
    //do nothing
  }
  return (
    <div className="results">
      <span className="resultlabel">Base Verb:</span>
      <div className="resulttable">{results}</div>
    </div>
  );
};

const FuzzyNouns = (props) => {
  const resultItems = props.props;
  const results = [];

  if (resultItems.length > 0) {
    for (let item of resultItems) {
      const resultWord = item[0].word;
      const entry = item[0].entry;

      //performed a base noun search
      if (item[0].hasOwnProperty("nounBase")) {
        const nounBase = item[0].nounBase;
        let nounEntry = item[0].hasOwnProperty("nounBaseEntry")
          ? item[0].nounBaseEntry
          : "none";

        results.push(
          <div key={resultItems.indexOf(item)} className="resultColumn">
            <span>{nounBase}</span>
            <span className="badge badge-primary badge-pill">
              {nounEntry === undefined ? "" : nounEntry.page}
            </span>
          </div>
        );
      } else {
        // no base noun search performed, but still need the divs for spacing
        results.push(
          <div key={resultItems.indexOf(item)} className="resultColumn">
            <span style={{ color: "white" }}>{resultWord}</span>

            <span
              className="badge badge-primary badge-pill"
              style={{ backgroundColor: "white" }}
            >
              {entry.page}
            </span>
          </div>
        );
      }
    }
  } else {
    //do nothing
  }
  return (
    <div className="results">
      <span className="resultlabel">Base Noun:</span>
      <div className="resulttable">{results}</div>
    </div>
  );
};

export { FuzzyNouns, FuzzyVerbs };
