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
        ]
    }
];
export default routes;