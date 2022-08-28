const getSleepHours = (day) => {
  switch (day) {
    case "monday":
      return 8;
      break;
    case "tuesday":
      return 8;
      break;
    case "wednesday":
      return 6;
      break;
    case "thursday":
      return 7;
      break;
    case "friday":
      return 9;
      break;
    case "saturday":
      return 4;
      break;
    case "sunday":
      return 6;
      break;
    default:
      return "Broken!";
  }
};

const getActualSleepHours = () =>
  getSleepHours("monday") +
  getSleepHours("tuesday") +
  getSleepHours("wednesday") +
  getSleepHours("thursday") +
  getSleepHours("friday") +
  getSleepHours("saturday") +
  getSleepHours("sunday");

const getIdealSleepHours = () => {
  const idealHours = 7.5;
  return idealHours * 7;
};

const calculateSleepDebt = () => {
  const actualSleepHours = getActualSleepHours();
  const idealSleepHours = getIdealSleepHours();
  if (actualSleepHours === idealSleepHours) {
     console.log("Younailed it champ, fully slept");
  } else if (actualSleepHours > idealSleepHours) {
    console.log("you done fucked up and slept too much");
  } else if (actualSleepHours < idealSleepHours) {
    console.log(
      "You need some sleep as you only got " +
      (idealSleepHours - actualSleepHours ) + " Hours less sleep than you need, so go to bed");
  }
};

calculateSleepDebt();
