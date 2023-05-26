"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _self = globalThis;
const _instances = [];
_self.onconnect = function (e) {
    const port = e.ports[0];
    _instances.push(port);
    port.addEventListener("message", function (e) {
        _instances.forEach((i) => i.postMessage(e.data));
    });
    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
};
//# sourceMappingURL=SharedWorker.js.map