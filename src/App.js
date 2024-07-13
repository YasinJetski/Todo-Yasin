import {useState, useEffect} from "react"

// Components
import Header from "./comp/Header"
import Tasks from "./comp/Tasks"
import AddTask from "./comp/AddTask"
import Navbar from "./comp/Navbar"
import Home from "./comp/Home"
import About from "./comp/About"

import { useContext } from "react";
import { UserContext } from "./comp/UserContext";

// React router, jag är medveten att jag använder gamla versionen av react route. 
// Om jag skulle göra om uppgiften skulle jag använde mig av react route v6.  
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

// Function
function App() {
    const [tasks,
        setTasks] = useState(() => {
        // Initialisera uppgifter från localStorage
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks
            ? JSON.parse(storedTasks)
            : [
                {
                    // Task arrey
                    id: 1, // Unikt id
                    text: "Job", // Text som visas
                    day: "2024-11-30", // Datum
                    reminder: false, // boolean value, för att göra task "grön"
                    pinned: true // boolean value, för att göra task "gul"
                }, {
                    id: 2,
                    text: "Fest",
                    day: "2024-11-30",
                    reminder: true,
                    pinned: false
                }
            ];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]); // Updeteras när tasks förändras

    // Alla const, görs till props som sedan kalls och används i components Add Todo
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 999) + 1; // Generera slumpmässigt id för den nya uppgiften
        const newTask = {
            id,
            ...task
        };
        setTasks([
            ...tasks,
            newTask // Lägger in newTask in i arrey "tasks"
        ]);
    };

    // Delete TODO
    const deleteTODO = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Pin TODO
    const pinTODO = (id) => {
        // Växla fäststatus för en uppgift
        setTasks(tasks.map((task) => task.id === id
            ? {
                ...task,
                pinned: !task.pinned
            }
            : task));
    };

    // Reminder function
    const toggleReminder = (id) => {
        // Växla påminnelsestatus för en uppgift
        setTasks(tasks.map((task) => task.id === id
            ? {
                ...task,
                reminder: !task.reminder
            }
            : task));
    };

    const { isLoggedIn } = useContext(UserContext);

    return (
        <Router>
          <Navbar />
          {isLoggedIn ? (
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <div className="container">
                  <Header />
                  <AddTask onAdd={addTask} />
                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTODO}
                      onPin={pinTODO}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    "no task left"
                  )}
                </div>
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          ) : (
            console.log("please log in.")
          )}
        </Router>
      );
    };

export default App;