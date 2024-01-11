"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragMessageUpdate = exports.DragMessage = exports.PingMessage = exports.WorkerMessageType = void 0;
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
var WorkerMessageType;
(function (WorkerMessageType) {
    WorkerMessageType[WorkerMessageType["Ping"] = 0] = "Ping";
    WorkerMessageType[WorkerMessageType["PositivePingResponse"] = 1] = "PositivePingResponse";
    WorkerMessageType[WorkerMessageType["NegativePingResponse"] = 2] = "NegativePingResponse";
    WorkerMessageType[WorkerMessageType["InitDrag"] = 3] = "InitDrag";
    WorkerMessageType[WorkerMessageType["CoordinatesUpdate"] = 4] = "CoordinatesUpdate";
    WorkerMessageType[WorkerMessageType["Drop"] = 5] = "Drop";
})(WorkerMessageType = exports.WorkerMessageType || (exports.WorkerMessageType = {}));
class PingMessage {
}
exports.PingMessage = PingMessage;
class DragMessage extends PingMessage {
    constructor() {
        super(...arguments);
        this.messageType = WorkerMessageType.InitDrag;
    }
}
exports.DragMessage = DragMessage;
class DragMessageUpdate extends PingMessage {
    constructor() {
        super(...arguments);
        this.messageType = WorkerMessageType.CoordinatesUpdate;
    }
}
exports.DragMessageUpdate = DragMessageUpdate;
//# sourceMappingURL=SharedWorker.js.map