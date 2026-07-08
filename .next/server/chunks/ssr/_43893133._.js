module.exports = {

"[project]/lib/emptyDefaults.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "EMPTY_AGENCY": (()=>EMPTY_AGENCY),
    "EMPTY_BRANCHES": (()=>EMPTY_BRANCHES),
    "EMPTY_COMMISSIONS": (()=>EMPTY_COMMISSIONS),
    "EMPTY_CONTRACTS": (()=>EMPTY_CONTRACTS),
    "EMPTY_DASHBOARD": (()=>EMPTY_DASHBOARD),
    "EMPTY_DELIVERERS": (()=>EMPTY_DELIVERERS),
    "EMPTY_FREELANCERS": (()=>EMPTY_FREELANCERS),
    "EMPTY_HUBS": (()=>EMPTY_HUBS),
    "EMPTY_HUB_PARCELS": (()=>EMPTY_HUB_PARCELS),
    "EMPTY_MISSIONS": (()=>EMPTY_MISSIONS),
    "EMPTY_POLICIES": (()=>EMPTY_POLICIES),
    "EMPTY_REPORT": (()=>EMPTY_REPORT),
    "EMPTY_STAFF": (()=>EMPTY_STAFF),
    "EMPTY_VEHICLES": (()=>EMPTY_VEHICLES)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
;
const EMPTY_MISSIONS = [];
const EMPTY_DELIVERERS = [];
const EMPTY_VEHICLES = [];
const EMPTY_HUBS = [];
const EMPTY_BRANCHES = [];
const EMPTY_STAFF = [];
const EMPTY_POLICIES = [];
const EMPTY_COMMISSIONS = [];
const EMPTY_CONTRACTS = [];
const EMPTY_FREELANCERS = [];
const EMPTY_HUB_PARCELS = [];
const EMPTY_AGENCY = {
    id: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_AGENCY_ID"],
    name: '',
    legalName: '',
    registrationNumber: '',
    type: 'SME',
    status: 'ACTIVE',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: '',
    defaultCurrency: 'XAF',
    autoAssignMissions: false,
    allowFreelancerAssociation: false,
    maxAssociatedFreelancers: 0,
    hubRetentionDelayHours: 72,
    createdAt: ''
};
const EMPTY_DASHBOARD = {
    agencyId: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_AGENCY_ID"],
    branchesCount: 0,
    deliverersCount: 0,
    hubsCount: 0,
    vehiclesCount: 0,
    activeMissionsCount: 0,
    pendingCommissionsCount: 0
};
const EMPTY_REPORT = {
    agencyId: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_AGENCY_ID"],
    missionsByStatus: {},
    commissionsByStatus: {}
};
}}),
"[project]/components/forms/Drawer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Drawer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Drawer({ open, onClose, title, description, children, footer, size = 'md' }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        return ()=>document.removeEventListener('keydown', handler);
    }, [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return ()=>{
            document.body.style.overflow = '';
        };
    }, [
        open
    ]);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('fixed inset-0 bg-black/30 z-[200] transition-opacity duration-300', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'),
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/forms/Drawer.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('fixed top-0 right-0 h-full bg-white z-[300] shadow-2xl border-l border-gray-200', 'overflow-y-auto transition-transform duration-300 ease-out', size === 'lg' ? 'w-[640px]' : 'w-[520px]', open ? 'translate-x-0' : 'translate-x-full'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-full flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-0 z-20 bg-white flex items-start justify-between px-6 py-5 border-b border-gray-200 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-base font-semibold text-gray-900",
                                            children: title
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/Drawer.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500 mt-0.5",
                                            children: description
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/Drawer.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/Drawer.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "ml-4 p-1.5 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0 mt-0.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 17,
                                        className: "text-gray-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/Drawer.tsx",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/Drawer.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/Drawer.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/components/forms/Drawer.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky bottom-0 z-20 bg-white px-6 py-4 border-t border-gray-100 flex-shrink-0",
                            children: footer
                        }, void 0, false, {
                            fileName: "[project]/components/forms/Drawer.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/Drawer.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/forms/Drawer.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true), document.body);
}
}}),
"[project]/lib/mock-data.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "missionStatusCounts": (()=>missionStatusCounts),
    "mockAgency": (()=>mockAgency),
    "mockBillingPolicies": (()=>mockBillingPolicies),
    "mockBranches": (()=>mockBranches),
    "mockCommissions": (()=>mockCommissions),
    "mockContracts": (()=>mockContracts),
    "mockDeliverers": (()=>mockDeliverers),
    "mockFreelancers": (()=>mockFreelancers),
    "mockHubParcels": (()=>mockHubParcels),
    "mockHubs": (()=>mockHubs),
    "mockMissions": (()=>mockMissions),
    "mockStaffMembers": (()=>mockStaffMembers),
    "mockVehicles": (()=>mockVehicles)
});
const mockAgency = {
    id: 'AGN-001',
    name: 'Rapid Express Douala',
    legalName: 'Rapid Express SARL',
    registrationNumber: 'RC/DLA/2021/B/1234',
    type: 'ENTERPRISE',
    status: 'ACTIVE',
    phone: '+237 233 42 18 90',
    email: 'contact@rapidexpress-dla.cm',
    address: '3 Rue Joss, Akwa',
    city: 'Douala',
    country: 'Cameroun',
    createdAt: '2021-03-15',
    defaultCurrency: 'XAF',
    autoAssignMissions: true,
    maxAssociatedFreelancers: 20,
    hubRetentionDelayHours: 72,
    allowFreelancerAssociation: true
};
const mockBranches = [
    {
        id: 'BRN-001',
        agencyId: 'AGN-001',
        name: 'Antenne Akwa (Siège)',
        address: '3 Rue Joss, Akwa',
        city: 'Douala',
        isHeadquarters: true,
        managerId: 'MGR-001',
        managerName: 'Étienne Nlend',
        managerEmail: 'e.nlend@rapidexpress.cm',
        managerPhone: '+237 699 00 11 22',
        status: 'OPEN',
        openingHours: 'Lun–Sam 07h00–20h00',
        deliverersCount: 5,
        createdAt: '2021-03-15'
    },
    {
        id: 'BRN-002',
        agencyId: 'AGN-001',
        name: 'Antenne Bonapriso',
        address: 'Av. Général de Gaulle, Bonapriso',
        city: 'Douala',
        isHeadquarters: false,
        managerId: 'MGR-002',
        managerName: 'Mireille Atangana',
        managerEmail: 'm.atangana@rapidexpress.cm',
        managerPhone: '+237 677 34 56 78',
        status: 'OPEN',
        openingHours: 'Lun–Ven 08h00–19h00',
        deliverersCount: 3,
        createdAt: '2021-07-01'
    },
    {
        id: 'BRN-003',
        agencyId: 'AGN-001',
        name: 'Antenne Makepe',
        address: 'Quartier Makepe Missoke, Carrefour Elf',
        city: 'Douala',
        isHeadquarters: false,
        managerId: 'MGR-003',
        managerName: 'Rodrigue Kouam',
        managerEmail: 'r.kouam@rapidexpress.cm',
        managerPhone: '+237 691 78 90 12',
        status: 'OPEN',
        openingHours: 'Lun–Sam 07h30–18h30',
        deliverersCount: 2,
        createdAt: '2022-02-10'
    },
    {
        id: 'BRN-004',
        agencyId: 'AGN-001',
        name: 'Antenne Yassa',
        address: 'Zone Industrielle Yassa, Bloc D',
        city: 'Douala',
        isHeadquarters: false,
        status: 'TEMPORARILY_CLOSED',
        openingHours: 'Lun–Ven 08h00–17h00',
        deliverersCount: 0,
        createdAt: '2023-05-20'
    }
];
const mockStaffMembers = [
    {
        id: 'MGR-000',
        agencyId: 'AGN-001',
        fullName: 'Claude Mvogo',
        phone: '+237 699 12 34 56',
        email: 'c.mvogo@rapidexpress.cm',
        role: 'AGENCY_MANAGER',
        status: 'ACTIVE',
        joinedAt: '2021-03-15',
        photoUrl: 'https://i.pravatar.cc/150?u=c.mvogo@rapidexpress.cm'
    },
    {
        id: 'MGR-001',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Étienne Nlend',
        phone: '+237 699 00 11 22',
        email: 'e.nlend@rapidexpress.cm',
        role: 'BRANCH_MANAGER',
        status: 'ACTIVE',
        joinedAt: '2021-03-15',
        photoUrl: 'https://i.pravatar.cc/150?u=e.nlend@rapidexpress.cm'
    },
    {
        id: 'MGR-002',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        fullName: 'Mireille Atangana',
        phone: '+237 677 34 56 78',
        email: 'm.atangana@rapidexpress.cm',
        role: 'BRANCH_MANAGER',
        status: 'ACTIVE',
        joinedAt: '2021-07-01',
        photoUrl: 'https://i.pravatar.cc/150?u=m.atangana@rapidexpress.cm'
    },
    {
        id: 'MGR-003',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Antenne Makepe',
        fullName: 'Rodrigue Kouam',
        phone: '+237 691 78 90 12',
        email: 'r.kouam@rapidexpress.cm',
        role: 'BRANCH_MANAGER',
        status: 'ACTIVE',
        joinedAt: '2022-02-10',
        photoUrl: 'https://i.pravatar.cc/150?u=r.kouam@rapidexpress.cm'
    }
];
const mockDeliverers = [
    {
        id: 'DLV-001',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Jean-Paul Essomba',
        phone: '+237 691 23 45 67',
        email: 'jp.essomba@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'AVAILABLE',
        rating: 4.8,
        totalMissions: 234,
        vehicleId: 'VEH-001',
        vehiclePlate: 'LT-4521-A',
        joinedAt: '2021-03-20',
        photoUrl: 'https://i.pravatar.cc/150?u=jp.essomba@rapidexpress.cm'
    },
    {
        id: 'DLV-002',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Martin Mbarga',
        phone: '+237 677 89 01 23',
        email: 'm.mbarga@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'ON_MISSION',
        rating: 4.6,
        totalMissions: 189,
        activeMissionId: 'MSN-005',
        vehicleId: 'VEH-002',
        vehiclePlate: 'LT-8832-B',
        joinedAt: '2021-05-10',
        photoUrl: 'https://i.pravatar.cc/150?u=m.mbarga@rapidexpress.cm'
    },
    {
        id: 'DLV-003',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        fullName: 'Mireille Atangana',
        phone: '+237 655 34 56 78',
        email: 'm.atangana@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'AVAILABLE',
        rating: 4.9,
        totalMissions: 312,
        vehicleId: 'VEH-004',
        vehiclePlate: 'LT-2210-C',
        joinedAt: '2021-07-01',
        photoUrl: 'https://i.pravatar.cc/150?u=m.atangana@rapidexpress.cm'
    },
    {
        id: 'DLV-004',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Rodrigue Nkomo',
        phone: '+237 699 56 78 90',
        email: 'r.nkomo@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'OFFLINE',
        rating: 4.3,
        totalMissions: 156,
        joinedAt: '2021-09-15',
        photoUrl: 'https://i.pravatar.cc/150?u=r.nkomo@rapidexpress.cm'
    },
    {
        id: 'DLV-005',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        fullName: 'Carine Beyene',
        phone: '+237 670 12 34 56',
        email: 'c.beyene@rapidexpress.cm',
        type: 'PART_TIME',
        status: 'AVAILABLE',
        rating: 4.7,
        totalMissions: 98,
        vehicleId: 'VEH-005',
        vehiclePlate: 'LT-6643-D',
        joinedAt: '2022-01-08',
        photoUrl: 'https://i.pravatar.cc/150?u=c.beyene@rapidexpress.cm'
    },
    {
        id: 'DLV-006',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        fullName: 'Patrick Abessolo',
        phone: '+237 694 78 90 12',
        email: 'p.abessolo@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'SUSPENDED',
        rating: 3.8,
        totalMissions: 67,
        joinedAt: '2022-04-20'
    },
    {
        id: 'DLV-007',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Antenne Makepe',
        fullName: 'Alice Manga',
        phone: '+237 681 90 12 34',
        email: 'a.manga@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'ON_MISSION',
        rating: 4.5,
        totalMissions: 145,
        activeMissionId: 'MSN-008',
        vehicleId: 'VEH-007',
        vehiclePlate: 'LT-9901-E',
        joinedAt: '2022-02-10',
        photoUrl: 'https://i.pravatar.cc/150?u=a.manga@rapidexpress.cm'
    },
    {
        id: 'DLV-008',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        fullName: 'Thierry Ngatcha',
        phone: '+237 675 23 45 67',
        email: 't.ngatcha@rapidexpress.cm',
        type: 'PERMANENT',
        status: 'AVAILABLE',
        rating: 4.4,
        totalMissions: 201,
        vehicleId: 'VEH-008',
        vehiclePlate: 'LT-3317-F',
        joinedAt: '2022-06-01',
        photoUrl: 'https://i.pravatar.cc/150?u=t.ngatcha@rapidexpress.cm'
    }
];
const mockFreelancers = [
    {
        id: 'ASC-001',
        agencyId: 'AGN-001',
        freelancerId: 'FL-001',
        freelancerName: 'Duplex Fotso',
        phone: '+237 690 11 22 33',
        commissionRate: 12,
        assignedMissionsCount: 12,
        status: 'ACTIVE',
        associatedAt: '2026-02-15'
    },
    {
        id: 'ASC-002',
        agencyId: 'AGN-001',
        freelancerId: 'FL-002',
        freelancerName: 'Ange Kamga',
        phone: '+237 674 44 55 66',
        commissionRate: 10,
        assignedMissionsCount: 8,
        status: 'ACTIVE',
        associatedAt: '2026-03-01'
    },
    {
        id: 'ASC-003',
        agencyId: 'AGN-001',
        freelancerId: 'FL-003',
        freelancerName: 'Serge Eba',
        phone: '+237 698 77 88 99',
        commissionRate: 11,
        assignedMissionsCount: 0,
        status: 'PENDING',
        associatedAt: '2026-04-20'
    },
    {
        id: 'ASC-004',
        agencyId: 'AGN-001',
        freelancerId: 'FL-004',
        freelancerName: 'Brice Moundi',
        phone: '+237 650 00 11 22',
        commissionRate: 10,
        assignedMissionsCount: 23,
        status: 'TERMINATED',
        associatedAt: '2025-10-01',
        endedAt: '2026-01-31'
    }
];
const mockContracts = [
    {
        id: 'CTR-001',
        agencyId: 'AGN-001',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2021-03-20',
        remunerationType: 'MONTHLY_SALARY',
        rate: 120000,
        currency: 'XAF'
    },
    {
        id: 'CTR-002',
        agencyId: 'AGN-001',
        delivererId: 'DLV-002',
        delivererName: 'Martin Mbarga',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2021-05-10',
        remunerationType: 'MONTHLY_SALARY',
        rate: 115000,
        currency: 'XAF'
    },
    {
        id: 'CTR-003',
        agencyId: 'AGN-001',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2021-07-01',
        remunerationType: 'MIXED_SALARY_BONUS',
        rate: 130000,
        currency: 'XAF'
    },
    {
        id: 'CTR-004',
        agencyId: 'AGN-001',
        delivererId: 'DLV-005',
        delivererName: 'Carine Beyene',
        type: 'PART_TIME_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2022-01-08',
        endDate: '2026-12-31',
        remunerationType: 'FIXED_PER_DELIVERY',
        rate: 800,
        currency: 'XAF'
    },
    {
        id: 'CTR-005',
        agencyId: 'AGN-001',
        delivererId: 'DLV-006',
        delivererName: 'Patrick Abessolo',
        type: 'PERMANENT_EMPLOYEE',
        status: 'TERMINATED',
        startDate: '2022-04-20',
        endDate: '2026-03-15',
        remunerationType: 'MONTHLY_SALARY',
        rate: 100000,
        currency: 'XAF'
    },
    {
        id: 'CTR-006',
        agencyId: 'AGN-001',
        delivererId: 'DLV-007',
        delivererName: 'Alice Manga',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2022-02-10',
        remunerationType: 'MIXED_SALARY_BONUS',
        rate: 118000,
        currency: 'XAF'
    },
    {
        id: 'CTR-007',
        agencyId: 'AGN-001',
        delivererId: 'DLV-008',
        delivererName: 'Thierry Ngatcha',
        type: 'PERMANENT_EMPLOYEE',
        status: 'ACTIVE',
        startDate: '2022-06-01',
        remunerationType: 'MONTHLY_SALARY',
        rate: 112000,
        currency: 'XAF'
    }
];
const mockVehicles = [
    {
        id: 'VEH-001',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-4521-A',
        model: 'Yamaha FZ25',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-001',
        assignedDelivererName: 'Jean-Paul Essomba',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-02-10'
    },
    {
        id: 'VEH-002',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-8832-B',
        model: 'Honda CB125F',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-002',
        assignedDelivererName: 'Martin Mbarga',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-01-22'
    },
    {
        id: 'VEH-003',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-1145-C',
        model: 'Lifan KP150',
        type: 'MOTORCYCLE',
        status: 'AVAILABLE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-03-05'
    },
    {
        id: 'VEH-004',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-2210-C',
        model: 'Suzuki GN125',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-003',
        assignedDelivererName: 'Mireille Atangana',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-02-28'
    },
    {
        id: 'VEH-005',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-6643-D',
        model: 'Bajaj Boxer',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-005',
        assignedDelivererName: 'Carine Beyene',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-03-18'
    },
    {
        id: 'VEH-006',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-3390-E',
        model: 'Yamaha Crypton',
        type: 'MOTORCYCLE',
        status: 'IN_MAINTENANCE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-04-15'
    },
    {
        id: 'VEH-007',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-9901-E',
        model: 'Honda Wave',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-007',
        assignedDelivererName: 'Alice Manga',
        branchId: 'BRN-003',
        branchName: 'Makepe',
        lastMaintenanceDate: '2026-01-30'
    },
    {
        id: 'VEH-008',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-3317-F',
        model: 'Yamaha FZ-S',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        assignedDelivererId: 'DLV-008',
        assignedDelivererName: 'Thierry Ngatcha',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-03-01'
    },
    {
        id: 'VEH-009',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-7712-G',
        model: 'Suzuki Every',
        type: 'CAR',
        status: 'AVAILABLE',
        maxWeightKg: 500,
        maxVolumeM3: 3.5,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-02-20'
    },
    {
        id: 'VEH-010',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-5540-H',
        model: 'Toyota HiAce',
        type: 'CAR',
        status: 'AVAILABLE',
        maxWeightKg: 800,
        maxVolumeM3: 5.0,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-04-01'
    },
    {
        id: 'VEH-011',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-4429-I',
        model: 'Mitsubishi L300',
        type: 'CAR',
        status: 'IN_MAINTENANCE',
        maxWeightKg: 700,
        maxVolumeM3: 4.2,
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        lastMaintenanceDate: '2026-04-22'
    },
    {
        id: 'VEH-012',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-8801-J',
        model: 'Isuzu NPR',
        type: 'TRUCK_LIGHT',
        status: 'AVAILABLE',
        maxWeightKg: 3000,
        maxVolumeM3: 20.0,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2026-01-15'
    },
    {
        id: 'VEH-013',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-2270-K',
        model: 'Isuzu ELF',
        type: 'TRUCK_LIGHT',
        status: 'AVAILABLE',
        maxWeightKg: 2500,
        maxVolumeM3: 18.0,
        branchId: 'BRN-003',
        branchName: 'Makepe',
        lastMaintenanceDate: '2026-03-25'
    },
    {
        id: 'VEH-014',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-0033-L',
        model: 'Yamaha NMAX',
        type: 'MOTORCYCLE',
        status: 'AVAILABLE',
        maxWeightKg: 50,
        maxVolumeM3: 0.3,
        branchId: 'BRN-003',
        branchName: 'Makepe'
    },
    {
        id: 'VEH-015',
        agencyId: 'AGN-001',
        registrationNumber: 'LT-5591-M',
        model: 'TVS Apache',
        type: 'MOTORCYCLE',
        status: 'RETIRED',
        maxWeightKg: 40,
        maxVolumeM3: 0.25,
        branchId: 'BRN-001',
        branchName: 'Akwa',
        lastMaintenanceDate: '2025-11-30'
    }
];
const mockMissions = [
    {
        id: 'MSN-001',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0441',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        vehiclePlate: 'LT-4521-A',
        status: 'DELIVERED',
        priority: 'HIGH',
        senderName: 'CFAO Motors',
        recipientName: 'Bertrand Eloundou',
        recipientPhone: '+237 699 00 11 22',
        pickupAddress: 'Rue Drouot, Akwa',
        deliveryAddress: 'Cité SIC, Bépanda',
        scheduledPickupAt: '2026-04-28T08:00',
        scheduledDeliveryAt: '2026-04-28T10:00',
        actualPickupAt: '2026-04-28T08:12',
        actualDeliveryAt: '2026-04-28T09:47',
        packagesCount: 2,
        totalWeightKg: 4.5,
        sellingPrice: 3500,
        currency: 'XAF',
        createdAt: '2026-04-28T07:30'
    },
    {
        id: 'MSN-002',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        manifestNumber: 'MAN-2026-0440',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        vehiclePlate: 'LT-2210-C',
        status: 'DELIVERED',
        priority: 'NORMAL',
        senderName: 'Orange Cameroun',
        recipientName: 'Nadine Fouda',
        recipientPhone: '+237 670 22 33 44',
        pickupAddress: 'Bd de la Liberté, Bonapriso',
        deliveryAddress: 'Quartier Ange Raphaël',
        scheduledPickupAt: '2026-04-28T09:00',
        scheduledDeliveryAt: '2026-04-28T11:30',
        actualPickupAt: '2026-04-28T09:05',
        actualDeliveryAt: '2026-04-28T11:10',
        packagesCount: 1,
        totalWeightKg: 1.2,
        sellingPrice: 2000,
        currency: 'XAF',
        createdAt: '2026-04-28T08:00'
    },
    {
        id: 'MSN-003',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0439',
        status: 'PENDING',
        priority: 'URGENT',
        senderName: 'Pharmacie Centrale',
        recipientName: 'Dr. Sylvain Kouam',
        recipientPhone: '+237 655 44 55 66',
        pickupAddress: 'Rue Joss, Akwa',
        deliveryAddress: 'Hôpital Général de Douala',
        scheduledPickupAt: '2026-04-28T14:00',
        scheduledDeliveryAt: '2026-04-28T15:00',
        packagesCount: 1,
        totalWeightKg: 0.8,
        sellingPrice: 5000,
        currency: 'XAF',
        createdAt: '2026-04-28T13:00'
    },
    {
        id: 'MSN-004',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0438',
        status: 'ASSIGNED',
        priority: 'NORMAL',
        delivererId: 'DLV-008',
        delivererName: 'Thierry Ngatcha',
        vehiclePlate: 'LT-3317-F',
        senderName: 'SOCAM',
        recipientName: 'Rachel Ngo',
        recipientPhone: '+237 694 66 77 88',
        pickupAddress: 'Port de Douala, Zone industrielle',
        deliveryAddress: 'Rue des Palmiers, Bonanjo',
        scheduledPickupAt: '2026-04-28T15:00',
        scheduledDeliveryAt: '2026-04-28T17:00',
        packagesCount: 3,
        totalWeightKg: 12.5,
        sellingPrice: 7500,
        currency: 'XAF',
        createdAt: '2026-04-28T12:00'
    },
    {
        id: 'MSN-005',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0437',
        delivererId: 'DLV-002',
        delivererName: 'Martin Mbarga',
        vehiclePlate: 'LT-8832-B',
        status: 'IN_TRANSIT',
        priority: 'HIGH',
        senderName: 'Jumbo Score Akwa',
        recipientName: 'Madeleine Biyong',
        recipientPhone: '+237 675 88 99 00',
        pickupAddress: 'Supermarché Jumbo, Akwa',
        deliveryAddress: 'Rue Prince Bell, Deido',
        scheduledPickupAt: '2026-04-28T10:30',
        scheduledDeliveryAt: '2026-04-28T12:00',
        actualPickupAt: '2026-04-28T10:45',
        packagesCount: 4,
        totalWeightKg: 8.0,
        sellingPrice: 4500,
        currency: 'XAF',
        createdAt: '2026-04-28T09:30'
    },
    {
        id: 'MSN-006',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        manifestNumber: 'MAN-2026-0436',
        delivererId: 'DLV-005',
        delivererName: 'Carine Beyene',
        vehiclePlate: 'LT-6643-D',
        status: 'IN_TRANSIT',
        priority: 'NORMAL',
        senderName: 'Librairie des Peuples Noirs',
        recipientName: 'Josiane Kamto',
        recipientPhone: '+237 650 01 12 23',
        pickupAddress: 'Av. Kennedy, Bonapriso',
        deliveryAddress: 'École Publique Makepe',
        scheduledPickupAt: '2026-04-28T11:00',
        scheduledDeliveryAt: '2026-04-28T13:00',
        actualPickupAt: '2026-04-28T11:20',
        packagesCount: 2,
        totalWeightKg: 5.5,
        sellingPrice: 3000,
        currency: 'XAF',
        createdAt: '2026-04-28T10:00'
    },
    {
        id: 'MSN-007',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0435',
        status: 'AT_HUB',
        priority: 'NORMAL',
        targetHubId: 'HUB-001',
        targetHubName: 'Hub Central Akwa',
        senderName: 'Express Shipping CI',
        recipientName: 'Patrice Nzié',
        recipientPhone: '+237 691 23 45 00',
        pickupAddress: 'Gare Voyageurs de Bonabéri',
        deliveryAddress: 'Rue Njo-Njo, Douala',
        scheduledPickupAt: '2026-04-27T14:00',
        actualPickupAt: '2026-04-27T14:30',
        packagesCount: 1,
        totalWeightKg: 2.3,
        sellingPrice: 2500,
        currency: 'XAF',
        createdAt: '2026-04-27T12:00'
    },
    {
        id: 'MSN-008',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Makepe',
        manifestNumber: 'MAN-2026-0434',
        delivererId: 'DLV-007',
        delivererName: 'Alice Manga',
        vehiclePlate: 'LT-9901-E',
        status: 'IN_TRANSIT',
        priority: 'LOW',
        senderName: 'Ets. Ngando & Fils',
        recipientName: 'Claudette Nkengne',
        recipientPhone: '+237 677 34 45 56',
        pickupAddress: 'Carrefour Elf Makepe',
        deliveryAddress: 'Résidence Les Cocotiers, Logbessou',
        scheduledPickupAt: '2026-04-28T09:00',
        scheduledDeliveryAt: '2026-04-28T11:00',
        actualPickupAt: '2026-04-28T09:15',
        packagesCount: 2,
        totalWeightKg: 6.8,
        sellingPrice: 3200,
        currency: 'XAF',
        createdAt: '2026-04-28T08:00'
    },
    {
        id: 'MSN-009',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0433',
        status: 'DELIVERED',
        priority: 'NORMAL',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        senderName: 'Total Energies Akwa',
        recipientName: 'Entreprise Bamileke SARL',
        recipientPhone: '+237 699 56 67 78',
        pickupAddress: 'Station Total, Carrefour des Anciens Combattants',
        deliveryAddress: 'Marché Nkoulouloun',
        scheduledPickupAt: '2026-04-27T08:00',
        actualPickupAt: '2026-04-27T08:05',
        actualDeliveryAt: '2026-04-27T09:30',
        packagesCount: 5,
        totalWeightKg: 22.0,
        sellingPrice: 12000,
        currency: 'XAF',
        createdAt: '2026-04-27T07:00'
    },
    {
        id: 'MSN-010',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        manifestNumber: 'MAN-2026-0432',
        status: 'CANCELLED',
        priority: 'NORMAL',
        senderName: 'Boutique Elegance Mode',
        recipientName: 'Sylvie Etoundi',
        recipientPhone: '+237 655 78 89 90',
        pickupAddress: 'Rue des Écoles, Bonapriso',
        deliveryAddress: 'Immeuble La Grâce, Bali',
        scheduledPickupAt: '2026-04-27T16:00',
        packagesCount: 1,
        totalWeightKg: 1.5,
        sellingPrice: 2000,
        currency: 'XAF',
        createdAt: '2026-04-27T14:00'
    },
    {
        id: 'MSN-011',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0431',
        status: 'DELIVERED',
        priority: 'HIGH',
        delivererId: 'DLV-008',
        delivererName: 'Thierry Ngatcha',
        senderName: 'Imprimerie Nationale du Cameroun',
        recipientName: 'Mairie de Douala III',
        recipientPhone: '+237 233 40 01 50',
        pickupAddress: 'Immeuble INC, Bonanjo',
        deliveryAddress: 'Hôtel de Ville de Douala III',
        scheduledPickupAt: '2026-04-26T09:00',
        actualPickupAt: '2026-04-26T09:10',
        actualDeliveryAt: '2026-04-26T10:45',
        packagesCount: 8,
        totalWeightKg: 35.0,
        sellingPrice: 18000,
        currency: 'XAF',
        createdAt: '2026-04-26T08:00'
    },
    {
        id: 'MSN-012',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Makepe',
        manifestNumber: 'MAN-2026-0430',
        status: 'AT_HUB',
        priority: 'LOW',
        targetHubId: 'HUB-002',
        targetHubName: 'Hub Bonapriso',
        senderName: 'Chaussures Doualaises',
        recipientName: 'Edmond Tchoua',
        recipientPhone: '+237 677 90 01 12',
        pickupAddress: 'Carrefour Elf Makepe',
        deliveryAddress: 'Avenue Ahmadou Ahidjo',
        scheduledPickupAt: '2026-04-27T11:00',
        actualPickupAt: '2026-04-27T11:30',
        packagesCount: 2,
        totalWeightKg: 3.5,
        sellingPrice: 2800,
        currency: 'XAF',
        createdAt: '2026-04-27T09:00'
    },
    {
        id: 'MSN-013',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0429',
        status: 'DELIVERED',
        priority: 'URGENT',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        senderName: 'Clinique de la Caisse',
        recipientName: 'Armand Baloum',
        recipientPhone: '+237 681 12 23 34',
        pickupAddress: 'Clinique de la Caisse, Bonapriso',
        deliveryAddress: 'Quartier New Bell',
        scheduledPickupAt: '2026-04-26T07:00',
        actualPickupAt: '2026-04-26T07:02',
        actualDeliveryAt: '2026-04-26T07:52',
        packagesCount: 1,
        totalWeightKg: 0.5,
        sellingPrice: 6000,
        currency: 'XAF',
        createdAt: '2026-04-26T06:30'
    },
    {
        id: 'MSN-014',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Bonapriso',
        manifestNumber: 'MAN-2026-0428',
        status: 'FAILED',
        priority: 'NORMAL',
        delivererId: 'DLV-005',
        delivererName: 'Carine Beyene',
        senderName: 'Beauty House Douala',
        recipientName: 'Christelle Nguema',
        recipientPhone: '+237 694 34 45 56',
        pickupAddress: 'Rue Leclerc, Bonapriso',
        deliveryAddress: 'Résidence Palmier, Logpom',
        scheduledPickupAt: '2026-04-25T15:00',
        actualPickupAt: '2026-04-25T15:20',
        packagesCount: 1,
        totalWeightKg: 2.0,
        sellingPrice: 3500,
        currency: 'XAF',
        createdAt: '2026-04-25T13:00'
    },
    {
        id: 'MSN-015',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Akwa',
        manifestNumber: 'MAN-2026-0427',
        status: 'DRAFT',
        priority: 'NORMAL',
        senderName: 'Cabinet Juridique Mbendé',
        recipientName: 'Tribunal de Grande Instance',
        recipientPhone: '+237 233 42 34 56',
        pickupAddress: 'Immeuble Mbendé, Bonanjo',
        deliveryAddress: 'TGI du Wouri, Bonanjo',
        scheduledPickupAt: '2026-04-29T09:00',
        packagesCount: 1,
        totalWeightKg: 1.8,
        sellingPrice: 2500,
        currency: 'XAF',
        createdAt: '2026-04-28T16:00'
    }
];
const mockHubs = [
    {
        id: 'HUB-001',
        agencyId: 'AGN-001',
        branchId: 'BRN-001',
        branchName: 'Antenne Akwa (Siège)',
        name: 'Hub Central Akwa',
        address: '12 Rue Bebey Eyidi, Akwa',
        city: 'Douala',
        capacity: 50,
        currentOccupancy: 32,
        maxRetentionDays: 3,
        status: 'OPEN',
        managerName: 'Hyacinthe Nkoudou',
        managerPhone: '+237 699 10 20 30',
        openingHours: 'Lun–Sam 07h00–20h00'
    },
    {
        id: 'HUB-002',
        agencyId: 'AGN-001',
        branchId: 'BRN-002',
        branchName: 'Antenne Bonapriso',
        name: 'Hub Bonapriso',
        address: 'Av. Charles de Gaulle, Bonapriso',
        city: 'Douala',
        capacity: 30,
        currentOccupancy: 9,
        maxRetentionDays: 3,
        status: 'OPEN',
        managerName: 'Félicité Ngom',
        managerPhone: '+237 674 40 50 60',
        openingHours: 'Lun–Ven 08h00–19h00'
    },
    {
        id: 'HUB-003',
        agencyId: 'AGN-001',
        branchId: 'BRN-003',
        branchName: 'Antenne Makepe',
        name: 'Hub Makepe Logistique',
        address: 'Zone Industrielle Makepe, Entrepôt B',
        city: 'Douala',
        capacity: 40,
        currentOccupancy: 39,
        maxRetentionDays: 2,
        status: 'FULL',
        managerName: 'Léopold Simo',
        managerPhone: '+237 650 70 80 90',
        openingHours: 'Lun–Sam 07h30–18h30'
    }
];
const mockHubParcels = [
    {
        id: 'HPR-001',
        hubId: 'HUB-001',
        hubName: 'Hub Central Akwa',
        missionId: 'MSN-007',
        manifestNumber: 'MAN-2026-0435',
        trackingCode: 'TRK-20260427-0035',
        recipientName: 'Patrice Nzié',
        depositedAt: '2026-04-27T16:00',
        expectedWithdrawalDeadline: '2026-04-30T16:00',
        status: 'DEPOSITED'
    },
    {
        id: 'HPR-002',
        hubId: 'HUB-002',
        hubName: 'Hub Bonapriso',
        missionId: 'MSN-012',
        manifestNumber: 'MAN-2026-0430',
        trackingCode: 'TRK-20260427-0030',
        recipientName: 'Edmond Tchoua',
        depositedAt: '2026-04-27T14:00',
        expectedWithdrawalDeadline: '2026-04-30T14:00',
        status: 'DEPOSITED'
    },
    {
        id: 'HPR-003',
        hubId: 'HUB-001',
        hubName: 'Hub Central Akwa',
        missionId: 'MSN-020',
        manifestNumber: 'MAN-2026-0420',
        trackingCode: 'TRK-20260426-0020',
        recipientName: 'Aurélie Bella',
        depositedAt: '2026-04-26T10:00',
        expectedWithdrawalDeadline: '2026-04-29T10:00',
        withdrawnAt: '2026-04-27T09:00',
        withdrawnBy: 'Aurélie Bella (CNI: 123456)',
        status: 'WITHDRAWN'
    },
    {
        id: 'HPR-004',
        hubId: 'HUB-003',
        hubName: 'Hub Makepe Logistique',
        missionId: 'MSN-021',
        manifestNumber: 'MAN-2026-0410',
        trackingCode: 'TRK-20260425-0010',
        recipientName: 'Gérard Nyamsi',
        depositedAt: '2026-04-25T11:00',
        expectedWithdrawalDeadline: '2026-04-27T11:00',
        status: 'EXPIRED'
    },
    {
        id: 'HPR-005',
        hubId: 'HUB-001',
        hubName: 'Hub Central Akwa',
        missionId: 'MSN-022',
        manifestNumber: 'MAN-2026-0405',
        trackingCode: 'TRK-20260428-0042',
        recipientName: 'Florence Zang',
        depositedAt: '2026-04-28T08:30',
        expectedWithdrawalDeadline: '2026-05-01T08:30',
        status: 'DEPOSITED'
    }
];
const mockBillingPolicies = [
    {
        id: 'POL-001',
        agencyId: 'AGN-001',
        name: 'Tarif Standard 2025',
        description: 'Politique tarifaire par défaut applicable à toutes les livraisons standards.',
        isDefault: true,
        status: 'ACTIVE',
        validFrom: '2025-01-01',
        basePrice: 1500,
        perKmRate: 150,
        perKgRate: 200,
        currency: 'XAF',
        rulesCount: 5,
        promotionsCount: 2
    },
    {
        id: 'POL-002',
        agencyId: 'AGN-001',
        name: 'Express Premium',
        description: 'Tarification pour livraisons urgentes et express, avec surcharge horaire nuit.',
        isDefault: false,
        status: 'ACTIVE',
        validFrom: '2025-03-01',
        basePrice: 3000,
        perKmRate: 250,
        perKgRate: 300,
        currency: 'XAF',
        rulesCount: 8,
        promotionsCount: 0
    },
    {
        id: 'POL-003',
        agencyId: 'AGN-001',
        name: 'Tarif Entreprise Q1-2024',
        description: 'Politique tarifaire archivée du premier trimestre 2024.',
        isDefault: false,
        status: 'ARCHIVED',
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        basePrice: 1200,
        perKmRate: 120,
        perKgRate: 180,
        currency: 'XAF',
        rulesCount: 4,
        promotionsCount: 3
    }
];
const mockCommissions = [
    {
        id: 'COM-001',
        agencyId: 'AGN-001',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        missionId: 'MSN-001',
        manifestNumber: 'MAN-2026-0441',
        amount: 350,
        currency: 'XAF',
        status: 'VALIDATED',
        calculatedAt: '2026-04-28T10:00'
    },
    {
        id: 'COM-002',
        agencyId: 'AGN-001',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        missionId: 'MSN-002',
        manifestNumber: 'MAN-2026-0440',
        amount: 200,
        currency: 'XAF',
        status: 'CALCULATED',
        calculatedAt: '2026-04-28T11:15'
    },
    {
        id: 'COM-003',
        agencyId: 'AGN-001',
        delivererId: 'DLV-001',
        delivererName: 'Jean-Paul Essomba',
        missionId: 'MSN-009',
        manifestNumber: 'MAN-2026-0433',
        amount: 1200,
        currency: 'XAF',
        status: 'PAID',
        calculatedAt: '2026-04-27T09:35',
        paidAt: '2026-04-27T18:00'
    },
    {
        id: 'COM-004',
        agencyId: 'AGN-001',
        delivererId: 'DLV-008',
        delivererName: 'Thierry Ngatcha',
        missionId: 'MSN-011',
        manifestNumber: 'MAN-2026-0431',
        amount: 1800,
        currency: 'XAF',
        status: 'PAID',
        calculatedAt: '2026-04-26T10:50',
        paidAt: '2026-04-26T18:00'
    },
    {
        id: 'COM-005',
        agencyId: 'AGN-001',
        delivererId: 'DLV-005',
        delivererName: 'Carine Beyene',
        missionId: 'MSN-014',
        manifestNumber: 'MAN-2026-0428',
        amount: 350,
        currency: 'XAF',
        status: 'DISPUTED',
        calculatedAt: '2026-04-25T16:00'
    },
    {
        id: 'COM-006',
        agencyId: 'AGN-001',
        delivererId: 'DLV-003',
        delivererName: 'Mireille Atangana',
        missionId: 'MSN-013',
        manifestNumber: 'MAN-2026-0429',
        amount: 600,
        currency: 'XAF',
        status: 'PAID',
        calculatedAt: '2026-04-26T07:55',
        paidAt: '2026-04-26T18:00'
    }
];
const missionStatusCounts = {
    DRAFT: mockMissions.filter((m)=>m.status === 'DRAFT').length,
    PENDING: mockMissions.filter((m)=>m.status === 'PENDING').length,
    ASSIGNED: mockMissions.filter((m)=>m.status === 'ASSIGNED').length,
    IN_TRANSIT: mockMissions.filter((m)=>m.status === 'IN_TRANSIT').length,
    AT_HUB: mockMissions.filter((m)=>m.status === 'AT_HUB').length,
    DELIVERED: mockMissions.filter((m)=>m.status === 'DELIVERED').length,
    FAILED: mockMissions.filter((m)=>m.status === 'FAILED').length,
    CANCELLED: mockMissions.filter((m)=>m.status === 'CANCELLED').length
};
}}),
"[project]/lib/api/envelope.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/** Backend envelope (Agency + Branch controllers) */ __turbopack_context__.s({
    "isApiEnvelope": (()=>isApiEnvelope),
    "unwrapApiData": (()=>unwrapApiData)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-ssr] (ecmascript)");
