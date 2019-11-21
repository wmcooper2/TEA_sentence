import VERBFORMS from "./customdata/verbforms";
let vforms = Object.keys(VERBFORMS);

const baseVerb = verb => {
  for (let word of vforms) {
    //   console.log("vforms = ", VERBFORMS[word]);
    let nestedForms = Object.values(VERBFORMS[word]);
    if (nestedForms.includes(verb)) {
      return word;
    }
  }
  return "";
};

export default baseVerb;
