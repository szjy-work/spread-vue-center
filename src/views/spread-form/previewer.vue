<template>
    <sz-form-previewer :modalWidth="modalWidth" ref="previewerRef" :isLandscape="sheetLandscape" :license-key="SPREADJS_LICENSE_KEY" :fieldsData="fieldsData" :debug-mode="debugMode" :base-url="SPREADJS_BASE_URL" :webBase="BASE_URL" :onInited="onInitSpreadSheet">
    </sz-form-previewer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import {SPREADJS_LICENSE_KEY, SPREADJS_BASE_URL, BASE_URL} from '@/utils/constants';
import { initIframeMessageHandlers, responseParent, proxyFormApi, initPropsGetterSetter, initOnExecScript, requestParent} from "@/utils/iframe-io";
import {EVENT_PREVIEWER_PARENT, PROXYED_EVENT_PREVIEWER} from '@/utils/events/previewer'

const previewerRef = ref<any>(null);

const sheetLandscape = ref(false);
const debugMode = ref(false);
const showExtraToolbar = ref(false);
const fieldsData= ref([]);
const modalWidth = ref('calc(100% - 40px)');


onMounted(() => {
	window.addEventListener('message', onReceiveIframeMsg);
});


// 初始化完毕之后，通知父组件 spreadjs 已经初始化完成
const onInitSpreadSheet = () => {
    requestParent(EVENT_PREVIEWER_PARENT.Inited).then(res=>{
        console.log('get parent inited handle response', res);
    });
}


const propsMap = {
    isLandscape: {
        get: () => previewerRef.value?.getSheetConfig('isLandscape') || false,
        set: (val: boolean) => {
            sheetLandscape.value = val;
        }
    },
    debugMode: {
        get: ()=>debugMode.value,
        set: (val: boolean) => {
            debugMode.value = val;
        }
    },
    showExtraToolbar: {
        get: ()=>showExtraToolbar.value,
        set: (val: boolean) => {
            showExtraToolbar.value = val;
            console.log('showExtraToolbar', val);
        }
    },
    fieldsData: {
        get: ()=>fieldsData.value,
        set: (val: any) => {
            fieldsData.value = val;
        }
    },
    modelWidth: {
        get: ()=>modalWidth.value,
        set: (val: string) => {
            modalWidth.value = val;
        }
    }
}


// 给父元素响应消息
const onReceiveIframeMsg = initIframeMessageHandlers({
    // 处理父元素的 'hello' 消息
    onHello: (port: MessagePort, params: any) => {
        // 回应 'hello' 消息
        responseParent(port, {
            msg: "i received your params" + JSON.stringify(params)
        });
    },

    ...initPropsGetterSetter(propsMap),
    ...initOnExecScript(previewerRef),
    ...proxyFormApi(previewerRef, PROXYED_EVENT_PREVIEWER)
})


// 业务相关的事件
// const onImportFormFromTpl = () => {
//     requestParent(EVENT_PREVIEWER_PARENT.ImportFormFromTpl);
// }
// const onImportFormFromInstance = () => {
//     requestParent(EVENT_PREVIEWER_PARENT.ImportFormFromInstance);
// }
// const onExtendfieldsData = () => {
//     requestParent(EVENT_PREVIEWER_PARENT.ExtendfieldsData);
// }

onUnmounted(() => {
  	window.removeEventListener('message', onReceiveIframeMsg)
})
</script>

<style>
.excel-form-previewer{
    height: 100%;
    background-color: white;
}
</style>