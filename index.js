const animals = require('./assets/animals');
const adjectives = require('./assets/adjectives');
const emojis = require('./assets/emojis');

const number = '1234567890';
const smallCaseAlphabats = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseAlphabats = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const smallAlphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
const upperAlphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123409876';
const mixedChars = 'NOPQRmDTBCMljLSIJkno3p051F787643G8EArKqH';

function getRandom(object) {
  let string = '';
  let referralString = mixedChars;
  let lengthShouldBeAtlast = mixedChars.length;
  let lengthShouldBeAtleast = 4;
  let lengthShouldBe = lengthShouldBeAtlast;

  if (object && object.custom)
    referralString = object.custom;

  if (object && object.allCaps)
    referralString = upperCaseAlphabats;

  if (object && object.allSmall)
    referralString = smallCaseAlphabats;

  if (object && object.capsWithNumbers)
    referralString = upperAlphanumeric;

  if (object && object.smallWithNumbers)
    referralString = smallAlphanumeric;

  if (object && object.onlyNumbers)
    referralString = number;

  if (object && object.max)
    lengthShouldBeAtlast = parseInt(object.max);

  if (object && object.min)
    lengthShouldBeAtleast = parseInt(object.min);

  if (lengthShouldBeAtleast > lengthShouldBeAtlast) {
    var temp = lengthShouldBeAtleast;
    lengthShouldBeAtleast = lengthShouldBeAtlast;
    lengthShouldBeAtlast = temp;
    console.log('checking swaping value ', lengthShouldBeAtleast, ' last ', lengthShouldBeAtlast)
  }

  if (object && object.max && object.min)
    lengthShouldBe = Math.floor(Math.random() * (object.max - object.min + 1)) + object.min;

  if (object && object.charLength && !object.fromShortId)
    lengthShouldBe = parseInt(object.charLength);

  if (object && object.fromShortId)
    if (object.charLength >= 3 && object.charLength <= 8)
      lengthShouldBe = parseInt(object.charLength);


  for (let i = 0; i < lengthShouldBe; i++) {
    let val = Math.floor(Math.random() * referralString.length - 1) + 1;
    string += referralString[val];
  }

  if (object && object.startWith)
    string = object.startWith + string;

  if (object && object.endWith)
    string = string + object.endWith;

  return string;
}

// returns random string according to the params
random = (object) => {
  return getRandom(object);
};

// returns a meaningful random string generated with the combination of animal-adjective-emoji-numbers
meaningful = (object) => {

  let order = [];
  let upto = 1000;
  let joinString = '-';
  let maxLength = 20;
  let chooseAnimal = animals.animals[~~(Math.random() * animals.animals.length)];
  let chooseAdjective = adjectives.adjectives[~~(Math.random() * adjectives.adjectives.length)];
  let chooseEmoji = emojis.emojis[~~(Math.random() * emojis.emojis.length)]

  if (object && object.numberUpto > 0)
    upto = parseInt(object.numberUpto);

  if (object && object.joinBy)
    joinString = object.joinBy;

  if (object && object.maxLength > 0)
    maxLength = parseInt(object.maxLength);

  let chooseNumber = Math.floor(Math.random() * upto);

  order.push(chooseAdjective);
  order.push(chooseAnimal);
  order.push(chooseEmoji);
  order.push(chooseNumber);

  let res = order.join(joinString);
  if (res.length > maxLength) {
    return meaningful(object);
  } else {
    return res;
  }
};

shortId = (object) => {

  var empty = {};

  if (object)
    object.fromShortId = true;

  if (object && !object.charLength && !object.min && object.max) {
    object.max = 4;
    object.min = 4;
  }

  if (object && object.charLength === 0) {
    object.min = 3;
    object.max = 3;
  }

  if ((object && object.charLength) && (parseInt(object.charLength) > 8)) {
    object.max = 8;
    object.min = 8
  }

  if (object && object.charLength && parseInt(object.charLength) < 3) {
    object.max = 3;
    object.min = 3;
  }

  if ((object && object.charLength) && (parseInt(object.charLength) >= 3 && parseInt(object.charLength) <= 8)) {
    var value = parseInt(object.charLength);
    object.max = value;
    object.min = value;
  }

  if (object && object.startWith) {
    object.startWith = null;
  }

  if (object && object.endWith) {
    object.endWith = null;
  }

  if (!object) {
    empty.max = 4;
    empty.min = 4;
    empty.fromShortId = true;
    return getRandom(empty);
  }

  return getRandom(object);
}

module.exports = {
  random,
  meaningful,
  shortId
}
