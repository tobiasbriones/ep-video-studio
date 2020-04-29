/*
 * Copyright (c) 2020 Tobias Briones.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// -----------------------------  VIDEO EDITOR  ----------------------------- //
function VideoEditor() {
  let videoEl = null;
  let videoParentEl = null;
  let scaleX = 1;
  let scaleY = 1;
  let rotate = 0;
  let rotateX = 0;
  let rotateY = 0;
  let perspective = 0;

  function update() {
    videoEl.style.transform = `
      scale(${scaleX}, ${scaleY})
      rotate(${rotate}deg)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
    videoParentEl.style.perspective =
      perspective === 0 ? 'none' : `${perspective}px`;
  }

  this.init = () => {
    videoEl = document.getElementById('video-player');
    videoParentEl = videoEl.parentElement;
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

  this.rotate = deg => {
    rotate = deg;
    update();
  };

  this.rotateX = deg => {
    rotateX = deg;
    update();
  };

  this.rotateY = deg => {
    rotateY = deg;
    update();
  };

  this.perspective = px => {
    perspective = px;
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

  function onRotate() {
    const rotateDeg = parseFloat(this.value);

    if (isNaN(rotateDeg)) return;
    videoEditor.rotate(rotateDeg);
  }

  function onRotateX() {
    const rotateXDeg = parseFloat(this.value);

    if (isNaN(rotateXDeg)) return;
    videoEditor.rotateX(rotateXDeg);
  }

  function onRotateY() {
    const rotateYDeg = parseFloat(this.value);

    if (isNaN(rotateYDeg)) return;
    videoEditor.rotateY(rotateYDeg);
  }

  function onRotateReset() {
    const rotateInputEl = document.getElementById('rotate-input');
    const rotateRangeEl = document.getElementById('rotate-range');
    const rotateXInputEl = document.getElementById('rotate-x-input');
    const rotateXRangeEl = document.getElementById('rotate-x-range');
    const rotateYInputEl = document.getElementById('rotate-y-input');
    const rotateYRangeEl = document.getElementById('rotate-y-range');

    rotateInputEl.value = 0;
    rotateRangeEl.value = 0;
    rotateXInputEl.value = 0;
    rotateXRangeEl.value = 0;
    rotateYInputEl.value = 0;
    rotateYRangeEl.value = 0;
    onRotate.call(rotateInputEl);
    onRotateX.call(rotateInputEl);
    onRotateY.call(rotateInputEl);
  }

  function onPerspective() {
    const perspectivePx = parseInt(this.value);

    if (isNaN(perspectivePx)) return;
    videoEditor.perspective(perspectivePx);
  }

  function onPerspectiveReset() {
    const perspectiveInputEl = document.getElementById('perspective-input');
    const perspectiveRangeEl = document.getElementById('perspective-range');

    perspectiveInputEl.value = 0;
    perspectiveRangeEl.value = 0;
    onPerspective.call(perspectiveInputEl);
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
    const rotateInputEl = document.getElementById('rotate-input');
    const rotateRangeEl = document.getElementById('rotate-range');
    const rotateXInputEl = document.getElementById('rotate-x-input');
    const rotateXRangeEl = document.getElementById('rotate-x-range');
    const rotateYInputEl = document.getElementById('rotate-y-input');
    const rotateYRangeEl = document.getElementById('rotate-y-range');
    const perspectiveInputEl = document.getElementById('perspective-input');
    const perspectiveRangeEl = document.getElementById('perspective-range');
    const bindInputAndRange = (inputEl, rangeEl, callback) => {
      inputEl.addEventListener(
        'input',
        e => {
          rangeEl.value = e.target.value;
          callback.call(inputEl);
        },
        false
      );
      rangeEl.addEventListener(
        'input',
        e => {
          inputEl.value = e.target.value;
          callback.call(inputEl);
        },
        false
      );
    };

    // Scaling
    bindInputAndRange(scaleXInputEl, scaleXRangeEl, onScaleX);
    bindInputAndRange(scaleYInputEl, scaleYRangeEl, onScaleY);
    // Reset
    document
      .querySelector('#tools > div.scale > span.material-icons')
      .addEventListener('click', onScaleReset, false);

    // Rotating
    bindInputAndRange(rotateInputEl, rotateRangeEl, onRotate);
    bindInputAndRange(rotateXInputEl, rotateXRangeEl, onRotateX);
    bindInputAndRange(rotateYInputEl, rotateYRangeEl, onRotateY);
    // Reset
    document
      .querySelector('#tools > div.rotate > span.material-icons')
      .addEventListener('click', onRotateReset, false);

    // Perspective
    bindInputAndRange(perspectiveInputEl, perspectiveRangeEl, onPerspective);
    // Reset
    document
      .querySelector('#tools > div.perspective > span.material-icons')
      .addEventListener('click', onPerspectiveReset, false);
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