;
function isApiEnvelope(value) {
    return typeof value === 'object' && value !== null && 'status' in value && 'data' in value;
}
function unwrapApiData(body) {
    if (isApiEnvelope(body)) {
        if (body.status === 'ERROR' || body.error) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUserError"])({
                message: body.error?.message ?? ''
            }, 'Le serveur n\'a pas pu traiter votre demande. Réessayez.'));
        }
        return body.data;
    }
    return body;
}
}}),
"[project]/lib/api/client.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "apiClient": (()=>apiClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$envelope$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/envelope.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-ssr] (ecmascript)");
;
;
;
function readSession(key, fallback) {
    if ("TURBOPACK compile-time truthy", 1) return fallback;
    "TURBOPACK unreachable";
}
function getAuthHeaders() {
    if ("TURBOPACK compile-time truthy", 1) return {};
    "TURBOPACK unreachable";
    const token = undefined;
}
function buildHeaders(options, tenantId) {
    const tid = tenantId ?? readSession('tnt-tenant-id', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_TENANT_ID"]);
    const aid = readSession('tnt-agency-id', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_AGENCY_ID"]);
    const uid = readSession('tnt-user-id', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_USER_ID"]);
    return {
        'Content-Type': 'application/json',
        'X-Tenant-Id': tid,
        'X-Agency-Id': aid,
        'X-User-Id': uid,
        ...getAuthHeaders(),
        ...options.headers
    };
}
function toApiError(status, rawMessage, fallback) {
    return {
        status,
        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUserError"])({
            status,
            message: rawMessage
        }, fallback)
    };
}
async function request(path, options = {}, overrideTenantId) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    let res;
    try {
        res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"]}${normalizedPath}`, {
            ...options,
            headers: buildHeaders(options, overrideTenantId)
        });
    } catch  {
        throw toApiError(0, 'network', 'Impossible de joindre le serveur. Vérifiez votre connexion internet et réessayez.');
    }
    if (res.status === 401) {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        throw toApiError(401, '', 'Votre session a expiré. Veuillez vous reconnecter.');
    }
    if (!res.ok) {
        const body = await res.json().catch(()=>({}));
        const raw = body?.error?.message ?? body?.message ?? '';
        throw toApiError(res.status, raw, 'Une erreur est survenue lors de la communication avec le serveur.');
    }
    if (res.status === 204) return undefined;
    const json = await res.json();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$envelope$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unwrapApiData"])(json);
}
async function upload(path, file, overrideTenantId) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const form = new FormData();
    form.append('file', file);
    const tid = overrideTenantId ?? readSession('tnt-tenant-id', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_TENANT_ID"]);
    const aid = readSession('tnt-agency-id', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_AGENCY_ID"]);
    const uid = readSession('tnt-user-id', __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_USER_ID"]);
    let res;
    try {
        res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"]}${normalizedPath}`, {
            method: 'POST',
            headers: {
                'X-Tenant-Id': tid,
                'X-Agency-Id': aid,
                'X-User-Id': uid,
                ...getAuthHeaders()
            },
            body: form
        });
    } catch  {
        throw toApiError(0, 'network', 'Impossible d\'envoyer le fichier. Vérifiez votre connexion et réessayez.');
    }
    if (res.status === 401) {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        throw toApiError(401, '', 'Votre session a expiré. Veuillez vous reconnecter.');
    }
    if (!res.ok) {
        const body = await res.json().catch(()=>({}));
        const raw = body?.error?.message ?? body?.message ?? '';
        throw toApiError(res.status, raw, 'L\'envoi du fichier a échoué. Réessayez avec un autre fichier.');
    }
    if (res.status === 204) return undefined;
    const json = await res.json();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$envelope$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unwrapApiData"])(json);
}
const apiClient = {
    get: (path, tenantId)=>request(path, {
            method: 'GET'
        }, tenantId),
    post: (path, body, tenantId)=>request(path, {
            method: 'POST',
            body: JSON.stringify(body)
        }, tenantId),
    patch: (path, body, tenantId)=>request(path, {
            method: 'PATCH',
            body: JSON.stringify(body)
        }, tenantId),
    delete: (path, tenantId)=>request(path, {
            method: 'DELETE'
        }, tenantId),
    upload: (path, file, tenantId)=>upload(path, file, tenantId)
};
}}),
"[project]/lib/staff-utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "BRANCH_MANAGER_ROLES": (()=>BRANCH_MANAGER_ROLES),
    "STAFF_ROLE_LABELS": (()=>STAFF_ROLE_LABELS),
    "getEligibleBranchManagers": (()=>getEligibleBranchManagers),
    "staffMemberToManagerFields": (()=>staffMemberToManagerFields)
});
const STAFF_ROLE_LABELS = {
    AGENCY_MANAGER: 'Directeur d\'agence',
    BRANCH_MANAGER: 'Responsable d\'antenne',
    OPERATIONS_MANAGER: 'Responsable opérations',
    ACCOUNTANT: 'Comptable',
    DISPATCHER: 'Dispatcher'
};
const BRANCH_MANAGER_ROLES = [
    'AGENCY_MANAGER',
    'BRANCH_MANAGER',
    'OPERATIONS_MANAGER'
];
function getEligibleBranchManagers(members) {
    return members.filter((m)=>m.status === 'ACTIVE' && BRANCH_MANAGER_ROLES.includes(m.role));
}
function staffMemberToManagerFields(member) {
    if (!member) {
        return {
            managerId: undefined,
            managerName: undefined,
            managerEmail: undefined,
            managerPhone: undefined
        };
    }
    return {
        managerId: member.id,
        managerName: member.fullName,
        managerEmail: member.email,
        managerPhone: member.phone
    };
}
}}),
"[project]/lib/displayLabels.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "agencySubtitle": (()=>agencySubtitle),
    "branchCardMeta": (()=>branchCardMeta),
    "branchDrawerDescription": (()=>branchDrawerDescription),
    "commissionTitle": (()=>commissionTitle),
    "contractRef": (()=>contractRef),
    "contractTitle": (()=>contractTitle),
    "delivererDisplayName": (()=>delivererDisplayName),
    "freelancerDescription": (()=>freelancerDescription),
    "manifestDisplay": (()=>manifestDisplay),
    "missionSubtitle": (()=>missionSubtitle),
    "parcelStatusLabel": (()=>parcelStatusLabel),
    "policyMeta": (()=>policyMeta),
    "safeLabel": (()=>safeLabel),
    "staffDescription": (()=>staffDescription)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/staff-utils.ts [app-ssr] (ecmascript)");
