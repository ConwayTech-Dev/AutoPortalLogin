function waitForElm(selector) {
  console.log("checking " + selector);
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

async function check() {
  //   const userField = await waitForElm("#Username");
  //   userField.value = "jhsieh25@students.polytechnic.org";
  //   await waitForElm("#nextBtn");
  // document.getElementById("nextBtn").click()
}
let loadingDiv = document.createElement("div");
loadingDiv.innerHTML = `
<section>
<h2 class="splashText">Welcome back!</h2>
</section>
<div class="lol">
<section>
<div></div>
<div></div>
<div></div>
<div></div>
</section>
</div>
<style>
.lol {
    transform: scale(0.5)
}
.lol *, *::before, *::after {
    background-color: #ADC4CE;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.splashText {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 2rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.1rem !important;
    text-align: center !important;
    all: unset;
}

.lol body {
align-items: center;
display: flex;
height: 100vh;
justify-content: center;
}

.lol section {
align-items: center;
display: flex;
flex-wrap: wrap;
height: 400px;
justify-content: space-evenly;
width: 400px;
}

.lol div {
height: 200px;
width: 200px;
position: relative;
}

.lol div:nth-of-type(1) {
background-color: #EF9595;
animation: okret1 2000ms linear;
z-index: 4;
}

@keyframes okret1 {
12.5% {
transform: translate(200px, 0) ;
}
25% {
transform: translate(200px, 200px) ;
}
37.5% {
transform: translate(0, 200px) ;
}
50% {
transform: translate(0, 0) ;
}
62.5% {
transform: translate(0, 200px) ;
}
75% {
transform: translate(200px, 200px) ;
}
87.5% {
transform: translate(200px, 0) ;
}
100% {
transform: translate(0, 0) ;
}

}

.lol div:nth-of-type(2) {
background-color: #EFB495;
animation: okret2 1500ms linear 250ms;
z-index: 3;
}

@keyframes okret2 {
16.66% {
transform: translate(0, 200px) ;
}
33.32% {
transform: translate(-200px, 200px) ;
}
49.98% {
transform: translate(-200px, 0) ;
}
66.64% {
transform: translate(-200px, 200px) ;
}
83.30% {
transform: translate(0, 200px) ;
};
100% {
transform: translate(0, 0) ;
}
}

.lol div:nth-of-type(4) {
background-color: #EFD595;
animation: okret3 1000ms linear 500ms;
z-index: 2;
}

@keyframes okret3 {
25% {
transform: translate(-200px, 0) ;
}
50% {
transform: translate(-200px, -200px) ;
}
75% {
transform: translate(-200px, 0) ;
};
100% {
transform: translate(0, 0) ;
}
}

.lol div:nth-of-type(3) {
background-color: #EBEF95;
animation: okret4 500ms linear 750ms;
z-index: 1;
}

@keyframes okret4 {
50% {
transform: translate(0, -200px) ;
}
100% {
transform: translate(0, 0) ;
}
} 
</style>
`;
loadingDiv.style.all = "unset";
loadingDiv.style.position = "fixed";
loadingDiv.style.top = "0";
loadingDiv.style.left = "0";
loadingDiv.style.width = "100vw";
loadingDiv.style.height = "100vh";
loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
loadingDiv.style.color = "white";
loadingDiv.style.display = "flex";
loadingDiv.style.justifyContent = "center";
loadingDiv.style.alignItems = "center";
loadingDiv.style.zIndex = "1000000"; // high enough to overlay the entire content
document.addEventListener("DOMContentLoaded", async function (event) {

  window.onhashchange = function () {
    if (window.location.href.includes("app#login")) {
      document.body.appendChild(loadingDiv);
      window.location.href =
        "https://signin.blackbaud.com/signin/?sessionClear=true&redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login";
    }
  };
  if (window.location.href.includes("app#login")) {
    document.body.appendChild(loadingDiv);
    window.location.href =
      "https://signin.blackbaud.com/signin/?sessionClear=true&redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login";
  } else if (window.location.href.includes("app.blackbaud.com/signin")) {
    document.body.append(loadingDiv);
    await waitForElm(".spa-auth-button-full");
    document.getElementsByClassName("spa-auth-button-full")[0].click();
  } else if (
    window.location.href.includes(
      "https://accounts.google.com/o/oauth2/auth"
    ) &&
    window.location.href.includes("bbid.blackbaud.com")
  ) {
    document.body.append(loadingDiv);
    console.log("waiting for element to load");
    setTimeout(() => {

      // find all elements with [authuser] field and loop over them checking text content
      let authUsers = document.querySelectorAll('[data-authuser]');
      console.log(authUsers);
      for (let i = 0; i < authUsers.length; i++) {
        if (authUsers[i].innerText.includes("students.polytechnic.org")) {
          authUsers[i].click();
          break;
        }
      }


    }, 450);
  }

  // cueck current url, if it contains "/app/student#studentmyday/progress" we logged in
  if (
    window.location.href.includes("https://polytechnic.myschoolapp.com/app")
  ) {
    loadingDiv.remove();
    console.log("logged in");
  }
});


