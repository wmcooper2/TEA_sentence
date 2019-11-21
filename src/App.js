import React from "react";
import "./App.css";
import Search from "./components/search";
import DICTIONARY from "./customdata/totalenglishdictionary.js";
import levenshteinDistance from "./borrowed/levenshtein";
import Results from "./components/sentenceresults";
import { FuzzyNouns, FuzzyVerbs } from "./components/fuzzySearch";
import baseNoun from "./nounsearch";
import baseVerb from "./verbsearch";

const ENTRIES = Object.getOwnPropertyNames(DICTIONARY).sort();

//future functionality
// add popover menus for the results to see japanese meaning
// if a word is not found, then try its lower case version
// allow a temporary save ability down below the results, clear it on site reload and on user delete
// allow user to combine words to search for multi-word entries like "Niagra Falls"

//combine into a single regex, for now this is simple
const parseInput = props => {
  let noExlamations = props.replace(/[!]/g, "");
  let noQuestions = noExlamations.replace(/[?]/g, "");
  let noPeriods = noQuestions.replace(/[.]/g, "");
  let noCommas = noPeriods.replace(/[,]/g, "");
  let split = noCommas.split(" ");
  return split;
};

const levenshteinLookup = props => {
  let temp = [];
  for (let word of props) {
    for (let entry of ENTRIES) {
      let result = {
        searchResult: entry,
        value: levenshteinDistance(word, entry)
      };
      temp.push(result);
    }
  }
  return temp;
};

const getTopEntries = (dictResults, userInput) => {
  //dictResults may be used for fuzzy search in the future
  let allResults = [];
  if (userInput.length > 0) {
    for (let word of userInput) {
      // let topTenish = [];
      let topEntries = [];
      if (DICTIONARY[word]) {
        //exact match
        topEntries.push({
          word: word,
          entry: DICTIONARY[word]
        });

        // use this for fuzzy search?
        // topTenish = dictResults.sort((a, b) => a.value - b.value).slice(0, 9);
      } else {
        //unknown word
        let searchedNoun = baseNoun(word);
        let searchedVerb = baseVerb(word);

        // default unknown word replacement
        topEntries.push({
          word: word,
          entry: {},
          nounBase: searchedNoun,
          nounBaseEntry: DICTIONARY[searchedNoun],
          verbBase: searchedVerb,
          verbBaseEntry: DICTIONARY[searchedVerb]
        });

        // topTenish = dictResults.sort((a, b) => a.value - b.value).slice(0, 10);
        //if the word is not found exactly, then first time through...
        // it may be lower case in the dictionary, but is the first word of the user's input
        // it may be a multi-word entry
        //
      }

      allResults.push(topEntries);
    }
  } else {
    // there is nothing in user input
    let topEntries = [];
    topEntries.push({
      word: "???",
      entry: {}
    });
    allResults.push(topEntries);
  }
  return allResults;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: {}
    };
  }

  handleInput = props => {
    let words = parseInput(props);
    let levenshteinRanks = levenshteinLookup(words);
    let topEntries = getTopEntries(levenshteinRanks, words);
    console.log("topEntries = ", topEntries);
    this.setState({
      entries: topEntries
    });
  };

  render() {
    return (
      <div className="App">
        <Search handleInput={this.handleInput} />
        <Results props={this.state.entries} />
        <FuzzyNouns props={this.state.entries} />
        <FuzzyVerbs props={this.state.entries} />
      </div>
    );
  }
}

export default App;
