import React from "react";

const Result = props => {
  const { topResults, searchWord } = props.props;

  //need these to override boostraps behavior
  const grade1 = "rgba(0, 189, 128, 1.0)";
  const grade2 = "rgba(157, 67, 153, 1.0)";
  const grade3 = "rgba(228, 105, 0, 1.0)";

  let results = [];
  if (topResults.length > 1 && searchWord.length > 0) {
    for (let entry of topResults) {
      let grade = entry.entry.grade;
      let gradeColor = grade === "1" ? grade1 : grade === "2" ? grade2 : grade3;
      results.push(
        <li
          key={topResults.indexOf(entry)}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{entry.word}</span>
          <span>{entry.entry.japanese}</span>
          <span
            className="badge badge-primary badge-pill"
            style={{ backgroundColor: gradeColor }}
          >
            {entry.entry.page}
          </span>
        </li>
      );
    }
  } else {
    results = "";
  }

  return <ul className="results list-group">{results}</ul>;
};

export default Result;
