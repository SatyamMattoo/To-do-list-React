import React, { useEffect } from "react";
import { useState } from "react";
import Task from "./Task";
import { app } from "./firebase.js";
import { signOut, onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore, addDoc, serverTimestamp, collection, onSnapshot, deleteDoc, doc} from "firebase/firestore"

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
      setTitle("");
      setDescription("");
      await addDoc(collection(db, "tasks"), {
        completed: false,
        heading: title,
        des: description,
        uid: user.uid,
        createdAt: serverTimestamp()
      })

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubscribeFortasks = onSnapshot(collection(db, "tasks"), (snap) => {

      setTasks(snap.docs.map((item) => {
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

const deleteTask = async(id) => {
  await deleteDoc (doc(db, "tasks", id));
};


  return (
<>
    {
      (user) ?  
      <div className="container">
      <div className="header">
      <img src={user.photoURL} referrerPolicy="no-referrer" alt="user profile" />
      <h1>Daily Goals</h1>
      <button onClick={logOut}>Log Out</button>
      </div>
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
            completed={item.completed}
            title={item.heading}
            description={item.des}
            deleteTask={deleteTask}
            index={index}
            id={item.id}
            />
            ))
          }
        </div>
      :
      <div className="login">
        <button onClick={loginGoogle}>
          Sign in with Google
        </button>
      </div>
      }
      </>
  );
}

export default Form;
