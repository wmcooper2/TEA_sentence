import VERBFORMS from "./customdata/verbforms";
let vforms = Object.keys(VERBFORMS);

const baseVerb = verb => {
  for (let word of vforms) {
    //   console.log("vforms = ", VERBFORMS[word]);
    let nestedForms = Object.values(VERBFORMS[word]);
    if (nestedForms.includes(verb)) {
      console.log(verb + " base form = " + word);
      return verb;
    }
  }
  return "";
};

export default baseVerb;
