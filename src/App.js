import { useEffect, useState } from "react";
import supabase from "./supabase";
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
  const [showForm, setShowForm] = useState(false);

  const [facts, setFacts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", "currentCategory");

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert(`There was a problem getting data`);

        setIsLoading(false);
      }

      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? <Loader /> : <FactList facts={facts} />}

        {/* 61.1.c. pass facts & setFacts as props then go to FactList() to receive them */}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
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

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");

  // 60.2. create dummy data on useState
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");

  const textLength = text.length;

  function handleSubmit(e) {
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

      setFacts((facts) => [newFact, ...facts]);

      setText("");
      setSource("");
      setCategory("");

      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <span>{200 - text.length}</span>

      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>

        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>

      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  // 55. Rendering the List of Categories
  // 55.1. Copy 1 of the <li></li>'s in <aside></aside> of v1=>index.html & edit as needed: class to className & the background-color as well, entering JS mode, providing an obj to the style; but what we want to do is render a list of btns based on the CATEGORIES[] array

  return (
    <aside>
      <ul>
        {/* 55.7. For the 'All' btn, grab the code fr v1=>index.html & refactor as needed */}
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>

        {/* 55.3. We don't want to manually place the li's here, instead we want to loop over the elements in the CATEGORIES[] array & then render 1 list item for each of them */}
        {/* 55.4. We'll take the CATEGORIES[] array & map: we are creating a new array w/c will contain for each element 1 pc of JSX w/c will be the list item; let's call the current element, each of them a 'cat' then return 1 list item; we will no longer create a separate component for each of the 'cat' item since this is just a sumple code */}
        {CATEGORIES.map((cat) => (
          // 55.8. Let's add the keys; we are inside of a map so the <li></li> element will be created multiple times & in order for React to optimize something internally, we need to give it a key prop; although both the name & color are unique, it makes more sense to use the name as the key; The error message in React Dev Tools: 'react-jsx-dev-runtime.development.js:87 Warning: Each child in a list should have a unique "key" prop.' is now gone after the key prop has been added on the <li></li>
          // <li className="category">
          <li key={cat.name} className="category">
            {/* <button
              className="btn btn-category"
              // 55.6. Refactor to reflect the corresponding color for each category
              style={{ backgroundColor: cat.color }}
            > */}
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
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

function FactList({ facts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this categorly yet. Create the first one!
      </p>
    );
  }

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
