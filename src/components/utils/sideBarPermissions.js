export const links = [{
    permission: ['chief', 'admin'], text: 'رئيس الفرع', link: '/docs/chief',
}, {
    permission: ['chief', 'admin'], text: 'وارد الى ر. الفرع', link: '/forwards/chief',
}, {
    permission: ['chief', 'admin'], text: 'معلومية ر. الفرع', link: '/chiefRecieves',
}, {
    permission: ['montChief', 'admin'], text: 'رئيس المنتدبين', link: '/docs/montChief',
}, {
    permission: ['montChief', 'admin'], text: 'وارد الى ر. المنتدبين', link: '/forwards/montChief',
}, {
    permission: ['montChief', 'admin'], text: 'معلومية ر. المنتدبين', link: '/',
}, {
    permission: ['infoChief', 'admin'], text: 'رئيس المعلومات', link: '/docs/infoChief',
}, {
    permission: ['infoChief', 'admin'], text: 'وارد الى ر. معلومات', link: '/forwards/infochief',
}, {
    permission: ['infoChief', 'admin'], text: 'معلومية ر. المعلومات', link: '/',
}, {
    permission: ['planChief', 'admin'], text: 'رئيس التخطيط', link: '/docs/planChief',
}, {
    permission: ['planChief', 'admin'], text: 'وارد الى ر. التخطيط', link: '/forwards/planChief',
}, {
    permission: ['planChief', 'admin'], text: 'معلومية ر. التخطيط', link: '/',
}, {
    permission: ['admin', 'chief', 'planChief', 'infoChief', 'montChief', 'sec'], text: 'وارد الاقسام', link: '/'
}, {
    permission: ['montadaben'], text: 'وارد قسم المنتدبين', link: '/chief',
}, {
    permission: ['info'], text: 'وارد قسم المعلومات', link: '/chief',
}, {
    permission: ['planing'], text: 'وارد قسم التخطيط', link: '/chief',
}, {
    permission: ['affairs'], text: 'وارد قسم الشئون', link: '/chief',
}, {
    permission: ['retired'], text: 'وار د قسم المتقاعدين', link: '/chief',
}, {
    permission: ['sec'], text: 'وارد قسم السكرتارية', link: '/chief',
}, {
    permission: ['montadaben', 'montChief'], text: 'محول الى منتدبين', link: '/chief',
}, {
    permission: ['planing', 'planChief'], text: 'محول الى التخطيط', link: '/'
}, {
    permission: ['info', 'infoChief'], text: 'محول الى المعلومات', link: '/'
}, {
    permission: ['affairs'], text: 'محول الى الشئون', link: '/'
}, {
    permission: ['retired'], text: 'محول الى المتقاعدين', link: '/'
}, {
    permission: ['sec'], text: 'محول الى السكرتارية', link: '/'
}, {
    permission: ['admin'], text: 'تحويلات الى الاقسام', link: '/'
}, {
    permission: ['admin'], text: 'صادر من الاقسام', link: '/'
}, {
    permission: ['sec'], text: 'الفاكسات الصادرة', link: '/'
}, {
    permission: ['montadaben', 'montChief'], text: 'صادر قسم المنتدبين', link: '/'
}, {
    permission: ['info', 'infoChief'], text: 'صادر قسم المعلومات', link: '/'
}, {
    permission: ['planing', 'planChief'], text: 'صادر قسم التخطيط', link: '/'
}, {
    permission: ['retired'], text: 'صادر قسم المتقاعدين', link: '/'
}, {
    permission: ['affairs'], text: 'صادر قسم الشئون', link: '/'
}
];

export const modalsPermission = [{
    permission: ['sec', 'admin'], text: 'اضافه فاكس', link: '/',
}
]
