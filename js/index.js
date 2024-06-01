const inputs = document.querySelectorAll("input");
const btnLogin = document.getElementById("btnLogin");
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
  if (validation(inputs[0]) && validation(inputs[1])) setForm();
});

function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };

  regeisterForm(user);
}

async function regeisterForm(userData) {
  const api = await fetch("https://movies-api.routemisr.com/signin", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await api.json();

  if (response.message === "success") {
    localStorage.setItem("token", response.token);
    location.href = "./home.html";
  } else {
    document.getElementById("msg").innerHTML = response.message;
    toastr.error(`${response.message}`);
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
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
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



