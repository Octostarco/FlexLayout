export declare enum WorkerMessageType {
    Ping = 0,
    PositivePingResponse = 1,
    NegativePingResponse = 2,
    InitDrag = 3,
    CoordinatesUpdate = 4,
    Drop = 5
}
export {};
export declare class PingMessage {
    id?: string;
    messageType?: WorkerMessageType;
    clientX?: number;
    clientY?: number;
}
export declare class DragMessage extends PingMessage {
    messageType: WorkerMessageType;
    data: unknown;
}
export declare class DragMessageUpdate extends PingMessage {
    messageType: WorkerMessageType;
    coordinates: unknown;
}
