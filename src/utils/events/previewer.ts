import { removeSubArrayElements } from "../array";
import { COMMON_EVENT_NAMES } from "./common";

// 自身监听的事件类型
export enum EVENT_PREVIEWER {
    // 获取 props
    GetProps = 'getProps',
    SetProps = 'setProps',
    ExecScript = 'execScript',

    InitWithFileJSON = 'initWithFileJSON', // 初始化时，传入文件中的 JSON 数据
    GetFileJSON = 'getFileJSON',
    SetCellsInfo = 'setCellsInfo',
    GetCellsInfo = 'getCellsInfo',
    GetCellsData = 'getCellsData',
    SetCellsData = 'setCellsData',
    UpdateFieldsData = 'updateFieldsData',
    ClearAlreadyStyles = 'clearAlreadyStyles',
    RelayoutSheet ='relayoutSheet',
    PrintSheet ='printSheet',
    ExportPDFBlob = 'exportPDFBlob',
    GetSpread = 'getSpread',
    CopyToIndex = 'copyToIndex',
    InsertImageToSheet = 'insertImageToSheet',
    GetShapesInfo = 'getShapesInfo',
    InsertShapes = 'insertShapes',
    GetCellPosKeys = 'getCellPosKeys',
}

export const PROXYED_EVENT_PREVIEWER = removeSubArrayElements(Object.values(EVENT_PREVIEWER), COMMON_EVENT_NAMES);

// 父 iframe 需要监听的事件类型
export enum EVENT_PREVIEWER_PARENT {
    Inited = 'inited', // 初始化完毕,
}

