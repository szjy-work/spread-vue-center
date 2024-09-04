import { EVENT_DESIGNER, EVENT_DESIGNER_PARENT } from './designer';
import { EVENT_PREVIEWER, EVENT_PREVIEWER_PARENT } from './previewer';
import { EVENT_FULL_DESIGNER, EVENT_FULL_DESIGNER_PARENT } from './full-designer'

export type EVENT_TYPE = EVENT_DESIGNER | EVENT_PREVIEWER;
export type EVENT_TYPE_PARENT = EVENT_DESIGNER_PARENT | EVENT_PREVIEWER_PARENT | EVENT_FULL_DESIGNER_PARENT;

// 所有事件名集合
export const EVENT_NAMES = [
    ...Object.values(EVENT_DESIGNER), 
    ...Object.values(EVENT_PREVIEWER),
    ...Object.values(EVENT_FULL_DESIGNER),
];