const R = require('ramda');

const badWords = ['fuck', 'fucked', 'ashole', 'suck'];

const includes = R.curry((x, what) => R.toLower(x).includes(R.toLower(what)));

const getAllPossibleMatches = (str, arr) => R.filter(includes(str), arr);

const getLongestValInArray = (arr) => R.reduce((acc, next) => R.length(next) > R.length(acc) ? next : acc, '', arr);

const getMostAccurateMatch = R.pipe(getAllPossibleMatches, getLongestValInArray);

const replaceMatchInWord = (str, match, newStr) => match.length > 0 ? str.replace(new RegExp(match, 'gi'), newStr.repeat(match.length)) : str;

const replaceWords = R.curry((words, newStr, what) => replaceMatchInWord(what, getMostAccurateMatch(what, words), newStr));

const censored = R.pipe(R.split(' '), R.map(replaceWords(badWords, '*')), R.join(' '));
console.log(censored('Hi, this is a fucked up asholeee aShOlEeE ASHOLEEEEE text. You SUCKER !'));