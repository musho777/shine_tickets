import './style.css'

export const Button = ({ title, onClick = () => { } }) => {
    return (
        <button className='button' onClick={onClick}>{title}</button>
    )
}