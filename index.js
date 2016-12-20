window.Leave = window.Leave || {};

$(function() {
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });
    // To customize the Generic theme, use the DevExtreme Theme Builder (http://js.devexpress.com/ThemeBuilder)
    // For details on how to use themes and the Theme Builder, refer to the http://js.devexpress.com/Documentation/Guide/#themes article

    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        if(window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });
    });

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !Leave.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "android":
                navigator.app.exitApp();
                break;
            case "win":
                MSApp.terminateApp('');
                break;
        }
    }

    Leave.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Leave,
        layoutSet: DevExpress.framework.html.layoutSets[Leave.config.layoutSet],
        navigation: Leave.config.navigation,
        commandMapping: Leave.config.commandMapping
    });
    Leave.app.router.register(":view/:id", { view: "login", id: undefined });
    Leave.app.on("navigatingBack", onNavigatingBack);
    Leave.app.navigate();
});
