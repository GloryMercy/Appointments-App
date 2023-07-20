import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    date: '',
    appointmentList: [],
  }

  toggleStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, date} = this.state
    const appointmentDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    console.log(appointmentDate)

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: appointmentDate,
      isFilterActive: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      date: '',
    }))
  }

  onTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddDate = event => {
    this.setState({date: event.target.value})
  }

  onClickFilterStarred = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStared === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, date, isFilterActive} = this.state
    const filteredAppointmentList = this.getFilteredList()
    const starClass = isFilterActive ? 'filled-star' : ''

    return (
      <div className="app-container">
        <div className="appointment-register">
          <div className="appointment-container">
            <div className="appointment-form">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="app-title">Add Appointment</h1>
                <div className="input">
                  <label className="input-label" htmlFor="title">
                    TITLE
                  </label>
                  <input
                    placeholder="title"
                    type="text"
                    id="title"
                    onChange={this.onTitleChange}
                    value={titleInput}
                    className="input-tab"
                  />
                </div>
                <div className="input">
                  <label className="input-label" htmlFor="date">
                    DATE
                  </label>
                  <input
                    value={date}
                    type="date"
                    id="date"
                    className="input-tab"
                    onChange={this.onAddDate}
                  />
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                className="image"
              />
            </div>

            <hr className="line" />
            <div className="appointments-booked-container">
              <h1 className="header-title">Appointments</h1>
              <button
                type="button"
                className={`star-btn ${starClass}`}
                onClick={this.onClickFilterStarred}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleStarred={this.toggleStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
