let gameData = document.getElementById("gameData");
var loader = document.querySelector(".loading");
const mode = document.getElementById("mode");

toastr.success("Login Done")

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









getGames("mmorpg");

document.querySelector(".logout-btn").addEventListener("click", function () {
  localStorage.removeItem("token");
  location.href = "./index.html";
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");
    getGames(link.getAttribute("data-category"));
  });
});

async function getGames(dataAttribute) {
  loader.classList.remove("d-none");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1dff992777msh8255546dec493dfp1d31b8jsn65ad44c7732e",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${dataAttribute}`,
    options
  );

  const response = await api.json();

  displayData(response);

  loader.classList.add("d-none");
}

function displayData(response) {
  let cartona = "";
  response.forEach((game) => {
    let videoPath = game.thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    cartona += `
    <div class="col">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${game.id})" class="card h-100 bg-transparent" role="button">
          <div class="card-body">

            <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src="${game.thumbnail}">

              <video muted="true" preload="none" loop="" class="w-100 h-100 position-absolute top-0 start-0 z-3 d-none">
              <source src="${videoPath}">
              </video>

            </figure>

            <figcaption>

                <div class="hstack justify-content-between">
                  <h3 class="h6 small">${game.title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
                </div>

                <p class="card-text small text-center opacity-50">
                  ${game.short_description}
                </p>

            </figcaption>
          </div>

          <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color">${game.genre}</span>
            <span class="badge badge-color">${game.platform}</span>

          </footer>
      </div>
    </div>`;
  });

  gameData.innerHTML = cartona;
}

function startVideo(event) {
  let video = event.target.querySelector("video");
  video.classList.remove("d-none");
  video.muted = true;
  video.play();
}

function stopVideo(event) {
  let video = event.target.querySelector("video");
  video.classList.add("d-none");
  video.muted = true;
  video.pause();
}

function showDetails(id) {
  location.href = `./details.html?id=${id}`;
}
