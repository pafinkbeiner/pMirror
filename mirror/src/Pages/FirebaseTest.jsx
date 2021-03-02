import React, { useEffect, useState } from "react"
import { db } from "../Helper/firebase"

const FirebaseTest = () => {

    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {

        // get specific doc
        db.collection("meta")
            .doc("Vd56TWv5G9hVo0QuVgEp")
            .get()
            .then(doc => {
                const data = doc.data();
                console.log(data); 
                setCurrentUser(data.currentUser)
            });

        // get collection that meets condition
        db.collection("meta")
            .where("currentUser", "==", "paul")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
            });

        // get everything
        db.collection("meta")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
            });

    })


    return (<>{currentUser}</>)
};

export default FirebaseTest;