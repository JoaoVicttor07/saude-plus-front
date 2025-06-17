import { useState } from "react"
import "./style.css"

const Calendar = ({ onDaySelect, selectedDay, isShifted, consultationDays }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d))
    }

    return days
  }

  const days = getDaysInMonth(currentDate)

  

  const hasConsultation = (day) => {
    if (!day) return false
    return consultationDays?.includes(day.toDateString())
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  return (
    <div className={`calendar-container${isShifted ? " shifted" : ""}`}>
      <div className="calendar-header">
        <button className="nav-button" onClick={handlePrevMonth}>{"<"}</button>
        <span className="month-year">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button className="nav-button" onClick={handleNextMonth}>{">"}</button>
      </div>
      <div className="calendar-grid">
        {weekDays.map((day, idx) => (
          <div key={idx} className="week-day">{day}</div>
        ))}
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`calendar-day${day && selectedDay && day.toDateString() === selectedDay.toDateString() ? " selected" : ""}${day ? " clickable" : ""}`}
            onClick={day ? () => onDaySelect(day) : undefined}
          >
            {day ? day.getDate() : ""}
            {day && hasConsultation(day) && <span className="consultation-dot"></span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar