import * as Keycloak from 'keycloak-js'

const keycloakConfig = {
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
  redirectUri: window.location.href
}

export const keycloakService = new Keycloak(keycloakConfig)
