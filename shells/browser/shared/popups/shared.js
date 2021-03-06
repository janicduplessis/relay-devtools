/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* globals chrome */

document.addEventListener('DOMContentLoaded', function() {
  // Make links work
  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    (function() {
      const ln = links[i];
      const location = ln.href;
      ln.onclick = function() {
        chrome.tabs.create({ active: true, url: location });
      };
    })();
  }

  // Work around https://bugs.chromium.org/p/chromium/issues/detail?id=428044
  document.body.style.opacity = 0;
  document.body.style.transition = 'opacity ease-out .4s';
  requestAnimationFrame(function() {
    document.body.style.opacity = 1;
  });
});
