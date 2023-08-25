interface SharedWorkerGlobalScope {
    onconnect: (event: MessageEvent) => void;
}

const _self: SharedWorkerGlobalScope = globalThis as any;
const _instances: MessagePort[] = [];

_self.onconnect = function (e) {
    const port = e.ports[0];
    _instances.push(port);

    port.addEventListener("message", function (e) {
        _instances.forEach((i) => i.postMessage(e.data));
    });

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
};

export enum WorkerMessageType {
    Ping,
    PositivePingResponse,
    NegativePingResponse,
    InitDrag,
    CoordinatesUpdate,
    Drop,
}

export {};

export class PingMessage {
    id?: string;
    messageType?: WorkerMessageType;
    clientX?: number;
    clientY?: number;

    // constructor(id: string, messageType: WorkerMessageType, clientX: number, clientY: number)
}

export class DragMessage extends PingMessage {
    messageType: WorkerMessageType = WorkerMessageType.InitDrag;
    data: unknown;
}

export class DragMessageUpdate extends PingMessage {
    messageType: WorkerMessageType = WorkerMessageType.CoordinatesUpdate;
    coordinates: unknown;
}
