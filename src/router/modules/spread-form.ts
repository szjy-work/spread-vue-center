const routes = [
    {
        path: "/spread-form",
        name: "SpreadForm",
        meta: {title: "Spread 表单"},
        children: [
            {
                path: '/spread-form/designer',
                components: {
                    default: () => import('@/views/spread-form/designer.vue'),
                },
                name: 'SpreadFormDesigner',
                meta: { title: 'Spread 表单设计器' }
            },
            {
                path: '/spread-form/previewer',
                components: {
                    default: () => import('@/views/spread-form/previewer.vue'),
                },
                name: 'SpreadFormPreviewer',
                meta: { title: 'Spread 表单预览' }
            },
            {
                path: '/spread-form/full-designer',
                components: {
                    default: () => import('@/views/spread-form/full-designer.vue'),
                },
                name: 'SpreadFormFullDesigner',
                meta: { title: 'Spread 全量设计器' }
            },
        ]
    }
];
export default routes;