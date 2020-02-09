import React from "react";

const Instructions = props => {
  return (
    <div className="instructions">
      <h5>Instructions</h5>
      <p>
        Input a sentence that you want to use on a worksheet or a lesson. If a
        word shows up in any book's index, then it will have a page number below
        it in the results. The page number's color corresponds to the grade
        level (book) where the word first appears. It will also look for simple
        nouns and verbs base form. For example, input
        <b> "I like running after German cats." </b>to see for yourself.
      </p>
      <h5>Known Bugs</h5>
      <ul>
        Don't capitalize the first letter of the sentence, unless it is "I" or a
        proper noun.
      </ul>
      <ul>
        Multi-word proper nouns like "Mother Teresa" are not supported in this
        search even though the appear in the books.
      </ul>
      <ul>This is not meant to be used on small screens.</ul>
      <ul>
        Really long sentences are not supported. If your sentence goes off
        screen, then you probably shouldn't be using it in class.
      </ul>
    </div>
  );
};

export default Instructions;