;
;
function safeLabel(value, fallback) {
    if (!value || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUuid"])(value)) return fallback;
    return value;
}
function agencySubtitle(agency) {
    if (agency.registrationNumber) return agency.registrationNumber;
    return [
        agency.city,
        agency.country
    ].filter(Boolean).join(', ') || agency.name;
}
function branchCardMeta(branch) {
    return [
        branch.city,
        branch.openingHours
    ].filter(Boolean).join(' · ');
}
function branchDrawerDescription(branch) {
    return branch.city || branch.address || 'Antenne';
}
function missionSubtitle(mission) {
    const date = mission.createdAt ? new Date(mission.createdAt).toLocaleDateString('fr-FR') : '';
    return [
        mission.branchName,
        date
    ].filter(Boolean).join(' · ') || 'Mission';
}
function contractTitle(contract) {
    return contract.delivererName ? `Contrat — ${contract.delivererName}` : 'Contrat de travail';
}
function contractRef(contract) {
    const date = contract.startDate ? new Date(contract.startDate).toLocaleDateString('fr-FR') : '';
    if (contract.delivererName && date) return `${contract.delivererName} · ${date}`;
    return contract.delivererName || 'Contrat';
}
function commissionTitle(commission) {
    if (commission.manifestNumber) return `Commission — ${commission.manifestNumber}`;
    return commission.delivererName ? `Commission — ${commission.delivererName}` : 'Commission';
}
function staffDescription(member) {
    const role = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STAFF_ROLE_LABELS"][member.role] ?? member.role;
    return member.branchName ? `${role} · ${member.branchName}` : role;
}
function freelancerDescription(f) {
    return f.phone ? `Freelancer · ${f.phone}` : 'Freelancer associé';
}
function policyMeta(policy) {
    const parts = [];
    if (policy.validFrom) {
        parts.push(`Active depuis le ${new Date(policy.validFrom).toLocaleDateString('fr-FR')}`);
    }
    if (policy.validTo) {
        parts.push(`Expire le ${new Date(policy.validTo).toLocaleDateString('fr-FR')}`);
    }
    return parts.join(' · ');
}
function delivererDisplayName(name) {
    return safeLabel(name, 'Livreur');
}
function manifestDisplay(manifest) {
    return safeLabel(manifest, 'Bordereau en cours');
}
const PARCEL_STATUS_LABELS = {
    DEPOSITED: 'Déposé au hub — en attente de retrait',
    WITHDRAWN: 'Retiré par le destinataire',
    EXPIRED: 'Délai de retrait dépassé',
    RETURNED_TO_AGENCY: 'Retourné à l\'agence'
};
function parcelStatusLabel(status) {
    return PARCEL_STATUS_LABELS[status] ?? 'Statut inconnu';
}
}}),
"[project]/lib/api/mappers.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Mappers: DTO backend → types frontend
 *
 * Divergences enum à gérer :
 *   VehicleStatus : backend ASSIGNED  → frontend IN_USE
 *   VehicleType   : backend VAN       → frontend TRUCK_LIGHT
 *                   backend TRUCK     → frontend TRUCK_HEAVY
 *   HubStatus     : backend ACTIVE    → frontend OPEN
 */ __turbopack_context__.s({
    "mapAgency": (()=>mapAgency),
    "mapBillingPolicy": (()=>mapBillingPolicy),
    "mapBranch": (()=>mapBranch),
    "mapCommission": (()=>mapCommission),
    "mapContract": (()=>mapContract),
    "mapDeliverer": (()=>mapDeliverer),
    "mapFreelancer": (()=>mapFreelancer),
    "mapHub": (()=>mapHub),
    "mapHubParcelRecord": (()=>mapHubParcelRecord),
    "mapMission": (()=>mapMission),
    "mapVehicle": (()=>mapVehicle),
    "toBackendHubStatus": (()=>toBackendHubStatus),
    "toBackendVehicleStatus": (()=>toBackendVehicleStatus),
    "toBackendVehicleType": (()=>toBackendVehicleType)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/displayLabels.ts [app-ssr] (ecmascript)");
;
// ── Enum mappers ──────────────────────────────────────────
function mapVehicleStatus(s) {
    if (s === 'ASSIGNED') return 'IN_USE';
    return s;
}
function mapVehicleType(t) {
    if (t === 'VAN') return 'TRUCK_LIGHT';
    if (t === 'TRUCK') return 'TRUCK_HEAVY';
    return t;
}
function mapHubStatus(s) {
    if (s === 'ACTIVE') return 'OPEN';
    return s;
}
function toBackendVehicleStatus(s) {
    if (s === 'IN_USE') return 'ASSIGNED';
    return s;
}
function toBackendVehicleType(t) {
    if (t === 'TRUCK_LIGHT') return 'VAN';
    if (t === 'TRUCK_HEAVY') return 'TRUCK';
    return t;
}
function toBackendHubStatus(s) {
    if (s === 'OPEN') return 'ACTIVE';
    return s;
}
function mapAgency(dto) {
    const addr = dto.address;
    return {
        id: dto.id,
        name: dto.name,
        legalName: dto.name,
        registrationNumber: dto.registrationNumber,
        type: dto.type,
        status: dto.status,
        phone: dto.contactPhone,
        email: dto.contactEmail,
        address: addr ? [
            addr.street,
            addr.quarter
        ].filter(Boolean).join(', ') || addr.city : '',
        city: addr?.city ?? '',
        country: addr?.country ?? 'CM',
        createdAt: dto.createdAt?.slice?.(0, 10) ?? String(dto.createdAt),
        defaultCurrency: dto.settings?.defaultCurrency ?? 'XAF',
        autoAssignMissions: dto.settings?.autoAssignMissions ?? false,
        maxAssociatedFreelancers: 20,
        maxActiveBranches: dto.settings?.maxActiveBranches ?? 10,
        defaultCommissionRate: dto.settings?.defaultCommissionRate ? Number(dto.settings.defaultCommissionRate) : 0.1,
        hubRetentionDelayHours: dto.settings?.hubRetentionDelayHours ?? 72,
        allowFreelancerAssociation: dto.settings?.allowFreelancerAssociation ?? false
    };
}
function mapBranch(dto) {
    const city = dto.address?.city ?? dto.city ?? '';
    const country = dto.address?.country ?? dto.country ?? 'CM';
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        name: dto.name,
        address: [
            dto.address?.street,
            dto.address?.quarter
        ].filter(Boolean).join(', ') || city,
        city,
        isHeadquarters: false,
        managerId: dto.managerId,
        managerName: dto.managerName,
        status: dto.status,
        openingHours: dto.openingHours ?? '08:00–18:00',
        deliverersCount: dto.deliverersCount ?? 0,
        createdAt: dto.createdAt?.slice(0, 10) ?? ''
    };
}
function mapDeliverer(dto) {
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        branchId: dto.branchId,
        branchName: dto.branchName,
        fullName: dto.fullName ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["delivererDisplayName"])(dto.fullName) : 'Livreur sans nom',
        phone: dto.phone ?? '',
        email: dto.email ?? '',
        type: dto.delivererType ?? 'PERMANENT',
        status: dto.status,
        rating: dto.rating ?? 0,
        totalMissions: dto.totalMissions ?? 0,
        vehicleId: dto.vehicleId,
        vehiclePlate: dto.vehiclePlate,
        joinedAt: dto.joinedAt?.slice(0, 10) ?? ''
    };
}
function mapContract(dto) {
    const rate = dto.baseSalary ?? (dto.commissionRate ? Number(dto.commissionRate) * 100 : 0);
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        delivererId: dto.delivererId,
        delivererName: dto.delivererName ?? '',
        type: dto.contractType,
        status: dto.status,
        startDate: dto.startDate,
        endDate: dto.endDate,
        remunerationType: dto.remunerationModel,
        rate,
        currency: dto.currency ?? 'XAF',
        terms: dto.terms
    };
}
function mapVehicle(dto) {
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        registrationNumber: dto.registrationNumber ?? dto.licensePlate ?? '',
        model: dto.model ?? dto.brand ?? '',
        type: mapVehicleType(dto.vehicleType),
        status: mapVehicleStatus(dto.status),
        maxWeightKg: dto.maxWeightKg ?? 0,
        maxVolumeM3: dto.maxVolumeM3 ?? 0,
        assignedDelivererId: dto.assignedDelivererId,
        assignedDelivererName: dto.assignedDelivererName,
        branchId: dto.branchId,
        branchName: dto.branchName,
        lastMaintenanceDate: dto.lastMaintenanceDate
    };
}
function mapMission(dto) {
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        branchId: dto.branchId ?? '',
        branchName: dto.branchName ?? '',
        manifestNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["manifestDisplay"])(dto.manifestNumber),
        delivererId: dto.assignedDelivererId,
        delivererName: dto.assignedDelivererName,
        vehiclePlate: dto.vehiclePlate,
        status: dto.status,
        priority: dto.priority ?? 'NORMAL',
        senderName: dto.senderName ?? '',
        recipientName: dto.recipientName ?? '',
        recipientPhone: dto.recipientPhone ?? '',
        pickupAddress: dto.pickupAddress ?? '',
        deliveryAddress: dto.deliveryAddress ?? '',
        scheduledPickupAt: dto.scheduledPickupAt ?? dto.scheduledAt ?? '',
        scheduledDeliveryAt: dto.scheduledDeliveryAt,
        actualPickupAt: dto.actualPickupAt ?? dto.startedAt,
        actualDeliveryAt: dto.actualDeliveryAt ?? dto.completedAt,
        packagesCount: dto.packagesCount ?? 1,
        totalWeightKg: dto.totalWeightKg ?? 0,
        sellingPrice: dto.sellingPrice ?? 0,
        currency: dto.currency ?? 'XAF',
        targetHubId: dto.targetHubId,
        targetHubName: dto.targetHubName,
        createdAt: dto.createdAt?.slice(0, 10) ?? ''
    };
}
function mapHub(dto) {
    const city = dto.address?.city ?? dto.city ?? '';
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        branchId: dto.branchId,
        branchName: dto.branchName,
        name: dto.name,
        address: [
            dto.address?.street,
            dto.address?.quarter
        ].filter(Boolean).join(', ') || city,
        city,
        capacity: dto.capacityUnits ?? dto.capacity ?? 0,
        currentOccupancy: dto.currentOccupancy ?? 0,
        maxRetentionDays: dto.retentionDelayHours ? Math.max(1, Math.round(dto.retentionDelayHours / 24)) : 3,
        status: mapHubStatus(dto.status),
        managerName: dto.managerName,
        managerPhone: dto.managerPhone,
        openingHours: dto.openingHours ?? '08:00–18:00'
    };
}
function mapHubParcelRecord(dto) {
    return {
        id: dto.id,
        hubId: dto.hubId,
        hubName: dto.hubName,
        missionId: dto.missionId,
        manifestNumber: dto.manifestNumber,
        trackingCode: dto.trackingCode,
        recipientName: dto.recipientName,
        depositedAt: dto.depositedAt,
        expectedWithdrawalDeadline: dto.withdrawalDeadline,
        withdrawnAt: dto.withdrawnAt,
        withdrawnBy: dto.withdrawnBy,
        status: dto.status
    };
}
function mapBillingPolicy(dto) {
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        name: dto.name,
        description: dto.description,
        isDefault: dto.isDefault ?? false,
        status: dto.status,
        validFrom: dto.validFrom ?? dto.createdAt?.slice(0, 10) ?? '',
        validTo: dto.validTo,
        basePrice: dto.basePrice ?? 0,
        perKmRate: dto.perKmRate ?? dto.pricePerKm ?? 0,
        perKgRate: dto.perKgRate ?? dto.pricePerKg ?? 0,
        currency: dto.currency,
        rulesCount: dto.rulesCount ?? 0,
        promotionsCount: dto.promotionsCount ?? 0
    };
}
function mapFreelancer(dto) {
    const rate = typeof dto.commissionRate === 'number' ? dto.commissionRate <= 1 ? dto.commissionRate * 100 : dto.commissionRate : 0;
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        freelancerId: dto.freelancerActorId,
        freelancerName: dto.freelancerName ?? dto.phone ?? 'Freelancer associé',
        phone: dto.phone ?? '',
        commissionRate: rate,
        assignedMissionsCount: dto.assignedMissionsCount ?? 0,
        status: dto.status,
        associatedAt: dto.associatedAt ?? dto.startDate ?? ''
    };
}
function mapCommission(dto) {
    return {
        id: dto.id,
        agencyId: dto.agencyId,
        delivererId: dto.delivererId,
        delivererName: dto.delivererName,
        missionId: dto.missionId ?? '',
        manifestNumber: dto.manifestNumber ?? '',
        amount: dto.amount,
        currency: dto.currency,
        status: dto.status,
        calculatedAt: dto.createdAt,
        paidAt: dto.paidAt
    };
}
}}),
"[project]/lib/services/branchService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "branchService": (()=>branchService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/staff-utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
const branchService = {
    async getBranches (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/branches`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBranch"]);
    },
    async getBranch (branchId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"].find((b)=>b.id === branchId) ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"][0];
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/branches/${branchId}`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBranch"])(dto);
    },
    async createBranch (agencyId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            const manager = data.managerId ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].find((m)=>m.id === data.managerId) : undefined;
            const id = `BRN-${String(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"].length + 1).padStart(3, '0')}`;
            const branch = {
                id,
                agencyId: 'AGN-001',
                name: data.name,
                address: data.street ?? '',
                city: data.city,
                isHeadquarters: data.isHeadquarters ?? false,
                status: data.status ?? 'OPEN',
                openingHours: data.openingHours ?? 'Lun–Sam 08h00–18h00',
                deliverersCount: 0,
                createdAt: new Date().toISOString().slice(0, 10),
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staffMemberToManagerFields"])(manager)
            };
            if (manager && data.managerId) {
                manager.branchId = id;
                manager.branchName = data.name;
                if (manager.role === 'AGENCY_MANAGER') manager.role = 'BRANCH_MANAGER';
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"].push(branch);
            return branch;
        }
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/branches`, {
            name: data.name,
            code: data.code,
            address: {
                city: data.city,
                country: data.country,
                street: data.street,
                region: data.region
            }
        });
        const branch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapBranch"])(dto);
        if (data.managerId) {
            await this.assignManager(branch.id, data.managerId);
            return this.getBranch(branch.id);
        }
        return branch;
    },
    async updateBranch (branchId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            const idx = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"].findIndex((b)=>b.id === branchId);
            if (idx >= 0) __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"][idx] = {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"][idx],
                ...data
            };
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/branches/${branchId}`, {
            name: data.name,
            address: {
                city: data.city,
                country: 'CM',
                street: data.address
            }
        });
    },
    async assignManager (branchId, managerId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            const branch = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"].find((b)=>b.id === branchId);
            const manager = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].find((m)=>m.id === managerId);
            if (!branch) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].forEach((m)=>{
                if (m.branchId === branchId && m.id !== managerId) {
                    m.branchId = undefined;
                    m.branchName = undefined;
                }
            });
            if (manager) {
                manager.branchId = branchId;
                manager.branchName = branch.name;
                if (manager.role === 'AGENCY_MANAGER') manager.role = 'BRANCH_MANAGER';
                Object.assign(branch, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staffMemberToManagerFields"])(manager));
            }
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/branches/${branchId}/manager?managerId=${encodeURIComponent(managerId)}`, {});
    },
    async clearManager (branchId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            const branch = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"].find((b)=>b.id === branchId);
            if (!branch) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].forEach((m)=>{
                if (m.branchId === branchId) {
                    m.branchId = undefined;
                    m.branchName = undefined;
                }
            });
            branch.managerId = undefined;
            branch.managerName = undefined;
            branch.managerEmail = undefined;
            branch.managerPhone = undefined;
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/branches/${branchId}/manager`);
    },
    async closeBranch (branchId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/branches/${branchId}`);
    },
    async temporarilyCloseBranch (branchId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/branches/${branchId}/status?status=TEMPORARILY_CLOSED`, {});
    },
    async reopenBranch (branchId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/branches/${branchId}/status?status=OPEN`, {});
    }
};
}}),
"[project]/lib/services/staffService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "staffService": (()=>staffService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const staffService = {
    async getStaffMembers (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/staff`);
    },
    async registerStaffMember (agencyId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            const id = `MGR-${String(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].length).padStart(3, '0')}`;
            const branch = data.branchId ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"].find((b)=>b.id === data.branchId) : undefined;
            const member = {
                id,
                agencyId: 'AGN-001',
                fullName: data.fullName,
                phone: data.phone,
                email: data.email ?? '',
                role: data.role,
                status: 'ACTIVE',
                joinedAt: new Date().toISOString().slice(0, 10),
                ...branch ? {
                    branchId: branch.id,
                    branchName: branch.name
                } : {}
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].push(member);
            return member;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/staff`, data);
    },
    async updateStaffMember (memberId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            const member = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].find((m)=>m.id === memberId);
            if (!member) return;
            if (data.fullName !== undefined) member.fullName = data.fullName;
            if (data.phone !== undefined) member.phone = data.phone;
            if (data.email !== undefined) member.email = data.email;
            if (data.role !== undefined) member.role = data.role;
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/staff/${memberId}`, data);
    },
    async suspendStaffMember (memberId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            const member = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].find((m)=>m.id === memberId);
            if (member) member.status = 'SUSPENDED';
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/staff/${memberId}/suspend`, {});
    },
    async reactivateStaffMember (memberId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            const member = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"].find((m)=>m.id === memberId);
            if (member) member.status = 'ACTIVE';
            return;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/staff/${memberId}/reactivate`, {});
    },
    async getDeliverers (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockDeliverers"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/deliverers`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapDeliverer"]);
    },
    async registerDeliverer (agencyId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockDeliverers"][0];
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/deliverers`, {
            ...data.actorId ? {
                actorId: data.actorId
            } : {},
            fullName: data.fullName,
            phone: data.phone,
            ...data.email ? {
                email: data.email
            } : {}
        });
        const deliverer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapDeliverer"])(dto);
        if (data.branchId) {
            await this.attachToBranch(deliverer.id, data.branchId);
        }
        return deliverer;
    },
    async suspendDeliverer (delivererId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/deliverers/${delivererId}/suspend`, {});
    },
    async reactivateDeliverer (delivererId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/deliverers/${delivererId}/reactivate`, {});
    },
    async attachToBranch (delivererId, branchId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/deliverers/${delivererId}/branch`, {
            branchId
        });
    },
    async getContracts (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockContracts"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/contracts`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapContract"]);
    },
    async createContract (delivererId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockContracts"][0];
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/deliverers/${delivererId}/contracts`, {
            agencyId: data.agencyId,
            contractType: data.contractType,
            startDate: data.startDate,
            endDate: data.endDate,
            remunerationModel: data.remunerationModel,
            baseSalary: data.baseSalary,
            commissionRate: data.commissionRate
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapContract"])(dto);
    },
    async terminateContract (delivererId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].delete(`/deliverers/${delivererId}/contracts/active`);
    },
    async renewContract (contractId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/contracts/${contractId}/renew`, {
            endDate: data.endDate
        });
    },
    async getCommissions (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockCommissions"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/commissions`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapCommission"]);
    },
    async payCommission (commissionId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/commissions/${commissionId}/pay`, {});
    },
    async disputeCommission (commissionId, reason) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/commissions/${commissionId}/dispute`, {
            reason
        });
    },
    async getFreelancers (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFreelancers"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/freelancers`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapFreelancer"]);
    },
    async associateFreelancer (agencyId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFreelancers"][0];
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/freelancers`, {
            freelancerActorId: data.freelancerActorId,
            commissionRate: data.commissionRate / 100,
            startDate: data.startDate
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapFreelancer"])(dto);
    },
    async terminateFreelancer (associationId, endDate) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/freelancers/associations/${associationId}/end`, {
            endDate: endDate ?? new Date().toISOString().slice(0, 10)
        });
    },
    async suspendFreelancer (associationId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/freelancers/associations/${associationId}/pause`, {});
    },
    async cancelFreelancerInvitation (associationId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/freelancers/associations/${associationId}/cancel`, {});
    }
};
}}),
"[project]/lib/services/fleetService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fleetService": (()=>fleetService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const fleetService = {
    async getVehicles (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockVehicles"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/vehicles`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapVehicle"]);
    },
    async addVehicle (agencyId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockVehicles"][0];
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/vehicles`, {
            branchId: data.branchId,
            licensePlate: data.registrationNumber,
            brand: data.brand ?? data.model,
            model: data.model,
            year: data.year ?? new Date().getFullYear(),
            vehicleType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBackendVehicleType"])(data.vehicleType)
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapVehicle"])(dto);
    },
    async assignDeliverer (vehicleId, delivererId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/assign`, {
            delivererId
        });
    },
    async unassignDeliverer (vehicleId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/unassign`, {});
    },
    async sendToMaintenance (vehicleId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/maintenance`, {});
    },
    async returnFromMaintenance (vehicleId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/maintenance/return`, {});
    },
    async retireVehicle (vehicleId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/retire`, {});
    }
};
}}),
"[project]/lib/services/hubService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "hubService": (()=>hubService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const hubService = {
    async getHubs (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubs"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/hubs`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapHub"]);
    },
    async getHub (hubId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubs"].find((h)=>h.id === hubId) ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubs"][0];
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/hubs/${hubId}`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapHub"])(dto);
    },
    async createHub (agencyId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubs"][0],
            id: crypto.randomUUID(),
            name: data.name
        };
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/hubs`, {
            branchId: data.branchId,
            name: data.name,
            code: data.code,
            addrCity: data.city,
            addrCountry: data.country,
            addrStreet: data.street,
            latitude: data.latitude,
            longitude: data.longitude,
            capacityUnits: data.capacityUnits,
            retentionDelayHours: data.retentionDelayHours ?? 72,
            openingHours: data.openingHours
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapHub"])(dto);
    },
    async updateHubStatus (hubId, status) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/hubs/${hubId}/status`, {
            status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBackendHubStatus"])(status)
        });
    },
    async getParcelRecords (hubId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubParcels"].filter((p)=>p.hubId === hubId);
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/hubs/${hubId}/parcels`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapHubParcelRecord"]);
    },
    async getAllParcelRecords (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubParcels"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const hubs = await hubService.getHubs(id);
        const records = await Promise.all(hubs.map((h)=>hubService.getParcelRecords(h.id)));
        return records.flat();
    },
    async depositParcel (hubId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubParcels"][0];
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/hubs/${hubId}/parcels`, {
            missionId: data.missionId,
            packageId: data.packageId,
            trackingCode: data.trackingCode
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapHubParcelRecord"])(dto);
    },
    async withdrawParcel (hubId, recordId, withdrawnBy) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/hubs/${hubId}/parcels/${recordId}/withdraw`, {
            withdrawnBy,
            identityVerified: true
        });
    },
    async processExpired (_hubId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post('/hubs/expired', {});
    }
};
}}),
"[project]/lib/services/missionService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "missionService": (()=>missionService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const missionService = {
    async getMissions (agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockMissions"];
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/missions`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapMission"]);
    },
    async getMission (missionId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockMissions"].find((m)=>m.id === missionId) ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockMissions"][0];
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].get(`/missions/${missionId}`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapMission"])(dto);
    },
    async createMission (agencyId, data) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockMissions"][0],
            id: crypto.randomUUID()
        };
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/missions`, {
            ...data.coreMissionId ? {
                coreMissionId: data.coreMissionId
            } : {},
            scheduledAt: data.scheduledPickupAt,
            pickupAddress: data.pickupAddress,
            deliveryAddress: data.deliveryAddress,
            senderName: data.senderName,
            recipientName: data.recipientName,
            recipientPhone: data.recipientPhone,
            weightKg: data.totalWeightKg
        });
        let mission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapMission"])(dto);
        if (data.delivererId) {
            await this.assignMission(mission.id, data.delivererId, data.vehicleId ?? data.delivererId);
            mission = await this.getMission(mission.id);
        }
        return mission;
    },
    async assignMission (missionId, delivererId, vehicleId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/missions/${missionId}/assign`, {
            delivererId,
            vehicleId
        });
    },
    async reassignMission (missionId, delivererId, vehicleId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/missions/${missionId}/reassign`, {
            delivererId,
            vehicleId
        });
    },
    async cancelMission (missionId, reason) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/missions/${missionId}/cancel`, {
            reason
        });
    },
    async rescheduleMission (missionId, scheduledPickupAt) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].patch(`/missions/${missionId}/reschedule`, {
            newScheduledAt: scheduledPickupAt
        });
    },
    async depositAtHub (missionId, hubId, delivererId, trackingCode) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].post(`/missions/${missionId}/deposit-hub`, {
            hubId,
            delivererId,
            trackingCode
        });
    },
    async withdrawHubParcel (missionId, withdrawnBy, agencyId) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        const { hubService } = await __turbopack_context__.r("[project]/lib/services/hubService.ts [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const parcels = await hubService.getAllParcelRecords(id);
        const parcel = parcels.find((p)=>p.missionId === missionId && p.status === 'DEPOSITED');
        if (!parcel) {
            throw new Error('Aucun colis en attente de retrait pour cette mission.');
        }
        await hubService.withdrawParcel(parcel.hubId, parcel.id, withdrawnBy);
    },
    getStatusCounts (missions) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionStatusCounts"];
        const counts = {};
        for (const m of missions){
            counts[m.status] = (counts[m.status] ?? 0) + 1;
        }
        return counts;
    }
};
}}),
"[project]/lib/hooks/useAgencyLookups.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "delivererLabel": (()=>delivererLabel),
    "missionsForBranch": (()=>missionsForBranch),
    "useAgencyLookups": (()=>useAgencyLookups)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/branchService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$staffService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/staffService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$fleetService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/fleetService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$hubService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/hubService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/missionService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/displayLabels.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const demoData = {
    branches: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"],
    deliverers: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockDeliverers"],
    vehicles: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockVehicles"],
    hubs: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubs"],
    staff: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"],
    missions: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockMissions"]
};
function useAgencyLookups(agencyId) {
    const resolvedId = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        branches: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBranches"] : [],
        deliverers: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockDeliverers"] : [],
        vehicles: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockVehicles"] : [],
        hubs: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockHubs"] : [],
        staff: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockStaffMembers"] : [],
        missions: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockMissions"] : [],
        loading: !__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"],
        error: null
    });
    const refetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            setState({
                ...demoData,
                loading: false,
                error: null
            });
            return;
        }
        setState((s)=>({
                ...s,
                loading: true,
                error: null
            }));
        Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["branchService"].getBranches(resolvedId),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$staffService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staffService"].getDeliverers(resolvedId),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$fleetService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fleetService"].getVehicles(resolvedId),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$hubService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hubService"].getHubs(resolvedId),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$staffService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["staffService"].getStaffMembers(resolvedId),
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].getMissions(resolvedId)
        ]).then(([branches, deliverers, vehicles, hubs, staff, missions])=>{
            setState({
                branches,
                deliverers,
                vehicles,
                hubs,
                staff,
                missions,
                loading: false,
                error: null
            });
        }).catch((e)=>{
            setState((s)=>({
                    ...s,
                    loading: false,
                    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUserError"])(e, 'Impossible de charger les données de référence.')
                }));
        });
    }, [
        resolvedId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refetch();
    }, [
        refetch
    ]);
    return {
        ...state,
        refetch
    };
}
function delivererLabel(deliverers, id) {
    if (!id) return '—';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["delivererDisplayName"])(deliverers.find((d)=>d.id === id)?.fullName);
}
function missionsForBranch(missions, deliverers, branchId) {
    const delivererIds = new Set(deliverers.filter((d)=>d.branchId === branchId).map((d)=>d.id));
    return missions.filter((m)=>m.branchId === branchId || m.delivererId != null && delivererIds.has(m.delivererId));
}
}}),
"[project]/lib/toastError.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "toastErrorMessage": (()=>toastErrorMessage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-ssr] (ecmascript)");
;
function toastErrorMessage(error, fallback) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUserError"])(error, fallback);
}
}}),
"[project]/components/forms/CreateMissionForm.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CreateMissionForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-ssr] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$Drawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/Drawer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAgencyLookups.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/missionService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/toastError.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
const cls = {
    input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
    select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
    label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5',
    section: 'pt-5 border-t border-gray-100 space-y-4 first:border-0 first:pt-0',
    sectionTitle: 'text-sm font-semibold text-gray-800 mb-3'
};
const initialState = {
    branchId: '',
    priority: 'NORMAL',
    senderName: '',
    recipientName: '',
    recipientPhone: '',
    pickupAddress: '',
    deliveryAddress: '',
    scheduledPickupAt: '',
    scheduledDeliveryAt: '',
    packagesCount: '1',
    totalWeightKg: '',
    delivererId: '',
    vehicleId: '',
    targetHubId: '',
    deliveryMode: 'direct',
    specialInstructions: ''
};
const priorities = [
    {
        value: 'LOW',
        label: 'Basse',
        desc: 'Pas urgent',
        color: 'text-gray-500'
    },
    {
        value: 'NORMAL',
        label: 'Normale',
        desc: 'Standard',
        color: 'text-gray-700'
    },
    {
        value: 'HIGH',
        label: 'Haute',
        desc: 'Prioritaire',
        color: 'text-orange-600'
    },
    {
        value: 'URGENT',
        label: 'Urgent',
        desc: 'Express',
        color: 'text-red-600'
    }
];
function CreateMissionForm({ open, onClose, onSuccess }) {
    const { branches, deliverers, vehicles, hubs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAgencyLookups"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { success: toastSuccess, error: toastError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const update = (k, v)=>setForm((p)=>({
                ...p,
                [k]: v
            }));
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSubmitting(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].createMission((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAgencyId"])(), {
                branchId: form.branchId,
                senderName: form.senderName,
                recipientName: form.recipientName,
                recipientPhone: form.recipientPhone,
                pickupAddress: form.pickupAddress,
                deliveryAddress: form.deliveryAddress,
                scheduledPickupAt: form.scheduledPickupAt,
                priority: form.priority,
                packagesCount: parseInt(form.packagesCount),
                totalWeightKg: parseFloat(form.totalWeightKg),
                ...form.deliveryMode === 'hub' && form.targetHubId ? {
                    targetHubId: form.targetHubId
                } : {},
                ...form.delivererId ? {
                    delivererId: form.delivererId
                } : {},
                ...form.vehicleId ? {
                    vehicleId: form.vehicleId
                } : {}
            });
            setSubmitting(false);
            setSuccess(true);
            toastSuccess('Mission créée avec succès.');
            onSuccess?.();
            setTimeout(()=>{
                setSuccess(false);
                setForm(initialState);
                onClose();
            }, 1400);
        } catch (err) {
            setSubmitting(false);
            toastError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toastErrorMessage"])(err, 'Erreur lors de la création de la mission.'));
        }
    };
    const availableDeliverers = deliverers.filter((d)=>d.status === 'AVAILABLE' && (!form.branchId || d.branchId === form.branchId));
    const availableVehicles = vehicles.filter((v)=>v.status === 'AVAILABLE' && (!form.branchId || v.branchId === form.branchId));
    const openHubs = hubs.filter((h)=>h.status === 'OPEN' || h.status === 'FULL');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$Drawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: onClose,
        title: "Créer une mission",
        description: "Nouveau bordereau de livraison",
        size: "lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 py-5 space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: cls.sectionTitle,
                                    children: "Informations générales"
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: [
                                                        "Antenne émettrice ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-orange-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 105,
                                                            columnNumber: 64
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    required: true,
                                                    value: form.branchId,
                                                    onChange: (e)=>{
                                                        update('branchId', e.target.value);
                                                        update('delivererId', '');
                                                        update('vehicleId', '');
                                                    },
                                                    className: cls.select,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Sélectionner une antenne"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 19
                                                        }, this),
                                                        branches.filter((b)=>b.status === 'OPEN').map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: b.id,
                                                                children: b.name
                                                            }, b.id, false, {
                                                                fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                                lineNumber: 109,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: "Mode de livraison"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex rounded-lg border border-gray-200 overflow-hidden h-10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>update('deliveryMode', 'direct'),
                                                            className: `flex-1 text-sm font-medium transition-colors ${form.deliveryMode === 'direct' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`,
                                                            children: "Livraison directe"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 116,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>update('deliveryMode', 'hub'),
                                                            className: `flex-1 text-sm font-medium transition-colors ${form.deliveryMode === 'hub' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`,
                                                            children: "Via hub relais"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: [
                                                "Priorité ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 130,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-4 gap-2",
                                            children: priorities.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setForm((prev)=>({
                                                                ...prev,
                                                                priority: p.value
                                                            })),
                                                    className: `py-2.5 px-2 rounded-lg border text-center transition-all ${form.priority === p.value ? p.value === 'URGENT' ? 'border-red-400 bg-red-50' : p.value === 'HIGH' ? 'border-orange-400 bg-orange-50' : 'border-orange-300 bg-orange-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `text-xs font-semibold ${form.priority === p.value ? p.color : 'text-gray-600'}`,
                                                            children: p.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-gray-400 mt-0.5",
                                                            children: p.desc
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, p.value, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            size: 14,
                                            className: "text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-gray-800",
                                            children: "Expéditeur"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: [
                                                "Nom / Raison sociale ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 65
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            required: true,
                                            type: "text",
                                            value: form.senderName,
                                            onChange: (e)=>update('senderName', e.target.value),
                                            placeholder: "ex: CFAO Motors, Jean-Baptiste Nkeng...",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            size: 14,
                                            className: "text-orange-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-gray-800",
                                            children: "Destinataire"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: [
                                                "Nom complet ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 56
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            required: true,
                                            type: "text",
                                            value: form.recipientName,
                                            onChange: (e)=>update('recipientName', e.target.value),
                                            placeholder: "ex: Marie-Claire Mbida",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: [
                                                "Téléphone ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 54
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            required: true,
                                            type: "tel",
                                            value: form.recipientPhone,
                                            onChange: (e)=>update('recipientPhone', e.target.value),
                                            placeholder: "+237 6XX XX XX XX",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            size: 14,
                                            className: "text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 183,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-gray-800",
                                            children: "Adresses"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 184,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: [
                                                "Adresse de collecte (enlèvement) ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 77
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            required: true,
                                            type: "text",
                                            value: form.pickupAddress,
                                            onChange: (e)=>update('pickupAddress', e.target.value),
                                            placeholder: "ex: Supermarché Jumbo, Rue Joss, Akwa",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: [
                                                "Adresse de livraison ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 65
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            required: true,
                                            type: "text",
                                            value: form.deliveryAddress,
                                            onChange: (e)=>update('deliveryAddress', e.target.value),
                                            placeholder: "ex: Résidence Les Palmiers, Bali",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this),
                                form.deliveryMode === 'hub' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: "Hub relais cible"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 198,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: form.targetHubId,
                                            onChange: (e)=>update('targetHubId', e.target.value),
                                            className: cls.select,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Sélectionner un hub (optionnel)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 19
                                                }, this),
                                                openHubs.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: h.id,
                                                        disabled: h.status === 'FULL',
                                                        children: [
                                                            h.name,
                                                            " — ",
                                                            h.currentOccupancy,
                                                            "/",
                                                            h.capacity,
                                                            " ",
                                                            h.status === 'FULL' ? '(PLEIN)' : ''
                                                        ]
                                                    }, h.id, true, {
                                                        fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-400 mt-1",
                                            children: "Le colis sera déposé au hub si le destinataire est absent."
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: cls.sectionTitle,
                                    children: "Planification"
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: [
                                                        "Collecte prévue ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-orange-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 62
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    required: true,
                                                    type: "datetime-local",
                                                    value: form.scheduledPickupAt,
                                                    onChange: (e)=>update('scheduledPickupAt', e.target.value),
                                                    min: new Date().toISOString().slice(0, 16),
                                                    className: cls.input
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: "Livraison prévue"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "datetime-local",
                                                    value: form.scheduledDeliveryAt,
                                                    onChange: (e)=>update('scheduledDeliveryAt', e.target.value),
                                                    min: form.scheduledPickupAt,
                                                    className: cls.input
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                            size: 14,
                                            className: "text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-gray-800",
                                            children: "Colis"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 235,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: [
                                                        "Nombre de colis ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-orange-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 62
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    required: true,
                                                    type: "number",
                                                    min: "1",
                                                    max: "100",
                                                    value: form.packagesCount,
                                                    onChange: (e)=>update('packagesCount', e.target.value),
                                                    className: cls.input
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: [
                                                        "Poids total (kg) ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-orange-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 63
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    required: true,
                                                    type: "number",
                                                    min: "0.1",
                                                    step: "0.1",
                                                    value: form.totalWeightKg,
                                                    onChange: (e)=>update('totalWeightKg', e.target.value),
                                                    placeholder: "ex: 4.5",
                                                    className: cls.input
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: "Instructions spéciales"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 251,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: form.specialInstructions,
                                            onChange: (e)=>update('specialInstructions', e.target.value),
                                            placeholder: "ex: Fragile, tenir à l'abri de la chaleur, ne pas retourner...",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                            size: 14,
                                            className: "text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-gray-800",
                                            children: "Assignation"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 262,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-400",
                                            children: "(optionnel — peut être fait après)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 263,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: "Livreur"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: form.delivererId,
                                                    onChange: (e)=>update('delivererId', e.target.value),
                                                    className: cls.select,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Auto-assignation ou plus tard"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 269,
                                                            columnNumber: 19
                                                        }, this),
                                                        availableDeliverers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            disabled: true,
                                                            children: "Aucun livreur disponible dans cette antenne"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 271,
                                                            columnNumber: 21
                                                        }, this) : availableDeliverers.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: d.id,
                                                                children: [
                                                                    d.fullName,
                                                                    " · ★ ",
                                                                    d.rating.toFixed(1)
                                                                ]
                                                            }, d.id, true, {
                                                                fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: "Véhicule"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: form.vehicleId,
                                                    onChange: (e)=>update('vehicleId', e.target.value),
                                                    className: cls.select,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Sélection automatique"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 19
                                                        }, this),
                                                        availableVehicles.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: v.id,
                                                                children: [
                                                                    v.registrationNumber,
                                                                    " — ",
                                                                    v.model,
                                                                    " (",
                                                                    v.maxWeightKg,
                                                                    "kg)"
                                                                ]
                                                            }, v.id, true, {
                                                                fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                            lineNumber: 281,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 265,
                                    columnNumber: 13
                                }, this),
                                form.branchId === '' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-orange-600",
                                    children: "Sélectionnez une antenne pour filtrer les livreurs et véhicules disponibles."
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateMissionForm.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0 border-t border-gray-200 px-6 py-4 bg-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400",
                                children: "Un bordereau unique sera généré automatiquement (MAN-2026-XXXX)"
                            }, void 0, false, {
                                fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                lineNumber: 303,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onClose,
                                        className: "px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors",
                                        children: "Annuler"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: submitting || success,
                                        className: `px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-36 justify-center ${success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-70`,
                                        children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    size: 14,
                                                    className: "animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 33
                                                }, this),
                                                " Création..."
                                            ]
                                        }, void 0, true) : success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 33
                                                }, this),
                                                " Mission créée !"
                                            ]
                                        }, void 0, true) : 'Créer la mission'
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/forms/CreateMissionForm.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/forms/CreateMissionForm.tsx",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/forms/CreateMissionForm.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/forms/CreateMissionForm.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/forms/CreateMissionForm.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/Avatar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Avatar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const SIZES = {
    xs: {
        box: 'w-6 h-6',
        text: 'text-[9px]'
    },
    sm: {
        box: 'w-8 h-8',
        text: 'text-xs'
    },
    md: {
        box: 'w-10 h-10',
        text: 'text-sm'
    },
    lg: {
        box: 'w-16 h-16',
        text: 'text-xl'
    }
};
function Avatar({ name, photoUrl, size = 'sm', className }) {
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const initials = name.split(' ').map((n)=>n[0]).join('').slice(0, 2).toUpperCase();
    const s = SIZES[size];
    if (photoUrl && !error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('rounded-full overflow-hidden flex-shrink-0', s.box, className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: photoUrl,
                alt: name,
                onError: ()=>setError(true),
                className: "w-full h-full object-cover"
            }, void 0, false, {
                fileName: "[project]/components/Avatar.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Avatar.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('rounded-full flex items-center justify-center flex-shrink-0 bg-orange-100', s.box, className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('font-semibold text-orange-700', s.text),
            children: initials
        }, void 0, false, {
            fileName: "[project]/components/Avatar.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Avatar.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
}}),
"[project]/lib/services/mediaService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "mediaService": (()=>mediaService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-ssr] (ecmascript)");
;
;
function toAbsoluteUrl(path) {
    if (path.startsWith('http')) return path;
    const origin = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"].replace(/\/v1\/?$/, '') || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AGENCY_PUBLIC_BASE_URL"];
    return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}
