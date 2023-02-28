console.log("Hello World!");
// <!-- 34. Displaying & Hiding the Form -->
// 34.1. select the element for the 'share a fact' btn & store in a var 'btn' in order to use it
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

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

function calcFactAge(year) {
  // const currentYear = 2022;
  const currentYear = new Date().getFullYear();
  // 2022 - 2015
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}.`;
}

const age1 = calcFactAge(2015);
console.log(age1); // 7  (if currentYear = 2022)
// 8 ( since currentYear is 2023 )
console.log(calcFactAge(2020)); // 3
console.log(calcFactAge(1990)); // 33
console.log(calcFactAge(2037));

let votesInteresting = 20;

let votesMindblowing = 0;

if (votesInteresting === votesMindblowing) {
  alert("This fact is equally interesting & mindblowing");
}
// else {
//   console.log("Something else");
// }
else if (votesInteresting > votesMindblowing) {
  console.log("Interesting fact");
} else if (votesInteresting < votesMindblowing) {
  console.log("Mindblowing fact");
}
// Interesting fact

if (votesMindblowing) {
  console.log("MINDBLOWING FACT");
} else {
  console.log("Not so special");
}

// 38. The Ternary Operator
let votesFalse = 7;
const totalUpvotes = votesInteresting + votesMindblowing;

const message =
  totalUpvotes > votesFalse
    ? "The fact is true"
    : "Might be false, check more sources";

// alert(message);

3 > 7 ? "A" : "B"; // 'B'
3 > 0 ? "A" : "B"; // "A"

const text = "Lisbon is the capital of Portugal.";
const upperText = text.toUpperCase();
console.log(upperText);

const str = `The current fact is "${text}" It is ${calcFactAge(
  2015
)} years old. It is probably ${
  totalUpvotes > votesFalse ? "correct" : "not true"
}.`;
console.log(str);
