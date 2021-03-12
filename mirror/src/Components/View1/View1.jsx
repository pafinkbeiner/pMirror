import React from 'react'
import Time, { useDate } from "../../Helper/Time"

const View1 = () => {

    const { date, time, wish } = useDate();

    return (
        <div className="columns">
            <div className="column is-half is-offset-one-quarter">
               <h1 style={{color: "white", fontSize:"2em"}}>{date}</h1>
               <h2 style={{color: "white", fontSize:"2em"}}>{time}</h2>
               <h3 style={{color: "white", fontSize:"2em"}}>{wish}</h3>
            </div>
        </div>
    )
}

export default View1
