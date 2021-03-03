import React from 'react'
import Time, { useDate } from "../Helper/Time"
import "./Base.scss"

const Base = ({color}) => {

    const { date, time, wish } = useDate();

    return (
        <div className="container" style={{ backgroundColor: color }}>
            <div className="content">
               <h1>{date}</h1>
               <h2>{time}</h2>
               <h3>{wish}</h3>
            </div>
        </div>
    )
}

export default Base
