// ==UserScript==
// @name         NaUrok Anti-Blur & Always Active
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Блокує відстеження втрати фокусу та згортання вкладки
// @match        *://*.naurok.ua/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const def = (obj, prop, val) => {
        try { Object.defineProperty(obj, prop, { get: () => val, configurable: true }); } catch (e) {}
    };

    def(document, 'hidden', false);
    def(document, 'webkitHidden', false);
    def(document, 'mozHidden', false);
    def(document, 'visibilityState', 'visible');
    def(document, 'webkitVisibilityState', 'visible');
    try {
        Object.defineProperty(document, 'hasFocus', { value: () => true, configurable: true });
    } catch (e) {}

    const names = ['visibilitychange', 'webkitvisibilitychange', 'pagehide',
                   'blur', 'mouseleave', 'freeze'];

    const isRoot = t => t === window || t === document || t === document.documentElement;

    const handler = e => {
        // блокуємо лише події самого вікна/документа, а не окремих елементів
        if (isRoot(e.target)) e.stopImmediatePropagation();
    };

    names.forEach(n => {
        window.addEventListener(n, handler, true);
        document.addEventListener(n, handler, true);
    });
})();

