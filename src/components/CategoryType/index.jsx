import { useEffect, useState } from 'react'
import './styles.css'
export const CategoryType = ({ type, name }) => {
    const [color, setColoer] = useState('#4DCF5F')
    useEffect(() => {
        if (type === "65ce7bcc25c566d4e297d2ec") {
            setColoer('#FF6969')
        }
        else if (type === "65ce7c4a25c566d4e297d30b") {
            setColoer('#D943FF')
        }
        else if (type === "6581e2425bf51638abd3f9ee") {
            setColoer('#11AEF4')
        }
        else if (type === "65ce7d9d25c566d4e297d3f3") {
            setColoer('#FFCE00')
        }
        else if (type === "65ce7e9f25c566d4e297d47c") {
            setColoer('#4DCF5F')
        }
    }, [type])
    return <div style={{ backgroundColor: color }} className="CategoryType">
        <p>{name}</p>
    </div>
}