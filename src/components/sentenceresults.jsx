import React from "react";

const Result = props => {
  const resultItems = props.props;
  const results = [];
  const grade1 = "rgba(0, 189, 128, 1.0)";
  const grade2 = "rgba(157, 67, 153, 1.0)";
  const grade3 = "rgba(228, 105, 0, 1.0)";

  if (resultItems.length > 0) {
    for (let item of resultItems) {
      const resultWord = item[0].word;
      const entry = item[0].entry;
      const grade = entry.grade;
      const gradeColor =
        grade === "1" ? grade1 : grade === "2" ? grade2 : grade3;
      results.push(
        <div key={resultItems.indexOf(item)} className="resultColumn">
          <span>{resultWord}</span>
          <span
            className="badge badge-primary badge-pill"
            style={{ backgroundColor: gradeColor }}
          >
            {entry.page}
          </span>
        </div>
      );
    }
  } else {
    //do nothing
  }
  return (
    <div className="results">
      <span className="resultlabel">Given:</span>
      {results}
    </div>
  );
};

export default Result;
