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
        document.querySelectorAll('[data-authuser="8"]')[0].click()


    }, 1000)

}

check()
