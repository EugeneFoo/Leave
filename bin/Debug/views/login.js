Leave.login = function (params) {
    "use strict";
    
    var authority = "https://login.windows.net/common";
    var redirectUri = "http://leave";
    //var resourceUri = "https://graph.windows.net";
    var resourceUri = "https://graph.microsoft.com";
    var clientId = "96f973d5-128e-46cf-80a9-e84fcf927fc7";


    var viewModel = {

        token: ko.observable(''),
        expiredate: ko.observable(''),
        tokenval: ko.observable(''),

        // Shows user authentication dialog if required.
        login: function (authCompletedCallback) {
          
           
            var authContext = new Microsoft.ADAL.AuthenticationContext(authority);
            authContext.tokenCache.readItems().then(function (items) {
                if (items.length > 0) {
                    authority = items[0].authority;
                    authContext = new Microsoft.ADAL.AuthenticationContext(authority);
                }
                // Attempt to authorize user silently
                authContext.acquireTokenSilentAsync(resourceUri, clientId)
                .then(authCompletedCallback, function () {
                    // We require user credentials so triggers authentication dialog
                    authContext.acquireTokenAsync(resourceUri, clientId, redirectUri)
                    .then(function(authResponse) {

                        viewModel.token(authResponse.accessToken);
                        viewModel.expiredate(authResponse.expiresOn);
                        viewModel.tokenval(JSON.stringify(authResponse));

                        var client = MicrosoftGraph.Client.init({
                            authProvider: function(done) {
                                done(null, authResponse.accessToken);
                            }
                        });

                        client
                         .api('/me')
                         .select("displayName")
                         .get((err, res) => {
                             if (err) {
                                 alert(JSON.stringify(err));
                                 return;
                             }
                             alert(res);
                         });


                    }, function(err) {
                        DevExpress.ui.notify("Failed to authenticate: " + err, 'error', 3000);
                      
                    });
                });
            });

        },

        viewShown: function () {

        }
    };

    return viewModel;
};