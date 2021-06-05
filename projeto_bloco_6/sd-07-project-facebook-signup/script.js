const getForm = document.querySelector('.rightFormInputs');
const getRightSide = document.querySelector('.right-content');
const getFirstName = document.querySelector('#firstName');
const getLastName = document.querySelector('#lastName');
const getPhoneEmail = document.querySelector('#phoneEmail');
const getBirthdate = document.querySelector('#birthdate');
const radioFem = document.querySelector('#gender1');
const radioMas = document.querySelector('#gender2');
const getGender = document.querySelector('#gender3');
const getLoginButton = document.querySelector('#button-login');

const rulesValidate = {
  firstname: {
    required: true,
  },
  lastname: {
    required: true,
  },
  phone_email: {
    required: true,
  },
  password: {
    required: true,
  },
  birthdate: {
    required: true,
  },
  gender: {
    required: true,
  },
};

const messagesValidate = {
  firstname: {
    required: 'Campo inválido',
  },
  lastname: {
    required: 'Campo inválido',
  },
  phone_email: {
    required: 'Campo inválido',
  },
  password: {
    required: 'Campo inválido',
  },
  birthdate: {
    required: 'Campo inválido',
  },
  gender: {
    required: 'Campo inválido',
  },
};

function letItBe() {
  const getError = document.querySelector('#errorMessage');
  if (getError == null) {
    const createElementMessage = document.createElement('p');
    createElementMessage.innerText = 'Campos inválidos';
    createElementMessage.className = 'error';
    createElementMessage.id = 'errorMessage';
    getForm.appendChild(createElementMessage);
  } else {
    getError.remove();
    const createElementMessage = document.createElement('p');
    createElementMessage.innerText = 'Campos inválidos';
    createElementMessage.className = 'error';
    createElementMessage.id = 'errorMessage';
    getForm.appendChild(createElementMessage);
  }
}

function letsDoIt() {
  getRightSide.innerHTML = '';
  const firstNameInput = getFirstName.value;
  const lastNameInput = getLastName.value;
  const phoneEmailInput = getPhoneEmail.value;
  const birthdateInput = getBirthdate.value;
  let genderInput = '';
  if (radioFem.checked === true) { genderInput = 'Feminino'; } else if (radioMas.checked === true) { genderInput = 'Masculino'; } else { genderInput = 'Personalizado'; }
  const createNewElementMessage = document.createElement('p');
  createNewElementMessage.innerHTML = `Olá, ${firstNameInput} ${lastNameInput} \n ${phoneEmailInput} \n ${birthdateInput} \n ${genderInput}`;
  getRightSide.innerHTML = createNewElementMessage.innerHTML;
  getRightSide.classList.add('newRightElement');
}

const helpMePlease = {
  rules: rulesValidate,
  messages: messagesValidate,
  invalidFormCallback: letItBe,
  submitHandler: letsDoIt,
};

window.onload = function () {
  const godSaveMe = new window.JustValidate('.rightFormInputs', helpMePlease);
  return godSaveMe;
};

function clickFormLogin() {
  const getInfoPhoneEmail = document.querySelector('#user-email-phone');
  alert(getInfoPhoneEmail.value);
}

function genderRadio() {
  const getNewGenderCamp = document.querySelector('#newGender');
  const inputGender = document.createElement('input');
  const textBefore = document.querySelector('#facebook-register');
  if (getGender.checked && getNewGenderCamp == null) {
    inputGender.setAttribute('name', 'gender-custom');
    inputGender.setAttribute('class', 'formRight');
    inputGender.setAttribute('id', 'newGender');
    inputGender.setAttribute('placeholder', 'Gênero (opcional)');
    textBefore.parentNode.insertBefore(inputGender, textBefore);
  }
}

function clearNewGender() {
  const getNewGenderCamp = document.querySelector('#newGender');
  if (getNewGenderCamp !== null) {
    getNewGenderCamp.remove();
  }
}

getGender.addEventListener('click', genderRadio);
radioFem.addEventListener('click', clearNewGender);
radioMas.addEventListener('click', clearNewGender);
getLoginButton.addEventListener('click', clickFormLogin);
