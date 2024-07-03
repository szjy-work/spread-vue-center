import { NS_SPREAD_CHILD, NS_SPREAD_PARENT } from "./constants"
import { Capitalize } from '@/utils/string';
import { EVENT_TYPE, EVENT_TYPE_PARENT, EVENT_NAMES } from './events'
import { urlToBase64 } from './image'


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
export const requestParent = (type: EVENT_TYPE_PARENT, params: any = {}, parentNs: string = NS_SPREAD_PARENT, childNs: string = NS_SPREAD_CHILD) => {
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
    const { keepOrigin, ...others } = payload;
    const newPayload = keepOrigin ? others : JSON.parse(JSON.stringify(others));
    newPayload.keepOrigin = keepOrigin;
    const body = { ns: childNs, payload: newPayload };
    port.postMessage(body);
}

// 生成 iframe 父消息响应框架
export const initIframeMessageHandlers = (messageHandlers: EventTypeFn = {}, parentNs: string = NS_SPREAD_PARENT) => (event: MessageEvent<ParentIframeMessage>) => {
    if (!event.ports.length) return;
    const port = event.ports[0];
    const data = event.data;
    if (data?.ns === parentNs) {

        const cmd = data.payload.cmd;
        if (!EVENT_NAMES.includes(cmd)) {
            console.log('invalid cmd:', cmd);
            return;
        }

        // 处理父 iframe 的消息
        const handler = messageHandlers[`on${Capitalize(cmd)}` as keyof EventTypeFn];

        if (handler) {
            handler(port, data.payload.params);
        } else {
            console.log('no handler for cmd:', cmd);
        }
    }
}

// 直接代理 form api
export const proxyFormApi = (spreadVueRef: any, apiNames: string[]) => {
    const configs: any = {};
    apiNames.forEach(apiName => {
        const apiNameStr = `on${Capitalize(apiName)}`;

        configs[apiNameStr] = async (port: MessagePort, params: any) => {
            const formRef = spreadVueRef.value;

            // 如果是传送 blob 等情况，需要让 keepOrigin 为 true
            const { args = [], keepOrigin = false } = params;
            if (formRef && formRef[apiName]) {
                const result = await formRef[apiName](...args);
                try {
                    responseParent(port, {
                        success: true,
                        api: apiName,
                        keepOrigin,
                        args,
                        result: result,
                    });
                } catch (err) {
                    responseParent(port, {
                        success: false,
                        api: apiName,
                        keepOrigin,
                        args,
                        msg: 'error occurred: ' + JSON.stringify(err),
                    });
                }
            } else {
                responseParent(port, {
                    success: false,
                    keepOrigin,
                    api: apiName,
                    msg: `${apiName} is not exist`
                });
            }
        }
    });
    return configs;
}

export const initPropsGetterSetter = (propsMap: any) => {
    return {
        // 处理父元素的 'getProps' 消息
        onGetProps: (port: MessagePort, params: any) => {
            const { args = [] } = params;
            const result: any = {};
            [].concat(args).forEach(prop => {
                result[prop] = propsMap[prop]?.get();
            });
            responseParent(port, {
                success: true,
                result,
            });
        },
        onSetProps: (port: MessagePort, params: any) => {
            const { args = [] } = params;
            [].concat(args).forEach(propSetPair => {
                const { name, value } = propSetPair;
                propsMap[name]?.set(value);
            });
            responseParent(port, {
                success: true,
            });
        }
    }
}

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
export const initOnExecScript = (spreadVueRef: any) => {
    return {
        // 处理父元素的 'getProps' 消息
        onExecScript: async (port: MessagePort, params: any) => {
            const { args = [], keepOrigin } = params;
            const scriptBody = args[0];

            // 创建异步 fn
            const fn = new AsyncFunction('spread, utils', scriptBody);
            const spread = spreadVueRef.value.getSpread();
            const utils = { urlToBase64};
            const result = await fn(spread, utils);
            try {
                responseParent(port, {
                    success: true,
                    keepOrigin,
                    args,
                    result: result,
                });
            } catch (err) {
                responseParent(port, {
                    success: false,
                    keepOrigin,
                    args,
                    msg: 'script exec with error occurred: ' + JSON.stringify(err),
                });
            }
        },
        
    }
}