const mediaService = {
    async uploadFile (file, category = 'general') {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            await new Promise((r)=>setTimeout(r, 600));
            return URL.createObjectURL(file);
        }
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].upload(`/media/upload?category=${encodeURIComponent(category)}`, file);
        return toAbsoluteUrl(result.publicUrl);
    },
    async uploadDeliveryProof (missionId, file) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            await new Promise((r)=>setTimeout(r, 600));
            return URL.createObjectURL(file);
        }
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].upload(`/media/upload?category=delivery-proof&missionId=${missionId}`, file);
        return toAbsoluteUrl(result.publicUrl);
    },
    async uploadDocument (entityId, documentType, file) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) {
            await new Promise((r)=>setTimeout(r, 600));
            return URL.createObjectURL(file);
        }
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"].upload(`/media/upload?category=${encodeURIComponent(documentType)}&entityId=${entityId}`, file);
        return toAbsoluteUrl(result.publicUrl);
    }
};
}}),
"[project]/components/UploadableAvatar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UploadableAvatar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Avatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$mediaService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/mediaService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const CAMERA_SIZE = {
    xs: 9,
    sm: 11,
    md: 14,
    lg: 18
};
function UploadableAvatar({ name, photoUrl, size = 'sm', className, onUpload }) {
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleChange = async (e)=>{
        const f = e.target.files?.[0];
        if (!f) return;
        if (preview) URL.revokeObjectURL(preview);
        setPreview(URL.createObjectURL(f));
        if (onUpload) {
            setUploading(true);
            try {
                const url = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$mediaService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaService"].uploadFile(f, 'avatar');
                onUpload(url);
            } finally{
                setUploading(false);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group flex-shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                name: name,
                photoUrl: preview ?? photoUrl,
                size: size,
                className: className
            }, void 0, false, {
                fileName: "[project]/components/UploadableAvatar.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>inputRef.current?.click(),
                className: "absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer",
                children: uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    size: CAMERA_SIZE[size],
                    className: "text-white animate-spin"
                }, void 0, false, {
                    fileName: "[project]/components/UploadableAvatar.tsx",
                    lineNumber: 48,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                    size: CAMERA_SIZE[size],
                    className: "text-white"
                }, void 0, false, {
                    fileName: "[project]/components/UploadableAvatar.tsx",
                    lineNumber: 49,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/UploadableAvatar.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: handleChange
            }, void 0, false, {
                fileName: "[project]/components/UploadableAvatar.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UploadableAvatar.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/UploadZone.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UploadZone)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$mediaService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/mediaService.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function UploadZone({ label, hint, accept = 'image/*,.pdf', category = 'general', onUpload }) {
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const apply = async (f)=>{
        setFile(f);
        if (f.type.startsWith('image/')) {
            if (preview) URL.revokeObjectURL(preview);
            setPreview(URL.createObjectURL(f));
        } else {
            setPreview(null);
        }
        if (onUpload) {
            setUploading(true);
            try {
                const url = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$mediaService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mediaService"].uploadFile(f, category);
                onUpload(url);
            } finally{
                setUploading(false);
            }
        }
    };
    const remove = ()=>{
        if (preview) URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/UploadZone.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "file",
                accept: accept,
                className: "hidden",
                onChange: (e)=>{
                    const f = e.target.files?.[0];
                    if (f) apply(f);
                }
            }, void 0, false, {
                fileName: "[project]/components/UploadZone.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white",
                children: [
                    preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: preview,
                        alt: "",
                        className: "w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/components/UploadZone.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                            size: 20,
                            className: "text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/components/UploadZone.tsx",
                            lineNumber: 58,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/UploadZone.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-gray-800 truncate",
                                children: file.name
                            }, void 0, false, {
                                fileName: "[project]/components/UploadZone.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400",
                                children: [
                                    (file.size / 1024).toFixed(0),
                                    " Ko · ",
                                    file.type.includes('pdf') ? 'PDF' : 'Image'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UploadZone.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/UploadZone.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        size: 14,
                        className: "text-orange-500 animate-spin flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/components/UploadZone.tsx",
                        lineNumber: 66,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: remove,
                        className: "p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 14
                        }, void 0, false, {
                            fileName: "[project]/components/UploadZone.tsx",
                            lineNumber: 70,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/UploadZone.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/UploadZone.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>inputRef.current?.click(),
                onDrop: (e)=>{
                    e.preventDefault();
                    const f = e.dataTransfer.files?.[0];
                    if (f) apply(f);
                },
                onDragOver: (e)=>e.preventDefault(),
                className: "w-full flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50/30 transition-colors text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                            size: 16,
                            className: "text-gray-400"
                        }, void 0, false, {
                            fileName: "[project]/components/UploadZone.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/UploadZone.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: [
                                    "Glisser ou ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-500 font-medium",
                                        children: "choisir un fichier"
                                    }, void 0, false, {
                                        fileName: "[project]/components/UploadZone.tsx",
                                        lineNumber: 87,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/UploadZone.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-0.5",
                                children: hint
                            }, void 0, false, {
                                fileName: "[project]/components/UploadZone.tsx",
                                lineNumber: 89,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/UploadZone.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/UploadZone.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/UploadZone.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}}),
"[project]/components/MissionDetailDrawer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MissionDetailDrawer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader.js [app-ssr] (ecmascript) <export default as Loader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$Drawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/Drawer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UploadableAvatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UploadableAvatar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UploadZone$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/UploadZone.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAgencyLookups.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/missionService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/realtime.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/displayLabels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ToastContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/toastError.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
const pipeline = [
    {
        status: 'DRAFT',
        label: 'Brouillon'
    },
    {
        status: 'PENDING',
        label: 'En attente'
    },
    {
        status: 'ASSIGNED',
        label: 'Assignée'
    },
    {
        status: 'IN_TRANSIT',
        label: 'En transit'
    },
    {
        status: 'AT_HUB',
        label: 'Au hub'
    },
    {
        status: 'DELIVERED',
        label: 'Livrée'
    }
];
const terminalStatuses = [
    'FAILED',
    'CANCELLED'
];
function StatusTimeline({ status }) {
    const isTerminal = terminalStatuses.includes(status);
    const currentIdx = pipeline.findIndex((s)=>s.status === status);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-4 right-4 h-0.5 bg-gray-100"
            }, void 0, false, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between relative",
                children: pipeline.map((step, i)=>{
                    const done = !isTerminal && i < currentIdx;
                    const active = !isTerminal && i === currentIdx;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-1.5 z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all', done ? 'bg-emerald-500 border-emerald-500' : active ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-200'),
                                children: done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    size: 14,
                                    className: "text-white"
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionDetailDrawer.tsx",
                                    lineNumber: 46,
                                    columnNumber: 27
                                }, this) : active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 bg-white rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionDetailDrawer.tsx",
                                    lineNumber: 47,
                                    columnNumber: 27
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 bg-gray-300 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionDetailDrawer.tsx",
                                    lineNumber: 48,
                                    columnNumber: 27
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('text-[10px] font-medium text-center leading-tight max-w-14', done || active ? 'text-gray-800' : 'text-gray-400'),
                                children: step.label
                            }, void 0, false, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        ]
                    }, step.status, true, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            isTerminal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center justify-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2",
                children: [
                    status === 'FAILED' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        size: 14,
                        className: "text-red-500"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 61,
                        columnNumber: 37
                    }, this) : status === 'CANCELLED' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                        size: 14,
                        className: "text-gray-500"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 62,
                        columnNumber: 37
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-red-700",
                        children: status === 'FAILED' ? 'Mission échouée' : 'Mission annulée'
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MissionDetailDrawer.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
const priorityMap = {
    URGENT: {
        label: 'Urgent',
        cls: 'bg-red-50 text-red-700 border border-red-200'
    },
    HIGH: {
        label: 'Haute',
        cls: 'bg-orange-50 text-orange-700 border border-orange-200'
    },
    NORMAL: {
        label: 'Normale',
        cls: 'bg-gray-50 text-gray-600 border border-gray-200'
    },
    LOW: {
        label: 'Basse',
        cls: 'bg-gray-50 text-gray-400 border border-gray-100'
    }
};
function Row({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-400 w-32 flex-shrink-0 pt-0.5",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-gray-800 flex-1",
                children: value
            }, void 0, false, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MissionDetailDrawer.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
function MissionDetailDrawer({ mission, open, onClose, onAction }) {
    const { deliverers, vehicles, hubs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAgencyLookups"])();
    const [acting, setActing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { success: toastSuccess, error: toastError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [assignDelivererId, setAssignDelivererId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [assignVehicleId, setAssignVehicleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mission) {
            setAssignDelivererId(mission.delivererId ?? '');
            const matched = vehicles.find((v)=>v.registrationNumber === mission.vehiclePlate);
            setAssignVehicleId(matched?.id ?? '');
        }
    }, [
        mission,
        vehicles
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open || !mission) return;
        const es = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openMissionStream"])(mission.id, (data)=>{
            if (typeof data.status === 'string') {
                onAction?.();
            }
        });
        return ()=>es?.close();
    }, [
        open,
        mission,
        onAction
    ]);
    if (!mission) return null;
    const priority = priorityMap[mission.priority];
    const branchDeliverers = deliverers.filter((d)=>d.status !== 'SUSPENDED' && d.status !== 'INACTIVE' && (!mission.branchId || d.branchId === mission.branchId));
    const branchVehicles = vehicles.filter((v)=>v.status === 'AVAILABLE' && (!mission.branchId || v.branchId === mission.branchId));
    const assignFields = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-2 gap-2 mb-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: assignDelivererId,
                onChange: (e)=>setAssignDelivererId(e.target.value),
                className: "h-9 px-2 text-sm border border-gray-200 rounded-lg bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: "Livreur…"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    branchDeliverers.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: d.id,
                            children: d.fullName
                        }, d.id, false, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: assignVehicleId,
                onChange: (e)=>setAssignVehicleId(e.target.value),
                className: "h-9 px-2 text-sm border border-gray-200 rounded-lg bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: "Véhicule (opt.)"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    branchVehicles.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: v.id,
                            children: v.registrationNumber
                        }, v.id, false, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MissionDetailDrawer.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
    const act = async (key, fn, errorMsg)=>{
        setActing(key);
        try {
            await fn();
            toastSuccess('Modification enregistrée.');
            onAction?.();
            onClose();
        } catch (err) {
            toastError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toastErrorMessage"])(err, errorMsg));
        } finally{
            setActing(null);
        }
    };
    const Spinner = ({ k })=>acting === k ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            size: 14,
            className: "animate-spin"
        }, void 0, false, {
            fileName: "[project]/components/MissionDetailDrawer.tsx",
            lineNumber: 172,
            columnNumber: 20
        }, this) : null;
    const footer = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            [
                'PENDING',
                'DRAFT'
            ].includes(mission.status) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    assignFields,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>act('assign', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].assignMission(mission.id, assignDelivererId, assignVehicleId), 'Impossible d\'assigner cette mission. Vérifiez le livreur et le véhicule.'),
                                disabled: !!acting || !assignDelivererId,
                                className: "flex-1 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                                        k: "assign"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    "Assigner un livreur"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>act('cancel', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].cancelMission(mission.id, 'Annulation manuelle'), 'Impossible d\'annuler cette mission.'),
                                disabled: !!acting,
                                className: "px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                                        k: "cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    "Annuler"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 177,
                columnNumber: 9
            }, this),
            mission.status === 'ASSIGNED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    assignFields,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>act('reassign', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].reassignMission(mission.id, assignDelivererId, assignVehicleId), 'Impossible de réassigner cette mission.'),
                                disabled: !!acting || !assignDelivererId,
                                className: "flex-1 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                                        k: "reassign"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this),
                                    "Réassigner"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>act('cancel', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].cancelMission(mission.id, 'Annulation manuelle'), 'Impossible d\'annuler cette mission.'),
                                disabled: !!acting,
                                className: "px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                                        k: "cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    "Annuler"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 208,
                columnNumber: 9
            }, this),
            [
                'DELIVERED',
                'FAILED',
                'CANCELLED'
            ].includes(mission.status) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-400 text-center py-1",
                children: "Mission terminée · Aucune action disponible"
            }, void 0, false, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 239,
                columnNumber: 9
            }, this),
            mission.status === 'IN_TRANSIT' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-blue-600 text-center flex items-center justify-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader$3e$__["Loader"], {
                                size: 12,
                                className: "animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this),
                            " Mission en cours de livraison"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            const hubId = mission.targetHubId ?? hubs.find((h)=>h.status === 'OPEN' || h.status === 'FULL')?.id;
                            if (!hubId) {
                                toastError('Aucun hub disponible pour le dépôt.');
                                return;
                            }
                            if (!mission.delivererId) {
                                toastError('Aucun livreur assigné à cette mission.');
                                return;
                            }
                            const trackingCode = mission.manifestNumber.replace(/\s/g, '-').toUpperCase();
                            act('deposit', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].depositAtHub(mission.id, hubId, mission.delivererId, trackingCode), 'Impossible d\'enregistrer le dépôt au hub.');
                        },
                        disabled: !!acting,
                        className: "w-full py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                                k: "deposit"
                            }, void 0, false, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this),
                            "Dépôt au hub relais"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 242,
                columnNumber: 9
            }, this),
            mission.status === 'AT_HUB' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    const recipient = window.prompt('Nom du destinataire qui retire le colis :');
                    if (!recipient?.trim()) return;
                    act('withdraw', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].withdrawHubParcel(mission.id, recipient.trim()), 'Impossible d\'enregistrer le retrait au hub.');
                },
                disabled: !!acting,
                className: "w-full py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {
                        k: "withdraw"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, this),
                    "Enregistrer le retrait"
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$Drawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: onClose,
        title: mission.manifestNumber,
        description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionSubtitle"])(mission),
        footer: footer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 pt-0 pb-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-block text-xs font-medium px-2 py-0.5 rounded mt-0 mb-0 ${priority.cls}`,
                    children: priority.label
                }, void 0, false, {
                    fileName: "[project]/components/MissionDetailDrawer.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 308,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-5 border-b border-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4",
                        children: "Progression"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusTimeline, {
                        status: mission.status
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4 border-b border-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3",
                        children: "Expéditeur → Destinataire"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 rounded-lg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                size: 12,
                                                className: "text-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                                lineNumber: 326,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-gray-400",
                                                children: "Expéditeur"
                                            }, void 0, false, {
                                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                                lineNumber: 327,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-gray-900",
                                        children: mission.senderName
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-0.5 truncate",
                                        children: mission.pickupAddress
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 330,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-orange-50 rounded-lg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                size: 12,
                                                className: "text-orange-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                                lineNumber: 334,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-orange-500",
                                                children: "Destinataire"
                                            }, void 0, false, {
                                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                                lineNumber: 335,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-gray-900",
                                        children: mission.recipientName
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 337,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-0.5",
                                        children: mission.recipientPhone
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mt-0.5 truncate",
                                        children: mission.deliveryAddress
                                    }, void 0, false, {
                                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MissionDetailDrawer.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4 border-b border-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                        children: "Logistique"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Livreur",
                        value: mission.delivererName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UploadableAvatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    name: mission.delivererName,
                                    photoUrl: deliverers.find((d)=>d.id === mission.delivererId)?.photoUrl,
                                    size: "xs"
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionDetailDrawer.tsx",
                                    lineNumber: 350,
                                    columnNumber: 17
                                }, void 0),
                                mission.delivererName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 349,
                            columnNumber: 15
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-400 italic",
                            children: "Non assigné"
                        }, void 0, false, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 357,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Véhicule",
                        value: mission.vehiclePlate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700",
                            children: mission.vehiclePlate
                        }, void 0, false, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 361,
                            columnNumber: 15
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-400 italic",
                            children: "—"
                        }, void 0, false, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 362,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    mission.targetHubName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Hub cible",
                        value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                    size: 12,
                                    className: "text-violet-400"
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionDetailDrawer.tsx",
                                    lineNumber: 367,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-violet-700",
                                    children: mission.targetHubName
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionDetailDrawer.tsx",
                                    lineNumber: 368,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 365,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4 border-b border-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                        children: "Colis & Planification"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Colis",
                        value: `${mission.packagesCount} colis · ${mission.totalWeightKg} kg`
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 377,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Collecte prévue",
                        value: new Date(mission.scheduledPickupAt).toLocaleString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this),
                    mission.scheduledDeliveryAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Livraison prévue",
                        value: new Date(mission.scheduledDeliveryAt).toLocaleString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, this),
                    mission.actualPickupAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Collecte effective",
                        value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-emerald-700",
                            children: new Date(mission.actualPickupAt).toLocaleString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 383,
                            columnNumber: 50
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this),
                    mission.actualDeliveryAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Livraison effective",
                        value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-emerald-700 font-semibold",
                            children: new Date(mission.actualDeliveryAt).toLocaleString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 386,
                            columnNumber: 51
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 386,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4 border-b border-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2",
                        children: "Facturation"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Prix de vente",
                        value: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-gray-900",
                            children: [
                                mission.sellingPrice.toLocaleString('fr-FR'),
                                " ",
                                mission.currency
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MissionDetailDrawer.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        label: "Créée le",
                        value: new Date(mission.createdAt).toLocaleString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, this),
            mission.status === 'DELIVERED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4 border-b border-gray-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3",
                        children: "Preuve de livraison"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UploadZone$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "",
                        hint: "Photo signature, photo dépôt — image ou PDF",
                        accept: "image/*,.pdf"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 403,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 401,
                columnNumber: 9
            }, this),
            mission.status === 'FAILED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3",
                        children: "Rapport d'anomalie"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 414,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$UploadZone$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "",
                        hint: "Photo ou document justificatif de l'échec",
                        accept: "image/*,.pdf"
                    }, void 0, false, {
                        fileName: "[project]/components/MissionDetailDrawer.tsx",
                        lineNumber: 415,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MissionDetailDrawer.tsx",
                lineNumber: 413,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MissionDetailDrawer.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
}}),
"[project]/lib/hooks/usePagination.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "usePagination": (()=>usePagination)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function usePagination(data, pageSize = 10) {
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
    const safePage = Math.min(page, pageCount);
    const paginatedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const start = (safePage - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [
        data,
        safePage,
        pageSize
    ]);
    function goTo(p) {
        setPage(Math.max(1, Math.min(p, pageCount)));
    }
    return {
        page: safePage,
        setPage: goTo,
        pageCount,
        pageSize,
        paginatedData,
        total: data.length
    };
}
}}),
"[project]/components/ui/Pagination.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Pagination)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
'use client';
;
;
function Pagination({ page, pageCount, total, pageSize, onPage }) {
    if (pageCount <= 1) return null;
    const from = (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);
    const pages = [];
    if (pageCount <= 7) {
        for(let i = 1; i <= pageCount; i++)pages.push(i);
    } else {
        pages.push(1);
        if (page > 3) pages.push('…');
        for(let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++)pages.push(i);
        if (page < pageCount - 2) pages.push('…');
        pages.push(pageCount);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between px-1 pt-3 border-t border-gray-100 dark:border-gray-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-500 dark:text-gray-400",
                children: [
                    from,
                    "–",
                    to,
                    " sur ",
                    total
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Pagination.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPage(page - 1),
                        disabled: page === 1,
                        className: "p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/components/ui/Pagination.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Pagination.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    pages.map((p, i)=>p === '…' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "px-1 text-xs text-gray-400",
                            children: "…"
                        }, `ellipsis-${i}`, false, {
                            fileName: "[project]/components/ui/Pagination.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onPage(p),
                            className: `w-7 h-7 rounded text-xs font-medium transition-colors ${p === page ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`,
                            children: p
                        }, p, false, {
                            fileName: "[project]/components/ui/Pagination.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onPage(page + 1),
                        disabled: page === pageCount,
                        className: "p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/components/ui/Pagination.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Pagination.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/Pagination.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/Pagination.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}}),
"[project]/lib/hooks/useService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useService": (()=>useService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useService(loader, fallback) {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        data: fallback,
        loading: !__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"],
        error: null
    });
    const fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMO_MODE"]) return;
        setState((s)=>({
                ...s,
                loading: true,
                error: null
            }));
        loader().then((data)=>setState({
                data,
                loading: false,
                error: null
            })).catch((e)=>setState((s)=>({
                    ...s,
                    loading: false,
                    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatUserError"])(e, 'Impossible de charger les données. Réessayez.')
                })));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch();
    }, [
        fetch
    ]);
    const setData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((d)=>setState((s)=>({
                ...s,
                data: d
            })), []);
    return {
        ...state,
        refetch: fetch,
        setData
    };
}
}}),
"[project]/app/missions/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MissionsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/filter.js [app-ssr] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-list.js [app-ssr] (ecmascript) <export default as LayoutList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.js [app-ssr] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$emptyDefaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/emptyDefaults.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$CreateMissionForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/CreateMissionForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MissionDetailDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MissionDetailDrawer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$usePagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/usePagination.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Pagination.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/missionService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useService.ts [app-ssr] (ecmascript)");
;
'use client';
;
;
;
;
;
;
;
;
;
;
;
const MissionsMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/components/MissionsMap.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
// ── Status badge ───────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        DELIVERED: 'bg-emerald-50 text-emerald-700',
        IN_TRANSIT: 'bg-blue-50 text-blue-700',
        ASSIGNED: 'bg-indigo-50 text-indigo-700',
        PENDING: 'bg-orange-50 text-orange-700',
        AT_HUB: 'bg-violet-50 text-violet-700',
        DRAFT: 'bg-gray-100 text-gray-600',
        FAILED: 'bg-red-50 text-red-700',
        CANCELLED: 'bg-gray-100 text-gray-400'
    };
    const labels = {
        DELIVERED: 'Livré',
        IN_TRANSIT: 'En transit',
        ASSIGNED: 'Assignée',
        PENDING: 'En attente',
        AT_HUB: 'Au hub',
        DRAFT: 'Brouillon',
        FAILED: 'Échoué',
        CANCELLED: 'Annulé'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status]}`,
        children: labels[status]
    }, void 0, false, {
        fileName: "[project]/app/missions/page.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
// ── Priority badge ─────────────────────────────────────────
function PriorityBadge({ priority }) {
    const map = {
        URGENT: 'bg-red-50 text-red-700 border border-red-200',
        HIGH: 'bg-orange-50 text-orange-700 border border-orange-200',
        NORMAL: 'bg-gray-50 text-gray-600 border border-gray-200',
        LOW: 'bg-gray-50 text-gray-400 border border-gray-100'
    };
    const labels = {
        URGENT: 'Urgent',
        HIGH: 'Haute',
        NORMAL: 'Normale',
        LOW: 'Basse'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-2 py-0.5 rounded text-xs font-medium ${map[priority]}`,
        children: labels[priority]
    }, void 0, false, {
        fileName: "[project]/app/missions/page.tsx",
        lineNumber: 50,
        columnNumber: 10
    }, this);
}
// ── Pipeline chips ─────────────────────────────────────────
const pipelineSteps = [
    {
        status: 'DRAFT',
        label: 'Brouillon',
        color: 'bg-gray-200 text-gray-600'
    },
    {
        status: 'PENDING',
        label: 'En attente',
        color: 'bg-orange-100 text-orange-700'
    },
    {
        status: 'ASSIGNED',
        label: 'Assignée',
        color: 'bg-indigo-100 text-indigo-700'
    },
    {
        status: 'IN_TRANSIT',
        label: 'En transit',
        color: 'bg-blue-100 text-blue-700'
    },
    {
        status: 'AT_HUB',
        label: 'Au hub',
        color: 'bg-violet-100 text-violet-700'
    },
    {
        status: 'DELIVERED',
        label: 'Livrée',
        color: 'bg-emerald-100 text-emerald-700'
    },
    {
        status: 'FAILED',
        label: 'Échouée',
        color: 'bg-red-100 text-red-700'
    },
    {
        status: 'CANCELLED',
        label: 'Annulée',
        color: 'bg-gray-100 text-gray-400'
    }
];
const ACTIVE_STATUSES = [
    'ASSIGNED',
    'IN_TRANSIT'
];
function MissionsPage() {
    const { data: allMissions, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useService"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].getMissions(), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$emptyDefaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EMPTY_MISSIONS"]);
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('list');
    const [missionFormOpen, setMissionFormOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedMission, setSelectedMission] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detailOpen, setDetailOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(30);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const statusCounts = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["missionService"].getStatusCounts(allMissions);
    const openDetail = (m)=>{
        setSelectedMission(m);
        setDetailOpen(true);
    };
    const activeMissions = allMissions.filter((m)=>ACTIVE_STATUSES.includes(m.status));
    const filtered = allMissions.filter((m)=>{
        const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
        const matchSearch = search === '' || m.manifestNumber.toLowerCase().includes(search.toLowerCase()) || m.recipientName.toLowerCase().includes(search.toLowerCase()) || (m.delivererName ?? '').toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });
    const { page, setPage, pageCount, pageSize, paginatedData: pageMissions, total } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$usePagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePagination"])(filtered, 10);
    const doRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        refetch();
        setCountdown(30);
    }, [
        refetch
    ]);
    // Auto-refresh every 30s when in map view
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (view !== 'map') {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }
        setCountdown(30);
        timerRef.current = setInterval(()=>{
            setCountdown((c)=>{
                if (c <= 1) {
                    doRefresh();
                    return 30;
                }
                return c - 1;
            });
        }, 1000);
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [
        view,
        doRefresh
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-semibold text-gray-900",
                                children: "Missions"
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-0.5",
                                children: [
                                    allMissions.length,
                                    " missions au total · ",
                                    activeMissions.length,
                                    " en cours"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center bg-gray-100 rounded-lg p-1 gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setView('list'),
                                        title: "Vue liste",
                                        className: `p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutList$3e$__["LayoutList"], {
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 133,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setView('map'),
                                        title: "Vue carte",
                                        className: `p-1.5 rounded-md transition-colors ${view === 'map' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-400 hover:text-gray-600'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"], {
                                            size: 15
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMissionFormOpen(true),
                                className: "inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    "Nouvelle mission"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setStatusFilter('ALL'),
                        className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${statusFilter === 'ALL' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`,
                        children: [
                            "Toutes (",
                            allMissions.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    pipelineSteps.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setStatusFilter(step.status),
                            className: `px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${statusFilter === step.status ? `${step.color} border-current` : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`,
                            children: [
                                step.label,
                                " (",
                                statusCounts[step.status] ?? 0,
                                ")"
                            ]
                        }, step.status, true, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            view === 'list' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 max-w-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 14,
                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: search,
                                onChange: (e)=>setSearch(e.target.value),
                                placeholder: "Rechercher un bordereau, destinataire, livreur...",
                                className: "w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder:text-gray-400 transition"
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 183,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex items-center gap-2 px-3 py-2 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this),
                            "Filtres"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-gray-400",
                        children: [
                            filtered.length,
                            " résultat",
                            filtered.length !== 1 ? 's' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, this),
            view === 'map' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative rounded-xl overflow-hidden border border-gray-200",
                style: {
                    height: 'calc(100vh - 260px)',
                    minHeight: 520
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-1.5 flex items-center gap-2.5 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-600",
                                children: [
                                    "Actualisation dans ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            countdown,
                                            "s"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 72
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: doRefresh,
                                title: "Actualiser maintenant",
                                className: "p-0.5 rounded-full text-gray-400 hover:text-orange-500 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    activeMissions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-3 top-14 z-[1000] bg-white/97 border border-gray-200 rounded-xl shadow-lg w-64 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-2 border-b border-gray-100 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold text-gray-700",
                                        children: "En cours"
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full",
                                        children: activeMissions.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 223,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-56 overflow-y-auto divide-y divide-gray-50",
                                children: activeMissions.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>openDetail(m),
                                        className: "w-full flex items-start gap-2.5 px-3 py-2.5 hover:bg-orange-50 transition-colors text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `w-2 h-2 rounded-full mt-1.5 shrink-0 ${m.status === 'IN_TRANSIT' ? 'bg-orange-400' : 'bg-indigo-400'}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 236,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-semibold text-gray-900 font-mono truncate",
                                                        children: m.manifestNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/missions/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] text-gray-500 truncate",
                                                        children: m.delivererName ?? 'Non assigné'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/missions/page.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] text-gray-400 truncate",
                                                        children: m.deliveryAddress
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/missions/page.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 237,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                status: m.status
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, m.id, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 229,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 222,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MissionsMap, {
                        missions: filtered.length > 0 && filtered.length < allMissions.length ? filtered : allMissions,
                        onMissionClick: openDetail
                    }, void 0, false, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 203,
                columnNumber: 9
            }, this),
            view === 'list' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-gray-200 rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "bg-gray-50 border-b border-gray-100 text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Bordereau"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Expéditeur → Destinataire"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Livreur"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 265,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Antenne"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 266,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Priorité"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Statut"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Colis"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider",
                                            children: "Montant"
                                        }, void 0, false, {
                                            fileName: "[project]/app/missions/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-gray-50",
                                children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 8,
                                        className: "px-5 py-12 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                size: 32,
                                                className: "mx-auto text-gray-200 mb-3"
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-400",
                                                children: "Aucune mission trouvée"
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 278,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/missions/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 17
                                }, this) : pageMissions.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        onClick: ()=>openDetail(m),
                                        className: "table-row-hover cursor-pointer group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-5 py-3.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold text-gray-900 font-mono",
                                                            children: m.manifestNumber
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 286,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] text-gray-400 mt-0.5",
                                                            children: new Date(m.scheduledPickupAt).toLocaleDateString('fr-FR', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 284,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 truncate max-w-44",
                                                            children: m.senderName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1 mt-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-300",
                                                                    children: "→"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/missions/page.tsx",
                                                                    lineNumber: 296,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium text-gray-900 truncate max-w-40",
                                                                    children: m.recipientName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/missions/page.tsx",
                                                                    lineNumber: 297,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 292,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3.5",
                                                children: m.delivererName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-orange-700 text-[10px] font-semibold",
                                                                children: m.delivererName.split(' ').map((n)=>n[0]).join('').slice(0, 2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/missions/page.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-700 truncate max-w-24",
                                                            children: m.delivererName.split(' ')[0]
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 309,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-400 italic",
                                                    children: "Non assigné"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 301,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-600",
                                                    children: m.branchName
                                                }, void 0, false, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PriorityBadge, {
                                                    priority: m.priority
                                                }, void 0, false, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                        status: m.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/missions/page.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 23
                                                    }, this),
                                                    m.targetHubName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-violet-500 mt-0.5 truncate max-w-28",
                                                        children: m.targetHubName
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/missions/page.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-3.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-700",
                                                            children: [
                                                                m.packagesCount,
                                                                " colis"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] text-gray-400",
                                                            children: [
                                                                m.totalWeightKg,
                                                                " kg"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 330,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-5 py-3.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-semibold text-gray-900",
                                                    children: [
                                                        m.sellingPrice.toLocaleString('fr-FR'),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-normal text-gray-400 ml-1",
                                                            children: m.currency
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/missions/page.tsx",
                                                            lineNumber: 336,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/missions/page.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/missions/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, m.id, true, {
                                        fileName: "[project]/app/missions/page.tsx",
                                        lineNumber: 283,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/missions/page.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            page: page,
                            pageCount: pageCount,
                            total: total,
                            pageSize: pageSize,
                            onPage: setPage
                        }, void 0, false, {
                            fileName: "[project]/app/missions/page.tsx",
                            lineNumber: 345,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/missions/page.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 259,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$CreateMissionForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: missionFormOpen,
                onClose: ()=>setMissionFormOpen(false)
            }, void 0, false, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MissionDetailDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                mission: selectedMission,
                open: detailOpen,
                onClose: ()=>setDetailOpen(false)
            }, void 0, false, {
                fileName: "[project]/app/missions/page.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/missions/page.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=_43893133._.js.map