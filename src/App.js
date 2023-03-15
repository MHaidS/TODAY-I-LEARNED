import { useState } from "react";
import "./style.css";

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

function App() {
  // 61.3.b. we close the form by setting the 'showForm' state to false; solution is to pass them as props then the <Header /> & <NewFactForm />> will re-render & if it is false, null will be rendered; so we now need to give the form access to the function that updates the state
  const [showForm, setShowForm] = useState(false);
  // 61.1.b. transferred the state & setter function fr FactList() component since NewFactForm will also make use of these; both are child components of App(), the common parent component; error recvd on browser w/c will be fixed later; FactList() still needs access to these data & the reason why there is an error is bec. 'facts' is being used but it is nowhere in the FactList():
  // ERROR: src/App.js
  // Line 308:10:  'facts' is not defined  no-undef
  // Line 320:21:  'facts' is not defined  no-undef
  //  ===>
  const [facts, setFacts] = useState(initialFacts);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {/* 61.1.e. To make the form work, we need the setFacts function; pass it again as a prop in <NewFactForm />; so we have FactList() that uses the 'facts' then <NewFactForm /> updates it; Now go to the form NewFactForm() to receive 'setFacts' function */}
      {/* 61.3.c. give the form access to the function that updates the state then accept the props in NewFactForm() */}

      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter />
        {/* 61.1.c. pass facts & setFacts as props then go to FactList() to receive them */}
        <FactList facts={facts} />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />

        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}
// 59.1. Move the CATEGORIES[] array above the NewFactForm() component bec. we can only use some variables after we have declared it; if it is placed before the function, we won't be able to use the variables in the code; we will loop over the CATEGORIES[] array & for each of these items, 1 option value;
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
// 60.2.fr. stackoverflow: Check if a JavaScript string is a URL
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

// 61.1.f. receive 'setFacts' function fr App()

// 61.3.d. accept the props setShowForm then close the form
function NewFactForm({ setFacts, setShowForm }) {
  // 59. Working w/ Forms the React Way

  // 59.3. We can already type stuff in the input but this not the way React handles inputs. React wants to be in complete ctrl of the input that we are writing. For ex., create a new pc. of state called 'text' & the setter function 'setText' & we get that fr useState & start w/ an empty string;
  // 59.6. Let's create states & setter functions for the 'source' & 'category'
  const [text, setText] = useState("");

  // 60.2. create dummy data on useState
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  // 59.9. We don't need another state variable to compute the remaining number of characters you can type in; just create a normal value & call it 'textLength' & set it equal to 'text.length'
  // 59.11. Also, a state variable was no longer used here bec. as we are typing the characters in, we are already changing the state even though the aim is to make changes on the screen
  const textLength = text.length;

  // 59.14. write the function inside the component, this will also recv the event obj it is bec. React will be the one to call the function
  function handleSubmit(e) {
    // 59.16. Prevent the page fr reloading whenever we submit the form; log on the console to see what has just been entered on the text, source & category; so it's really very easy to get the data fr the form immediately bec we have already stored them in states
    // 60. Adding a New Fact - Part 1
    // 60.1. *** Prevent browser reload
    e.preventDefault();
    console.log(text, source, category); // aaa bbb science

    // 60.2. *** Check if data is valid. If so, create a new fact
    // ===> falsy values are values that are converted to false when they are used in a condition like an 'if stmt'; an empty string ('') is an ex. of a falsy value
    // if (text) console.log(`there is data`); // this is only going to be logged on the console if something has been entered & form submitted
    // aaa bbb finance
    // there is data
    // if (text && source && category && textLength <= 200)
    //   console.log(`there is valid data`); // will only be logged on the console if something is typed in the text & source & something is selected in category; this is logged in even if only text is typed for the source; however, source must be a url; check google how to check if a value entered is a url, found something on stackoverflow; copy & past code outside of the component though

    // call isValidHttpUrl & pass in source
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // console.log(`there is valid data`);
      // aaa google.com science ====> only what was typed is logged on the console
      // ddd http://www.google.com finance ====> url must include http:// or type in dummy data on the useState
      // there is valid data

      // 60.3. *** Create a new fact object
      const newFact = {
        // must be randomly generated, not ideal but we will get the ids later fr Supabase
        id: Math.round(Math.random * 10000000),
        // we can just write text as is, same w/ the source & category, bec. the variables are already called w/ the same name
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      // 61.1. *** Add the new fact to the user interface (UI); add the fact to state
      // 61.1.g. We can now update the state; pass in an empty array to setFacts; after submitting the form on the browser, the list of facts shows 0; whatever is passed here will be the new state; but what we really want for the new state is the current state & the newFact{}; if we want to set a new state based on the previous state, we need a callback function; the value in the callback function would be the current fact, it shd return an array w/c contains the newFact & all the prev. facts (we use the spread operator to take out all the elements of the prev. facts array & then place them back into this new array, so we are unwrapping the array using the spread operator taking all the elements out of it & placing them rt. here in the new array)

      setFacts((facts) => [newFact, ...facts]);

      // 61.2. Reset input fields
      // 61.2.a. just set setText, setSource, setCategory  back to empty string;
      setText("");
      setSource("");
      setCategory("");
      // 61.3. Close the form
      // 61.3.a. we close the form by changing the showForm state in the App() to false
      // 61.3.e. call setShowForm function & set to false since we just want it to be closed, no toggling; Now, after the form is submitted, the form closes
      setShowForm(false);
    }
  }

  return (
    // 59.13. We can react to the submit event, create a new event handler 'onSubmit' & as always, we need to specify a function w/c is going to be a little bit bigger, write the function inside the component

    // 59.15. Define the function; we want React to call this function whenever the submit event occurs
    <form className="fact-form" onSubmit={handleSubmit}>
      {/* 59.4. Use 'text' (the state variable) as the value for the input field; as of rt. now, if we type anything on the input field, this will not update the state; for that we need an event handler function called onChange() w/c will run each time the input value changes; the argument that is going to be passed to this function is an event obj. ('e' stands for event); then we set the new text state to 'e.target.value' */}
      {/* 59.5. As we type inside the input field, we are actually updating the state; what happens here is that each time that the input changes, we'll call this function:
      '{(e) => setText(e.target.value)}' w/ an event obj 'e'; this event contains 'e.target', so it contains the target property w/c is the current element; & on this current element, we can read the 'value' property, so the 'value' is actually what is being written; then we take that value & edit to the new 'text' variable, this will then reload the entire component, or re-render the component; & the 'value={text}' is now diff. so, that new text is going to be the new value of the input field; & w/ this, React is in full ctrl of the input field w/c is why we call this technique, a controlled component or a controlled input field; we now have the content of the input field rt. in the component state 'useState("")'; for ex. we type in 'qqq' & we need to do something w/ this date, we already have it available in the application; This is how input fields are handled in React
       */}

      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* 59.8. What we want here is 200 minus the length of the current text; so how do we calculate the current text? */}
      {/* 59.10 Enter JS mode & subtract text.length fr 200 in order to get the remaining number of characters left that you can type in; save & then on the browser, the number shd decrease everytime you type something in */}

      <span>{200 - text.length}</span>
      {/* 59.6. so whenever the value here changes, React will then call the function specified here & pass to it the event obj that is being generated; this event is generated by the DOM itself & React simply takes this event obj. & passes it to this function */}

      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
      />
      {/* 59.7 Use 'category' as the value; the default value here is an empty string just like in 'useState("")' */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {/* 59.2. Enter JS sot that we can map over the CATEGORIES[] array; in order to create a new array, type in '{CATEGORIES.map}', call each of the elements 'cat', then return an option element w/ a value of cat.name; when we are creating a new array, w/ a couple of JSX elements, React wants them to have a unique key 'key={cat.name}' */}
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      {/* 59.12. Form Submission --> in HTML there is a btn inside the form so whenever that is clicked, the form is submitted & the page will be reloaded; we can then do something once that happens */}
      <button className="btn btn-large">Post</button>
    </form>
  );
}

