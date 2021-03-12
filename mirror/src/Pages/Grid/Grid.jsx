import { useStoreState } from 'easy-peasy';
import React, {useState, useEffect} from 'react'
import {db} from "../../Helper/firebase"

const Grid = (props) => {

    const user = useStoreState((actions) => actions.user);

    const [grid, setGrid] = useState([]);
    const [orientation, setOrientation] = useState("vertial")

    // height if vertical
    const [height, setHeight] = useState(40)

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

        console.log(grid);
        console.log(orientation);

        // höhe berechnen
        setHeight(Math.floor( 100 / grid.length ))

    }

    return (<div className="columns is-multiline">
{
    ( grid && grid.length > 0) && 

    grid.map((item, index) => {
        console.log("item: ",item);
        if(orientation === "horizontal"){
            return(
                  
                <div key={index} className={`column is-${12/grid.length}`}>
                    <iframe src={item} title={item} frameborder="0"></iframe>
                </div>
                
             );

        }else{
            return (

                <div key={index} className="column is-full" style={{height: `${height}vh`}}>
                    <div className="cont" style={{backgroundColor: "green", height: "100%"}}>
                        <iframe style={{ width: "100%", height:"100%"}} src={item} title={item}  frameborder="0"></iframe>
                    </div>
                </div>

            );
        }

    })

}

    
    </div>)
}

export default Grid
