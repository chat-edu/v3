import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

export const emitEvent = (eventName: string, data: any) => {
    eventEmitter.emit(eventName, data);
}

export const subscribeToEvent = (eventName: string, callback: (data: any) => void) => {
    eventEmitter.on(eventName, callback);
}

export const unsubscribeFromEvent = (eventName: string, callback: (data: any) => void) => {
    eventEmitter.off(eventName, callback);
}