import React from "react";

const GradeBtn = props => {
  const { btnID, text } = props;
  const grade1 = "rgba(0, 189, 128, 1.0)";
  const grade2 = "rgba(157, 67, 153, 1.0)";
  const grade3 = "rgba(228, 105, 0, 1.0)";
  let grade = btnID;
  let gradeColor = grade === "1" ? grade1 : grade === "2" ? grade2 : grade3;
  let gradeBorder = "1px solid transparent";
  return (
    <div
      className="btn btn-primary"
      id={btnID}
      style={{ backgroundColor: gradeColor, border: gradeBorder }}
    >
      {text}
    </div>
  );
};

const GradeBtns = () => {
  const buttons = [
    { grade: "1", toggled: false },
    { grade: "2", toggled: false },
    { grade: "3", toggled: false }
  ];
  let grades = [];
  for (let btn in buttons) {
    let grade = buttons[btn].grade;
    grades.push(<GradeBtn btnID={grade} text={grade} key={grade} />);
  }

  return <div className="btn-group col-md-4">{grades}</div>;
};

export default GradeBtns;
