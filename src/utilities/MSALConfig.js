export const MSALConfig  = {
    auth: {
        clientId: "aabcccce-2050-4325-8963-593f5441a728",
        authority: "https://login.microsoftonline.com/cf94ad9d-2983-43f5-9909-722602ea2165",
        redirectUri: "http://localhost:1388",
        knownAuthorities: [
            "https://login.microsoftonline.com/6fee3e9d-c90a-44ee-b784-9d0c463a4952",
            "api://6fee3e9d-c90a-44ee-b784-9d0c463a4952/access_as_user"
        ]
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    }
}

export const MSALScopes = {
    scopes: ["api://6fee3e9d-c90a-44ee-b784-9d0c463a4952/.default"]
}
