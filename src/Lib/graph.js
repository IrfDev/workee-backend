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
        console.log('Notebooks usecases', notebooks);

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