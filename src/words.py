"""Module for words and word lists."""

# stand lib
from typing import List
from typing import Text

# custom
from constants import (
        ALPHABET,
        ENGLISH_VOCAB,
        GOOD_PUNCT,
        IRR_NOUNS,
        JAP_VOCAB,
        NOUNS,
        PROP_NOUNS,
        VERBS,
        )
from data.verbforms import verb_forms as VERB_FORMS


def add_s(word: Text) -> Text:
    """Appends s to word. Returns String."""
    return word + "s"


def add_es(word: Text) -> Text:
    """Appends es to word. Returns String."""
    return word + "es"


def add_ves(word: Text) -> Text:
    """Appends ves to word. Returns String."""
    return word + "ves"


def base_noun(word: Text) -> Text:
    """Gets base noun of word. Returns String."""
    for noun in get_nouns():
        if is_irr_noun(word):
            return get_base_irregular_noun(word)
#        if is_foreign_origin(word): return get_base_foreign_noun(word)
        elif word == noun:
            return word
        elif make_plural(noun) == word:
            return noun
    return ""


def base_verb(verb: Text) -> Text:
    """Gets base form of verb. Returns String."""
    for base, nested in VERB_FORMS.items():
        for form, value in nested.items():
            if value == verb:
                return base
    return ""


def double_f_end(word: Text) -> Text:
    """Checks for double f ending. Returns Boolean."""
    return word[-2:] == "ff"


def final_es(word: Text) -> bool:
    """Checks for es ending. Returns Boolean. """
    return word[-2:] == "es"


def final_x(word: Text) -> bool:
    """Checks for x ending. Returns Boolean."""
    return word[-1] == "x"


def final_o(word: Text) -> bool:
    """Checks for o ending. Returns Boolean."""
    return word[-1] == "o"


def final_y(word: Text) -> bool:
    """Checks for y ending. Returns Boolean."""
    return word[-1] == "y"


def final_f1(word: Text) -> bool:
    """Checks for f ending. Returns Boolean."""
    return word[-1] == "f"


def final_f2(word: Text) -> bool:
    """Checks for 'f*' ending. Returns Boolean."""
    return word[-2] == "f"


def get_base_irregular_noun(word: Text) -> Text:
    """Gets base irregular noun. Returns String."""
    for noun in get_irregular_nouns():
        if word == make_plural(noun):
            return noun
    return ""


def get_english_japanese() -> List[Text]:
    """Gets English and Japanese words. Returns List."""
    return get_english_words() + get_japanese_words()


def get_english_words() -> List[Text]:
    """Gets English words. Returns List."""
    temp = []
    with open(ENGLISH_VOCAB, "r") as f:
        for line in f.readlines():
            temp.append(line.strip())
    return temp


def get_irregular_nouns() -> List[Text]:
    """Gets list of irregular nouns. Returns List."""
    temp = []
    with open(IRR_NOUNS, "r") as f:
        for line in f.readlines():
            temp.append(line.strip())
    return temp


def get_japanese_words() -> List[Text]:
    """Gets Japanese words. Returns List."""
    temp = []
    with open(JAP_VOCAB, "r") as f:
        for line in f.readlines():
            temp.append(line.strip())
    return temp


def get_lang_func(lang):
    """Gets the function that gets a list of words. Returns Function."""
    return {
            "english": get_english_words,
            "japanese": get_japanese_words,
            "english_japanese": get_english_japanese,
            }.get(lang)


def get_nouns():
    """Gets a list of nouns. Returns List."""
    temp = []
    with open(NOUNS, "r") as f:
        [temp.append(line.strip()) for line in f.readlines()]
    return temp


def get_verbs():
    """Gets a list of verbs. Returns List."""
    temp = []
    with open(VERBS, "r") as f:
        [temp.append(line.strip()) for line in f.readlines()]
    return temp


def get_words_in_language(lang):
    """Gets words in lang. Returns List."""
    return {
            "english": get_english_words(),
            "japanese": get_japanese_words(),
            "english_japanese": get_english_japanese(),
            }.get(lang)


def is_good_char(char):
    """Validates char. Returns Boolean."""
    return ((char in ALPHABET) or (char in GOOD_PUNCT))


def is_irr_noun(noun: Text) -> bool:
    """Checks if noun is irregular. Returns Boolean."""
    return noun in get_irregular_nouns()


def is_proper_noun(word):
    """Checks if word is proper noun. Returns Boolean."""
    propernouns = []
    with open(PROP_NOUNS, "r") as f:
        [propernouns.append(word.strip()) for word in f.readlines()]
    return word in propernouns


def is_number(char: Text) -> bool:
    """Checks if char is number. Returns Boolean."""
    return char in string.digits


def is_str(word: Text) -> bool:
    """Checks if word is string. Returns Boolean."""
    return type(word) is str


def is_vowel(char: Text) -> bool:
    """Checks if char is vowel. Returns Boolean."""
    return char in "aeiou"


def make_plural(word):
    """Makes word plural if it's a noun or verb. Returns None."""
    # special
    if word == "I":
        return add_s(word)
#     elif is_foreign_origin(word):
#         return add_s(word)
    # fix this
#     elif is_irr_noun(word):   return IRRNOUNS.get(word)

    # common
    elif final_es(word):
        return word
    elif (final_x(word) or final_o(word)) and not is_vowel(word[-2]):
        return add_es(word)
    elif final_x(word):
        return add_es(word)
    elif sock_stew(word):
        return add_es(word)
    elif final_y(word) and not is_vowel(word[-2]):
        return y_to_ies(word)

    # f endings
    # sofa -> soves ?
    elif double_f_end(word):
        return add_s(word)
    elif special_f_end(word):
        return add_s(word)
    elif final_f1(word) and not special_f_end(word):
        return add_ves(word[:-1])
    elif final_f2(word):
        return add_ves(word[:-2])
    else:
        return add_s(word)


def remove_numbers(word):
    """Removes all numbers from the word. Returns String."""
    no_nums = []
    [no_nums.append(char) for char in word if not is_number(char)]
    return ''.join(no_nums)


def remove_punctuation(word):
    """Removes punctuation from the word. Returns String."""
    no_punct = []
    for char in word:
        if is_good_char(char):
            no_punct.append(char)
    return ''.join(no_punct)


def sock_stew(word: Text) -> bool:
    """Checks for sock-stew words. Returns Boolean."""
    return word[-2:] in ["ss", "ch", "zz", "sh"]


def special_f_end(word: Text) -> bool:
    """Checks for special f-ending words. Returns Boolean."""
    return word in ["chef", "beef"]


def word_list(somefile: Text) -> List[Text]:
    """Gets somefile's list of words. Returns List."""
    temp = []
    with open(somefile, "r") as file_:
        for line in file_.readlines():
            temp.append(line.strip())
    return temp


def y_to_ies(word: Text) -> Text:
    """Changes final y to ies. Returns String."""
    return word[:-1]+"ies"
