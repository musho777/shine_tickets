import './style.css'
import { useDispatch } from 'react-redux'
import { DateRangePicker } from 'react-date-range'

export const Calendar = ({ close, onClick, setSelectedDate, selectedDate }) => {
    const dispatch = useDispatch()
    return (
        <div onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }}>
            <DateRangePicker
                dateDisplayFormat={'mm, dd, yyyy'}
                ranges={selectedDate}
                onChange={(ranges) => {
                    setSelectedDate([ranges.selection])
                }
                }
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
            />
        </div>
    )
}