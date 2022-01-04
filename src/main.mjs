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

import UIManager from './app/ui/UIManager.mjs';
import './css/main.css';
import './index.html';
import './styles.css';

const uiManager = new UIManager();

uiManager.init();
