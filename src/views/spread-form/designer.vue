<template>
    <sz-form-designer ref="excelFormRef" :isLandscape="sheetLandscape" :license-key="SPREADJS_LICENSE_KEY" :fieldItems="fieldItems" :debug-mode="debugMode" :base-url="SPREADJS_BASE_URL" :onInited="onInitSpreadSheet">
        <template #[EXCELFORM_SLOT_NAMES.TOOLBAR_PREFIX]>
            <n-popover v-if="showExtraToolbar" placement="bottom" trigger="hover">
                <template #trigger>
                <n-button size="small" type="primary" style="margin-left: 10px;">引用表单</n-button>
                </template>
                <n-space vertical>
                <n-button size="small" type="primary" @click="onImportFormFromTpl">通过模板引入</n-button>
                <n-button size="small" type="primary" @click="onImportFormFromInstance">通过已有配置引入</n-button>
                </n-space>
            </n-popover>

            <n-popover v-if="showExtraToolbar" placement="bottom" trigger="hover">
                <template #trigger>
                <n-button size="small" style="margin-left: 10px;">自定义配置</n-button>
                </template>
                <n-space vertical>
                <n-button size="small" @click="onExtendFieldItems">扩展字段配置</n-button>
                </n-space>
            </n-popover>
        </template>
    </sz-form-designer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { EXCELFORM_SLOT_NAMES } from '@szjy/excel-form';
import {SPREADJS_LICENSE_KEY, SPREADJS_BASE_URL} from '@/utils/constants';
import { initIframeMessageHandlers, responseParent, proxyFormApi, initPropsGetterSetter, requestParent} from "@/utils/iframe-io";
import {EVENT_DESIGNER_PARENT, PROXYED_EVENT_DESIGNER} from '@/utils/events/designer'

const excelFormRef = ref<any>(null);

const sheetLandscape = ref(false);
const debugMode = ref(false);
const showExtraToolbar = ref(false);
const fieldItems= ref([]);


onMounted(() => {
	window.addEventListener('message', onReceiveIframeMsg);
});


// 初始化完毕之后，通知父组件 spreadjs 已经初始化完成
const onInitSpreadSheet = () => {
    requestParent(EVENT_DESIGNER_PARENT.Inited).then(res=>{
        console.log('get parent inited handle response', res);
    });
}


const propsMap = {
    isLandscape: {
        get: () => excelFormRef.value?.getSheetConfig('isLandscape') || false,
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
    fieldItems: {
        get: ()=>fieldItems.value,
        set: (val: any) => {
            fieldItems.value = val;
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
    ...proxyFormApi(excelFormRef, PROXYED_EVENT_DESIGNER)
})


// 业务相关的事件
const onImportFormFromTpl = () => {
    requestParent(EVENT_DESIGNER_PARENT.ImportFormFromTpl);
}
const onImportFormFromInstance = () => {
    requestParent(EVENT_DESIGNER_PARENT.ImportFormFromInstance);
}
const onExtendFieldItems = () => {
    requestParent(EVENT_DESIGNER_PARENT.ExtendFieldItems);
}

onUnmounted(() => {
  	window.removeEventListener('message', onReceiveIframeMsg)
})
</script>

<style>
.form-designer-wrapper{
    height: 100%;
    background-color: white;
}
</style>