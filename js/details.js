const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const id = params.get("id");
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


(async function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1dff992777msh8255546dec493dfp1d31b8jsn65ad44c7732e",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await api.json();

  displayData(response);
})();

function displayData(resopnse) {
  let detailsData = `
  
     <div class="col-md-4">
     <figure>
        <img src="${resopnse.thumbnail}" class="w-100" alt="details image">
     </figure>
  </div>
  <div class="col-md-8">
  
     <div>
        <nav aria-label="breadcrumb">
           <ol class="breadcrumb">
              <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
              <li class="breadcrumb-item text-info" aria-current="page">${resopnse.title}</li>
           </ol>
        </nav>
  
        <h1>${resopnse.title}</h1>
  
        <h3>About ${resopnse.title}</h3>
        <p>${resopnse.description}</p>
  
        
     </div>
  </div>
  
  `;

  document.getElementById("detailsData").innerHTML = detailsData;
  const backgroundUrl = resopnse.thumbnail.replace("thumbnail", "background");
  document.body.style.cssText = `
  background-image: url(${backgroundUrl});
   background-size: cover; 
   background-position: center center;`;
}
