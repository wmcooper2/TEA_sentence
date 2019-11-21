import NOUNS from "./customdata/nouns";
import IRREGULARNOUNS from "./customdata/irregularnouns";

const baseNoun = word => {
  for (let noun of NOUNS) {
    if (isIrrNoun(word)) {
      return getBaseIrrNoun(word);
    } else if (word === noun) {
      return word;
    } else if (makePlural(noun) === word) {
      return noun;
    }
  }
  return "";
};

const isIrrNoun = noun => {
  return noun in IRREGULARNOUNS;
};

const getBaseIrrNoun = irrNoun => {
  for (let noun of IRREGULARNOUNS) {
    if (irrNoun === makePlural(noun)) {
      return noun;
    }
  }
  return "";
};

const makePlural = word => {
  //common
  if (finalEs(word)) {
    //already plural
    return word;
  } else if (finalX(word) || (finalO(word) && !isVowel(word.slice(-2)))) {
    return addEs(word);
  } else if (finalX(word)) {
    return addEs(word);
  } else if (sockStew(word)) {
    return addEs(word);
  } else if (finalY(word) && !isVowel(word.slice(-2))) {
    return yToIes(word);
  }
  //special f's
  else if (doubleFEnd(word)) {
    return addS(word);
  } else if (specialFEnd(word)) {
    return addS(word);
  } else if (finalF1(word) && !specialFEnd(word)) {
    return addVes(word.slice(0, -1));
  } else if (finalF2(word)) {
    return addVes(word.slice(0, -2));
  } else {
    return addS(word);
  }
};

const addEs = word => {
  return word + "es";
};
const addS = word => {
  return word + "s";
};
const addVes = word => {
  return word + "ves";
};
const doubleFEnd = word => {
  return word.slice(-2) + "ff";
};
const finalEs = word => {
  return word.slice(-2) === "es";
};
const finalF1 = word => {
  return word.slice(-1) === "f";
};
const finalF2 = word => {
  return word.slice(-2)[0] === "f";
};
const finalO = word => {
  return word.slice(-1) === "o";
};
const finalX = word => {
  return word.slice(-1) === "x";
};
const finalY = word => {
  return word.slice(-1) === "y";
};
const isVowel = char => {
  return ["a", "e", "i", "o", "u"].includes(char);
};
const sockStew = word => {
  return ["ss", "ch", "zz", "sh"].some(x => x === word.slice(-2));
};
const specialFEnd = word => {
  return ["chef", "beef"].includes(word);
};
const yToIes = word => {
  return word.slice(-1) + "ies";
};

export default baseNoun;
