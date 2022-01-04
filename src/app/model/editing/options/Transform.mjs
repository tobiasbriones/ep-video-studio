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

/**
 * Transform model for the transform css property.
 */
export default function () {
  /**
   * Scale transform property.
   */
  this.scale = {

    /**
     * Scale X floating value, default is 1.0.
     */
    scaleX: 1.0,

    /**
     * Scale Y floating value, default is 1.0.
     */
    scaleY: 1.0
  };

  /**
   * Rotation transform property. Valid for "rotate", "rotateX" and "rotateY"
   * css transform properties.
   */
  this.rotation = {

    /**
     * Rotate value in degrees [0-360]. Default is 0.
     */
    rotate: 0.0,

    /**
     * Rotate X value in degrees [0-360]. Default is 0.
     */
    rotateX: 0.0,

    /**
     * Rotate Y value in degrees [0-360]. Default is 0.
     */
    rotateY: 0.0
  };
};
