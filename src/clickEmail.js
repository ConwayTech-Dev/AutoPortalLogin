function waitForElm(selector) {
    console.log("checking " + selector)
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

async function check() {
    console.log("waiting for element to load")
    setTimeout(() => {
        console.log("finding and selecting oaiuth button")
        document.querySelectorAll('[data-authuser="1"]')[0].click()


    }, 3000)

}


// let loadingDiv = document.createElement('div');
// loadingDiv.innerHTML = 'Loading...';
// loadingDiv.style.all = 'unset';
// loadingDiv.style.position = 'fixed';
// loadingDiv.style.top = '0';
// loadingDiv.style.left = '0';
// loadingDiv.style.width = '100vw';
// loadingDiv.style.height = '100vh';
// loadingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
// loadingDiv.style.color = 'white';
// loadingDiv.style.display = 'flex';
// loadingDiv.style.justifyContent = 'center';
// loadingDiv.style.alignItems = 'center';
// loadingDiv.style.zIndex = '1000000';  // high enough to overlay the entire content
// document.addEventListener("DOMContentLoaded", function(event) {
//     document.body.appendChild(loadingDiv);
//     console.log("loading div added")

//     check()
// });


// chrome.runtime.sendMessage({ action: "showingSplashScreen" }, function(response) {
//   console.log(response);
// });
// console.log("message sent")