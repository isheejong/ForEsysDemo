var mcs_config = {
    "logLevel": "",
    "logHTTP": true,
    "mobileBackends": {
        "ForEsys": {
            "authType": "basicAuth",
            "default": true,
            "baseUrl": "https://mcs-gse00011678.mobileenv.us2.oraclecloud.com:443",
            "applicationKey": "",
            "analytics": {
                "location": true
            },
            "authorization": {
                "basicAuth": {
                    "backendId": "4af80197-2907-45f5-9e0e-e6728b1723fb",
                    "anonymousToken": "R1NFMDAwMTE2NzhfTUNTX01PQklMRV9BTk9OWU1PVVNfQVBQSUQ6Smk3cXBld3lrczlfbmI="
                },
                "oAuth": {
                    "clientId": "23b09985-be99-44b8-b791-5ecd8e9608c0",
                    "clientSecret": "rIRghSFFgtZuixuIGoL9",
                    "tokenEndpoint": "https://gse00011678.identity.us.oraclecloud.com/oam/oauth2/tokens"
                },
                "facebookAuth": {
                    "facebookAppId": "YOUR_FACEBOOK_APP_ID",
                    "backendId": "YOUR_BACKEND_ID",
                    "anonymousToken": "YOUR_BACKEND_ANONYMOUS_TOKEN"
                },
                "ssoAuth": {
                    "clientId": "YOUR_CLIENT_ID",
                    "clientSecret": "YOUR_ClIENT_SECRET",
                    "tokenEndpoint": "YOUR_TOKEN_ENDPOINT"
                },
                "tokenAuth": {
                    "backendId": "YOUR_BACKEND_ID"
                }
            }
        }
    },
    // "sync": {
    //   "periodicRefreshPolicy": "PERIODIC_REFRESH_POLICY_REFRESH_NONE",
    //   "policies": [
    //     {
    //       "path": '/mobile/custom/firstApi/tasks',
    //       "fetchPolicy": 'FETCH_FROM_SERVICE_ON_CACHE_MISS'
    //     },
    //     {
    //       "path": '/mobile/custom/secondApi/tasks',
    //     }
    //   ]
    // },
    "syncExpress": {
        "handler": "OracleRestHandler",
        "policies": [
            {
                "path": '/mobile/custom/test/approveList/:id?'
            }
        ]
    }

};