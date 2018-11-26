export const environment = {
  production: true,
  apiUrl: 'https://desafio-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('desafio-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};

