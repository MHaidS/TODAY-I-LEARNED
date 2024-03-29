const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// 48.4. get the color of the 'categories' array; paste into background-color in createFactsList()
// console.log(CATEGORIES.find((cat) => cat.name === "society")); // {name: 'society', color: '#eab308'}
// console.log(CATEGORIES.find((cat) => cat.name === "society").color); // #eab308

// SELECTING DOM ELEMENTS
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// CREATE DOM ELEMENTS: RENDER FACTS IN THE LIST
factsList.innerHTML = "";

// 47. LOADING DATA W/ FETCH & ASYNC/AWAIT

// *** LOAD DATA FROM SUPABASE ***
loadFacts();
// CONSOLE:
// Response {type: 'cors', url: 'https://hkvfifajbftqukzzoqii.supabase.co/rest/v1/facts', redirected: false, status: 200, ok: true, …}

async function loadFacts() {
  const res = await fetch(
    "https://hkvfifajbftqukzzoqii.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrdmZpZmFqYmZ0cXVrenpvcWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0ODM4MzUsImV4cCI6MTk5MzA1OTgzNX0.Qx_ZZVtUgfE05GZUxvnxk5g9STCZJApLtUjcY90J8gk",

        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrdmZpZmFqYmZ0cXVrenpvcWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0ODM4MzUsImV4cCI6MTk5MzA1OTgzNX0.Qx_ZZVtUgfE05GZUxvnxk5g9STCZJApLtUjcY90J8gk",
      },
    }
  );
  // 47.5 create a variable to store the results for awaiting res.json; the obj 'res' will be converted to json & we need the 'await' keyword since this takes some time; this can only be used for functions that return promises
  const data = await res.json();
  // 48. The filter & find Array Methods

  // console.log(data);
  // (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // 48.2. will filter facts fr data under category 'society'
  // const filteredData = data.filter((fact) => fact.category === "society");
  //
  // 47.6. we shd be able to see the data in our app, so change res to data

  // console.log(data);
  // (11) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // 47.7. create DOM elements based on the data fr the backend, so we can now use the createFactsList()
  createFactsList(data);
  // 48.3. shows 2 facts under category 'society'; data coming fr the API
  // createFactsList(filteredData);
}

/*
    // 47.2. this means that you bear a token to show to the server; paste same string as above but type in 'Bearer' + space before it; then store the result of the fetch in a variable
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrdmZpZmFqYmZ0cXVrenpvcWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0ODM4MzUsImV4cCI6MTk5MzA1OTgzNX0.Qx_ZZVtUgfE05GZUxvnxk5g9STCZJApLtUjcY90J8gk",
  },
});
// 47.4.
console.log(res);
*/

// Creating DOM Elements: make this function independent fr where the data is comming from; createFactsList() has been created to make this reusable
function createFactsList(dataArray) {
  // factsList.insertAdjacentHTML("afterbegin", "<li>Reese</li>");

  // 48.5. refactor style="background-color; browser now shows the list of facts w/ the corresponding colors for the categories
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
      <p>
        ${fact.text}
        <a
          class="source"
          href="${fact.source}"
          target="_blank"
          >(Source)
        </a>
      </p>
      <span class="tag" style="background-color: ${
        CATEGORIES.find((cat) => cat.name === fact.category).color
      }">${fact.category}</span>
    </li>`
  );
  // console.log(htmlArr);
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// 46.4 use the data fr initialFacts[] to reflect

// console.log(btn);
// <button class="btn btn-large btn-open">Share a fact</button>
console.dir(btn);

// 34.2. in order to react to a click on the 'share a fact' btn, we need to attach an event handler
btn.addEventListener("click", () => {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "CLOSE";
  } else {
    form.classList.add("hidden");
    btn.textContent = "SHARE A FACT";
  }
});

// **************************************************************

// // ! CREATING VARIABLES BASED FR THE DATA OF AN OBJECT
// const { category, isCorrect } = factObj;
// console.log(category); // society

// // call the method inside the object 'factObj'
// console.log(factObj.createSummary());
// The fact Lisbon is the capital of Portugal is from the category SOCIETY

// **************************************************************

// 48. The filter & find Array Methods (filter returns a new array while find only returns a value)
// pass in a callback function ('el') to filter w/c will have access to current element (a number in this case) in each iteration of the array; this function must either return 'true' or 'false';filter will create a new array w/ contents that pass the given condition
console.log([7, 64, 6, -23, 11].filter((el) => el > 10)); // (2) [64, 11] ===> new array

// the 'find' method is similar to 'filter' but ONLY returns the 1st element of the array for w/c a filter method returns 'true'; 'find' is more of a helper method; based on that, we can now get the 1st color of the 'categories' array

console.log([7, 64, 6, -23, 11].find((el) => el > 10)); // 64 ===> the 1st value where the condition is 'true'

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/*
let votesInteresting = 23;
let votesMindlowing = 5;
const text = "Lisbon is the capital of Portugal";

votesInteresting = votesInteresting + 1;
votesInteresting++;
console.log(votesInteresting);

let totalUpvotes = votesInteresting + votesMindlowing;
console.log("Upvotes:", totalUpvotes);

let votesFalse = 4;
const isCorrect = votesFalse < totalUpvotes;
console.log(isCorrect);

console.log(parseInt("24.533ccc"));
*/

/*
function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}`;
}

