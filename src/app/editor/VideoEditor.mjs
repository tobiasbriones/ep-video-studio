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

import Filter from '../model/editing/options/Filter.mjs';
import Perspective from '../model/editing/options/Perspective.mjs';
import Transform from '../model/editing/options/Transform.mjs';

export default function VideoEditor() {
  let filter = new Filter();
  let perspective = new Perspective();
  let transform = new Transform();
  let videoEl = null;
  let videoParentEl = null;

  function update() {
    const updateTransform = () => {
      const scale = transform.scale;
      const rotation = transform.rotation;
      const { scaleX, scaleY } = scale;
      const { rotate, rotateX, rotateY } = rotation;

      videoEl.style.transform = `
        scale(${ scaleX }, ${ scaleY })
        rotate(${ rotate }deg)
        rotateX(${ rotateX }deg)
        rotateY(${ rotateY }deg)
      `;
    };
    const updateFilters = () => {
      const {
        blur,
        brightness,
        contrast,
        dropShadow,
        grayScale,
        hueRotate,
        invert,
        opacity,
        saturate,
        sepia
      } = filter;

      videoEl.style.filter = `
        blur(${ blur }px)
        brightness(${ brightness })
        contrast(${ contrast })
        drop-shadow(${ dropShadow.offsetX }px ${ dropShadow.offsetY }px #${ dropShadow.color })
        grayscale(${ grayScale })
        hue-rotate(${ hueRotate })
        invert(${ invert })
        opacity(${ opacity })
        saturate(${ saturate })
        sepia(${ sepia })
      `;
    };
    const updatePerspective = () => {
      const value = perspective.perspective;
      videoParentEl.style.perspective = value === 0 ? 'none' : `${ value }px`;
    };

    updateTransform();
    updateFilters();
    updatePerspective();
  }

  this.init = (videoElement) => {
    videoEl = videoElement;
    videoParentEl = videoEl.parentElement;
  };

  this.scaleX = sx => {
    transform.scale.scaleX = sx;
    update();
  };

  this.scaleY = sy => {
    transform.scale.scaleY = sy;
    update();
  };

  this.scale = (sx, sy) => {
    transform.scale.scaleX = sx;
    transform.scale.scaleY = sy;
    update();
  };

  this.rotate = deg => {
    transform.rotation.rotate = deg;
    update();
  };

  this.rotateX = deg => {
    transform.rotation.rotateX = deg;
    update();
  };

  this.rotateY = deg => {
    transform.rotation.rotateY = deg;
    update();
  };

  this.perspective = px => {
    perspective.perspective = px;
    update();
  };

  this.blur = px => {
    filter.blur = px;
    update();
  };

  this.brightness = intensity => {
    filter.brightness = intensity;
    update();
  };

  this.contrast = contrast => {
    filter.contrast = contrast;
    update();
  };

  this.dropShadow = (offsetX, offsetY, color = '000000') => {
    filter.dropShadow.offsetX = offsetX;
    filter.dropShadow.offsetY = offsetY;
    filter.dropShadow.color = color;
    update();
  };

  this.grayScale = grayScale => {
    filter.grayScale = grayScale;
    update();
  };

  this.hueRotate = hueRotate => {
    filter.hueRotate = hueRotate;
    update();
  };

  this.invert = invert => {
    filter.invert = invert;
    update();
  };

  this.opacity = opacity => {
    filter.opacity = opacity;
    update();
  };

  this.saturate = saturate => {
    filter.saturate = saturate;
    update();
  };

  this.sepia = sepia => {
    filter.sepia = sepia;
    update();
  };
}
