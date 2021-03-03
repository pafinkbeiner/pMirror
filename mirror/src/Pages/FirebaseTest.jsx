import React, { useEffect, useState } from "react"
import { db } from "../Helper/firebase"

const FirebaseTest = (props) => {

    const [currentPage, setCurrentPage] = useState("")

    useEffect(() => {
        let ref = db.collection('meta');

        let unsubscribe = ref.onSnapshot(onCollectionUpdate);

        console.log(props.children);

        return () => {
            unsubscribe();
        }
    })

    const onCollectionUpdate = (querySnapshot) => {
        let meta;

        querySnapshot.forEach((doc) => {
          meta = doc.data();
        });
    
        setCurrentPage(meta.currentPage);
    }

    return (<>{props.children[currentPage]}</>)
};

export default FirebaseTest;