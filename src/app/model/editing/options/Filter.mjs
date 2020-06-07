/*
 * Copyright (c) 2020 Tobias Briones.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Filter model for the filter css property.
 */
export default function() {
  /**
   * Blur value in pixels. Default is 0.
   */
  this.blur = 0;
  
  /**
   * Brightness floating value in [0, 1] or also greater than 1 for more
   * brightness. Default is 1.0.
   */
  this.brightness = 1.0;
  
  /**
   * Contrast floating value in [0, 1]. Default is 1.0.
   */
  this.contrast = 1.0;
  
  /**
   * Drop shadow object.
   */
  this.dropShadow = {
    
    /**
     * Offset X in pixels. Default is 0.
     */
    offsetX: 0,
    
    /**
     * Offset Y in pixels. Default is 0.
     */
    offsetY: 0,
    
    /**
     * Drop shadow color in hexadecimal string. Default is '000000' (black).
     */
    color: '000000'
  };
  
  /**
   * Gray scale floating value in [0, 1]. Default is 0.0.
   */
  this.grayScale = 0.0;
  
  /**
   * Hue rotate floating value in degrees [0, 360]. Default is 0.0.
   */
  this.hueRotate = 0.0;
  
  /**
   * Invert floating value in [0, 1]. Default is 0.0.
   */
  this.invert = 0.0;
  
  /**
   * Opacity floating value in [0, 1]. Default is 1.0.
   */
  this.opacity = 1.0;
  
  /**
   * Saturate floating value in [0, 1]. Default is 1.0.
   */
  this.saturate = 1.0;
  
  /**
   * Sepia floating value in [0, 1]. Default is 0.0.
   */
  this.sepia = 0.0;
};
