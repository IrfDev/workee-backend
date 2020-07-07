// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

module.exports = {
    getUserDetails: async function(accessToken) {
        const client = getAuthenticatedClient(accessToken);

        const user = await client.api('/me').get();
        return user;
    },

    // <GetEventsSnippet>
    getEvents: async function(accessToken) {
        const client = getAuthenticatedClient(accessToken);

        const events = await client.api('/me/events').get();

        return events;
    },

    getNotebooks: async function(accessToken) {
        const client = getAuthenticatedClient(accessToken);
        const notebooks = await client.api('/me/onenote/notebooks').get();

        return notebooks;
    },

    getNotebookById: async function(accessToken, id) {
        const client = getAuthenticatedClient(accessToken);
        const notebooks = await client.api(`/me/onenote/notebooks/${id}`).get();

        return notebooks;
    },

    getSections: async function(accessToken, notebookId) {
        const client = getAuthenticatedClient(accessToken);
        const notebooks = await client
            .api(`/me/onenote/notebooks/${notebookId}/sectionGroups`)
            .get();

        return notebooks;
    },

    getSectionById: async function(accessToken, sectionId) {
        const client = getAuthenticatedClient(accessToken);
        const notebooks = await client
            .api(`/me/onenote/sectionGroups/${sectionId}`)
            .get();

        return notebooks;
    },
    // </GetEventsSnippet>
};

function getAuthenticatedClient(accessToken) {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: (done) => {
            done(null, accessToken);
        },
    });

    return client;
}