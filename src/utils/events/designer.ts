import { removeSubArrayElements } from "../array";
import { COMMON_EVENT_NAMES } from "./common";

// 自身监听的事件类型
export enum EVENT_DESIGNER {
    HELLO = 'hello',

    // 获取 props
    GetProps = 'getProps',
    SetProps = 'setProps',
    ExecScript = 'execScript',

    InitWithFileJSON = 'initWithFileJSON', // 初始化时，传入文件中的 JSON 数据
    SetCellsInfo = 'setCellsInfo',
    GetCellsInfo = 'getCellsInfo',
    GetFileJSON = 'getFileJSON',
    GetFieldList = 'getFieldList',
    GetSheetConfig = 'getSheetConfig',
    InsertImageToSheet = 'insertImageToSheet',
    GetShapesInfo = 'getShapesInfo',
    InsertShapes = 'insertShapes',
    GetCellPosKeys = 'getCellPosKeys',
}


export const PROXYED_EVENT_DESIGNER = removeSubArrayElements(Object.values(EVENT_DESIGNER), ['hello', ...COMMON_EVENT_NAMES]);


// 父 iframe 需要监听的事件类型
export enum EVENT_DESIGNER_PARENT {
    Inited = 'inited', // 初始化完毕,

    // 用户点击了
    ImportFormFromTpl = 'importFormFromTpl', // 从模板导入表单
    ImportFormFromInstance = 'importFormFromInstance', // 从实例中导入案例
    ExtendFieldItems = 'extendFieldItems', // 扩展字段项
    OpenFullDesigner = 'openFullDesigner', // 打开全量设计器
}

