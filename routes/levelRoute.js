const express = require(`express`);
const authMiddleware = require(`../middleware/authMiddleware`);
const Level = require("../models/level"); // Import Level model
const User = require("../models/user");

const router = express.Router();
const createLevels = (targetLanguage) => {
  return [
    {
      topic: `Common Phrases`,
      questions: [
        {
          type: `mcq`,
          question: `What is the meaning of 'Good morning' in ${targetLanguage}?`,
          options: [`Good night`, `Good morning`, `Hello`],
          answer: `Good morning`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `How do you say 'Thank you' in ${targetLanguage}?`,
          options: [`Please`, `Thank you`, `Goodbye`],
          answer: `Thank you`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Hello' in ${targetLanguage}?`,
          options: [`Hello`, `Hi`, `Bonjour`],
          answer: `Hello`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'Goodbye' in ${targetLanguage}?`,
          options: [`Goodbye`, `Hello`, `Please`],
          answer: `Goodbye`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What does 'Thank you' mean in ${targetLanguage}?`,
          options: [`Please`, `Thank you`, `Excuse me`],
          answer: `Thank you`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `How do you translate 'How are you?' into ${targetLanguage}?`,
          options: [`How are you?`, `Hello`, `I'm fine`],
          answer: `How are you?`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Please' in ${targetLanguage}?`,
          options: [`Excuse me`, `Please`, `Good morning`],
          answer: `Please`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `How do you say 'Excuse me' in ${targetLanguage}?`,
          options: [`Excuse me`, `Thank you`, `Please`],
          answer: `Excuse me`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is the meaning of 'Hello' in ${targetLanguage}?`,
          options: [`Hello`, `Goodbye`, `Excuse me`],
          answer: `Hello`,
          id: 9,
        },
      ],
      id: 1,
    },
    {
      topic: `Colors`,
      questions: [
        {
          type: `mcq`,
          question: `What is the meaning of 'Red' in ${targetLanguage}?`,
          options: [`Red`, `Green`, `Blue`],
          answer: `Red`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `How do you say 'Blue' in ${targetLanguage}?`,
          options: [`Blue`, `Green`, `Yellow`],
          answer: `Blue`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Green' in ${targetLanguage}?`,
          options: [`Blue`, `Red`, `Green`],
          answer: `Green`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'Yellow' in ${targetLanguage}?`,
          options: [`Yellow`, `Red`, `Blue`],
          answer: `Yellow`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What does 'Black' mean in ${targetLanguage}?`,
          options: [`Black`, `White`, `Gray`],
          answer: `Black`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `How do you translate 'Orange' into ${targetLanguage}?`,
          options: [`Orange`, `Pink`, `Brown`],
          answer: `Orange`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is the meaning of 'Blue' in ${targetLanguage}?`,
          options: [`Red`, `Blue`, `Black`],
          answer: `Blue`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'White' in ${targetLanguage}?`,
          options: [`White`, `Black`, `Gray`],
          answer: `White`,
          id: 8,
        },
      ],
      id: 2,
    },
    {
      topic: `Numbers`,
      questions: [
        {
          type: `mcq`,
          question: `What is the meaning of 'One' in ${targetLanguage}?`,
          options: [`One`, `Two`, `Three`],
          answer: `One`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `How do you say 'Two' in ${targetLanguage}?`,
          options: [`One`, `Two`, `Four`],
          answer: `Two`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Five' in ${targetLanguage}?`,
          options: [`Three`, `Four`, `Five`],
          answer: `Five`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'Seven' in ${targetLanguage}?`,
          options: [`Five`, `Seven`, `Eight`],
          answer: `Seven`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `How do you translate 'Nine' into ${targetLanguage}?`,
          options: [`Seven`, `Nine`, `Ten`],
          answer: `Nine`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is the meaning of 'Eight' in ${targetLanguage}?`,
          options: [`Six`, `Seven`, `Eight`],
          answer: `Eight`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Three' in ${targetLanguage}?`,
          options: [`One`, `Three`, `Four`],
          answer: `Three`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `How do you say 'Ten' in ${targetLanguage}?`,
          options: [`Eight`, `Nine`, `Ten`],
          answer: `Ten`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Five' in ${targetLanguage}?`,
          options: [`Three`, `Five`, `Six`],
          answer: `Five`,
          id: 9,
        },
      ],
      id: 3,
    },
    {
      topic: `Family Members`,
      questions: [
        {
          type: `mcq`,
          question: `What is the meaning of 'Mother' in ${targetLanguage}?`,
          options: [`Mother`, `Father`, `Sister`],
          answer: `Mother`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `How do you say 'Brother' in ${targetLanguage}?`,
          options: [`Brother`, `Uncle`, `Grandfather`],
          answer: `Brother`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Father' in ${targetLanguage}?`,
          options: [`Mother`, `Father`, `Uncle`],
          answer: `Father`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'Daughter' in ${targetLanguage}?`,
          options: [`Daughter`, `Son`, `Sister`],
          answer: `Daughter`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `How do you translate 'Younger Brother' into ${targetLanguage}?`,
          options: [`Younger Brother`, `Older Brother`, `Cousin`],
          answer: `Younger Brother`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is the meaning of 'Grandmother' in ${targetLanguage}?`,
          options: [`Grandmother`, `Grandfather`, `Mother`],
          answer: `Grandmother`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Uncle' in ${targetLanguage}?`,
          options: [`Uncle`, `Aunt`, `Grandfather`],
          answer: `Uncle`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `How do you say 'Sister' in ${targetLanguage}?`,
          options: [`Sister`, `Brother`, `Mother`],
          answer: `Sister`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Grandfather' in ${targetLanguage}?`,
          options: [`Grandfather`, `Grandmother`, `Uncle`],
          answer: `Grandfather`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'Grandchild' in ${targetLanguage}?`,
          options: [`Grandchild`, `Son`, `Daughter`],
          answer: `Grandchild`,
          id: 10,
        },
      ],
      id: 4,
    },
    {
      topic: `Days of the Week`,
      questions: [
        {
          type: `mcq`,
          question: `How do you say 'Monday' in ${targetLanguage}?`,
          options: [`Monday`, `Tuesday`, `Wednesday`],
          answer: `Monday`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Wednesday' in ${targetLanguage}?`,
          options: [`Tuesday`, `Wednesday`, `Friday`],
          answer: `Wednesday`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'Friday' in ${targetLanguage}?`,
          options: [`Monday`, `Friday`, `Saturday`],
          answer: `Friday`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is the meaning of 'Saturday' in ${targetLanguage}?`,
          options: [`Saturday`, `Sunday`, `Thursday`],
          answer: `Saturday`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `How do you translate 'Sunday' into ${targetLanguage}?`,
          options: [`Monday`, `Sunday`, `Friday`],
          answer: `Sunday`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'Tuesday' in ${targetLanguage}?`,
          options: [`Monday`, `Tuesday`, `Thursday`],
          answer: `Tuesday`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'Thursday' in ${targetLanguage}?`,
          options: [`Tuesday`, `Thursday`, `Friday`],
          answer: `Thursday`,
          id: 7,
        },
      ],
      id: 5,
    },
    {
      topic: `Months of the Year`,
      questions: [
        {
          type: `mcq`,
          question: `How do you say 'January' in ${targetLanguage}?`,
          options: [`January`, `February`, `March`],
          answer: `January`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'May' in ${targetLanguage}?`,
          options: [`April`, `May`, `July`],
          answer: `May`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'August' in ${targetLanguage}?`,
          options: [`June`, `August`, `October`],
          answer: `August`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'July' in ${targetLanguage}?`,
          options: [`June`, `July`, `September`],
          answer: `July`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `How do you translate 'November' into ${targetLanguage}?`,
          options: [`October`, `November`, `January`],
          answer: `November`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `Which of the following means 'October' in ${targetLanguage}?`,
          options: [`September`, `October`, `December`],
          answer: `October`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is the meaning of 'March' in ${targetLanguage}?`,
          options: [`February`, `March`, `April`],
          answer: `March`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `How do you say 'December' in ${targetLanguage}?`,
          options: [`November`, `December`, `January`],
          answer: `December`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'February' in ${targetLanguage}?`,
          options: [`January`, `February`, `March`],
          answer: `February`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is the meaning of 'September' in ${targetLanguage}?`,
          options: [`August`, `September`, `October`],
          answer: `September`,
          id: 10,
        },
      ],
      id: 6,
    },
    {
      topic: `Animals`,
      questions: [
        {
          type: `mcq`,
          question: `What is the translation of 'dog' in ${targetLanguage}?`,
          options: [`Cat`, `Dog`, `Horse`],
          answer: `Dog`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `How do you say 'cat' in ${targetLanguage}?`,
          options: [`Cat`, `Dog`, `Frog`],
          answer: `Cat`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'dog' in ${targetLanguage}?`,
          options: [`Cat`, `Dog`, `Horse`],
          answer: `Dog`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'bird' in ${targetLanguage}?`,
          options: [`Cat`, `Bird`, `Horse`],
          answer: `Bird`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `How do you say 'horse' in ${targetLanguage}?`,
          options: [`Cat`, `Bird`, `Horse`],
          answer: `Horse`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is the translation of 'fish' in ${targetLanguage}?`,
          options: [`Fish`, `Bird`, `Horse`],
          answer: `Fish`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `How do you say 'rabbit' in ${targetLanguage}?`,
          options: [`Rabbit`, `Bird`, `Horse`],
          answer: `Rabbit`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is the translation for 'wolf' in ${targetLanguage}?`,
          options: [`Wolf`, `Bird`, `Horse`],
          answer: `Wolf`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `How do you say 'pig' in ${targetLanguage}?`,
          options: [`Pig`, `Bird`, `Horse`],
          answer: `Pig`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is the correct translation of 'goat' in ${targetLanguage}?`,
          options: [`Goat`, `Bird`, `Horse`],
          answer: `Goat`,
          id: 10,
        },
      ],
      id: 7,
    },
    {
      topic: `Fruits & Vegetables`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'apple' in ${targetLanguage}?`,
          options: [`Apple`, `Banana`, `Orange`],
          answer: `Apple`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `How do you say 'carrot' in ${targetLanguage}?`,
          options: [`Carrot`, `Potato`, `Onion`],
          answer: `Carrot`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is the translation of 'grape' in ${targetLanguage}?`,
          options: [`Apple`, `Grape`, `Peach`],
          answer: `Grape`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'melon' in ${targetLanguage}?`,
          options: [`Melon`, `Orange`, `Banana`],
          answer: `Melon`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `How do you say 'banana' in ${targetLanguage}?`,
          options: [`Banana`, `Apple`, `Cherry`],
          answer: `Banana`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is the translation of 'tomato' in ${targetLanguage}?`,
          options: [`Tomato`, `Carrot`, `Cucumber`],
          answer: `Tomato`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `How do you say 'potato' in ${targetLanguage}?`,
          options: [`Potato`, `Onion`, `Cabbage`],
          answer: `Potato`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'strawberry' in ${targetLanguage}?`,
          options: [`Strawberry`, `Blueberry`, `Raspberry`],
          answer: `Strawberry`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `How do you say 'pineapple' in ${targetLanguage}?`,
          options: [`Pineapple`, `Peach`, `Mango`],
          answer: `Pineapple`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is the translation of 'strawberry' in ${targetLanguage}?`,
          options: [`Strawberry`, `Melon`, `Grape`],
          answer: `Strawberry`,
          id: 10,
        },
      ],
      id: 8,
    },
    {
      topic: `Body Parts`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'head' in ${targetLanguage}?`,
          options: [`Head`, `Arm`, `Eye`],
          answer: `Head`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `How do you say 'leg' in ${targetLanguage}?`,
          options: [`Leg`, `Foot`, `Hand`],
          answer: `Leg`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'eye' in ${targetLanguage}?`,
          options: [`Eye`, `Ear`, `Hand`],
          answer: `Eye`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `How do you say 'foot' in ${targetLanguage}?`,
          options: [`Foot`, `Hand`, `Leg`],
          answer: `Foot`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'hand' in ${targetLanguage}?`,
          options: [`Hand`, `Foot`, `Finger`],
          answer: `Hand`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `How do you say 'tooth' in ${targetLanguage}?`,
          options: [`Tooth`, `Tongue`, `Lip`],
          answer: `Tooth`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'ear' in ${targetLanguage}?`,
          options: [`Ear`, `Eye`, `Nose`],
          answer: `Ear`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `How do you say 'nose' in ${targetLanguage}?`,
          options: [`Nose`, `Hand`, `Finger`],
          answer: `Nose`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'hand' in ${targetLanguage}?`,
          options: [`Hand`, `Foot`, `Leg`],
          answer: `Hand`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'heart' in ${targetLanguage}?`,
          options: [`Heart`, `Lung`, `Foot`],
          answer: `Heart`,
          id: 10,
        },
      ],
      id: 9,
    },
    {
      topic: `Clothing & Accessories`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'shirt' in ${targetLanguage}?`,
          options: [`Shirt`, `Dress`, `Hat`, `Pants`],
          answer: `Shirt`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'shoes' in ${targetLanguage}?`,
          options: [`Shoes`, `Socks`, `Belt`, `Tie`],
          answer: `Shoes`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'hat' in ${targetLanguage}?`,
          options: [`Hat`, `Pants`, `Shirt`, `Socks`],
          answer: `Hat`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'belt' in ${targetLanguage}?`,
          options: [`Belt`, `Hat`, `Pants`, `Shirt`],
          answer: `Belt`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'shoes' in ${targetLanguage}?`,
          options: [`Shoes`, `Jacket`, `Tie`, `Shirt`],
          answer: `Shoes`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'tie' in ${targetLanguage}?`,
          options: [`Tie`, `Hat`, `Pants`, `Jacket`],
          answer: `Tie`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'jacket' in ${targetLanguage}?`,
          options: [`Jacket`, `Shirt`, `Pants`, `Shoes`],
          answer: `Jacket`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'hat' in ${targetLanguage}?`,
          options: [`Hat`, `Shirt`, `Tie`, `Pants`],
          answer: `Hat`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'pants' in ${targetLanguage}?`,
          options: [`Pants`, `Shirt`, `Jacket`, `Socks`],
          answer: `Pants`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'socks' in ${targetLanguage}?`,
          options: [`Socks`, `Tie`, `Shoes`, `Hat`],
          answer: `Socks`,
          id: 10,
        },
      ],
      id: 10,
    },
    {
      topic: `Food & Drinks`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'bread' in ${targetLanguage}?`,
          options: [`Bread`, `Cheese`, `Chicken`, `Water`],
          answer: `Bread`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'milk' in ${targetLanguage}?`,
          options: [`Milk`, `Cheese`, `Water`, `Chicken`],
          answer: `Milk`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'cheese' in ${targetLanguage}?`,
          options: [`Water`, `Meat`, `Cheese`, `Fruit`],
          answer: `Cheese`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'water' in ${targetLanguage}?`,
          options: [`Water`, `Chicken`, `Milk`, `Cheese`],
          answer: `Water`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'tea' in ${targetLanguage}?`,
          options: [`Tea`, `Water`, `Milk`, `Juice`],
          answer: `Tea`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'chicken' in ${targetLanguage}?`,
          options: [`Fish`, `Chicken`, `Meat`, `Soup`],
          answer: `Chicken`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'soup' in ${targetLanguage}?`,
          options: [`Sugar`, `Soup`, `Milk`, `Coffee`],
          answer: `Soup`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'meat' in ${targetLanguage}?`,
          options: [`Meat`, `Fish`, `Chicken`, `Rice`],
          answer: `Meat`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'juice' in ${targetLanguage}?`,
          options: [`Fruit`, `Juice`, `Water`, `Tea`],
          answer: `Juice`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'water' in ${targetLanguage}?`,
          options: [`Water`, `Milk`, `Tea`, `Coffee`],
          answer: `Water`,
          id: 10,
        },
      ],
      id: 11,
    },
    {
      topic: `Weather & Seasons`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'summer' in ${targetLanguage}?`,
          options: [`Winter`, `Summer`, `Autumn`, `Spring`],
          answer: `Summer`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'rain' in ${targetLanguage}?`,
          options: [`Rain`, `Sun`, `Wind`, `Snow`],
          answer: `Rain`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'snow' in ${targetLanguage}?`,
          options: [`Rain`, `Snow`, `Wind`, `Sun`],
          answer: `Snow`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'sun' in ${targetLanguage}?`,
          options: [`Rain`, `Cloud`, `Sun`, `Snow`],
          answer: `Sun`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'wind' in ${targetLanguage}?`,
          options: [`Wind`, `Rain`, `Snow`, `Sun`],
          answer: `Wind`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'cloud' in ${targetLanguage}?`,
          options: [`Cloud`, `Rain`, `Snow`, `Wind`],
          answer: `Cloud`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'cold' in ${targetLanguage}?`,
          options: [`Hot`, `Warm`, `Cold`, `Rainy`],
          answer: `Cold`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'winter' in ${targetLanguage}?`,
          options: [`Summer`, `Winter`, `Spring`, `Autumn`],
          answer: `Winter`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'summer' in ${targetLanguage}?`,
          options: [`Spring`, `Winter`, `Autumn`, `Summer`],
          answer: `Summer`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'snow' in ${targetLanguage}?`,
          options: [`Snow`, `Rain`, `Wind`, `Cloud`],
          answer: `Snow`,
          id: 10,
        },
      ],
      id: 12,
    },
    {
      topic: `Time & Clock`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'hour' in ${targetLanguage}?`,
          options: [`Minute`, `Second`, `Hour`, `Day`],
          answer: `Hour`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'midnight' in ${targetLanguage}?`,
          options: [`Midnight`, `Morning`, `Evening`, `Night`],
          answer: `Midnight`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'morning' in ${targetLanguage}?`,
          options: [`Evening`, `Morning`, `Noon`, `Night`],
          answer: `Morning`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'week' in ${targetLanguage}?`,
          options: [`Month`, `Year`, `Week`, `Day`],
          answer: `Week`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'minute' in ${targetLanguage}?`,
          options: [`Second`, `Minute`, `Hour`, `Day`],
          answer: `Minute`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'clock' in ${targetLanguage}?`,
          options: [`Clock`, `Watch`, `Hour`, `Minute`],
          answer: `Clock`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'yesterday' in ${targetLanguage}?`,
          options: [`Today`, `Tomorrow`, `Yesterday`, `Later`],
          answer: `Yesterday`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'tomorrow' in ${targetLanguage}?`,
          options: [`Yesterday`, `Today`, `Tomorrow`, `Later`],
          answer: `Tomorrow`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'hour' in ${targetLanguage}?`,
          options: [`Minute`, `Hour`, `Second`, `Day`],
          answer: `Hour`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'minute' in ${targetLanguage}?`,
          options: [`Second`, `Minute`, `Hour`, `Day`],
          answer: `Minute`,
          id: 10,
        },
      ],
      id: 13,
    },
    {
      topic: `Directions & Places`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'left' in ${targetLanguage}?`,
          options: [`Right`, `Left`, `Center`, `Up`],
          answer: `Left`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'street' in ${targetLanguage}?`,
          options: [`Road`, `Street`, `Avenue`, `Square`],
          answer: `Street`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'bridge' in ${targetLanguage}?`,
          options: [`Bridge`, `River`, `Tower`, `Road`],
          answer: `Bridge`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'square' in ${targetLanguage}?`,
          options: [`Circle`, `Square`, `Park`, `Garden`],
          answer: `Square`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'station' in ${targetLanguage}?`,
          options: [`Station`, `Airport`, `Port`, `Stop`],
          answer: `Station`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'road' in ${targetLanguage}?`,
          options: [`Street`, `Road`, `Lane`, `Way`],
          answer: `Road`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'airport' in ${targetLanguage}?`,
          options: [`Airport`, `Station`, `Hotel`, `Church`],
          answer: `Airport`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'city' in ${targetLanguage}?`,
          options: [`City`, `Village`, `Town`, `Country`],
          answer: `City`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'church' in ${targetLanguage}?`,
          options: [`Church`, `Temple`, `Mosque`, `Cathedral`],
          answer: `Church`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'bridge' in ${targetLanguage}?`,
          options: [`Bridge`, `River`, `Tunnel`, `Crossing`],
          answer: `Bridge`,
          id: 10,
        },
      ],
      id: 14,
    },
    {
      topic: `Jobs & Professions`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'doctor' in ${targetLanguage}?`,
          options: [`Doctor`, `Professor`, `Lawyer`, `Engineer`],
          answer: `Doctor`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'firefighter' in ${targetLanguage}?`,
          options: [`Teacher`, `Chef`, `Firefighter`, `Engineer`],
          answer: `Firefighter`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'teacher' in ${targetLanguage}?`,
          options: [`Student`, `Teacher`, `Chef`, `Baker`],
          answer: `Teacher`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'chef' in ${targetLanguage}?`,
          options: [`Chef`, `Artist`, `Driver`, `Teacher`],
          answer: `Chef`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'police officer' in ${targetLanguage}?`,
          options: [`Police Officer`, `Firefighter`, `Engineer`, `Doctor`],
          answer: `Police Officer`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'lawyer' in ${targetLanguage}?`,
          options: [`Teacher`, `Lawyer`, `Artist`, `Chef`],
          answer: `Lawyer`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'nurse' in ${targetLanguage}?`,
          options: [`Farmer`, `Teacher`, `Nurse`, `Programmer`],
          answer: `Nurse`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'engineer' in ${targetLanguage}?`,
          options: [`Teacher`, `Artist`, `Engineer`, `Farmer`],
          answer: `Engineer`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'teacher' in ${targetLanguage}?`,
          options: [`Teacher`, `Doctor`, `Artist`, `Chef`],
          answer: `Teacher`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'artist' in ${targetLanguage}?`,
          options: [`Artist`, `Chef`, `Driver`, `Nurse`],
          answer: `Artist`,
          id: 10,
        },
      ],
      id: 15,
    },
    {
      topic: `Emotions & Feelings`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'happy' in ${targetLanguage}?`,
          options: [`Sad`, `Happy`, `Angry`, `Tired`],
          answer: `Happy`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'sad' in ${targetLanguage}?`,
          options: [`Happy`, `Sad`, `Angry`, `Fear`],
          answer: `Sad`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'angry' in ${targetLanguage}?`,
          options: [`Happy`, `Angry`, `Sad`, `Funny`],
          answer: `Angry`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'fear' in ${targetLanguage}?`,
          options: [`Love`, `Joy`, `Fear`, `Sadness`],
          answer: `Fear`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'happy' in ${targetLanguage}?`,
          options: [`Sad`, `Happy`, `Angry`, `Joy`],
          answer: `Happy`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'love' in ${targetLanguage}?`,
          options: [`Fear`, `Love`, `Anger`, `Joy`],
          answer: `Love`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'fear' in ${targetLanguage}?`,
          options: [`Fear`, `Sadness`, `Anger`, `Joy`],
          answer: `Fear`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'joy' in ${targetLanguage}?`,
          options: [`Sad`, `Joy`, `Love`, `Fear`],
          answer: `Joy`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'anger' in ${targetLanguage}?`,
          options: [`Sad`, `Fear`, `Anger`, `Joy`],
          answer: `Anger`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'sadness' in ${targetLanguage}?`,
          options: [`Happiness`, `Sadness`, `Fear`, `Love`],
          answer: `Sadness`,
          id: 10,
        },
      ],
      id: 16,
    },
    {
      topic: `Transportation`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'car' in ${targetLanguage}?`,
          options: [`Car`, `Plane`, `Bicycle`, `Train`],
          answer: `Car`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'train' in ${targetLanguage}?`,
          options: [`Bus`, `Train`, `Bicycle`, `Car`],
          answer: `Train`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'bus' in ${targetLanguage}?`,
          options: [`Train`, `Car`, `Bus`, `Ship`],
          answer: `Bus`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'bicycle' in ${targetLanguage}?`,
          options: [`Train`, `Bicycle`, `Car`, `Bus`],
          answer: `Bicycle`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'airplane' in ${targetLanguage}?`,
          options: [`Airplane`, `Boat`, `Train`, `Bus`],
          answer: `Airplane`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'boat' in ${targetLanguage}?`,
          options: [`Ship`, `Car`, `Boat`, `Train`],
          answer: `Boat`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'motorcycle' in ${targetLanguage}?`,
          options: [`Airplane`, `Motorcycle`, `Truck`, `Metro`],
          answer: `Motorcycle`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'truck' in ${targetLanguage}?`,
          options: [`Truck`, `Car`, `Plane`, `Train`],
          answer: `Truck`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'boat' in ${targetLanguage}?`,
          options: [`Boat`, `Train`, `Bus`, `Airplane`],
          answer: `Boat`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'bicycle' in ${targetLanguage}?`,
          options: [`Bicycle`, `Bus`, `Car`, `Train`],
          answer: `Bicycle`,
          id: 10,
        },
      ],
      id: 17,
    },
    {
      topic: `School & Education`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'student' in ${targetLanguage}?`,
          options: [`Teacher`, `Student`, `Principal`, `Book`],
          answer: `Student`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'school' in ${targetLanguage}?`,
          options: [`Teacher`, `Student`, `Classroom`, `School`],
          answer: `School`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'teacher' in ${targetLanguage}?`,
          options: [`Classroom`, `Teacher`, `Student`, `School`],
          answer: `Teacher`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'notebook' in ${targetLanguage}?`,
          options: [`Book`, `Notebook`, `Class`, `Student`],
          answer: `Notebook`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'book' in ${targetLanguage}?`,
          options: [`Notebook`, `Book`, `Pen`, `Paper`],
          answer: `Book`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'pencil' in ${targetLanguage}?`,
          options: [`Pen`, `Pencil`, `Paper`, `Eraser`],
          answer: `Pencil`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'classroom' in ${targetLanguage}?`,
          options: [`Teacher`, `Classroom`, `Desk`, `Chair`],
          answer: `Classroom`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'homework' in ${targetLanguage}?`,
          options: [`Homework`, `Classwork`, `Lesson`, `Exam`],
          answer: `Homework`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'university' in ${targetLanguage}?`,
          options: [`College`, `University`, `School`, `Institute`],
          answer: `University`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'pencil' in ${targetLanguage}?`,
          options: [`Eraser`, `Pencil`, `Book`, `Classroom`],
          answer: `Pencil`,
          id: 10,
        },
      ],
      id: 18,
    },
    {
      topic: `Technology & Gadgets`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'computer' in ${targetLanguage}?`,
          options: [`Phone`, `Computer`, `Keyboard`, `Screen`],
          answer: `Computer`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'mouse' in ${targetLanguage}?`,
          options: [`Keyboard`, `Mouse`, `Screen`, `Monitor`],
          answer: `Mouse`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'keyboard' in ${targetLanguage}?`,
          options: [`Mouse`, `Keyboard`, `Screen`, `Printer`],
          answer: `Keyboard`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'telephone' in ${targetLanguage}?`,
          options: [`Phone`, `Telephone`, `Tablet`, `Computer`],
          answer: `Telephone`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'television' in ${targetLanguage}?`,
          options: [`Television`, `Televisor`, `TV`, `Television set`],
          answer: `Television`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'internet' in ${targetLanguage}?`,
          options: [`Internet`, `Web`, `Network`, `Cloud`],
          answer: `Internet`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'printer' in ${targetLanguage}?`,
          options: [`Keyboard`, `Printer`, `Screen`, `Microphone`],
          answer: `Printer`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'screen' in ${targetLanguage}?`,
          options: [`Screen`, `Monitor`, `Laptop`, `Tablet`],
          answer: `Screen`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'smartphone' in ${targetLanguage}?`,
          options: [`Smartphone`, `Handy`, `Mobile`, `Cellphone`],
          answer: `Smartphone`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'mouse' in ${targetLanguage}?`,
          options: [`Mouse`, `Keyboard`, `Monitor`, `Tablet`],
          answer: `Mouse`,
          id: 10,
        },
      ],
      id: 19,
    },
    {
      topic: `Sports & Activities`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'soccer' in ${targetLanguage}?`,
          options: [`Football`, `Baseball`, `Basketball`, `Tennis`],
          answer: `Football`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'swimming' in ${targetLanguage}?`,
          options: [`Swimming`, `To Swim`, `Swim`, `Natation`],
          answer: `Natation`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'basketball' in ${targetLanguage}?`,
          options: [`Football`, `Tennis`, `Basketball`, `Handball`],
          answer: `Basketball`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'cycling' in ${targetLanguage}?`,
          options: [`Cycling`, `Bicycle`, `Vélo`, `Ciclismo`],
          answer: `Ciclismo`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'judo' in ${targetLanguage}?`,
          options: [`Judo`, `Karate`, `Taekwondo`, `柔道`],
          answer: `Judo`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'running' in ${targetLanguage}?`,
          options: [`Running`, `To Run`, `Course`, `Corrida`],
          answer: `Corrida`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'tennis' in ${targetLanguage}?`,
          options: [`Tennis`, `Football`, `Basketball`, `Volleyball`],
          answer: `Tennis`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'boxing' in ${targetLanguage}?`,
          options: [`Boxing`, `Karate`, `Kickboxing`, `Lucha`],
          answer: `Boxing`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'climbing' in ${targetLanguage}?`,
          options: [`Climbing`, `Bouldering`, `Escalade`, `Escalada`],
          answer: `Escalade`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'skiing' in ${targetLanguage}?`,
          options: [`Skiing`, `Ski`, `Snowboarding`, `Skiing`],
          answer: `Skiing`,
          id: 10,
        },
      ],
      id: 20,
    },
    {
      topic: `Household Items`,
      questions: [
        {
          type: `mcq`,
          question: `What is 'table' in ${targetLanguage}?`,
          options: [`Chair`, `Bed`, `Table`, `Window`],
          answer: `Table`,
          id: 1,
        },
        {
          type: `mcq`,
          question: `What is 'chair' in ${targetLanguage}?`,
          options: [`Chair`, `Seat`, `Couch`, `Armchair`],
          answer: `Chair`,
          id: 2,
        },
        {
          type: `mcq`,
          question: `What is 'bed' in ${targetLanguage}?`,
          options: [`Bed`, `Sofa`, `Door`, `Table`],
          answer: `Bed`,
          id: 3,
        },
        {
          type: `mcq`,
          question: `What is 'lamp' in ${targetLanguage}?`,
          options: [`Lamp`, `Light`, `Shade`, `Bulb`],
          answer: `Lamp`,
          id: 4,
        },
        {
          type: `mcq`,
          question: `What is 'refrigerator' in ${targetLanguage}?`,
          options: [`Refrigerator`, `Freezer`, `Oven`, `Microwave`],
          answer: `Refrigerator`,
          id: 5,
        },
        {
          type: `mcq`,
          question: `What is 'window' in ${targetLanguage}?`,
          options: [`Window`, `Door`, `Mirror`, `Glass`],
          answer: `Window`,
          id: 6,
        },
        {
          type: `mcq`,
          question: `What is 'door' in ${targetLanguage}?`,
          options: [`Table`, `Bed`, `Door`, `Mirror`],
          answer: `Door`,
          id: 7,
        },
        {
          type: `mcq`,
          question: `What is 'curtain' in ${targetLanguage}?`,
          options: [`Curtain`, `Blinds`, `Shutter`, `Shade`],
          answer: `Curtain`,
          id: 8,
        },
        {
          type: `mcq`,
          question: `What is 'oven' in ${targetLanguage}?`,
          options: [`Oven`, `Stove`, `Grill`, `Microwave`],
          answer: `Oven`,
          id: 9,
        },
        {
          type: `mcq`,
          question: `What is 'carpet' in ${targetLanguage}?`,
          options: [`Carpet`, `Rug`, `Mat`, `Flooring`],
          answer: `Carpet`,
          id: 10,
        },
      ],
      id: 21,
    },
  ];
};

router.get(`/getlevels`, authMiddleware, (req, res) => {
  const { currentLevel, targetLanguage } = req.query;

  const levels = createLevels(targetLanguage);
  return res.json({ level: levels[currentLevel - 1] });
});

router.post("/saveLevel", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const { levelNumber, topic, fullEvaluation, score, completed } =
      req.body.fullAnswer;

    const nativeLanguage = "english";
    const targetLanguage = "arabic";

    if (
      !levelNumber ||
      !topic ||
      !fullEvaluation ||
      !Array.isArray(fullEvaluation)
    ) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    let level = await Level.findOne({ userId, levelNumber });

    if (level) {
      level.questions = fullEvaluation;
      level.score = score;
      level.completed = completed;
      level.nativeLanguage = nativeLanguage;
      level.targetLanguage = targetLanguage;
      level.attempts += 1;
    } else {
      level = new Level({
        userId,
        levelNumber,
        topic,
        questions: fullEvaluation,
        score,
        completed,
        nativeLanguage,
        targetLanguage,
        attempts: 1,
      });
    }

    await level.save();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (completed && user.currentLevel === levelNumber) {
      user.currentLevel += 1;
      await user.save();
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getuserlevel", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      userLevel: user.currentLevel,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
