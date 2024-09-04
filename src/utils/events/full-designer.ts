import { removeSubArrayElements } from "../array";
import { COMMON_EVENT_NAMES } from "./common";

// 自身监听的事件类型
export enum EVENT_FULL_DESIGNER {
    // 获取 props
    GetProps = 'getProps',
    SetProps = 'setProps',
    ExecScript = 'execScript',

    InitWithFileJSON = 'initWithFileJSON', // 初始化时，传入文件中的 JSON 数据
    GetFileJSON = 'getFileJSON',
    ExportPDFBlob = 'exportPDFBlob',
    PrintSheet = 'printSheet',
    GetSpread = 'getSpread',
    GetDesigner = 'getDesigner',
}


export const PROXYED_EVENT_FULL_DESIGNER = removeSubArrayElements(Object.values(EVENT_FULL_DESIGNER), [...COMMON_EVENT_NAMES]);


// 父 iframe 需要监听的事件类型
export enum EVENT_FULL_DESIGNER_PARENT {
    Inited = 'inited', // 初始化完毕,

    // 用户点击了
    CancelEdit = 'CancelEdit', // 取消编辑
    SaveEdit = 'SaveEdit', // 保存编辑
}

