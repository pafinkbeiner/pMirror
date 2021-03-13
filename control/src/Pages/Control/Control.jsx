import React, {useEffect, useState} from 'react'
import {useStoreState} from "easy-peasy"
import {db, fb} from "../../Helper/firebase"
// import * as admin from "firebase-admin"
const admin = require("firebase-admin")

const Control = () => {

    const user = useStoreState((actions) => actions.user);

    const [grid, setGrid] = useState([]);
    const [orientation, setOrientation] = useState("vertial")

    // add new grid entry
    const [newGridModal, setNewGridModal] = useState(false);
    const [newGrid, setNewGrid] = useState("");

    // edit grid entry
    const [selectedGridItemModal, setSelectedGridItemModal] = useState(false)
    const [selectedGridItemPre, setSelectedGridItemPre] = useState(undefined);
    const [selectedGridItem, setSelectedGridItem] = useState(undefined);

    useEffect(() => {
        let ref = db.collection('users');

        let unsubscribe = ref.onSnapshot(onCollectionUpdate);

        return () => {
            unsubscribe();
        }
    }, [])

    const onCollectionUpdate = (querySnapshot) => {

        querySnapshot.forEach((doc) => {
            if(doc.id === user.uid){
                setGrid(doc.data().grid);
                setOrientation(doc.data().orientation);
            }
        });

    }

    return (
        <div className="container">

            <div className="columns">

                <div className="column ml-1 mr-1 mt-2">
                    <article className="panel is-black">
                    <p className="panel-heading">
                        Grid
                    </p>

                    <button onClick={() => setNewGridModal(true)} className="button" style={{position: "absolute", top: "20px", right: "11px"}}>+</button>

                    <p className="panel-tabs">
                        <a className="is-active">All</a>
                    </p>
                    {/* <div className="panel-block">
                        <p className="control has-icons-left">
                        <input className="input is-black" type="text" placeholder="Search"/>
                        <span className="icon is-left">
                            <i className="fas fa-search" aria-hidden="true"></i>
                        </span>
                        </p>
                    </div> */}

                    {

                        grid ?
                            grid.map(g => {
                                return (
                                    <div onClick={() => {setSelectedGridItem(g); setSelectedGridItemModal(true); setSelectedGridItemPre(g)}} className="panel-block">
                                        <span className="panel-icon">
                                            <i className="fas fa-edit" aria-hidden="true"></i>
                                        </span>
                                        {g}
                                    </div>
                                )
                            })
                        : 
                        <div>Please add a grid item</div>

                    }
                    </article>


                    <div className={newGridModal === true ? "modal is-active" : "modal"}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                            <p className="modal-card-title">Modal title</p>
                            <button onClick={() => {setNewGridModal(false); setNewGrid("")}} className="delete"></button>
                            </header>
                            <section className="modal-card-body">

                            <div class="field">
                                <label class="label">New Grid Content</label>
                                <div class="control">
                                <input
                                    onChange={(e) => setNewGrid(e.target.value)}
                                    value={newGrid}
                                    class="input"
                                    type="text"
                                    placeholder="New grid url.."
                                ></input>
                                </div>
                            </div>

                            </section>
                            <footer className="modal-card-foot">
                            <button onClick={() => {

                                db.collection("users").doc(user.uid).get().then(doc => {
                                    
                                    if(doc.data().grid !== undefined){
                                        db.collection("users").doc(user.uid).set({
                                            ...doc.data(),
                                            grid: [...doc.data().grid, newGrid]
                                        }).then(() => {

                                            // close modal
                                            setNewGridModal(false); 
                                            setNewGrid("")
                                        })
                                    }
  
                                })


                            }} className="button is-success">Save changes</button>
                            <button onClick={() => {setNewGridModal(false); setNewGrid("")}} className="button">Cancel</button>
                            </footer>
                        </div>
                    </div>

                    <div className={selectedGridItemModal === true ? "modal is-active" : "modal"}>
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                            <p className="modal-card-title">Edit Grid Item</p>
                            <button onClick={() => {setSelectedGridItemModal(false); setSelectedGridItem("")}} className="delete"></button>
                            </header>
                            <section className="modal-card-body">

                            <div class="field">
                                <label class="label">Edit the grid item</label>
                                <div class="control">
                                <input
                                    onChange={(e) => setSelectedGridItem(e.target.value)}
                                    value={selectedGridItem}
                                    class="input"
                                    type="text"
                                    placeholder="New grid url.."
                                ></input>
                                </div>
                            </div>

                            </section>
                            <footer className="modal-card-foot">
                            <button onClick={() => {

                                db.collection("users").doc(user.uid).get().then(doc => {
                                    
                                    if(doc.data().grid !== undefined){

                                        // get array 
                                        let temp1 = doc.data().grid;
                                        // slice old element
                                        temp1.splice(doc.data().grid.findIndex(item => item === selectedGridItemPre), 1);
                                        
                            
                                        db.collection("users").doc(user.uid).set({
                                            ...doc.data(),
                                            grid: [...temp1, selectedGridItem]
                                        }).then(() => {

                                            // close modal
                                            setSelectedGridItemModal(false); 
                                            setSelectedGridItem("")
                                        })
                                    }
  
                                })


                            }} className="button is-success">Save changes</button>
                            <button onClick={() => {

                                db.collection("users").doc(user.uid).get().then(doc => {
                                                                    
                                    if(doc.data().grid !== undefined){

                                        // get array 
                                        let temp1 = doc.data().grid;
                                        // slice old element
                                        temp1.splice(doc.data().grid.findIndex(item => item === selectedGridItemPre), 1);
                                        

                                        db.collection("users").doc(user.uid).set({
                                            ...doc.data(),
                                            grid: [...temp1]
                                        }).then(() => {

                                            // close modal
                                            setSelectedGridItemModal(false); 
                                            setSelectedGridItem("")
                                        })
                                    }

                                })

                            }} className="button is-danger">Remove</button>
                            <button onClick={() => {setSelectedGridItemModal(false); setSelectedGridItem("")}} className="button">Cancel</button>
                            </footer>
                        </div>
                    </div>
                    

                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            Display Orientation: {orientation}
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default Control
