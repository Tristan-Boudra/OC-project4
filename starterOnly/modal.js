function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const modalSucces = document.querySelector(".succes-form");

// launch modal event
modalBtn.forEach((btn) =>
  btn.addEventListener("click", function () {
    modalSucces.style.display = "none";
    launchModal();
  })
);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal
function closeModal() {
  modalbg.style.display = "none";
}

// Display error message
function displayError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector(".error");
  small.innerText = message;
  small.style.display = "block";
  input.classList.add("error-input");
}

// Clear error message
function clearError(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector(".error");
  small.style.display = "none";
  input.classList.remove("error-input");
}

// Display thankyou message
function displayThankYouMessage() {
  const modalBody = document.querySelector(".modal-body");
  modalBody.style.display = "none";

  modalSucces.style.display = "flex";

  const btnSuccess = document.getElementById("btn-succes");
  btnSuccess.addEventListener("click", function () {
    closeModal();
    form.submit();
    form.reset();
    modalSucces.style.display = "none";
  });
}

// Check if the form is valid
let checkFirst = false;
let checkLast = false;
let checkDate = false;
let checkEmail = false;
let checkConcour = false;
let checkCondition = false;

const form = document.querySelector("form[name=reserve]");

function validateName() {
  console.log(form.first);
  const name = form.first.value;
  const errorFirst = document.getElementById("firstname-error");
  const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

  if (regexName.test(name)) {
    form.first.style.border = "none";
    clearError(errorFirst);
    return true;
  } else {
    form.first.style.border = "2px solid red";
    displayError(
      errorFirst,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom",
    );
    return false;
  }
}

function validateLastName() {
  const last = form.last.value;
  const errorLast = document.getElementById("lastname-error");
  const regexLast = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

  if (regexLast.test(last)) {
    form.last.style.border = "none";
    clearError(errorLast);
    return true;
  } else {
    form.last.style.border = "2px solid red";
    displayError(
      errorLast,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom",
    );
    return false;
  }
}

function validateDateOfBirth() {
  const date = form.birthdate.value;
  const errorDate = document.getElementById("birthdate-error");
  const regexDate = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  // Calculate the date 18 years ago
  function getDate18YearsAgo() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today;
  }

  const userDate = new Date(date);
  const date18YearsAgo = getDate18YearsAgo();

  if (regexDate.test(date) && userDate <= date18YearsAgo) {
    form.birthdate.style.border = "none";
    clearError(errorDate);
    return true
  } else {
    form.birthdate.style.border = "2px solid red";
    displayError(
      errorDate,
      "Veuillez entrer une date valide (plus de 18 ans).",
    );
    return false
  }
}

function validateEmail() {
  const email = form.email.value;
  const errorEmail = document.getElementById("email-error");
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regexEmail.test(email)) {
    form.email.style.border = "none";
    clearError(errorEmail);
    return true
  } else {
    form.email.style.border = "2px solid red";
    displayError(errorEmail, "Veuillez entrer une adresse email valide");
    return false
  }
}

// Function to validate the quantity
function validateQuantity() {
  const concour = form.quantity.value;
  const errorQuantity = document.getElementById("quantity-error");
  const regexConcour = /^(?:[0-9]|[1-9][0-9])$/;

  if (regexConcour.test(concour)) {
    form.quantity.style.border = "none";
    clearError(errorQuantity);
    return true
  } else {
    form.quantity.style.border = "2px solid red";
    displayError(errorQuantity, "Veuillez entrer un nombre valide");
    return false
  }
}

function validateLocation() {
  const boutonsRadio = document.querySelectorAll('input[name="location"]');
  const errorLocation = document.getElementById("location-error");

  let checkboxChecked = false;

  for (const boutonRadio of boutonsRadio) {
    if (boutonRadio.checked) {
      clearError(errorLocation);
      checkboxChecked = true;
      return true
    }
  }

  if (!checkboxChecked) {
    displayError(errorLocation, "Vous devez choisir une option");
    return false
  }
}

const boutonsRadio = document.querySelectorAll('input[name="location"]');
for (const boutonRadio of boutonsRadio) {
  boutonRadio.addEventListener("change", validateLocation);
}

// Function to validate the acceptance of conditions
function validateCondition() {
  const conditionForm = document.getElementById("checkbox1");
  const errorCondition = document.getElementById("checkbox-condition");

  if (conditionForm.checked) {
    clearError(errorCondition);
    return true
  } else {
    displayError(
      errorCondition,
      "Vous devez accepter les conditions d'utilisation"
    );
    return false
  }
}

form.first.addEventListener("input", validateName);
form.last.addEventListener("input", validateLastName);
form.birthdate.addEventListener("input", validateDateOfBirth);
form.email.addEventListener("input", validateEmail);
form.quantity.addEventListener("input", validateQuantity);
const conditionForm = document.getElementById("checkbox1");
conditionForm.addEventListener("change", validateCondition);

function isFormValid() {
  let checkFirst = validateName();
  let checkLast = validateLastName();
  let checkDate = validateDateOfBirth();
  let checkEmail = validateEmail();
  let checkConcour = validateQuantity();
  let checkLocation = validateLocation();
  let checkCondition = validateCondition();

  return (
    checkFirst &&
    checkLast &&
    checkDate &&
    checkEmail &&
    checkConcour &&
    checkLocation &&
    checkCondition
  );
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (isFormValid()) {
    displayThankYouMessage();
  }
});
