// 自身监听的事件类型
export enum EVENT_PREVIEWER {
    // 获取 props
    GetProps = 'getProps',
    SetProps = 'setProps',

    InitWithFileJSON = 'initWithFileJSON', // 初始化时，传入文件中的 JSON 数据
    SetCellsInfo = 'setCellsInfo',
    GetCellsInfo = 'getCellsInfo',
}


// 父 iframe 需要监听的事件类型
export enum EVENT_PREVIEWER_PARENT {
    Inited = 'inited', // 初始化完毕,
}

