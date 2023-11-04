// 62. Loading Data From Supabase w/ useEffect
// 62.6. Modify. The 1st line shows that we are importing the { createClient } function fr the library that has just been installed; then we use the function 'createClient' to create a client by giving it a supabaseUrl, the same as the one used prev., not entirely though; in order to create the client, we need both the url & the key; 'process.env.SUPABASE_KEY' is the environment variable so for the API key, we have to go back to Supabase to retrieve it (Project Settings => API => copy fr 'Project API Keys' then paste as the value for the supabaseKey, in double quotes); we are now done in creating this client: we have our client stored inside the supabase variable & now we need App.js file access to this variable; go back to App.js

// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://hkvfifajbftqukzzoqii.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from "@supabase/supabase-js";

// 63.15. Change url temporarily to simulate an error; uncomment the line below later when done w/ the test; add an 'x' to make it incorrect
const supabaseUrl = "https://hkvfifajbftqukzzoqii.supabase.co";
// const supabaseUrl = "https://hkvfifajbftqukzzoqii.supabase.cox";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrdmZpZmFqYmZ0cXVrenpvcWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0ODM4MzUsImV4cCI6MTk5MzA1OTgzNX0.Qx_ZZVtUgfE05GZUxvnxk5g9STCZJApLtUjcY90J8gk";
const supabase = createClient(supabaseUrl, supabaseKey);

// *** Rt now, App.js does know that supabase.js exists & esp. of the supabase variable; export the variable fr here then go back to App.js & import this fr. there ***
export default supabase;
