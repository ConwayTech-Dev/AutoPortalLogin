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
<section class="wrapper">
  <div class="card">
    <p class="wbtxt">Welcome Back!</p>
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</section>
<style>
body{
  margin: 0;
}
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #142648;
  opacity:50%;
}
.card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 1px 4px 16px rgba(0,0,0,.4);
  min-height: 300px;
  min-width: 400px;
  background-color: #fbfbfb;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity:100%;
}
.loader{
   border-radius: 50%;
  position: relative;
  margin: 50px;
  display: inline-block;
  height: 0px;
  width: 0px;
}

.loader span{
    position: absolute;
    display: block;
    background: #ddd;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    top: -20px;
    perspective: 100000px;
}
.loader span:nth-child(1) {
    left:63px;
    animation: bounce2 1s cubic-bezier(0.04, 0.35, 0, 1) infinite;
    animation-delay: 0s;
    background: #f28b00;
}
.loader span:nth-child(2) {
    left:17px;
    animation: bounce2 1s cubic-bezier(0.04, 0.35, 0, 1) infinite;
    animation-delay: .2s;
    background: #142648;
}
.loader span:nth-child(3) {
    left:-27px;
    animation: bounce2 1s cubic-bezier(0.04, 0.35, 0, 1) infinite;
    animation-delay: .4s;
    background: #f28b00;
}
.loader span:nth-child(4) {
    left: -77px;
    animation: bounce2 1s cubic-bezier(0.04, 0.35, 0, 1) infinite;
    animation-delay: .6s;
    background: #142648;
}
.wbtxt{
  font-size: 30px;
  justify-content: center;
  color: #f28b00;
}

@keyframes bounce2 {
    0%, 56%, 100% {
        transform: translateY(0px);
        background: #142648;
    }
    25% {
        transform: translateY(-30px);
        background: #f28b00;
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
console.log("logging in")

  window.onhashchange = function () {
    console.log("window changed")
    console.log(window.location.href)
    if (window.location.href.includes("app#login") || window.location.href.includes("student#login")) {
      document.body.appendChild(loadingDiv);
      window.location.href =
        "https://signin.blackbaud.com/signin/?sessionClear=true&redirectUrl=https:%2F%2Fpolytechnic.myschoolapp.com%2Fapp%3FsvcId%3Dedu%26envId%3Dp-QNcH02hZvE-V-xfBeGIQ4Q%26bb_id%3D1%23login";
    }

      // cueck current url, if it contains "/app/student#studentmyday/progress" we logged in
  if (
    window.location.href.includes("https://polytechnic.myschoolapp.com/app/student#student")
  ) {
    loadingDiv.remove();
    console.log("logged in");
  }
  };
  if (window.location.href.includes("app#login") || window.location.href.includes("student#login")) {
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


});


