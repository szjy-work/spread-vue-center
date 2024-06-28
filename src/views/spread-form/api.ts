import { NS_SPREAD_CHILD, NS_SPREAD_PARENT } from "./constants"

export enum EVENT_TYPE {
    INITED = 'inited', // 初始化完毕,
    HELLO = 'hello'
}

// 使用映射类型创建新的类型
type MsgHandler = (port: MessagePort, params: any) => void;
type EventTypeFn = {
    [K in EVENT_TYPE as `on${Capitalize<K>}`]?: MsgHandler;
};

export interface ParentIframeMessage {
    ns: string;
    payload: {
        cmd: EVENT_TYPE;
        params: any;
    }
}


// 请求父 iframe，promise 化的接口
const requestParent = (type: EVENT_TYPE, params: any = {}, parentNs: string = NS_SPREAD_PARENT, childNs: string = NS_SPREAD_CHILD) => {
    return new Promise((resolve, reject) => {

        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (res) => {
            if (res.data?.ns === parentNs) {
                resolve(res.data?.payload);
            } else {
                console.log('error res:', res);
                reject(new Error('Invalid namespace'));
            }
        };

        try {
            // 给父元素发消息
            window.parent.postMessage({
                ns: childNs,
                payload: {
                    cmd: type,
                    params,
                }
            }, '*', [messageChannel.port2]);
        } catch (e) {
            reject(e);
        }
    });
};


// response 父 iframe 的消息
export const responseParent = (port: MessagePort, payload: any = {}, childNs: string = NS_SPREAD_CHILD) => {
    port.postMessage({ ns: childNs, payload });
}

// 生成 iframe 父消息响应框架
export const initIframeMessageHandlers = (messageHandlers: EventTypeFn = {}, parentNs: string = NS_SPREAD_PARENT) => (event: MessageEvent<ParentIframeMessage>) => {
    if (!event.ports.length) return;
    const port = event.ports[0];
    const data = event.data;
    if (data?.ns === parentNs) {
        switch (data.payload.cmd) {
            case EVENT_TYPE.HELLO:
                messageHandlers.onHello?.(port, data.payload.params);
                break;

            default:
                break;
        }
    }
}


export const apiInited = (params: any = {}) => {
    return requestParent(EVENT_TYPE.INITED, params);
}
