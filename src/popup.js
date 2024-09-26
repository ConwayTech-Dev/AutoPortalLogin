
        document.addEventListener('DOMContentLoaded', function() {
            const autoFilterToggle = document.getElementById('autoFilterToggle');
            const oldAssignmentCenterToggle = document.getElementById('oldAssignmentCenterToggle');
            const autoLoginToggle = document.getElementById('autoLoginToggle');

            // Load saved settings
            chrome.storage.sync.get(['autoFilter', 'oldAssignmentCenter', 'autoLogin'], function(result) {
                autoFilterToggle.checked = result.autoFilter || false;
                oldAssignmentCenterToggle.checked = result.oldAssignmentCenter || false;
                autoLoginToggle.checked = result.autoLogin || false;
            });

            // Save settings when toggled
            autoFilterToggle.addEventListener('change', function() {
                chrome.storage.sync.set({autoFilter: this.checked});
                updateContentScript();
            });

            oldAssignmentCenterToggle.addEventListener('change', function() {
                chrome.storage.sync.set({oldAssignmentCenter: this.checked});
                updateContentScript();
            });

            autoLoginToggle.addEventListener('change', function() {
                chrome.storage.sync.set({autoLogin: this.checked});
                console.log("autoLogin: " + this.checked);
                updateContentScript();
            });

            function updateContentScript() {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "updateSettings",
                        autoFilter: autoFilterToggle.checked,
                        oldAssignmentCenter: oldAssignmentCenterToggle.checked,
                        autoLogin: autoLoginToggle.checked
                    });
                });
            }
        });