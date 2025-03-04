/*******************************************
 * CONFIGURAZIONE FIREBASE
 *******************************************/
const firebaseConfig = {
  apiKey: "TUO_API_KEY",
  authDomain: "TUO_DOMINIO.firebaseapp.com", // Anche link vercel, Netlify app
  projectId: "TUO_PROJECT_ID",
  storageBucket: "TUO_BUCKET",
  messagingSenderId: "TUO_SENDER_ID",
  appId: "TUO_APP_ID",
  measurementId: "MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/*******************************************
 * RIFERIMENTI AGLI ELEMENTI DEL DOM
 *******************************************/
const loginContainer = document.getElementById("auth-container");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerBtn = document.getElementById("register-btn");

const appContainer = document.getElementById("app-container");
const logoutBtn = document.getElementById("logout-btn");
const resetBtn = document.getElementById("reset");

const totalHoursEl = document.getElementById("total-hours");

/*******************************************
 * LOGIN / REGISTRAZIONE / LOGOUT
 *******************************************/
loginBtn.addEventListener("click", async () => {
  try {
    await auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value);
  } catch (err) {
    alert("Errore login: " + err.message);
  }
});

registerBtn.addEventListener("click", async () => {
  try {
    await auth.createUserWithEmailAndPassword(registerEmail.value, registerPassword.value);
  } catch (err) {
    alert("Errore registrazione: " + err.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await auth.signOut();
});

/*******************************************
 * CAMBIO DI STATO (login/logout)
 *******************************************/
auth.onAuthStateChanged(user => {
  if (user) {
    loginContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");
    loadDataFromFirestore(user.uid);
  } else {
    loginContainer.classList.remove("hidden");
    appContainer.classList.add("hidden");
  }
});

/*******************************************
 * CARICAMENTO E SALVATAGGIO SU FIRESTORE
 *******************************************/
async function loadDataFromFirestore(userId) {
  const docRef = db.collection("workHours").doc(userId);
  const docSnap = await docRef.get();
  if (docSnap.exists) {
    const data = docSnap.data();
    Object.keys(data).forEach(dayName => {
      const dayDiv = document.getElementById(dayName);
      if (dayDiv) {
        dayDiv.querySelector(".start-time").value = data[dayName].start || "";
        dayDiv.querySelector(".end-time").value = data[dayName].end || "";
        if (dayDiv.querySelector(".start-time2")) {
          dayDiv.querySelector(".start-time2").value = data[dayName].start2 || "";
        }
        if (dayDiv.querySelector(".end-time2")) {
          dayDiv.querySelector(".end-time2").value = data[dayName].end2 || "";
        }
        dayDiv.style.backgroundColor = data[dayName].color || "#fffa87";
        dayDiv.setAttribute("data-selected-color", data[dayName].color || "#fffa87");
        if (data[dayName].start2 || data[dayName].end2) {
          dayDiv.querySelector(".shift2").classList.remove("hidden");
        }
      }
    });
    updateCalculations();
  }
}

async function saveDataToFirestore(userId, data) {
  await db.collection("workHours").doc(userId).set(data);
}

function saveFirestoreData() {
  const user = auth.currentUser;
  if (!user) return;
  const days = document.querySelectorAll(".post-it");
  const dataToSave = {};
  days.forEach(day => {
    const dayName = day.id;
    const start = day.querySelector(".start-time").value;
    const end = day.querySelector(".end-time").value;
    const start2 = day.querySelector(".start-time2") ? day.querySelector(".start-time2").value : "";
    const end2 = day.querySelector(".end-time2") ? day.querySelector(".end-time2").value : "";
    const color = day.getAttribute("data-selected-color") || "#fffa87";
    dataToSave[dayName] = { start, end, start2, end2, color };
  });
  saveDataToFirestore(user.uid, dataToSave);
}

/*******************************************
 * CALCOLO ORE
 *******************************************/
function calculateHours(start, end) {
  if (!start || !end) return 0;
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  let startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
  }
  return ((endMinutes - startMinutes) / 60).toFixed(2);
}

function updateCalculations() {
  const days = document.querySelectorAll(".post-it");
  let total = 0;
  days.forEach(day => {
    const start = day.querySelector(".start-time").value;
    const end = day.querySelector(".end-time").value;
    const start2 = day.querySelector(".start-time2") ? day.querySelector(".start-time2").value : "";
    const end2 = day.querySelector(".end-time2") ? day.querySelector(".end-time2").value : "";
    const dailyHoursEl = day.querySelector(".daily-hours");
    const hours1 = parseFloat(calculateHours(start, end));
    const hours2 = parseFloat(calculateHours(start2, end2));
    const dailyTotal = (isNaN(hours1) ? 0 : hours1) + (isNaN(hours2) ? 0 : hours2);
    dailyHoursEl.textContent = dailyTotal.toFixed(2);
    total += dailyTotal;
  });
  totalHoursEl.textContent = total.toFixed(2);
  saveFirestoreData();
}

/*******************************************
 * EVENT LISTENERS
 *******************************************/
document.querySelectorAll(".start-time, .end-time, .start-time2, .end-time2")
  .forEach(input => {
    input.addEventListener("change", updateCalculations);
  });

document.querySelectorAll(".color-option").forEach(option => {
  option.addEventListener("click", () => {
    const selectedColor = option.getAttribute("data-color");
    const postIt = option.closest(".post-it");
    postIt.style.backgroundColor = selectedColor;
    postIt.setAttribute("data-selected-color", selectedColor);
    updateCalculations();
  });
});

document.querySelectorAll(".add-shift2").forEach(btn => {
  btn.addEventListener("click", () => {
    const postIt = btn.closest(".post-it");
    const secondShift = postIt.querySelector(".shift2");
    secondShift.classList.toggle("hidden");
  });
});

resetBtn.addEventListener("click", () => {
  if (confirm("Sei sicuro di voler resettare la settimana?")) {
    const user = auth.currentUser;
    if (!user) return;
    db.collection("workHours").doc(user.uid).delete();
    const days = document.querySelectorAll(".post-it");
    days.forEach(day => {
      day.querySelector(".start-time").value = "";
      day.querySelector(".end-time").value = "";
      if(day.querySelector(".start-time2")) {
        day.querySelector(".start-time2").value = "";
      }
      if(day.querySelector(".end-time2")) {
        day.querySelector(".end-time2").value = "";
      }
      day.querySelector(".daily-hours").textContent = "0";
      day.style.backgroundColor = "#fffa87";
      day.setAttribute("data-selected-color", "#fffa87");
      const secondShift = day.querySelector(".shift2");
      if(secondShift) secondShift.classList.add("hidden");
    });
    totalHoursEl.textContent = "0";
  }
});

/*******************************************
 * TOGGLE PER PANNELLI DI AUTENTICAZIONE
 *******************************************/
const showLoginBtn = document.getElementById("show-login");
const showRegisterBtn = document.getElementById("show-register");
const loginPanel = document.getElementById("login-panel");
const registerPanel = document.getElementById("register-panel");

showLoginBtn.addEventListener("click", () => {
  showLoginBtn.classList.add("active");
  showRegisterBtn.classList.remove("active");
  loginPanel.classList.remove("hidden");
  registerPanel.classList.add("hidden");
});

showRegisterBtn.addEventListener("click", () => {
  showRegisterBtn.classList.add("active");
  showLoginBtn.classList.remove("active");
  registerPanel.classList.remove("hidden");
  loginPanel.classList.add("hidden");
});
