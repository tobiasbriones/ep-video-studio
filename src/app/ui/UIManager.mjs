/*
 * Copyright (c) 2020 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: MIT
 *
 * This file is part of Example Project: Video Studio.
 *
 * This source code is licensed under the MIT License found in the LICENSE file
 * in the root directory of this source tree or at
 * https://opensource.org/licenses/MIT.
 */

import VideoEditor from '../editor/VideoEditor.mjs';

export default function UIManager() {
  let videoEditor = new VideoEditor();

  // -----------------------------  CALLBACKS  ------------------------------ //
  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onLoadVideo() {
    if (!this.files[0]) {
      return;
    }
    const videoEl = document.getElementById('video-player');
    const fileUrl = window.URL.createObjectURL(this.files[0]);
    const getFileName = name => {
      const index = name.indexOf('.');

      if (index === -1) {
        return name;
      }
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

    if (isNaN(scaleX)) {
      return;
    }
    videoEditor.scaleX(scaleX);
  }

  function onScaleY() {
    const scaleY = parseFloat(this.value);

    if (isNaN(scaleY)) {
      return;
    }
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

    if (isNaN(rotateDeg)) {
      return;
    }
    videoEditor.rotate(rotateDeg);
  }

  function onRotateX() {
    const rotateXDeg = parseFloat(this.value);

    if (isNaN(rotateXDeg)) {
      return;
    }
    videoEditor.rotateX(rotateXDeg);
  }

  function onRotateY() {
    const rotateYDeg = parseFloat(this.value);

    if (isNaN(rotateYDeg)) {
      return;
    }
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

    if (isNaN(perspectivePx)) {
      return;
    }
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

    if (isNaN(widthPercentage)) {
      return;
    }
    videoEl.style.width = `${ widthPercentage }%`;
  }

  function onVideoResizeY() {
    const heightPercentage = this.value;
    const videoEl = document.getElementById('video-player');

    if (isNaN(heightPercentage)) {
      return;
    }
    videoEl.style.height = `${ heightPercentage }%`;
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

    if (isNaN(blurSize)) {
      return;
    }
    videoEditor.blur(blurSize);
  }

  function onFilterBrightness() {
    const brightnessIntensity = this.value;

    if (isNaN(brightnessIntensity)) {
      return;
    }
    videoEditor.brightness(brightnessIntensity);
  }

  function onFilterContrast() {
    const contrast = this.value;

    if (isNaN(contrast)) {
      return;
    }
    videoEditor.contrast(contrast);
  }

  function onFilterDropShadowOffsetX() {
    const offsetYInputEl = document.getElementById(
      'drop-shadow-offset-y-input'
    );
    const offsetX = this.value;

    if (isNaN(offsetX)) {
      return;
    }
    videoEditor.dropShadow(offsetX, offsetYInputEl.value);
  }

  function onFilterDropShadowOffsetY() {
    const offsetXInputEl = document.getElementById(
      'drop-shadow-offset-x-input'
    );
    const offsetY = this.value;

    if (isNaN(offsetY)) {
      return;
    }
    videoEditor.dropShadow(offsetXInputEl.value, offsetY);
  }

  function onFilterDropShadowColor() {
    const offsetXInputEl = document.getElementById(
      'drop-shadow-offset-x-input'
    );
    const offsetYInputEl = document.getElementById(
      'drop-shadow-offset-y-input'
    );
    const color = this.value;

    videoEditor.dropShadow(offsetXInputEl.value, offsetYInputEl.value, color);
  }

  function onFilterGrayScale() {
    const grayScale = this.value;

    if (isNaN(grayScale)) {
      return;
    }
    videoEditor.grayScale(grayScale);
  }

  function onFilterHueRotate() {
    const hueRotate = this.value;

    if (isNaN(hueRotate)) {
      return;
    }
    videoEditor.hueRotate(hueRotate);
  }

  function onFilterInvert() {
    const invert = this.value;

    if (isNaN(invert)) {
      return;
    }
    videoEditor.invert(invert);
  }

  function onFilterOpacity() {
    const opacity = this.value;

    if (isNaN(opacity)) {
      return;
    }
    videoEditor.opacity(opacity);
  }

  function onFilterSaturate() {
    const saturate = this.value;

    if (isNaN(saturate)) {
      return;
    }
    videoEditor.saturate(saturate);
  }

  function onFilterSepia() {
    const sepia = this.value;

    if (isNaN(sepia)) {
      return;
    }
    videoEditor.sepia(sepia);
  }

  function onFiltersReset() {
    const blurSizeInputEl = document.getElementById('blur-px-input');
    const blurSizeRangeEl = document.getElementById('blur-px-range');
    const brightnessInputEl = document.getElementById('brightness-input');
    const brightnessRangeEl = document.getElementById('brightness-range');
    const contrastInputEl = document.getElementById('contrast-input');
    const contrastRangeEl = document.getElementById('contrast-range');
    const dropShadowOffsetXInputEl = document.getElementById(
      'drop-shadow-offset-x-input'
    );
    const dropShadowOffsetXRangeEl = document.getElementById(
      'drop-shadow-offset-x-range'
    );
    const dropShadowOffsetYInputEl = document.getElementById(
      'drop-shadow-offset-y-input'
    );
    const dropShadowOffsetYRangeEl = document.getElementById(
      'drop-shadow-offset-y-range'
    );
    const dropShadowColorInputEl = document.getElementById(
      'drop-shadow-color-input'
    );
    const grayScaleInputEl = document.getElementById('grayscale-input');
    const grayScaleRangeEl = document.getElementById('grayscale-range');
    const hueRotateInputEl = document.getElementById('hue-rotate-input');
    const hueRotateRangeEl = document.getElementById('hue-rotate-range');
    const invertInputEl = document.getElementById('invert-input');
    const invertRangeEl = document.getElementById('invert-range');
    const opacityInputEl = document.getElementById('opacity-input');
    const opacityRangeEl = document.getElementById('opacity-range');
    const saturateInputEl = document.getElementById('saturate-input');
    const saturateRangeEl = document.getElementById('saturate-range');
    const sepiaInputEl = document.getElementById('sepia-input');
    const sepiaRangeEl = document.getElementById('sepia-range');

    blurSizeInputEl.value = 0;
    blurSizeRangeEl.value = 0;
    brightnessInputEl.value = 1;
    brightnessRangeEl.value = 1;
    contrastInputEl.value = 1;
    contrastRangeEl.value = 1;
    dropShadowOffsetXInputEl.value = 0;
    dropShadowOffsetXRangeEl.value = 0;
    dropShadowOffsetYInputEl.value = 0;
    dropShadowOffsetYRangeEl.value = 0;
    dropShadowColorInputEl.value = '000000';
    grayScaleInputEl.value = 0;
    grayScaleRangeEl.value = 0;
    hueRotateInputEl.value = 0;
    hueRotateRangeEl.value = 0;
    invertInputEl.value = 0;
    invertRangeEl.value = 0;
    opacityInputEl.value = 1;
    opacityRangeEl.value = 1;
    saturateInputEl.value = 1;
    saturateRangeEl.value = 1;
    sepiaInputEl.value = 0;
    sepiaRangeEl.value = 0;

    onFilterBlur.call(blurSizeInputEl);
    onFilterBrightness.call(brightnessInputEl);
    onFilterContrast.call(contrastInputEl);
    // One call is enough
    onFilterDropShadowOffsetX.call(dropShadowOffsetXInputEl);
    onFilterGrayScale.call(grayScaleInputEl);
    onFilterHueRotate.call(hueRotateInputEl);
    onFilterInvert.call(invertInputEl);
    onFilterOpacity.call(opacityInputEl);
    onFilterSaturate.call(saturateInputEl);
    onFilterSepia.call(sepiaInputEl);
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

    if (videoEl.readyState !== 4 || !videoName) {
      return;
    }
    const data = canvasEl.toDataURL('image/jpeg');
    const time = canvasEl.dataset['time'];
    const imageName = `${ videoName } - ${ time }.jpeg`;
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
    const contrastInputEl = document.getElementById('contrast-input');
    const contrastRangeEl = document.getElementById('contrast-range');
    const dropShadowOffsetXInputEl = document.getElementById(
      'drop-shadow-offset-x-input'
    );
    const dropShadowOffsetXRangeEl = document.getElementById(
      'drop-shadow-offset-x-range'
    );
    const dropShadowOffsetYInputEl = document.getElementById(
      'drop-shadow-offset-y-input'
    );
    const dropShadowOffsetYRangeEl = document.getElementById(
      'drop-shadow-offset-y-range'
    );
    const dropShadowColorInputEl = document.getElementById(
      'drop-shadow-color-input'
    );
    const grayScaleInputEl = document.getElementById('grayscale-input');
    const grayScaleRangeEl = document.getElementById('grayscale-range');
    const hueRotateInputEl = document.getElementById('hue-rotate-input');
    const hueRotateRangeEl = document.getElementById('hue-rotate-range');
    const invertInputEl = document.getElementById('invert-input');
    const invertRangeEl = document.getElementById('invert-range');
    const opacityInputEl = document.getElementById('opacity-input');
    const opacityRangeEl = document.getElementById('opacity-range');
    const saturateInputEl = document.getElementById('saturate-input');
    const saturateRangeEl = document.getElementById('saturate-range');
    const sepiaInputEl = document.getElementById('sepia-input');
    const sepiaRangeEl = document.getElementById('sepia-range');
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
    document.querySelector('#tools > div.scale > span.material-icons')
            .addEventListener('click', onScaleReset, false);

    // Rotating
    bindInputAndRange(rotateInputEl, rotateRangeEl, onRotate);
    bindInputAndRange(rotateXInputEl, rotateXRangeEl, onRotateX);
    bindInputAndRange(rotateYInputEl, rotateYRangeEl, onRotateY);
    // Reset
    document.querySelector('#tools > div.rotate > span.material-icons')
            .addEventListener('click', onRotateReset, false);

    // Perspective
    bindInputAndRange(perspectiveInputEl, perspectiveRangeEl, onPerspective);
    // Reset
    document.querySelector('#tools > div.perspective > span.material-icons')
            .addEventListener('click', onPerspectiveReset, false);

    // Config
    overflowAutoEl.addEventListener('change', onConfigOverflow, false);
    overflowHiddenEl.addEventListener('change', onConfigOverflow, false);
    controlsCheckButton.addEventListener('change', onShowControls, false);
    bindInputAndRange(videoWidthInputEl, videoWidthRangeEl, onVideoResizeX);
    bindInputAndRange(videoHeightInputEl, videoHeightRangeEl, onVideoResizeY);
    // Reset
    document.querySelector('#tools > div.config > span.material-icons')
            .addEventListener('click', onConfigReset, false);

    // Filters
    bindInputAndRange(blurSizeInputEl, blurSizeRangeEl, onFilterBlur);
    bindInputAndRange(brightnessInputEl, brightnessRangeEl, onFilterBrightness);
    bindInputAndRange(contrastInputEl, contrastRangeEl, onFilterContrast);
    bindInputAndRange(
      dropShadowOffsetXInputEl,
      dropShadowOffsetXRangeEl,
      onFilterDropShadowOffsetX
    );
    bindInputAndRange(
      dropShadowOffsetYInputEl,
      dropShadowOffsetYRangeEl,
      onFilterDropShadowOffsetY
    );
    bindInputAndRange(grayScaleInputEl, grayScaleRangeEl, onFilterGrayScale);
    bindInputAndRange(hueRotateInputEl, hueRotateRangeEl, onFilterHueRotate);
    bindInputAndRange(invertInputEl, invertRangeEl, onFilterInvert);
    bindInputAndRange(opacityInputEl, opacityRangeEl, onFilterOpacity);
    bindInputAndRange(saturateInputEl, saturateRangeEl, onFilterSaturate);
    bindInputAndRange(sepiaInputEl, sepiaRangeEl, onFilterSepia);

    dropShadowColorInputEl.addEventListener(
      'change',
      onFilterDropShadowColor,
      false
    );

    // Reset
    document.querySelector('#tools > div.filters > span.material-icons')
            .addEventListener('click', onFiltersReset, false);

    // Screenshot
    screenshotCaptureEl.addEventListener('click', onCaptureScreenshot, false);
    screenshotSaveEl.addEventListener('click', onSaveScreenshot, false);
  }

  // --------------------------  PUBLIC FUNCTIONS  -------------------------- //
  this.init = () => {
    const videoEl = document.getElementById('video-player');

    videoEditor.init(videoEl);

    // Init the video input
    document.getElementById('video-chooser-input')
            .addEventListener('change', onLoadVideo, false);

    document.querySelector('#video-input > .expand-less')
            .addEventListener('click', onExpandVideoInputLess, false);

    document.querySelector('#video-input > .expand-more')
            .addEventListener('click', onExpandVideoInputMore, false);

    // Init the video drag and drop functionality
    setupDragAndDrop();

    // Init the tools
    setupTools();
  };
}
