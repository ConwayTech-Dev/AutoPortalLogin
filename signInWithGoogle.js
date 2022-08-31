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
    await waitForElm(".spa-auth-button-full")
    document.getElementsByClassName("spa-auth-button-full")[0].click();
}

check()
