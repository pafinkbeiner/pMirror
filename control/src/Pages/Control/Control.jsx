import React, {useEffect, useState} from 'react'
import {useStoreState} from "easy-peasy"
import {db} from "../../Helper/firebase"

const Control = () => {

    const user = useStoreState((actions) => actions.user);

    const [grid, setGrid] = useState([]);
    const [orientation, setOrientation] = useState("vertial")

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

                    <button className="button" style={{position: "absolute", top: "20px", right: "11px"}}>+</button>

                    <p className="panel-tabs">
                        <a className="is-active">All</a>
                    </p>
                    <div className="panel-block">
                        <p className="control has-icons-left">
                        <input className="input is-black" type="text" placeholder="Search"/>
                        <span className="icon is-left">
                            <i className="fas fa-search" aria-hidden="true"></i>
                        </span>
                        </p>
                    </div>

                    {

                        (grid && grid.length > 0) ?
                            grid.map(g => {
                                return (
                                    <div className="panel-block">
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
