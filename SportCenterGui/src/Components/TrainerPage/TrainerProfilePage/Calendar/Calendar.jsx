import React from "react";
import PropTypes from "prop-types";
import OwnerCalendar from "./OwnerCalendar/OwnerCalendar";
import UserCalendar from "./UserCalendar/UserCalendar";

const Calendar = ({ isCurrentUser, trainerId }) => {
  
  const isOwner = isCurrentUser(trainerId);
  
  
  return isOwner ? (
    <OwnerCalendar trainerId={trainerId} />
  ) : (
    <UserCalendar trainerId={trainerId} />
  );
};

Calendar.propTypes = {
  isCurrentUser: PropTypes.func.isRequired,
  trainerId: PropTypes.string.isRequired
};

export default Calendar;