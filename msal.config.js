export const MsalConfig  = {
    auth: {
        clientId: "5158098e-5e6a-429e-b237-0279cb105419",
        authority: "https://login.microsoftonline.com/cf94ad9d-2983-43f5-9909-722602ea2165",
        redirectUri: `${window.location.origin}`,
        clientCapabilities: ['CP1'],
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
}

export const MsalScopes = {
    scopes: ["api://0dc03e47-7df4-49dc-98be-361558e225eb/.default"]
}