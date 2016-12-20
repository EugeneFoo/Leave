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

    function findController(name, controllers) {
        var result = $.grep(controllers, function (item, index) {
            return item.controller.name == name;
        });
        return result.length ? result[0].controller : null;
    }

    var layoutSet = [];
    layoutSet.push.apply(layoutSet, DevExpress.framework.html.layoutSets["navbar"]);
    layoutSet.push.apply(layoutSet, DevExpress.framework.html.layoutSets["empty"]);

    Leave.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Leave,
        layoutSet: layoutSet,
        navigation: Leave.config.navigation,
        commandMapping: Leave.config.commandMapping
    });
    Leave.app.router.register(":view/:id", { view: "login", id: undefined });
    Leave.app.on("navigatingBack", onNavigatingBack);
    Leave.app.on("resolveLayoutController", function (args) {
        if (args.viewInfo.viewName == 'login') {
            args.layoutController = findController('empty', args.availableLayoutControllers);
        }
    });
    Leave.app.navigate();
});
