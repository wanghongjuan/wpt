// META: script=/service-workers/service-worker/resources/test-helpers.sub.js
// META: script=resources/utils.js
'use strict';

// Covers functionality provided by BackgroundFetchUpdateEvent.updateUI().
//
// https://wicg.github.io/background-fetch/#backgroundfetchupdateuievent

const updateUIParams = {
  title: 'New Title!',
};

backgroundFetchTest(async (test, backgroundFetch) => {
  const registrationId = uniqueId();
  const registration =
      await backgroundFetch.fetch(registrationId, 'resources/feature-name.txt');
  assert_equals(registration.id, registrationId);

  const message = await getMessageFromServiceWorker();
  assert_equals(message.update, 'update success');

}, 'Background Fetch updateUI resolves', [updateUIParams]);


backgroundFetchTest(async (test, backgroundFetch) => {
  const registrationId = uniqueId();
  const registration =
      await backgroundFetch.fetch(registrationId, 'resources/feature-name.txt');
  assert_equals(registration.id, registrationId);

  const message = await getMessageFromServiceWorker();
  assert_equals(message.update, 'updateUI was already called.');

}, 'Background Fetch updateUI called twice fails', [updateUIParams, updateUIParams]);
