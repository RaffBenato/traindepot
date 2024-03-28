const faultNoElement = document.getElementById("faultNo");
const faultDateElement = document.getElementById("faultDate");

faultNoElement.value = "0001";
let today = new Date();
let formattedDate =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  today.getDate().toString().padStart(2, "0");
faultDateElement.value = formattedDate;
