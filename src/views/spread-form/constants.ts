export const SPREADJS_LICENSE_KEY = `${import.meta.env.VITE_SPREADJS_KEY}` || '';
export const SPREADJS_DESIGNER_LICENSE_KEY = `${import.meta.env.VITE_SPREADJS_DESIGNER_KEY}` || '';
// console.log("1234,", SPREADJS_LICENSE_KEY)

export const SPREADJS_BASE_URL = '/spreadjs-library/'

export const NS_SPREAD_CHILD = 'ns:spread-child';  // 消息源来自子 iframe
export const NS_SPREAD_PARENT = 'ns:spread-parent'; // 消息源来自父 iframe