// const CATEGORIES = [
//   { name: "technology", color: "#3b82f6" },
//   { name: "science", color: "#16a34a" },
//   { name: "finance", color: "#ef4444" },
//   { name: "society", color: "#eab308" },
//   { name: "entertainment", color: "#db2777" },
//   { name: "health", color: "#14b8a6" },
//   { name: "history", color: "#f97316" },
//   { name: "news", color: "#8b5cf6" },
// ];

function CategoryFilter() {
  // 55. Rendering the List of Categories
  // 55.1. Copy 1 of the <li></li>'s in <aside></aside> of v1=>index.html & edit as needed: class to className & the background-color as well, entering JS mode, providing an obj to the style; but what we want to do is render a list of btns based on the CATEGORIES[] array

  return (
    <aside>
      <ul>
        {/* 55.7. For the 'All' btn, grab the code fr v1=>index.html & refactor as needed */}
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>

        {/* 55.3. We don't want to manually place the li's here, instead we want to loop over the elements in the CATEGORIES[] array & then render 1 list item for each of them */}
        {/* 55.4. We'll take the CATEGORIES[] array & map: we are creating a new array w/c will contain for each element 1 pc of JSX w/c will be the list item; let's call the current element, each of them a 'cat' then return 1 list item; we will no longer create a separate component for each of the 'cat' item since this is just a sumple code */}
        {CATEGORIES.map((cat) => (
          // 55.8. Let's add the keys; we are inside of a map so the <li></li> element will be created multiple times & in order for React to optimize something internally, we need to give it a key prop; although both the name & color are unique, it makes more sense to use the name as the key; The error message in React Dev Tools: 'react-jsx-dev-runtime.development.js:87 Warning: Each child in a list should have a unique "key" prop.' is now gone after the key prop has been added on the <li></li>
          // <li className="category">
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              // 55.6. Refactor to reflect the corresponding color for each category

              style={{ backgroundColor: cat.color }}
            >
              {/* 55.5. Refactor to reflect the names for each btn */}

              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// 61.1.d. Receive props fr App(); we can write: function 'FactList(props)' or simply destructure:
function FactList({ facts }) {
  // 61. Adding a New Fact - Part 2
  // 61.1. *** Add the new fact to the user interface (UI); add the fact to state
  // const facts = initialFacts;
  // 61.1.a. Create state ( & setter function ) w/ default 'initialFacts' but we will now be able to update this & as a response the UI will get updated
  // ===> this state is currently in FactList() but we also need this in NewFactForm() bec. in order to add a new fact, we also need access to the 'setFacts' function; the solution is to move the state to the parent component, App() component
  // const [facts, setFacts] = useState(initialFacts);

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>

      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
