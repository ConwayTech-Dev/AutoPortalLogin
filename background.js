// background.js
let showingSplashScreen = false;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action == "showSplashScreen") {
    // Show your full-page splash screen here.
    // You can create a new HTML page for the splash screen or use a library like Bootstrap modal.
    // For demonstration purposes, we'll display a simple alert.
    console.log("Splash screen . Handle OAuth flow and auto-login.");
    showingSplashScreen = true;

    sendResponse("showTrue");
    // return a promise to the content script
    return new Promise((resolve, reject) => {
      console.log("promise returned");
      resolve("showTrue");
    }); 
  } 
  
  
  else if (message.action === "login") {
    // Implement your login logic here.
    // You would typically handle OAuth token exchange and user authentication in this section.
    // This example only shows a message for demonstration.
    console.log("Auto-logged in!");
  }
  console.log("message received")

  // return a promise to the content script
  return new Promise((resolve, reject) => {
    console.log("promise returned");
    resolve(true);
  });
  
});
console.log("background.js loaded")