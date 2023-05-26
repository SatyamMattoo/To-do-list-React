import React, { useEffect } from "react";
import { useState } from "react";
import Task from "./Task";
import { signOut, onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "./firebase.js";
import { getFirestore, addDoc, serverTimestamp, collection, onSnapshot, query, orderBy } from "firebase/firestore"


const auth = getAuth(app);
const db = getFirestore(app);
const logOut = () => signOut(auth);

const loginGoogle = () => {
  const providerGoogle = new GoogleAuthProvider();
  signInWithPopup(auth, providerGoogle);
}

function Form() {

  const [user, setUser] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setTasks([...tasks, { title, description }]);
      setTitle("");
      setDescription("");
      await addDoc(collection(db, "tasks"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()
      })

      scroll.current.scrollIntoView({ behaviour: "smooth" })
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "asc"));
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubscribeFortasks = onSnapshot(q, (snap) => {

      settasks(snap.docs.map((item) => {
        const id = item.id;
        return { id, ...item.data() };
      }
      ));

    })

    return () => {
      unsubscribe();
      unsubscribeFortasks();
    }
  }, [tasks]);

  const deleteTask = (index) => {
    const filteredArray = tasks.filter((val, i) => {
      return i !== index;
    });
    setTasks(filteredArray);
  };

  return (
<>
    {
      (user) ?  
      <div className="container">
      <h1>Daily Goals</h1>
      <form className="input" onSubmit={submitHandler}>
        <input
          type="text" 
          required
          placeholder="Enter the Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          required
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">ADD</button>
      </form>
      {tasks.map((item, index) => (
          <Task
            key={index}
            title={item.title}
            description={item.description}
            deleteTask2={deleteTask}
            index={index}
            />
            ))
          }
        </div>
      :
      <div className="login">
        <button>
          Sign in with Google
        </button>
      </div>
      }
      </>
  );
}

export default Form;
