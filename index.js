/*
 * Copyright (c) 2020 Tobias Briones.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// -----------------------------  VIDEO EDITOR  ----------------------------- //
function VideoEditor() {
  let videoEl = null;

  this.init = () => {
    videoEl = document.getElementById('video-player');
  };

  this.scale = (sx, sy) => {
    videoEl.style.transform = `scale(${sx}, ${sy})`;
  };
}

// ------------------------------  UI MANAGER  ------------------------------ //
function UIManager() {
  let videoEditor = new VideoEditor();

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

  function onExpandVideoInputLess() {
    const videoInputEl = document.getElementById('video-input');
    const videoEl = document.getElementById('player');

    videoInputEl.classList.remove('expanded');
    videoInputEl.classList.add('collapsed');
    videoEl.classList.add('wider');
  }

  function onExpandVideoInputMore() {
    const videoInputEl = document.getElementById('video-input');
    const videoEl = document.getElementById('player');

    videoEl.classList.remove('wider');
    videoInputEl.classList.remove('collapsed');
    videoInputEl.classList.add('expanded');
  }

  // -----------------------------  TOOLS  ------------------------------ //
  function onScaleX() {
    const scaleX = parseFloat(this.value);

    if (isNaN(scaleX)) return;
    videoEditor.scale(scaleX, 1);
  }

  function onScaleY() {
    const scaleY = parseFloat(this.value);

    if (isNaN(scaleY)) return;
    videoEditor.scale(1, scaleY);
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

  function setupTools() {
    // Scaling
    document
      .getElementById('scale-x-input')
      .addEventListener('input', onScaleX, false);
    document
      .getElementById('scale-y-input')
      .addEventListener('input', onScaleY, false);
  }

  // --------------------------  PUBLIC FUNCTIONS  -------------------------- //
  this.init = () => {
    videoEditor.init();

    // Init the video input
    document
      .getElementById('video-chooser-input')
      .addEventListener('change', onLoadVideo, false);

    document
      .querySelector('#video-input > .expand-less')
      .addEventListener('click', onExpandVideoInputLess, false);

    document
      .querySelector('#video-input > .expand-more')
      .addEventListener('click', onExpandVideoInputMore, false);

    // Init the video drag and drop functionality
    setupDragAndDrop();

    // Init the tools
    setupTools();
  };
}

// --------------------------------  SCRIPT  -------------------------------- //
const uiManager = new UIManager();

document.addEventListener('DOMContentLoaded', () => {
  uiManager.init();
});
