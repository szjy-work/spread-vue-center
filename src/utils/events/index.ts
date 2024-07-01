import { EVENT_DESIGNER, EVENT_DESIGNER_PARENT } from './designer';
import { EVENT_PREVIEWER } from './previewer';

export type EVENT_TYPE = EVENT_DESIGNER | EVENT_PREVIEWER;
export type EVENT_TYPE_PARENT = EVENT_DESIGNER_PARENT;

// 所有事件名集合
export const EVENT_NAMES = [...Object.values(EVENT_DESIGNER), ...Object.values(EVENT_PREVIEWER)];