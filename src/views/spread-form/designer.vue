<template>
    <sz-form-designer ref="excelFormRef" :isLandscape="sheetLandscape" :license-key="SPREADJS_LICENSE_KEY" :debug-mode="debugMode" :base-url="SPREADJS_BASE_URL" :onInited="onInitSpreadSheet"></sz-form-designer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import {SPREADJS_LICENSE_KEY, SPREADJS_BASE_URL} from './constants';
import { apiInited, initIframeMessageHandlers, responseParent, proxyFormApi, initPropsGetterSetter } from "./api";

const excelFormRef = ref<any>(null);

const sheetLandscape = ref(false);
const debugMode = ref(false);


onMounted(() => {
	window.addEventListener('message', onReceiveIframeMsg);
});


// 初始化完毕之后，通知父组件 spreadjs 已经初始化完成
const onInitSpreadSheet = () => {
    apiInited().then(res=>{
        console.log('get parent inited handle response', res);
    });
}


const propsMap = {
    isLandscape: {
        get: ()=>sheetLandscape.value,
        set: (val: boolean) => {
            sheetLandscape.value = val;
        }
    },
    debugMode: {
        get: ()=>debugMode.value,
        set: (val: boolean) => {
            debugMode.value = val;
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
    ...proxyFormApi(excelFormRef, ['initWithFileJSON', 'setCellsInfo', 'getCellsInfo', 'getFileJSON', 'getFieldList'])
})

onUnmounted(() => {
  	window.removeEventListener('message', onReceiveIframeMsg)
})
</script>

<style scoped>

</style>