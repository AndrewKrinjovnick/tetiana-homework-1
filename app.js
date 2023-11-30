const btn = document.querySelector("#switch_btn");
const message = document.querySelector("#message");

const localThemeInfo = JSON.parse(localStorage.getItem("savedState"));

let mode = localThemeInfo?.mode || "on";

const formatDate = (date) => {
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year} ${date.toLocaleTimeString()}`;
};

const themeMap = {
  on: {
    btnText: "Turn off",
    background: "rgb(250, 226, 239)",
    message: "Last turn off:",
  },
  off: {
    btnText: "Turn on",
    background: "rgb(252, 109, 183)",
    message: "Last turn on:",
  },
};

if (localThemeInfo) {
  btn.textContent = themeMap[mode].btnText;
  const lastSavedDate = localThemeInfo.dateState;
  message.textContent = `${themeMap[mode].message} ${lastSavedDate}`;
  message.style.margin = "20px";
  document.documentElement.style.setProperty("--background", themeMap[mode].background);
}

function updateButtonState() {
  mode = mode === "on" ? "off" : "on";
  btn.textContent = themeMap[mode].btnText;
  document.documentElement.style.setProperty("--background", themeMap[mode].background);

  const formattedDate = formatDate(new Date());
  const updatedMessage = `${themeMap[mode].message} ${formattedDate}`;

  message.textContent = updatedMessage;
  message.style.margin = "20px";

  const stateToSave = {
    mode,
    dateState: formattedDate,
  };

  localStorage.setItem("savedState", JSON.stringify(stateToSave));
}

btn.addEventListener("click", updateButtonState);
