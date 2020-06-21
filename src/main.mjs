/*
 * Copyright (c) 2020 Tobias Briones.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './index.html';
import './styles.css';
import './css/main.css';
import UIManager from './app/ui/UIManager.mjs';

const uiManager = new UIManager();

uiManager.init();
