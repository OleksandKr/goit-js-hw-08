import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

recordData();
let dataForm = {};

function recordData() {
  try {
    const data = localStorage.getItem(LOCAL_KEY);
    if (!data) return;
    dataForm = JSON.parse(data);
    Object.entries(dataForm).forEach(([key, value]) => {
      form[key].value = value;
    });
  } catch (e) {
    console.log(e.message);
  }
};

function onInputData(e) {
  const { name, value } = e.target;
  dataForm[name] = value.trim();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
};

function onFormSubmit(e) {
  e.preventDefault();

  console.log(dataForm);
  dataForm = {};
  localStorage.removeItem(LOCAL_KEY);
  e.currentTarget.reset();
};

