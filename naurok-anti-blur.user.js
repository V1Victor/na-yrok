// ==UserScript==
// @name         NaUrok Anti-Blur & Always Active
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Блокує відстеження втрати фокусу та згортання вкладки на На Урок
// @author       You
// @match        *://*.naurok.ua/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. Фіксуємо стан сторінки як «завжди видима та в фокусі»
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
    Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
    Object.defineProperty(document, 'hasFocus', { value: () => true, configurable: true });

    // 2. Блокуємо події втрати фокусу на рівні перехоплення
    const blockEvents = function(e) {
        if (['visibilitychange', 'blur', 'mouseleave', 'pagehide', 'webkitvisibilitychange'].includes(e.type)) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        }
    };

    const events = ['visibilitychange', 'blur', 'mouseleave', 'pagehide', 'webkitvisibilitychange'];
    events.forEach(eventName => {
        window.addEventListener(eventName, blockEvents, true);
        document.addEventListener(eventName, blockEvents, true);
    });

    // 3. Запобігаємо перепризначенню обробників через властивості
    window.onblur = null;
    document.onblur = null;
    document.onvisibilitychange = null;
})();
