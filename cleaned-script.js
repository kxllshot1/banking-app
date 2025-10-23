"use strict";

// Credentials Alert

alert("Login Username: ignacio, Login PIN: 9430\nLogin Username: cantseeme_, Login Password: 9922");

// ==================
// DOM SELECTIONS
// ==================
const totalMoney = document.querySelector(".total-amount");
const asOfDate = document.querySelector(".as-of-date");
const showAmountIn = document.querySelector(".amount-in");
const showAmountOut = document.querySelector(".amount-out");
const showInterest = document.querySelector(".amount-int");
const theChooseMethodPage = document.querySelector(".choose-method");
const theLogInPage = document.querySelector(".log-in-page");
const theCreateAccountPage = document.querySelector(".create-account-page");
const linkToLogIn = document.querySelector(".log-in-button");
const linkToCreateAccount = document.querySelector(".create-an-account-button");
const main = document.querySelector("main");
const mainAccountPage = document.querySelector(".main-account");
const proceedLogIn = document.querySelector(".proceed-log-in-button");
const proceedToCreateAccount = document.querySelector(
  ".proceed-create-account-button"
);
const headerOne = document.querySelector(".start-header");
const headerTwo = document.querySelector(".account-header");
const errorBox = document.querySelector(".error-display");
const errorMessage = document.querySelector(".error-text");
const proceedTransfer = document.querySelector(".proceed-transfer");
const proceedLoan = document.querySelector(".proceed-loan");
const exitButton = document.querySelector(".exit");
const proceedClose = document.querySelector(".proceed-close");
const sortButton = document.querySelector(".sort");
const theArrow = document.querySelector("#sort-arrow");
const minutesLeft = document.querySelector(".minutes");
const secondsLeft = document.querySelector(".seconds");

