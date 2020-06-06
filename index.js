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
  let blur = 0;
  let brightness = 1;

  function update() {
    videoEl.style.transform = `
      scale(${scaleX}, ${scaleY})
      rotate(${rotate}deg)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
    videoEl.style.filter = `
      blur(${blur}px)
      brightness(${brightness})
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

  this.blur = px => {
    blur = px;
    update();
  };

  this.brightness = intensity => {
    brightness = intensity;
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
    const getFileName = name => {
      const index = name.indexOf('.');

      if (index === -1) return name;
      return name.substring(0, index);
    };
    videoEl.src = fileUrl;
    videoEl.dataset['video_name'] = getFileName(this.files[0].name);
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

  // -------------------------------  TOOLS  -------------------------------- //
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

  function onConfigOverflow() {
    const videoParentEl = document.getElementById('player');

    videoParentEl.style.overflow = this.dataset['overflow'];
  }

  function onShowControls() {
    const videoEl = document.getElementById('video-player');

    videoEl.controls = this.checked;
  }

  function onVideoResizeX() {
    const widthPercentage = this.value;
    const videoEl = document.getElementById('video-player');

    if (isNaN(widthPercentage)) return;
    videoEl.style.width = `${widthPercentage}%`;
  }

  function onVideoResizeY() {
    const heightPercentage = this.value;
    const videoEl = document.getElementById('video-player');

    if (isNaN(heightPercentage)) return;
    videoEl.style.height = `${heightPercentage}%`;
  }

  function onConfigReset() {
    const overflowAutoEl = document.getElementById('overflow-auto-radio');
    const controlsCheckButton = document.getElementById('show-controls-cb');
    const videoWidthInputEl = document.getElementById('vid-width-input');
    const videoWidthRangeEl = document.getElementById('vid-width-range');
    const videoHeightInputEl = document.getElementById('vid-height-input');
    const videoHeightRangeEl = document.getElementById('vid-height-range');

    overflowAutoEl.checked = true;
    controlsCheckButton.checked = true;
    videoWidthInputEl.value = 100;
    videoWidthRangeEl.value = 100;
    videoHeightInputEl.value = 100;
    videoHeightRangeEl.value = 100;
    onConfigOverflow.call(overflowAutoEl);
    onShowControls.call(controlsCheckButton);
    onVideoResizeX.call(videoWidthInputEl);
    onVideoResizeY.call(videoHeightRangeEl);
  }

  function onFilterBlur() {
    const blurSize = this.value;

    if (isNaN(blurSize)) return;
    videoEditor.blur(blurSize);
  }

  function onFilterBrightness() {
    const brightnessIntensity = this.value;

    if (isNaN(brightnessIntensity)) return;
    videoEditor.brightness(brightnessIntensity);
  }

  function onFiltersReset() {
    const blurSizeInputEl = document.getElementById('blur-px-input');
    const blurSizeRangeEl = document.getElementById('blur-px-range');
    const brightnessInputEl = document.getElementById('brightness-input');
    const brightnessRangeEl = document.getElementById('brightness-range');

    blurSizeInputEl.value = 0;
    blurSizeRangeEl.value = 0;
    brightnessInputEl.value = 1;
    brightnessRangeEl.value = 1;
    onFilterBlur.call(blurSizeInputEl);
    onFilterBrightness.call(brightnessInputEl);
  }

  function onCaptureScreenshot() {
    const videoEl = document.getElementById('video-player');
    const canvasEl = document.getElementById('screenshot-canvas');
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;
    canvasEl.dataset['video_name'] = videoEl.dataset['video_name'];
    canvasEl.dataset['time'] = videoEl.currentTime;

    ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
  }

  function onSaveScreenshot() {
    const videoEl = document.getElementById('video-player');
    const canvasEl = document.getElementById('screenshot-canvas');
    const videoName = canvasEl.dataset['video_name'];

    if (videoEl.readyState !== 4 || !videoName) return;
    const data = canvasEl.toDataURL('image/jpeg');
    const time = canvasEl.dataset['time'];
    const imageName = `${videoName} - ${time}.jpeg`;
    const linkEl = document.createElement('a');
    linkEl.href = data;
    linkEl.download = imageName;

    linkEl.click();
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
    const overflowAutoEl = document.getElementById('overflow-auto-radio');
    const overflowHiddenEl = document.getElementById('overflow-hidden-radio');
    const controlsCheckButton = document.getElementById('show-controls-cb');
    const videoWidthInputEl = document.getElementById('vid-width-input');
    const videoWidthRangeEl = document.getElementById('vid-width-range');
    const videoHeightInputEl = document.getElementById('vid-height-input');
    const videoHeightRangeEl = document.getElementById('vid-height-range');
    const blurSizeInputEl = document.getElementById('blur-px-input');
    const blurSizeRangeEl = document.getElementById('blur-px-range');
    const brightnessInputEl = document.getElementById('brightness-input');
    const brightnessRangeEl = document.getElementById('brightness-range');
    const screenshotCaptureEl = document.getElementById('capture-screenshot');
    const screenshotSaveEl = document.getElementById('save-screenshot');
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

    // Config
    overflowAutoEl.addEventListener('change', onConfigOverflow, false);
    overflowHiddenEl.addEventListener('change', onConfigOverflow, false);
    controlsCheckButton.addEventListener('change', onShowControls, false);
    bindInputAndRange(videoWidthInputEl, videoWidthRangeEl, onVideoResizeX);
    bindInputAndRange(videoHeightInputEl, videoHeightRangeEl, onVideoResizeY);
    // Reset
    document
      .querySelector('#tools > div.config > span.material-icons')
      .addEventListener('click', onConfigReset, false);

    // Filters
    bindInputAndRange(blurSizeInputEl, blurSizeRangeEl, onFilterBlur);
    bindInputAndRange(brightnessInputEl, brightnessRangeEl, onFilterBrightness);
    // Reset
    document
      .querySelector('#tools > div.filters > span.material-icons')
      .addEventListener('click', onFiltersReset, false);

    // Screenshot
    screenshotCaptureEl.addEventListener('click', onCaptureScreenshot, false);
    screenshotSaveEl.addEventListener('click', onSaveScreenshot, false);
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
