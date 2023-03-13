// 51. Meeting JSX & Creating the App Component
// ! a COMPONENT in React is simply a React function
// 51.1. Rebuild the interface using React ( delete everything & grab code fr v1=>index.html ); select the proj folder on terminal & 'npm run start' to see the changes
// 51.2. A COMPONENT in React is simply a React function. Std. name is 'App' & shd be capitalized so that react would know that this is a component. Write the function w/o any arguments & whatever is returned in the component is what's going to be visible in the user interface

import "./style.css";

// 53. Rendering the List of Facts
// 53.1. Grab the hard-coded data fr 'data.js' fr v1 folder & paste it into 'App.js' but not inside any components
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
  const appTitle = "Today I Learned";

  return (
    // 51.3. fr <header class="header"> to </header> ====> this is not really HTML, this is a diff syntax called 'JSX' created by React similar to HTML so that we can write React components in a way that is familiar to us; JSX will be converted to JS functions that React understands
    // ! diff. bet. JSX & JS ===> 'class' is a reserved word in JS so it can't be used in JSX: 'class' to 'className';
    // ===> we ONLY return 1 element fr each Component
    // 51.4. "logo.png" does not reflect on the browser, copy fr orig. location & paste in 'public' folder then reload the browser; this means that when you specify a file, React will look into the public folder
    // 51.5. The easiest way to use CSS in React is to copy fr orig loc (v1) then paste in 'src' folder bec this is a code that will be included in the application: type on the top of this page ====> import "./style.css";
    // 51.6. Grab the links fr Google fonts in v1=>index.html & paste in 'index.html' in 'public' folder; update the title as well
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

      {/* ! returning another element will result in an error, so JSX expressions must have 1 parent element
     <p>Reese</p> */}

      <NewFactForm />

      <main className="main">
        {/* // 52.2. To connect CategoryFilter component to the App component, write it as though it is an HTML element '<CategoryFilter />', thus, linking the 2 components; red underline now appears on the JSX bec this is now returning 2 elements fr this App & we don't want that; we can then create a Fragment to resolve this('<> </>' ===> a JSX element w/c will not produce any output) */}
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

// 52.2 Create another component for the form
function NewFactForm() {
  return <form className="fact-form">Fact Form</form>;
}

// 52. Dividing Our Interface Into Components
// 52.1. Add another component called CategoryFilter()
function CategoryFilter() {
  return <aside>Category filter</aside>;
}

// 52.3. Add another component

function FactList() {
  // 53.2. Create a TEMPORARY variable called 'facts' set to 'initialFacts'; this is while we are using the fake data
  // 53.11. When we load the data fr Supabase, we simply have to refactor line of code below & the lines after it will work just fine
  const facts = initialFacts;

  // 53.3. Let's create an unordered list; grab this fr <section></section> of v1=>index.html; then create 1 list item for each fact by writing JS '{}' & when we want to render multiple elements in React all at once, loop over the ['facts'] array & then on each iteration, we return some more JSX; & then we have to manually insert it into the DOM
  // 53.4. Grab 1 of the <li></li> fr the <ul class="facts-list"> & replace <li>Fact</li> w/ it; this won't render yet as inline styling works differently in React;
  // => instead of: style="background-color: #3b82f6", turn into an object
  // ====> style={{backgroundColor: '#3b82f6'}}

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
          // <Fact fact={fact} />

          <Fact key={fact.id} fact={fact} />
          // 54.16 ===>  TEST: fact & test are now the props for each of the fact ....
          // <Fact key={fact.id} fact={fact} test="23" />
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
// function Fact() {
// 54.10. Let's change 'props' to 'fact' obj then delete line 'const { factObj } = props;'

// 54.17. ... TEST: view on the console the value for 'test' prop
function Fact({ fact }) {
  // function Fact({ fact, test }) {
  // console.log(test);
  // 54.18. ... TEST: we get '23' 3x bec. the 'Fact()' component was created 3x; what React does each time a component is rendered, it will run the componnet function ('Fact()')

  // 54.7. To view on the console, just comment out fr. 'return' ..... [ ); ]; so 'props' itself is an object & in there, we have 'factObj' & it is exactly the 'fact' that we pass in; 'factObj' is the name of the prop that is specified here: <Fact factObj={fact} />
  // console.log(props);

  // 54.9. Destructure 'factObj'
  // this is also equivalent to ===>  const factObj = props.factObj
  // 54.11. Delete line below
  // const { factObj } = props;

  return (
    // 54.8. To pass in the data fr the 'fastObj' prop, refactor the line below to: <li key={props.factObj.id} className="fact">; however, we can also destructure 'fastObj'....

    // 54.12. Refactor by reverting to what it was originally
    // <li key={props.factObj.id} className="fact">
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

// 52.4. React also has its own dev tools w/c you can get fr the chrome web store: React Developer Tools is a Chrome DevTools extension for the open-source React JavaScript library. ! Inspect => Elements => Components
// 52.5. The component tree of our React application are as follows: at the top is the 'App' w/c has 3 child components ==> NewFactForm, CategoryFilter & FactList; The child components are what the parent component references
// 52.6. Components are about reusability, that is, you can reuse them in diff places:

// 52.7 Also recvd this error in the React Dev Tools: Manifest: Line: 1, column: 1, Syntax; to resolve this:
// ===> The manifest.json file used to provide some additional information for mobile devices in missing in our project, but it's linked in the index.html file by default.
// To solve this, we can open public/index.html file, and comment out this line as you said
// <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
