import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarred} = props
  const {id, title, date, isStared} = appointmentDetails
  const starImg = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStarred(id)
  }

  return (
    <li className="appointments">
      <div className="title-block">
        <p className="appointment-title">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImg} alt="star" className="star" />
        </button>
      </div>
      <p>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
