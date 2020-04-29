/*
 * Copyright (c) 2020 Tobias Briones.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// -----------------------------  VIDEO EDITOR  ----------------------------- //
function VideoEditor() {
  let videoEl = null;
  let scaleX = 1;
  let scaleY = 1;

  function update() {
    videoEl.style.transform = `scale(${scaleX}, ${scaleY})`;
  }

  this.init = () => {
    videoEl = document.getElementById('video-player');
  };

  this.scaleX = sx => {
    scaleX = sx;
    update();
  };

  this.scaleY = sy => {
    scaleY = sy;
    update();
  };

  this.scale = (sx, sy) => {
    scaleX = sx;
    scaleY = sy;
    update();
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
    videoEditor.scaleX(scaleX);
  }

  function onScaleY() {
    const scaleY = parseFloat(this.value);

    if (isNaN(scaleY)) return;
    videoEditor.scaleY(scaleY);
  }

  function onScaleReset() {
    const scaleXInputEl = document.getElementById('scale-x-input');
    const scaleXRangeEl = document.getElementById('scale-x-range');
    const scaleYInputEl = document.getElementById('scale-y-input');
    const scaleYRangeEl = document.getElementById('scale-y-range');

    scaleXInputEl.value = 1;
    scaleXRangeEl.value = 1;
    scaleYInputEl.value = 1;
    scaleYRangeEl.value = 1;
    onScaleX.call(scaleXInputEl);
    onScaleY.call(scaleYInputEl);
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
    const scaleXInputEl = document.getElementById('scale-x-input');
    const scaleXRangeEl = document.getElementById('scale-x-range');
    const scaleYInputEl = document.getElementById('scale-y-input');
    const scaleYRangeEl = document.getElementById('scale-y-range');

    // Scaling
    // Scale X
    scaleXInputEl.addEventListener('input', onScaleX, false);
    scaleXRangeEl.addEventListener(
      'input',
      e => {
        scaleXInputEl.value = e.target.value;
        onScaleX.call(scaleXInputEl);
      },
      false
    );
    // Scale Y
    scaleYInputEl.addEventListener('input', onScaleY, false);
    scaleYRangeEl.addEventListener(
      'input',
      e => {
        scaleYInputEl.value = e.target.value;
        onScaleY.call(scaleYInputEl);
      },
      false
    );
    // Reset
    document
      .querySelector('#tools > div > span.material-icons')
      .addEventListener('click', onScaleReset, false);
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
