import React from 'react'
import {DateRangePicker} from 'react-date-range'
import './CalendarProducts.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

const CalendarProducts = () => {

    const handleSelect = (ranges) => {
        console.log(ranges);
    }
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }


  return (
        <DateRangePicker
        months={2}
        ranges={[selectionRange]}
        onChange={handleSelect}
        />
    )
}

export default CalendarProducts