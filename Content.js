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
    const userField = await waitForElm("#Username")
    userField.value = "asingh25@students.polytechnic.org"
    await waitForElm("#nextBtn")
    document.getElementById("nextBtn").click()
}

check()