const age1 = calcFactAge(2015);
console.log(age1);
console.log(calcFactAge(2020));
console.log(calcFactAge(2037));

// const calcFactAge2 = (year) => 2022 - year;
const calcFactAge2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Impossible year. Year needs to be less or equal ${new Date().getFullYear()}`;

console.log(calcFactAge2(2015));
console.log(calcFactAge2(2037));
*/

/*
let votesInteresting = 20;
let votesMindlowing = 5;

if (votesInteresting === votesMindlowing) {
  alert("This fact is equally interesting and mindblowing");
} else if (votesInteresting > votesMindlowing) {
  console.log("Intersting fact!");
} else if (votesInteresting < votesMindlowing) {
  console.log("Mindblowing fact!!");
}

// falsy values: 0, '', null, undefined
// truthy value: everything else...
if (votesMindlowing) {
  console.log("MINDBLOWING FACT!!!");
} else {
  console.log("Not so special...");
}

let votesFalse = 7;
const totalUpvotes = votesInteresting + votesMindlowing;

const message =
  totalUpvotes > votesFalse
    ? "The fact is true"
    : "Might be false, check more sources...";
// alert(message);

const text = "Lisbon is the capital of Portugal";
const upperText = text.toUpperCase();
console.log(upperText);

const str = `The current fact is "${text}". It is ${calcFactAge(
  2015
)} years old. It is probably ${
  totalUpvotes > votesFalse ? "correct" : "not true"
}.`;
console.log(str);
*/

/*
const fact = ["Lisbon is the capital of Portugal", 2015, true];
console.log(fact[2]);
console.log(fact.length);
console.log(fact[fact.length - 1]);

const [text, createdIn] = fact;
const newFact = [...fact, "society"];
console.log(newFact);

const factObj = {
  text: "Lisbon is the capital of Portugal",
  category: "society",
  createdIn: 2015,
  isCorrect: true,
  createSummary: function () {
    return `The fact "${
      this.text
    }" is from the category ${this.category.toUpperCase()}`;
  },
};

console.log(factObj.text);
console.log(factObj["text"]);

const { category, isCorrect } = factObj;
console.log(category);
console.log(factObj.createSummary());

// [2, 4, 6, 8].forEach(function (el) {
//   console.log(el);
// });

// const times10 = [2, 4, 6, 8].map(function (el) {
//   return el * 10;
// });
const times10 = [2, 4, 6, 8].map((el) => el * 10);
console.log(times10);

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const allCategories = CATEGORIES.map((el) => el.name);
console.log(allCategories);

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}`;
}

const factAges = initialFacts.map((el) => calcFactAge(el.createdIn));
console.log(factAges);
console.log(factAges.join("-"));
*/
