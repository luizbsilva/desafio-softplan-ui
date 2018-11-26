export const environment = {
  production: false,
  apiUrl: 'http://localhost:8082',

  tokenWhitelistedDomains: [ new RegExp('localhost:8082') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