// Dark Mode Toggle

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setBodyBg(e) {
  if (e.matches) {
    document.body.style.backgroundColor = "#333";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
}

// Initial run
setBodyBg(prefersDark);

// Listen for theme changes
prefersDark.addEventListener("change", setBodyBg);

//

// ==================
// GLOBAL VARIABLES
// ==================

let activeUser;
let sortedByEarliest = false;

// ==================
// FUNCTIONS
// ==================
const showError = (message) => {
  errorBox.classList.remove("invisible");
  errorMessage.textContent = message;
  setTimeout(() => errorBox.classList.add("invisible"), 2500);
};

const createActivity = (movement, activityNum) => {
  const type = movement > 0 ? "Deposit" : "Withdrawal";
  const amount = Math.abs(movement);
  return `
    <div>
      <span class="nature-and-num">
        <span class="activity-num">${activityNum}</span>
        <span class="activity-nature">${type}</span>
      </span>
      <span class="activity-date">${new Date().toLocaleDateString()}</span>
    </div>
    <h3 class="activity-amount">${amount}</h3>`;
};

const prependActivity = (movement, index, activitySection) => {
  const newActivity = document.createElement("div");
  newActivity.innerHTML = createActivity(movement, index);
  newActivity.classList.add("the-activity");

  const nature = newActivity.querySelector(".nature-and-num");
  nature.classList.add(movement > 0 ? "deposit-bg" : "withdrawal-bg");

  activitySection.insertAdjacentElement("afterbegin", newActivity);
};

const userAccountPage = (user) => {
  const welcomeName = document.querySelector(".welcome-user");
  asOfDate.textContent = new Date().toLocaleDateString();

  const activitySection = document.createElement("div");
  activitySection.classList.add("activities");
  activitySection.id = `${user.username}-activities`;
  document.querySelector(".activity-and-actions").prepend(activitySection);

  welcomeName.textContent = user.firstName;
  totalMoney.textContent = user.totalMoney();
  [
    "#action-username-transfer",
    "#action-amount-transfer",
    "#action-amount-request",
    "#close-account-username",
    "#close-account-pin",
  ].forEach((label) => {
    document.querySelector(label).value = "";
  });

  user.movements.forEach((movement, i) =>
    prependActivity(movement, i + 1, activitySection)
  );

  showAmountIn.textContent = user.getAmountIn();
  showAmountOut.textContent = user.getAmountOut();
  showInterest.textContent = user.getInterest();
};

// ==================
// DATA
// ==================

const users = [];

const johnsAccount = {
  firstName: "John",
  lastName: "Cena",
  email: "johncena@gmail.com",
  username: "cantseeme_",
  pin: 9922,
  movements: [
    20000, 10000, -5000, -2000, 30000, -500, -1500, 50000, 10000, -5000, -1000,
    30000, 50000, 10000, -10000,
  ],
  totalMoney() {
    return this.movements.reduce((sum, m) => sum + m, 0);
  },
  getAmountIn() {
    return this.movements.filter((m) => m > 0).reduce((sum, m) => sum + m, 0);
  },
  getAmountOut() {
    return this.movements
      .filter((m) => m < 0)
      .reduce((sum, m) => sum + Math.abs(m), 0);
  },
  getInterest() {
    return this.movements
      .filter((m) => m > 0)
      .map((m) => (m * 1.2) / 100)
      .filter((m) => m >= 1)
      .reduce((sum, current) => sum + current, 0);
  },
  loansTaken: 0,
};

const talhasAccount = {
  firstName: "Talha",
  lastName: "Yasir",
  email: "talha@gmail.com",
  username: "ignacio",
  pin: 9430,
  movements: [5000, -3300, 1000, 2000, -1500, -850, -500, 20000, -1500],
  totalMoney() {
    return this.movements.reduce((sum, m) => sum + m, 0);
  },
  getAmountIn() {
    return this.movements.filter((m) => m > 0).reduce((sum, m) => sum + m, 0);
  },
  getAmountOut() {
    return this.movements
      .filter((m) => m < 0)
      .reduce((sum, m) => sum + Math.abs(m), 0);
  },
  getInterest() {
    return this.movements
      .filter((m) => m > 0)
      .map((m) => (m * 1.2) / 100)
      .filter((m) => m >= 1)
      .reduce((sum, current) => sum + current, 0);
  },
  loansTaken: 0,
};

const talalsAccount = {
  firstName: "Talal",
  lastName: "Yasir",
  email: "talal22@gmail.com",
  username: "kingslayer",
  pin: 1001,
  movements: [5000, -500, 2000, 5000, -1500, -500, -500, 5000, 400],
  totalMoney() {
    return this.movements.reduce((sum, m) => sum + m, 0);
  },
  getAmountIn() {
    return this.movements.filter((m) => m > 0).reduce((sum, m) => sum + m, 0);
  },
  getAmountOut() {
    return this.movements
      .filter((m) => m < 0)
      .reduce((sum, m) => sum + Math.abs(m), 0);
  },
  getInterest() {
    return this.movements
      .filter((m) => m > 0)
      .map((m) => (m * 1.2) / 100)
      .filter((m) => m >= 1)
      .reduce((sum, current) => sum + current, 0);
  },
  loansTaken: 0,
};

users.push(johnsAccount, talhasAccount, talalsAccount);

// ==================
// EVENT LISTENERS
// ==================
linkToLogIn.addEventListener("click", () => {
  theLogInPage.classList.remove("invisible");
  main.style.transform = "translateX(-100vw)";
  document.querySelector(".log-in-username").value = "";
  document.querySelector(".log-in-pin").value = "";
});

linkToCreateAccount.addEventListener("click", () => {
  theCreateAccountPage.classList.remove("invisible");
  main.style.transform = "translateX(-200vw)";
  ["first-name", "last-name", "email", "username", "pin"].forEach((field) => {
    document.querySelector(`.create-account-${field}`).value = "";
  });
});

proceedLogIn.addEventListener("click", () => {
  const username = document.querySelector(".log-in-username").value;
  const pin = Number(document.querySelector(".log-in-pin").value);

  const user = users.find((u) => u.username === username && u.pin === pin);

  if (!user) return showError("There is no such account");

  activeUser = user;
  mainAccountPage.classList.remove("invisible");
  main.style.transform = "translateX(-300vw)";
  theLogInPage.classList.add("invisible");
  theCreateAccountPage.classList.add("invisible");
  headerOne.style.display = "none";
  headerTwo.style.display = "flex";
  userAccountPage(user);
});

proceedToCreateAccount.addEventListener("click", () => {
  const firstName = document.querySelector(".create-account-first-name").value;
  const lastName = document.querySelector(".create-account-last-name").value;
  const email = document.querySelector(".create-account-email").value;
  const username = document.querySelector(".create-account-username").value;
  const pin = Number(document.querySelector(".create-account-pin").value);

  if (users.some((u) => u.email === email))
    return showError("This Email is already in use");
  if (users.some((u) => u.username === username))
    return showError("This Username is already in use");

  const newUser = {
    firstName,
    lastName,
    email,
    username,
    pin,
    movements: [],
    totalMoney() {
      return this.movements.reduce((sum, m) => sum + m, 0);
    },
    getAmountIn() {
      return this.movements.filter((m) => m > 0).reduce((sum, m) => sum + m, 0);
    },
    getAmountOut() {
      return this.movements
        .filter((m) => m < 0)
        .reduce((sum, m) => sum + Math.abs(m), 0);
    },
    getInterest() {
      return this.movements
        .filter((m) => m > 0)
        .map((m) => (m * 1.2) / 100)
        .filter((m) => m >= 1)
        .reduce((sum, current) => sum + current, 0);
    },
    loansTaken: 0,
  };

  users.push(newUser);
  activeUser = newUser;
  mainAccountPage.classList.remove("invisible");
  main.style.transform = "translateX(-300vw)";
  theLogInPage.classList.add("invisible");
  theCreateAccountPage.classList.add("invisible");
  headerOne.style.display = "none";
  headerTwo.style.display = "flex";
  userAccountPage(newUser);
});

exitButton.addEventListener("click", () => {
  main.style.transform = "translateX(0)";
  mainAccountPage.classList.add("invisible");
  headerTwo.style.display = "none";
  headerOne.style.display = "flex";
  document.querySelector(".activities").remove();
  activeUser = undefined;
});

proceedTransfer.addEventListener("click", () => {
  const username = document.querySelector("#action-username-transfer").value;
  const amount = Number(
    document.querySelector("#action-amount-transfer").value
  );

  if (
    amount <= 0 ||
    activeUser.totalMoney() <= amount ||
    username === activeUser.username
  )
    return showError("Transaction Rejected");

  const recipient = users.find((u) => u.username === username);
  if (!recipient) return showError("Incorrect Credentials");

  recipient.movements.push(amount);

  prependActivity(
    -amount,
    activeUser.movements.length + 1,
    document.querySelector(`#${activeUser.username}-activities`)
  );
  activeUser.movements.push(-amount);

  totalMoney.textContent = activeUser.totalMoney();
  showAmountIn.textContent = activeUser.getAmountIn();
  showAmountOut.textContent = activeUser.getAmountOut();
  showInterest.textContent = activeUser.getInterest();
  if (!sortedByEarliest) sortButton.click();

  errorBox.classList.replace("withdrawal-bg", "deposit-bg");
  showError("Transaction Approved");
  setTimeout(
    () => errorBox.classList.replace("deposit-bg", "withdrawal-bg"),
    3200
  );

  document.querySelector("#action-username-transfer").value =
    document.querySelector("#action-amount-transfer").value = "";
});

proceedLoan.addEventListener("click", () => {
  const amount = Number(document.querySelector("#action-amount-request").value);
  if (!amount) return;
  if (activeUser.loansTaken >= 10000) return showError("Rejected");

  if ((activeUser.totalMoney() - activeUser.loansTaken) * 0.5 > amount) {
    prependActivity(
      amount,
      activeUser.movements.length + 1,
      document.querySelector(`#${activeUser.username}-activities`)
    );
    activeUser.movements.push(amount);
    activeUser.loansTaken += amount;

    totalMoney.textContent = activeUser.totalMoney();
    showAmountIn.textContent = activeUser.getAmountIn();
    showInterest.textContent = activeUser.getInterest();
    if (!sortedByEarliest) sortButton.click();

    errorBox.classList.replace("withdrawal-bg", "deposit-bg");
    showError("Approved");
    setTimeout(
      () => errorBox.classList.replace("deposit-bg", "withdrawal-bg"),
      3200
    );
  } else return showError("Rejected");
  document.querySelector("#action-amount-request").value = "";
});

proceedClose.addEventListener("click", () => {
  const username = document.querySelector("#close-account-username").value;
  const pin = Number(document.querySelector("#close-account-pin").value);

  if (username !== activeUser.username || pin !== activeUser.pin)
    return showError("Incorrect Credentials");

  const indexOfUser = users.findIndex((user) => username === user.username);
  users.splice(indexOfUser, 1);
  document.querySelector(".activities").remove();
  activeUser = undefined;

  main.style.transform = "translateX(0)";
  headerOne.style.display = "flex";
  headerTwo.style.display = "none";
  mainAccountPage.classList.add("invisible");

  document.querySelector("#close-account-username").value = "";
  document.querySelector("#close-account-pin").value = "";

  showError("Account Deleted");
});

sortButton.addEventListener("click", function () {
  const container = document.querySelector(
    `#${activeUser.username}-activities`
  );
  container.innerHTML = "";

  const movements = activeUser.movements;

  let displayArray = sortedByEarliest
    ? [...movements]
    : [...movements].slice().reverse();

  displayArray.forEach((movement, index) => {
    const activityNum = sortedByEarliest ? index + 1 : movements.length - index;

    const newActivity = document.createElement("div");
    newActivity.innerHTML = createActivity(movement, activityNum);
    newActivity.classList.add("the-activity");

    const nature = newActivity.querySelector(".nature-and-num");
    nature.classList.add(movement > 0 ? "deposit-bg" : "withdrawal-bg");

    container.insertAdjacentElement("beforeend", newActivity);
  });

  if (sortedByEarliest) {
    theArrow.classList.replace("fa-arrow-up", "fa-arrow-down");
  } else {
    theArrow.classList.replace("fa-arrow-down", "fa-arrow-up");
  }
  sortedByEarliest = !sortedByEarliest;
});

