let source = null;
let updateUIParams = [];

async function getFetchResult(settledFetch) {
  if (!settledFetch.response)
    return Promise.resolve(null);

  return {
    url: settledFetch.response.url,
    status: settledFetch.response.status,
    text: await settledFetch.response.text(),
  };
}

async function getResults(event) {
  return event.fetches.values()
    .then(fetches => Promise.all(fetches.map(fetch => getFetchResult(fetch))))
}

async function updateUI(event) {
  if (!updateUIParams.length)
    return 'no update';

  return Promise.all(updateUIParams.map(param => event.updateUI(param)))
           .then(() => 'update success')
           .catch(e => e.message);
}

self.addEventListener('message', event => {
  updateUIParams = event.data;
  source = event.source;
  source.postMessage('ready');
});

self.addEventListener('backgroundfetched', event => {
  event.waitUntil(
    Promise.all([getResults(event), updateUI(event)])
      .then(([results, update]) => source.postMessage({ type: event.type, results, update})))
});
