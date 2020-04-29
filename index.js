/*
 * Copyright (c) 2020 Tobias Briones.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ------------------------------  UI MANAGER  ------------------------------ //
function UIManager() {
  // -----------------------------  CALLBACKS  ------------------------------ //
  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onLoadVideo() {
    if (!this.files[0]) return;
    const videoEl = document.getElementById('video-player');
    const fileUrl = window.URL.createObjectURL(this.files[0]);

    videoEl.src = fileUrl;
  }

  // ---------------------------  TOOL FUNCTIONS  --------------------------- //
  function setupDragAndDrop() {
    const dropArea = document.getElementById('video-input');
    const highlightEventNames = ['dragenter', 'dragover'];
    const unhighlightEventNames = ['dragleave', 'drop'];
    const onDrop = e => {
      const files = e.dataTransfer.files;

      onLoadVideo.call({ files });
    };

    // Add the corresponding events to the drop area
    dropArea.addEventListener('dragenter', preventDefault, false);
    dropArea.addEventListener('dragleave', preventDefault, false);
    dropArea.addEventListener('dragover', preventDefault, false);
    dropArea.addEventListener('drop', preventDefault, false);
    dropArea.addEventListener('drop', onDrop, false);

    highlightEventNames.forEach(eventName => {
      dropArea.addEventListener(
        eventName,
        () => {
          dropArea.classList.add('highlight');
        },
        false
      );
    });

    unhighlightEventNames.forEach(eventName => {
      dropArea.addEventListener(
        eventName,
        () => {
          dropArea.classList.remove('highlight');
        },
        false
      );
    });
  }

  // --------------------------  PUBLIC FUNCTIONS  -------------------------- //
  this.init = () => {
    // Init the video input
    document
      .getElementById('video-chooser-input')
      .addEventListener('change', onLoadVideo, false);

    // Init the video drag and drop functionality
    setupDragAndDrop();
  };
}

// --------------------------------  SCRIPT  -------------------------------- //
const uiManager = new UIManager();

document.addEventListener('DOMContentLoaded', () => {
  uiManager.init();
});
