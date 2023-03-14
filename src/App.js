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

function Counter() {
  const [count, setCount] = useState(0);

  console.log(`rendering.....`);

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
  const appTitle = "Today I Learned";

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img
            src="logo.png"
            height="68"
            width="68"
            alt="Today I Learned Logo"
          />
          {/* <h1>Today I Learned</h1> */}
          <h1>{appTitle}</h1>
        </div>

        <button className="btn btn-large btn-open">Share a fact</button>
      </header>

      <Counter />
      <NewFactForm />
      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

function NewFactForm() {
  return <form className="fact-form">Fact Form</form>;
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

function CategoryFilter() {
  // 55. Rendering the List of Categories
  // 55.1. Copy 1 of the <li></li>'s in <aside></aside> of v1=>index.html & edit as needed: class to className & the background-color as well, entering JS mode, providing an obj to the style; but what we want to do is render a list of btns based on the CATEGORIES[] array
  // return <aside>Category filter</aside>;
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
              // style={{ backgroundColor: "#3b82f6" }}
              style={{ backgroundColor: cat.color }}
            >
              {/* 55.5. Refactor to reflect the names for each btn */}
              {/* Technology */}
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList() {
  const facts = initialFacts;

  // 54.1. Transfer entire <li></li> element fr FactList() to Fact() after this function is created

  return (
    <section>
      <ul className="facts-list">
        {/* 54.3. include the Fact() component to each 'fact' of the array in FactList(); this creates another error though => that is, where does the data for 'fact' in {fact.id} coming from? Right now, the 'fact' obj does not have any meaning at all in the 'Fact()' component; So we shd find a way to pass the 'fact' data to the Fact() component; This is bec FactList() is going to be read first before it moves on to the Fact() component
         */}
        {facts.map((fact) => (
          // 54.5. Pass data fr 1 component to the other, let's pass in the 'fact' data & now the Fact() component will accept the factObj data......

          // 54.13. Refactor this line as well & now renders on the browser w/ each of the 'fact' as a new component; but an error is recvd on the React Dev Tools regarding the unique key prop  ====> VM2954 react_devtools_backend.js:2655 Warning: Each child in a list should have a unique "key" prop.

          // 54.15. .... bec. 'key={fact.id}' needs to be in the 1st element of the 'facts.map' & this resolves the error on React Dev Tools; View the new component tree on the Components tab

          <Fact key={fact.id} fact={fact} />
          // 54.16 ===>  TEST: fact & test are now the props for each of the fact ....
        ))}
      </ul>
      {/* 54.19. Let's create another element in our JSX w/c will contain the amt. of facts that are in the db */}
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

// 54. Passing & Receiving Props
// 54.2. Create a separate Fact component w/ a new function & we want to return the entire <li></li> element fr component FactList(); this will result to error mess. on browser; nxt, include the Fact() component to each 'fact' of the array .....
// 54.4. In JS, we call a function & pass in arguments as shown here: Fact(fact); In React, we have a diff concept of not passing arguments but passing 'Props'.......

// 54.6. Instead of writing 'Fact(factObj)' just like in JS, we write it this way in React: 'Fact(props)', that is, we simply receive 1 big props object inside the Fact() component; since this is a function, this can also be logged to the console

// 54.10. Let's change 'props' to 'fact' obj then delete line 'const { factObj } = props;'

// 54.17. ... TEST: view on the console the value for 'test' prop
function Fact({ fact }) {
  // function Fact({ fact, test }) {
  // console.log(test);
  // 54.18. ... TEST: we get '23' 3x bec. the 'Fact()' component was created 3x; what React does each time a component is rendered, it will run the componnet function ('Fact()')

  // 54.7. To view on the console, just comment out fr. 'return' ..... [ ); ]; so 'props' itself is an object & in there, we have 'factObj' & it is exactly the 'fact' that we pass in; 'factObj' is the name of the prop that is specified here: <Fact factObj={fact} />

  // 54.9. Destructure 'factObj'
  // this is also equivalent to ===>  const factObj = props.factObj
  // 54.11. Delete line below
  // const { factObj } = props;

  return (
    // 54.8. To pass in the data fr the 'fastObj' prop, refactor the line below to: <li key={props.factObj.id} className="fact">; however, we can also destructure 'fastObj'....

    // 54.12. Refactor by reverting to what it was originally

    // 54.14 Remove 'key={fact.id}' & paste it in the FactList() component .....

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
