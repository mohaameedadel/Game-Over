const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById("btnRegister");
const mode = document.getElementById("mode");

if (localStorage.getItem("data-theme") == "dark") {
  document
    .querySelector("html")
    .setAttribute("data-theme", localStorage.getItem("data-theme"));
  mode.classList.remove("fa-moon");
  mode.classList.add("fa-sun");
} else if (localStorage.getItem("data-theme") == "light") {
  document
    .querySelector("html")
    .setAttribute("data-theme", localStorage.getItem("data-theme"));
  mode.classList.remove("fa-sun");
  mode.classList.add("fa-moon");
}

mode.addEventListener("click", function () {
  theme();
});

function theme() {
  if (document.querySelector("html").getAttribute("data-theme") === "dark") {
    localStorage.setItem("data-theme", "light");
    document
      .querySelector("html")
      .setAttribute("data-theme", localStorage.getItem("data-theme"));
    mode.classList.remove("fa-sun");
    mode.classList.add("fa-moon");
  } else if (
    document.querySelector("html").getAttribute("data-theme") === "light"
  ) {
    localStorage.setItem("data-theme", "dark");
    document
      .querySelector("html")
      .setAttribute("data-theme", localStorage.getItem("data-theme"));
    mode.classList.add("fa-sun");
    mode.classList.remove("fa-moon");
  }
}

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validation(inputs[0]) &&
    validation(inputs[1]) &&
    validation(inputs[2]) &&
    validation(inputs[3]) &&
    validation(inputs[4])
  )
    setForm();
});

function setForm() {
  const user = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };

  regeisterForm(user);
}

async function regeisterForm(userData) {
  const api = await fetch("https://movies-api.routemisr.com/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await api.json();

  if (response.message === "success") {
    location.href = "./index.html";
  } else {
    document.getElementById("msg").innerHTML = Error(
      response.errors?.email.message
    );
    toastr.error(`${response.errors?.email.message}`);
  }


}

inputs.forEach((input) => {
  input.addEventListener("input", function () {
    validation(input);
  });
});
function validation(input) {
  var inputValue = input.value;
  const regex = {
    firstName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    lastName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    age: /^([1-7][0-9]|80)$/,
  };

  if (regex[input.id].test(inputValue)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}
