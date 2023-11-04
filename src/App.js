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

// ......
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: "40px" }}>{count}</span>
      <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}

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
          query = query.eq("category", currentCategory);

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
        {/* 66.12. .... so we need to pass 'setFacts' into the 'FactList', so let's write setFacts={setFacts}; ... & now we go to FactList & accept the props there so that then we can pass it into 'facts'; so we are now passing the 'setFacts()' function through multiple children in the component tree */}
        {/* {isLoading ? <Loader /> : <FactList facts={facts} />} */}
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
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
  // const [source, setSource] = useState("http://example.com");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  // *********************************************************************
  async function handleSubmit(e) {
    // 1. *** PREVENT BROWSER RELOAD ***
    e.preventDefault();
    console.log(text, source, category); // amazing http://example.com technology
    // aaa bbb science

    // 2. *** CHECK IF DATA IS VALID. If so, create a new fact ***

    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      //  xxx CREATE A NEW FACT OBJECT xxx
      // const newFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. *** UPLOAD FACT TO SUPABASE & RECEIVE THE NEW FACT OBJECT ***
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. *** ADD THE NEW FACT TO THE UI: add the fact to state ***
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. *** RESET INPUT FIELDS ***
      setText("");
      setSource("");
      setCategory("");

      // 6. *** CLOSE THE FORM ***
      // setShowForm(true);
      setShowForm(false);
    }
  }
  // *******************************************************************

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        // ......
        disabled={isUploading}
      />

      {/* <span>{200 - text.length}</span> */}
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>

      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
} // ==> end of 'function NewFactForm({ setFacts, setShowForm })'

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet. Create the first one!
      </p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          // 66.14. ... so we only need the 'setFacts' function here so that we can immediately pass it into the 'fact'; & this is what we call 'prop drilling' ...
          // <Fact key={fact.id} fact={fact} />
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

// 66.2. let's now move on to the 'Fact' component where we have the btns for voting;
// 66.15. .. let's go to 'Fact' & accept the prop here as well & now we can use it .... 10:39 ...let's go to the browser & on the '👍' btn for the same fact earlier but something is wrong here ...

// (  ...  main.2915a180ed9974d…f.hot-update.js:469
// [{…}]
// 0: {id: 5, created_at: '2023-02-27T09:26:45.812004+00:00', text: 'The less money you spend, the more you save!', source: 'https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/ways-to-save-money', category: 'finance', …}
// length: 1
// [[Prototype]]: Array(0) ... )

// ... (also in supabase, the upvotes have changed fr 11 to 12 but not on the browser)  so this updatedFact is an array w/ the object inside of it; just like before, what we need to do here is ...

// function Fact({ fact }) {
function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);

  //  ......
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  // 66.26. ... instead of doing that, we can pass a string into this function ....
  // 66.31. ... so this needs to return a string & let's call it 'columnName' bec. in the db, each of these fields is called a column of the table ....
  // async function handleVote() {
  // 66.35. ... so the 'columnName' in () below, will become 'votesFalse' ...
  async function handleVote(columnName) {
    setIsUpdating(true);
    // const (data, error) = await supabase.from("facts").update({votesInteresting + 1}).eq('id', fact.id).select();
    const { data: updatedFact, error } = await supabase
      .from("facts")

      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    // 66.20. ... & immediately afterwards, we can set 'isUpdating' to 'false' ...
    setIsUpdating(false);
    // 66.10. .. so let's log the 'updatedFact' that we will get; go to the browser & reload the page; click on the '👍' btn for 'The less money you spend, the more you save!' w/c currently has 10 votes; the additional vote would not reflect on the browser so go back to supabase, click on 'Table editor' icon & press on 'facts'; confirmed that 'votesInteresting' has increased for the 'fact' that we updated on the browser since this is now showing '11'; but now, it's time to also update the user interface & rt. now, the only way to see the new value is to manually reload the page; that means we need to update our local facts array, the state variable ...
    console.log(updatedFact);

    if (!error)
      setFacts((facts) =>
        // 66.16. .... just like before, what we need to do here is not 'updatedFact', but 'updatedFact' at position [0], so basically retrieving the obj. out of the array; let's go back to the browser & reload the page, & we can now see the update on supabase (fr 11 to 12); let's click on the '👍' btn again, & it now reflects '13', so it has updated both on supabase & in our local state here;
        // 66.17. so we defined the new fact state here ...
        //        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
        // ... by creating a new array based on the initial array, so that is on the orig. one before the state update & so when we loop over the array, we are basically looking for the obj. where the id is exactly the one that we are currently updating (f.id === fact.id); & so if that is the current obj., then we will replace the current obj. w/ the updatedFact object (updatedFact[0]); & for all the other ones, we simply want to keep the original (f); for ex., for this fact ('"typewriter" is the longest English word you can type using 1 row of the QWERTY keyboard'), we don't want to change anything here & so we simply return the 'f' here; NOW, we also need some way of preventing the user fr clicking the btn multiple times while the fact is being updated ...
        // facts.map((f) => (f.id === fact.id ? updatedFact : f))
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {/* // ....... */}
        {isDisputed ? <span className="disputed">[⛔️ DISPUTED]</span> : null}
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
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        {/* 66.25. ... so the functionality for the remaining 2 btns will be exactly the same, the only thing that will be diff. will be at this field ( the 1st 'votesInteresting' ) that will be updated & also the current value ( the 2nd 'votesInteresting'), but everything else will be the same ... refer to this line in function handleVote() ...
        
        .update({ votesInteresting: fact.votesInteresting + 1 })
        
        ... so shd. we copy & paste the handleVote() function 2x & give them diff. names? ....
        */}
        {/* <button>🤯 {fact.votesMindblowing}</button> */}
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>

        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
