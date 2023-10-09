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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

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

// validate form
const form = document.querySelector("form[name=reserve]");
form.addEventListener("submit", validate);

// Display error message
function displayError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector(".error");
  // formControl.className = "error";
  small.innerText = message;
  small.style.display = "block";
}

// Clear error message
function clearError(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector(".error");
  small.style.display = "none";
}

// Display thankyou message
function displayThankYouMessage() {
  const thankyouMessage = document.querySelector(".thankyou");
  thankyouMessage.style.display = "block";
}

function validate(event) {
  // Prevent form submission
  event.preventDefault();

  // Get form values
  const name = form.first.value;
  const last = form.last.value;
  const date = form.birthdate.value;
  const email = form.email.value;
  const concour = form.quantity.value;

  // Check if the form is valid
  let checkFirst = false;
  let checkLast = false;
  let checkDate = false;
  let checkEmail = false;
  let checkConcour = false;
  let checkCondition = false;


  // Validate name
  const errorFirst = document.getElementById("firstname-error");
  const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

  if(regexName.test(name)) {
    checkFirst = true;
    clearError(errorFirst);
  }
  else {
    checkFirst = false;
    displayError(errorFirst, "Veuillez entrer 2 caractères ou plus pour le champ du prénom");
  }

  // Validate last
  const errorLast = document.getElementById("lastname-error");
  const regexLast = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

  if(regexLast.test(last)) {
    checkLast = true;
    clearError(errorLast);
  }
  else{
    checkLast = false;
    displayError(errorLast, "Veuillez entrer 2 caractères ou plus pour le champ du nom");
  }

  // Validate date
  const errorDate = document.getElementById("birthdate-error");
  const regexDate = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if(regexDate.test(date)) {
    checkDate = true;
    clearError(errorDate);
  }
  else{
    checkDate = false;
    displayError(errorDate, "Veuillez entrer une date valide");
  }

  // // Validate email
  const errorEmail = document.getElementById("email-error");
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if(regexEmail.test(email)) {
    checkEmail = true;
    clearError(errorEmail);
  }
  else{
    checkEmail = false;
    displayError(errorEmail, "Veuillez entrer une adresse email valide");
  }

  // // Validate concour
  const errorQuantity = document.getElementById("quantity-error");
  const regexConcour = /^(?:[0-9]|[1-9][0-9])$/;

  if(regexConcour.test(concour)) {
    checkConcour = true;
    clearError(errorQuantity);
  }
  else{
    checkConcour = false;
    displayError(errorQuantity, "Veuillez entrer un nombre valide");
  }

  // // Validate radio button
  const errorLocation = document.getElementById("location-error");
  const boutonsRadio = document.querySelectorAll('input[name="location"]');

  // // Verify if the form is valid
  let checkboxChecked = false;

  for (const boutonRadio of boutonsRadio) {
    if (boutonRadio.checked) {
      checkboxChecked = true;
      clearError(errorLocation);
      break; // Exit the loop
    }
    else {
      checkboxChecked = false;
      displayError(errorLocation, "Vous devez choisir une option");
    }
  }

  // Validate condition of the form
  const errorCondition = document.getElementById("checkbox-condition");
  const conditionForm = document.getElementById("checkbox1");

  if(conditionForm.checked) {
    checkCondition = true;
    clearError(errorCondition);
  }
  else{
    checkCondition = false;
    displayError(errorCondition, "Vous devez accepter les conditions d'utilisation");
  }

  // If the form is valid, submit it
  if (
    checkFirst &&
    checkLast &&
    checkDate &&
    checkEmail &&
    checkConcour &&
    checkboxChecked &&
    checkCondition
    ) {
      displayThankYouMessage();
      setTimeout(function () {
        closeModal();
        form.submit();
      }, 3000);
  }
}
