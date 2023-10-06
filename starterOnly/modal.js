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

function validate(event) {
  // Prevent form submission
  event.preventDefault();

  // Get form values
  const name = form.first.value;
  const last = form.last.value;
  const email = form.email.value;
  const concour = form.quantity.value;


  // Validate name
  const regexName = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

  // Validate last
  const regexLast = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;

  // Validate email
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Validate concour
  const regexConcour = /^(?:[0-9]|[1-9][0-9])$/;

  // Validate radio button
  const boutonsRadio = document.querySelectorAll('input[name="location"]');

  // Verify if the form is valid
  let checkboxChecked = false;

  for (const boutonRadio of boutonsRadio) {
    if (boutonRadio.checked) {
      checkboxChecked = true;
      break; // Exit the loop
    }
  }

  // Validate condition of the form
  const conditionForm = document.getElementById("checkbox-condition");

  // If the form is valid, submit it
  if (
    regexName.test(name) &&
    regexLast.test(last) &&
    regexEmail.test(email) &&
    regexConcour.test(concour) &&
    checkboxChecked &&
    conditionForm.checked
  ) {
    alert("Form submitted");
    form.submit();
  }
  else {
    alert("Form not submitted");
  }
}
