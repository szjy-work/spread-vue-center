<template>
    <sz-full-designer ref="fullDesignerRef" :license-key="SPREADJS_LICENSE_KEY" :designerLicenseKey="SPREADJS_DESIGNER_LICENSE_KEY" :debug-mode="debugMode" :show-opt-area="showOptArea" :base-url="SPREADJS_BASE_URL" :onInited="onFullDesignerInit" :wrapStyle="wrapStyle" :forceReset="forceReset">
    </sz-full-designer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import {SPREADJS_DESIGNER_LICENSE_KEY, SPREADJS_LICENSE_KEY, SPREADJS_BASE_URL, COMPONENT_TYPE} from '@/utils/constants';
import { initIframeMessageHandlers, proxyFormApi, initPropsGetterSetter, initOnExecScript, requestParent} from "@/utils/iframe-io";
import {EVENT_FULL_DESIGNER_PARENT, PROXYED_EVENT_FULL_DESIGNER} from '@/utils/events/full-designer'

const fullDesignerRef = ref<any>(null);

const debugMode = ref(false);
const showOptArea = ref(false);
const forceReset = ref(false);
const wrapStyle = ref({'height': '100%'});


onMounted(() => {
	window.addEventListener('message', onReceiveIframeMsg);
});


// 初始化完毕之后，通知父组件 spreadjs 已经初始化完成
const onFullDesignerInit = () => {
    requestParent(EVENT_FULL_DESIGNER_PARENT.Inited, {componentType: COMPONENT_TYPE.FULL_DESIGNER}).then(res=>{
        console.log('get parent inited handle response', res);
    });
}


const propsMap = {
    debugMode: {
        get: ()=>debugMode.value,
        set: (val: boolean) => {
            debugMode.value = val;
        }
    },
    showOptArea: {
        get: ()=>showOptArea.value,
        set: (val: boolean) => {
            showOptArea.value = val;
            console.log('showOptArea', val);
        }
    },
    wrapStyle: {
        get: ()=>wrapStyle.value,
        set: (val: any) => {
            wrapStyle.value = val;
        }
    },
    forceReset: {
        get: ()=>forceReset.value,
        set: (val: boolean) => {
            forceReset.value = val;
        }
    }
}


// 给父元素响应消息
const onReceiveIframeMsg = initIframeMessageHandlers({
    ...initPropsGetterSetter(propsMap),
    ...initOnExecScript(fullDesignerRef),
    ...proxyFormApi(fullDesignerRef, PROXYED_EVENT_FULL_DESIGNER)
})


onUnmounted(() => {
  	window.removeEventListener('message', onReceiveIframeMsg)
})
</script>
