import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Prompt,
} from "react-router-dom";
import App from "../App";
import SearchForm from "../component/SearchForm"
import AddForm from "../component/AddForm";
import "./../App.css"

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        <Link to="/input">Input</Link>
                    </li>
                </ul>
                <hr />

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Switch>
                    <Route exact path="/">
                        <div style={{textAlign: "center"}}><App /></div>
                    </Route>
                    <Route exact path="/search">
                        <div style={{textAlign: "center"}}><SearchForm /></div>
                    </Route>
                    <Route exact path="/input">
                        <div style={{textAlign: "center"}}><AddForm /></div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

// You can think of these components as "pages"
// in your app.

// function Home() {
//     return (
//         <div>
//             <h2>Home</h2>
//         </div>
//     );
// }
//
// function About() {
//     return (
//         <div>
//             <h2>About</h2>
//         </div>
//     );
// }
//
// function Dashboard() {
//     return (
//         <div>
//             <h2>Dashboard</h2>
//         </div>
//     );
// }
