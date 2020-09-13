var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

/* First of all you have to made a login request to the client before get any resource. 
The forwards requests it'll be avoided
*/

module.exports = {
  getUserDetails: async function (accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
  },

  getEvents: async function (accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const events = await client.api('/me/events').get();

    return events;
  },

  getNotebooks: async function (accessToken) {
    const client = getAuthenticatedClient(accessToken);
    const notebooks = await client.api('/me/onenote/notebooks').get();

    return notebooks;
  },

  getNotebookById: async function (accessToken, id) {
    const client = getAuthenticatedClient(accessToken);
    const notebooks = await client.api(`/me/onenote/notebooks/${id}`).get();
    return notebooks;
  },

  getSections: async function (accessToken, notebookId) {
    const client = getAuthenticatedClient(accessToken);
    const notebooks = await client
      .api(`/me/onenote/notebooks/${notebookId}/sectionGroups`)
      .get();
    console.log('[Finished] Usecase graph:', notebooks);

    return notebooks;
  },

  getSectionById: async function (accessToken, sectionId) {
    const client = getAuthenticatedClient(accessToken);
    const notebooks = await client
      .api(`/me/onenote/sectionGroups/${sectionId}`)
      .get();

    return notebooks;
  },
};

function getAuthenticatedClient(accessToken) {
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  return client;
}
