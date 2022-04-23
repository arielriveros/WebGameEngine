namespace RENDER {
    export interface IMessageHandler {
        onMessage(message: Message): void;
    }
}