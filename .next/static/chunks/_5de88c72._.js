(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/forms/Drawer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Drawer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Drawer({ open, onClose, title, description, children, footer, size = 'md' }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Drawer.useEffect": ()=>{
            setMounted(true);
        }
    }["Drawer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Drawer.useEffect": ()=>{
            const handler = {
                "Drawer.useEffect.handler": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["Drawer.useEffect.handler"];
            document.addEventListener('keydown', handler);
            return ({
                "Drawer.useEffect": ()=>document.removeEventListener('keydown', handler)
            })["Drawer.useEffect"];
        }
    }["Drawer.useEffect"], [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Drawer.useEffect": ()=>{
            if (open) document.body.style.overflow = 'hidden';
            else document.body.style.overflow = '';
            return ({
                "Drawer.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["Drawer.useEffect"];
        }
    }["Drawer.useEffect"], [
        open
    ]);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('fixed inset-0 bg-black/30 z-[200] transition-opacity duration-300', open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'),
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/forms/Drawer.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('fixed top-0 right-0 h-full bg-white z-[300] shadow-2xl border-l border-gray-200', 'overflow-y-auto transition-transform duration-300 ease-out', size === 'lg' ? 'w-[640px]' : 'w-[520px]', open ? 'translate-x-0' : 'translate-x-full'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-full flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-0 z-20 bg-white flex items-start justify-between px-6 py-5 border-b border-gray-200 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-base font-semibold text-gray-900",
                                            children: title
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/Drawer.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "ml-4 p-1.5 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0 mt-0.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/components/forms/Drawer.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(Drawer, "1HETueMQFHnQEekrfLFLB/gw0JE=");
_c = Drawer;
var _c;
__turbopack_context__.k.register(_c, "Drawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/staff-utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/displayLabels.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/staff-utils.ts [app-client] (ecmascript)");
;
;
function safeLabel(value, fallback) {
    if (!value || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUuid"])(value)) return fallback;
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
    const role = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STAFF_ROLE_LABELS"][member.role] ?? member.role;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/api/mappers.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/displayLabels.ts [app-client] (ecmascript)");
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
        fullName: dto.fullName ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["delivererDisplayName"])(dto.fullName) : 'Livreur sans nom',
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
        manifestNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["manifestDisplay"])(dto.manifestNumber),
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/branchService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "branchService": (()=>branchService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
;
const branchService = {
    async getBranches (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/branches`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBranch"]);
    },
    async getBranch (branchId) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/branches/${branchId}`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBranch"])(dto);
    },
    async createBranch (agencyId, data) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/branches`, {
            name: data.name,
            code: data.code,
            address: {
                city: data.city,
                country: data.country,
                street: data.street,
                region: data.region
            }
        });
        const branch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBranch"])(dto);
        if (data.managerId) {
            await this.assignManager(branch.id, data.managerId);
            return this.getBranch(branch.id);
        }
        return branch;
    },
    async updateBranch (branchId, data) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/branches/${branchId}`, {
            name: data.name,
            address: {
                city: data.city,
                country: 'CM',
                street: data.address
            }
        });
    },
    async assignManager (branchId, managerId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/branches/${branchId}/manager?managerId=${encodeURIComponent(managerId)}`, {});
    },
    async clearManager (branchId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/branches/${branchId}/manager`);
    },
    async closeBranch (branchId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/branches/${branchId}`);
    },
    async temporarilyCloseBranch (branchId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/branches/${branchId}/status?status=TEMPORARILY_CLOSED`, {});
    },
    async reopenBranch (branchId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/branches/${branchId}/status?status=OPEN`, {});
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/staffService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "staffService": (()=>staffService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
;
const staffService = {
    async getStaffMembers (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/staff`);
    },
    async registerStaffMember (agencyId, data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/staff`, data);
    },
    async updateStaffMember (memberId, data) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/staff/${memberId}`, data);
    },
    async suspendStaffMember (memberId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/staff/${memberId}/suspend`, {});
    },
    async reactivateStaffMember (memberId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/staff/${memberId}/reactivate`, {});
    },
    async getDeliverers (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/deliverers`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapDeliverer"]);
    },
    async registerDeliverer (agencyId, data) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/deliverers`, {
            ...data.actorId ? {
                actorId: data.actorId
            } : {},
            fullName: data.fullName,
            phone: data.phone,
            ...data.email ? {
                email: data.email
            } : {}
        });
        const deliverer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapDeliverer"])(dto);
        if (data.branchId) {
            await this.attachToBranch(deliverer.id, data.branchId);
        }
        return deliverer;
    },
    async suspendDeliverer (delivererId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/deliverers/${delivererId}/suspend`, {});
    },
    async reactivateDeliverer (delivererId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/deliverers/${delivererId}/reactivate`, {});
    },
    async attachToBranch (delivererId, branchId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/deliverers/${delivererId}/branch`, {
            branchId
        });
    },
    async getContracts (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/contracts`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContract"]);
    },
    async createContract (delivererId, data) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/deliverers/${delivererId}/contracts`, {
            agencyId: data.agencyId,
            contractType: data.contractType,
            startDate: data.startDate,
            endDate: data.endDate,
            remunerationModel: data.remunerationModel,
            baseSalary: data.baseSalary,
            commissionRate: data.commissionRate
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapContract"])(dto);
    },
    async terminateContract (delivererId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/deliverers/${delivererId}/contracts/active`);
    },
    async renewContract (contractId, data) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/contracts/${contractId}/renew`, {
            endDate: data.endDate
        });
    },
    async getCommissions (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/commissions`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapCommission"]);
    },
    async payCommission (commissionId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/commissions/${commissionId}/pay`, {});
    },
    async disputeCommission (commissionId, reason) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/commissions/${commissionId}/dispute`, {
            reason
        });
    },
    async getFreelancers (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/freelancers`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapFreelancer"]);
    },
    async associateFreelancer (agencyId, data) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/freelancers`, {
            freelancerActorId: data.freelancerActorId,
            commissionRate: data.commissionRate / 100,
            startDate: data.startDate
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapFreelancer"])(dto);
    },
    async terminateFreelancer (associationId, endDate) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/freelancers/associations/${associationId}/end`, {
            endDate: endDate ?? new Date().toISOString().slice(0, 10)
        });
    },
    async suspendFreelancer (associationId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/freelancers/associations/${associationId}/pause`, {});
    },
    async cancelFreelancerInvitation (associationId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/freelancers/associations/${associationId}/cancel`, {});
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/fleetService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "fleetService": (()=>fleetService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
;
const fleetService = {
    async getVehicles (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/vehicles`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapVehicle"]);
    },
    async addVehicle (agencyId, data) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/vehicles`, {
            branchId: data.branchId,
            licensePlate: data.registrationNumber,
            brand: data.brand ?? data.model,
            model: data.model,
            year: data.year ?? new Date().getFullYear(),
            vehicleType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBackendVehicleType"])(data.vehicleType)
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapVehicle"])(dto);
    },
    async assignDeliverer (vehicleId, delivererId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/assign`, {
            delivererId
        });
    },
    async unassignDeliverer (vehicleId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/unassign`, {});
    },
    async sendToMaintenance (vehicleId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/maintenance`, {});
    },
    async returnFromMaintenance (vehicleId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/maintenance/return`, {});
    },
    async retireVehicle (vehicleId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/vehicles/${vehicleId}/retire`, {});
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/hubService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "hubService": (()=>hubService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
;
const hubService = {
    async getHubs (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/hubs`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapHub"]);
    },
    async getHub (hubId) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/hubs/${hubId}`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapHub"])(dto);
    },
    async createHub (agencyId, data) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/hubs`, {
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapHub"])(dto);
    },
    async updateHubStatus (hubId, status) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/hubs/${hubId}/status`, {
            status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBackendHubStatus"])(status)
        });
    },
    async getParcelRecords (hubId) {
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/hubs/${hubId}/parcels`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapHubParcelRecord"]);
    },
    async getAllParcelRecords (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const hubs = await hubService.getHubs(id);
        const records = await Promise.all(hubs.map((h)=>hubService.getParcelRecords(h.id)));
        return records.flat();
    },
    async depositParcel (hubId, data) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/hubs/${hubId}/parcels`, {
            missionId: data.missionId,
            packageId: data.packageId,
            trackingCode: data.trackingCode
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapHubParcelRecord"])(dto);
    },
    async withdrawParcel (hubId, recordId, withdrawnBy) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/hubs/${hubId}/parcels/${recordId}/withdraw`, {
            withdrawnBy,
            identityVerified: true
        });
    },
    async processExpired (_hubId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/hubs/expired', {});
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/missionService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "missionService": (()=>missionService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/mappers.ts [app-client] (ecmascript)");
;
;
;
const missionService = {
    async getMissions (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/missions`);
        return dtos.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapMission"]);
    },
    async getMission (missionId) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/missions/${missionId}`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapMission"])(dto);
    },
    async createMission (agencyId, data) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/agencies/${agencyId}/missions`, {
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
        let mission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$mappers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapMission"])(dto);
        if (data.delivererId) {
            await this.assignMission(mission.id, data.delivererId, data.vehicleId ?? data.delivererId);
            mission = await this.getMission(mission.id);
        }
        return mission;
    },
    async assignMission (missionId, delivererId, vehicleId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/missions/${missionId}/assign`, {
            delivererId,
            vehicleId
        });
    },
    async reassignMission (missionId, delivererId, vehicleId) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/missions/${missionId}/reassign`, {
            delivererId,
            vehicleId
        });
    },
    async cancelMission (missionId, reason) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/missions/${missionId}/cancel`, {
            reason
        });
    },
    async rescheduleMission (missionId, scheduledPickupAt) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/missions/${missionId}/reschedule`, {
            newScheduledAt: scheduledPickupAt
        });
    },
    async depositAtHub (missionId, hubId, delivererId, trackingCode) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post(`/missions/${missionId}/deposit-hub`, {
            hubId,
            delivererId,
            trackingCode
        });
    },
    async withdrawHubParcel (missionId, withdrawnBy, agencyId) {
        const { hubService } = await __turbopack_context__.r("[project]/lib/services/hubService.ts [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const parcels = await hubService.getAllParcelRecords(id);
        const parcel = parcels.find((p)=>p.missionId === missionId && p.status === 'DEPOSITED');
        if (!parcel) {
            throw new Error('Aucun colis en attente de retrait pour cette mission.');
        }
        await hubService.withdrawParcel(parcel.hubId, parcel.id, withdrawnBy);
    },
    getStatusCounts (missions) {
        const counts = {};
        for (const m of missions){
            counts[m.status] = (counts[m.status] ?? 0) + 1;
        }
        return counts;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/hooks/useAgencyLookups.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "delivererLabel": (()=>delivererLabel),
    "missionsForBranch": (()=>missionsForBranch),
    "useAgencyLookups": (()=>useAgencyLookups)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/branchService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$staffService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/staffService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$fleetService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/fleetService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$hubService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/hubService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/missionService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/displayLabels.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
function useAgencyLookups(agencyId) {
    _s();
    const resolvedId = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        branches: [],
        deliverers: [],
        vehicles: [],
        hubs: [],
        staff: [],
        missions: [],
        loading: true,
        error: null
    });
    const refetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAgencyLookups.useCallback[refetch]": ()=>{
            if (!resolvedId) {
                setState({
                    "useAgencyLookups.useCallback[refetch]": (s)=>({
                            ...s,
                            loading: false,
                            error: 'Agence non identifiée.'
                        })
                }["useAgencyLookups.useCallback[refetch]"]);
                return;
            }
            setState({
                "useAgencyLookups.useCallback[refetch]": (s)=>({
                        ...s,
                        loading: true,
                        error: null
                    })
            }["useAgencyLookups.useCallback[refetch]"]);
            Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].getBranches(resolvedId),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$staffService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staffService"].getDeliverers(resolvedId),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$fleetService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fleetService"].getVehicles(resolvedId),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$hubService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hubService"].getHubs(resolvedId),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$staffService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["staffService"].getStaffMembers(resolvedId),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$missionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionService"].getMissions(resolvedId)
            ]).then({
                "useAgencyLookups.useCallback[refetch]": ([branches, deliverers, vehicles, hubs, staff, missions])=>{
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
                }
            }["useAgencyLookups.useCallback[refetch]"]).catch({
                "useAgencyLookups.useCallback[refetch]": (e)=>{
                    setState({
                        "useAgencyLookups.useCallback[refetch]": (s)=>({
                                ...s,
                                loading: false,
                                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUserError"])(e, 'Impossible de charger les données de référence.')
                            })
                    }["useAgencyLookups.useCallback[refetch]"]);
                }
            }["useAgencyLookups.useCallback[refetch]"]);
        }
    }["useAgencyLookups.useCallback[refetch]"], [
        resolvedId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAgencyLookups.useEffect": ()=>{
            refetch();
        }
    }["useAgencyLookups.useEffect"], [
        refetch
    ]);
    return {
        ...state,
        refetch
    };
}
_s(useAgencyLookups, "4+ssbF0zw3pVxsUn3M22U0fHLDo=");
function delivererLabel(deliverers, id) {
    if (!id) return '—';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["delivererDisplayName"])(deliverers.find((d)=>d.id === id)?.fullName);
}
function missionsForBranch(missions, deliverers, branchId) {
    const delivererIds = new Set(deliverers.filter((d)=>d.branchId === branchId).map((d)=>d.id));
    return missions.filter((m)=>m.branchId === branchId || m.delivererId != null && delivererIds.has(m.delivererId));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/toastError.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "toastErrorMessage": (()=>toastErrorMessage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-client] (ecmascript)");
;
function toastErrorMessage(error, fallback) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUserError"])(error, fallback);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/forms/CreateBranchForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CreateBranchForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/Drawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAgencyLookups.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/branchService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/staff-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/toastError.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    name: '',
    address: '',
    city: 'Douala',
    openingHours: 'Lun–Sam 07h00–20h00',
    managerId: '',
    isHeadquarters: false,
    status: 'OPEN'
};
function CreateBranchForm({ open, onClose, onSuccess }) {
    _s();
    const { staff } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAgencyLookups"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { success: toastSuccess, error: toastError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const update = (field, value)=>setForm((prev)=>({
                ...prev,
                [field]: value
            }));
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSubmitting(true);
        try {
            const code = form.name.toUpperCase().replace(/\s+/g, '-').slice(0, 12);
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].createBranch((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])(), {
                name: form.name,
                code,
                city: form.city,
                country: 'CM',
                street: form.address,
                openingHours: form.openingHours,
                managerId: form.managerId || undefined,
                isHeadquarters: form.isHeadquarters,
                status: form.status
            });
            setSubmitting(false);
            setSuccess(true);
            toastSuccess('Antenne créée avec succès.');
            onSuccess?.();
            setTimeout(()=>{
                setSuccess(false);
                setForm(initialState);
                onClose();
            }, 1200);
        } catch (err) {
            setSubmitting(false);
            toastError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastErrorMessage"])(err, "Erreur lors de la création de l'antenne."));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: onClose,
        title: "Créer une antenne",
        description: "Nouvelle antenne rattachée à Rapid Express Douala",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "flex flex-col h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 py-5 space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: cls.sectionTitle,
                                    children: "Identité de l'antenne"
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: [
                                                "Nom de l'antenne ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 61
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            required: true,
                                            type: "text",
                                            value: form.name,
                                            onChange: (e)=>update('name', e.target.value),
                                            placeholder: "ex: Antenne Bonanjo",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: [
                                                        "Ville ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-orange-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                            lineNumber: 105,
                                                            columnNumber: 52
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    required: true,
                                                    type: "text",
                                                    value: form.city,
                                                    onChange: (e)=>update('city', e.target.value),
                                                    className: cls.input
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: cls.label,
                                                    children: "Statut"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: form.status,
                                                    onChange: (e)=>update('status', e.target.value),
                                                    className: cls.select,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "OPEN",
                                                            children: "Ouverte"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "TEMPORARILY_CLOSED",
                                                            children: "Fermée temp."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                            lineNumber: 118,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: [
                                                "Adresse complète ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-orange-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 61
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            required: true,
                                            type: "text",
                                            value: form.address,
                                            onChange: (e)=>update('address', e.target.value),
                                            placeholder: "ex: 12 Rue du Commerce, Bonanjo",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: cls.section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: cls.sectionTitle,
                                    children: "Opérationnel"
                                }, void 0, false, {
                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: "Horaires d'ouverture"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: form.openingHours,
                                            onChange: (e)=>update('openingHours', e.target.value),
                                            placeholder: "ex: Lun–Sam 07h00–20h00",
                                            className: cls.input
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 141,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-400 mt-1",
                                            children: "Format libre — ex: Lun–Ven 08h00–18h00"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: cls.label,
                                            children: "Responsable de l'antenne"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: form.managerId,
                                            onChange: (e)=>update('managerId', e.target.value),
                                            className: cls.select,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Sélectionner un responsable (optionnel)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 17
                                                }, this),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEligibleBranchManagers"])(staff).map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: m.id,
                                                        children: [
                                                            m.fullName,
                                                            m.branchName ? ` — ${m.branchName}` : ' — Non assigné'
                                                        ]
                                                    }, m.id, true, {
                                                        fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-400 mt-1",
                                            children: "Managers et responsables administratifs — ajoutez-en depuis Personnel → Managers"
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg cursor-pointer",
                                    onClick: ()=>update('isHeadquarters', !form.isHeadquarters),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.isHeadquarters ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`,
                                            children: form.isHeadquarters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 13,
                                                className: "text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                lineNumber: 170,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-gray-800",
                                                    children: "Définir comme siège social"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500",
                                                    children: "Cette antenne sera le siège principal de l'agence"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                            lineNumber: 172,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            className: "px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors",
                            children: "Annuler"
                        }, void 0, false, {
                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: submitting || success,
                            className: `px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 min-w-28 justify-center ${success ? 'bg-emerald-500' : 'bg-orange-500 hover:bg-orange-600'} disabled:opacity-70`,
                            children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 14,
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                        lineNumber: 198,
                                        columnNumber: 17
                                    }, this),
                                    " Création..."
                                ]
                            }, void 0, true) : success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/forms/CreateBranchForm.tsx",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this),
                                    " Créée !"
                                ]
                            }, void 0, true) : 'Créer l\'antenne'
                        }, void 0, false, {
                            fileName: "[project]/components/forms/CreateBranchForm.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/forms/CreateBranchForm.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/forms/CreateBranchForm.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/forms/CreateBranchForm.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(CreateBranchForm, "ooabhFihpPG5T3AMbrJWi9U8AxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAgencyLookups"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = CreateBranchForm;
var _c;
__turbopack_context__.k.register(_c, "CreateBranchForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Avatar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Avatar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const initials = name.split(' ').map((n)=>n[0]).join('').slice(0, 2).toUpperCase();
    const s = SIZES[size];
    if (photoUrl && !error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('rounded-full overflow-hidden flex-shrink-0', s.box, className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('rounded-full flex items-center justify-center flex-shrink-0 bg-orange-100', s.box, className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('font-semibold text-orange-700', s.text),
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
_s(Avatar, "AvrsuJm02Cqlq6/LWpvA21zDecQ=");
_c = Avatar;
var _c;
__turbopack_context__.k.register(_c, "Avatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/BranchDetailDrawer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BranchDetailDrawer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/Drawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useAgencyLookups.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/branchService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/staff-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ToastContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/toastError.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/displayLabels.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const cls = {
    input: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white placeholder:text-gray-400 transition',
    select: 'w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 bg-white transition cursor-pointer',
    label: 'block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5'
};
function Stat({ label, value, sub }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xl font-bold text-gray-900",
                children: value
            }, void 0, false, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-gray-500 mt-0.5",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            sub && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] text-gray-400",
                children: sub
            }, void 0, false, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 33,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BranchDetailDrawer.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = Stat;
function InfoRow({ label, value, icon: Icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-3 py-3 border-b border-gray-100 last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 13,
                    className: "text-gray-400"
                }, void 0, false, {
                    fileName: "[project]/components/BranchDetailDrawer.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-gray-400 uppercase tracking-wider",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-800 mt-0.5",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BranchDetailDrawer.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c1 = InfoRow;
function BranchDetailDrawer({ branch, open, onClose, onAction }) {
    _s();
    const { deliverers, vehicles, missions, staff } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAgencyLookups"])();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    const [photoPreview, setPhotoPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const photoInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [acting, setActing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { success: toastSuccess, error: toastError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [editForm, setEditForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        address: '',
        city: '',
        openingHours: '',
        managerId: ''
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BranchDetailDrawer.useEffect": ()=>{
            if (branch) {
                setEditForm({
                    name: branch.name,
                    address: branch.address,
                    city: branch.city,
                    openingHours: branch.openingHours,
                    managerId: branch.managerId ?? ''
                });
                setTab('overview');
                setPhotoPreview(null);
            }
        }
    }["BranchDetailDrawer.useEffect"], [
        branch
    ]);
    if (!branch) return null;
    const act = async (key, fn, successMsg, errorMsg)=>{
        setActing(key);
        try {
            await fn();
            toastSuccess(successMsg);
            onAction?.();
            onClose();
        } catch (err) {
            toastError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastErrorMessage"])(err, errorMsg));
        } finally{
            setActing(null);
        }
    };
    const branchDeliverers = deliverers.filter((d)=>d.branchId === branch.id);
    const branchVehicles = vehicles.filter((v)=>v.branchId === branch.id);
    const branchMissions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionsForBranch"])(missions, deliverers, branch.id);
    const eligibleManagers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$staff$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEligibleBranchManagers"])(staff);
    const activeMissions = branchMissions.filter((m)=>[
            'IN_TRANSIT',
            'ASSIGNED',
            'PENDING'
        ].includes(m.status)).length;
    const deliveredToday = branchMissions.filter((m)=>m.status === 'DELIVERED').length;
    const currentPhoto = photoPreview ?? branch.photoUrl ?? null;
    const statusLabel = {
        OPEN: 'Ouverte',
        TEMPORARILY_CLOSED: 'Fermée temporairement',
        PERMANENTLY_CLOSED: 'Fermée définitivement'
    }[branch.status];
    const handlePhotoChange = (e)=>{
        const f = e.target.files?.[0];
        if (!f) return;
        if (photoPreview) URL.revokeObjectURL(photoPreview);
        setPhotoPreview(URL.createObjectURL(f));
    };
    const handleSaveEdit = async (e)=>{
        e.preventDefault();
        setSaving(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].updateBranch(branch.id, {
                name: editForm.name,
                address: editForm.address,
                city: editForm.city,
                openingHours: editForm.openingHours
            });
            if (editForm.managerId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].assignManager(branch.id, editForm.managerId);
            } else if (branch.managerId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].clearManager(branch.id);
            }
            toastSuccess('Antenne mise à jour.');
            onAction?.();
            setTab('overview');
        } catch (err) {
            toastError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$toastError$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toastErrorMessage"])(err, 'Impossible de mettre à jour cette antenne. Réessayez.'));
        } finally{
            setSaving(false);
        }
    };
    const statusFooter = branch.status === 'OPEN' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>act('temp-close', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].temporarilyCloseBranch(branch.id), 'Antenne fermée temporairement.', 'Impossible de fermer temporairement cette antenne.'),
                disabled: !!acting,
                className: "flex-1 h-9 border border-orange-200 text-orange-700 text-sm font-medium rounded-lg hover:bg-orange-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2",
                children: [
                    acting === 'temp-close' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        size: 13,
                        className: "animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 163,
                        columnNumber: 37
                    }, this),
                    "Fermer temporairement"
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>act('close', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].closeBranch(branch.id), 'Antenne fermée définitivement.', 'Impossible de fermer cette antenne.'),
                disabled: !!acting,
                className: "flex-1 h-9 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 disabled:opacity-60 transition-colors flex items-center justify-center gap-2",
                children: [
                    acting === 'close' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        size: 13,
                        className: "animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 176,
                        columnNumber: 32
                    }, this),
                    "Fermer définitivement"
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BranchDetailDrawer.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this) : branch.status === 'TEMPORARILY_CLOSED' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: ()=>act('reopen', ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].reopenBranch(branch.id), 'Antenne rouverte.', 'Impossible de rouvrir cette antenne.'),
        disabled: !!acting,
        className: "w-full h-9 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2",
        children: [
            acting === 'reopen' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                size: 13,
                className: "animate-spin"
            }, void 0, false, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 191,
                columnNumber: 31
            }, this),
            "Rouvrir l'antenne"
        ]
    }, void 0, true, {
        fileName: "[project]/components/BranchDetailDrawer.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this) : undefined;
    const editFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setTab('overview'),
                className: "flex-1 h-9 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors",
                children: "Annuler"
            }, void 0, false, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                form: "branch-edit-form",
                disabled: saving,
                className: "flex-1 h-9 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2",
                children: [
                    saving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        size: 13,
                        className: "animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 211,
                        columnNumber: 20
                    }, this),
                    "Enregistrer"
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BranchDetailDrawer.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: onClose,
        title: branch.name,
        description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchDrawerDescription"])(branch),
        size: "lg",
        footer: tab === 'edit' ? editFooter : statusFooter,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex border-b border-gray-200 px-6",
                children: [
                    {
                        id: 'overview',
                        label: 'Aperçu',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"]
                    },
                    {
                        id: 'edit',
                        label: 'Édition',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"]
                    }
                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setTab(t.id),
                        className: `flex items-center gap-2 py-3 px-1 mr-6 text-sm font-medium border-b-2 transition-colors ${tab === t.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this),
                            t.label
                        ]
                    }, t.id, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            tab === 'edit' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                id: "branch-edit-form",
                onSubmit: handleSaveEdit,
                className: "p-6 space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: cls.label,
                                children: [
                                    "Nom de l'antenne ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-500",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 251,
                                        columnNumber: 64
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                required: true,
                                type: "text",
                                value: editForm.name,
                                onChange: (e)=>setEditForm((f)=>({
                                            ...f,
                                            name: e.target.value
                                        })),
                                className: cls.input
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: cls.label,
                                        children: [
                                            "Ville ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-orange-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 263,
                                                columnNumber: 50
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 263,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        type: "text",
                                        value: editForm.city,
                                        onChange: (e)=>setEditForm((f)=>({
                                                    ...f,
                                                    city: e.target.value
                                                })),
                                        className: cls.input
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 264,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: cls.label,
                                        children: "Horaires"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: editForm.openingHours,
                                        onChange: (e)=>setEditForm((f)=>({
                                                    ...f,
                                                    openingHours: e.target.value
                                                })),
                                        placeholder: "Lun–Sam 07h00–20h00",
                                        className: cls.input
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 261,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: cls.label,
                                children: [
                                    "Adresse complète ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-500",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 285,
                                        columnNumber: 59
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                required: true,
                                type: "text",
                                value: editForm.address,
                                onChange: (e)=>setEditForm((f)=>({
                                            ...f,
                                            address: e.target.value
                                        })),
                                className: cls.input
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 284,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: cls.label,
                                children: "Responsable de l'antenne"
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: editForm.managerId,
                                onChange: (e)=>setEditForm((f)=>({
                                            ...f,
                                            managerId: e.target.value
                                        })),
                                className: cls.select,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Aucun responsable assigné"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this),
                                    eligibleManagers.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: m.id,
                                            children: [
                                                m.fullName,
                                                m.branchId && m.branchId !== branch.id ? ` (actuellement : ${m.branchName})` : ''
                                            ]
                                        }, m.id, true, {
                                            fileName: "[project]/components/BranchDetailDrawer.tsx",
                                            lineNumber: 304,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-1",
                                children: "Liste des managers et responsables administratifs de l'agence"
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this),
                    branch.managerName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                name: branch.managerName,
                                size: "sm"
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 317,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-gray-900",
                                        children: branch.managerName
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 319,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: branch.managerEmail ?? branch.managerPhone
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 320,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 318,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 316,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 249,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-44 bg-gradient-to-br from-orange-50 to-gray-100 group",
                        children: [
                            currentPhoto ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: currentPhoto,
                                alt: branch.name,
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 330,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full flex flex-col items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                                        size: 36,
                                        className: "text-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 333,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-400",
                                        children: "Aucune photo de l'antenne"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 334,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 332,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: photoInputRef,
                                type: "file",
                                accept: "image/*",
                                className: "hidden",
                                onChange: handlePhotoChange
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>photoInputRef.current?.click(),
                                className: "absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 hover:bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this),
                                    currentPhoto ? 'Changer la photo' : 'Ajouter une photo'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 338,
                                columnNumber: 13
                            }, this),
                            branch.isHeadquarters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-3 left-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded uppercase tracking-wide shadow-sm",
                                    children: "Siège"
                                }, void 0, false, {
                                    fileName: "[project]/components/BranchDetailDrawer.tsx",
                                    lineNumber: 348,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 347,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `px-6 py-3 flex items-center gap-3 border-b border-gray-100 ${branch.status === 'OPEN' ? 'bg-emerald-50' : 'bg-orange-50'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-center gap-2 text-sm font-medium ${branch.status === 'OPEN' ? 'text-emerald-700' : 'text-orange-700'}`,
                            children: [
                                branch.status === 'OPEN' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/components/BranchDetailDrawer.tsx",
                                    lineNumber: 358,
                                    columnNumber: 43
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/components/BranchDetailDrawer.tsx",
                                    lineNumber: 358,
                                    columnNumber: 72
                                }, this),
                                statusLabel
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BranchDetailDrawer.tsx",
                            lineNumber: 357,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 py-5 grid grid-cols-4 gap-4 border-b border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                                label: "Livreurs",
                                value: branchDeliverers.length
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                                label: "Véhicules",
                                value: branchVehicles.length
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 366,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                                label: "Missions actives",
                                value: activeMissions
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                                label: "Livrées (total)",
                                value: deliveredToday
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 368,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 364,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3",
                                        children: "Informations"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 373,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white border border-gray-200 rounded-xl px-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                label: "Adresse",
                                                value: `${branch.address}, ${branch.city}`,
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
                                            }, void 0, false, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 375,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                label: "Horaires",
                                                value: branch.openingHours,
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"]
                                            }, void 0, false, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 376,
                                                columnNumber: 17
                                            }, this),
                                            branch.managerName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                label: "Responsable",
                                                value: branch.managerName,
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"]
                                            }, void 0, false, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 378,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                label: "Responsable",
                                                value: "Non assigné",
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"]
                                            }, void 0, false, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 380,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoRow, {
                                                label: "Créée le",
                                                value: new Date(branch.createdAt).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }),
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"]
                                            }, void 0, false, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 382,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3",
                                        children: [
                                            "Livreurs rattachés (",
                                            branchDeliverers.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this),
                                    branchDeliverers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 italic",
                                        children: "Aucun livreur rattaché à cette antenne."
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 389,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden",
                                        children: branchDeliverers.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 px-5 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        name: d.fullName,
                                                        photoUrl: d.photoUrl,
                                                        size: "sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-gray-900",
                                                                children: d.fullName
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-400",
                                                                children: d.phone
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5 text-xs",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `w-1.5 h-1.5 rounded-full ${d.status === 'AVAILABLE' ? 'bg-emerald-500' : d.status === 'ON_MISSION' ? 'bg-blue-500' : d.status === 'SUSPENDED' ? 'bg-red-500' : 'bg-gray-300'}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-500",
                                                                        children: d.status === 'AVAILABLE' ? 'Disponible' : d.status === 'ON_MISSION' ? 'En mission' : d.status === 'OFFLINE' ? 'Hors ligne' : d.status === 'SUSPENDED' ? 'Suspendu' : 'Inactif'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                        lineNumber: 406,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                        size: 11,
                                                                        className: "text-orange-400 fill-orange-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                        lineNumber: 414,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-medium text-gray-600",
                                                                        children: d.rating.toFixed(1)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                        lineNumber: 415,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, d.id, true, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 393,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 391,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 386,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3",
                                        children: [
                                            "Flotte de l'antenne (",
                                            branchVehicles.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 425,
                                        columnNumber: 15
                                    }, this),
                                    branchVehicles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 italic",
                                        children: "Aucun véhicule rattaché à cette antenne."
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 427,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden",
                                        children: branchVehicles.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 px-5 py-3",
                                                children: [
                                                    v.photoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: v.photoUrl,
                                                        alt: v.model,
                                                        className: "w-8 h-8 rounded object-cover flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 433,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                        size: 15,
                                                        className: "text-gray-400 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-gray-900",
                                                                children: v.model
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-400",
                                                                children: v.registrationNumber
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                lineNumber: 439,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs px-2 py-0.5 rounded font-medium ${v.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700' : v.status === 'IN_USE' ? 'bg-blue-50 text-blue-700' : v.status === 'IN_MAINTENANCE' ? 'bg-orange-50 text-orange-700' : 'bg-gray-100 text-gray-400'}`,
                                                        children: v.status === 'AVAILABLE' ? 'Disponible' : v.status === 'IN_USE' ? 'En service' : v.status === 'IN_MAINTENANCE' ? 'Maintenance' : 'Retiré'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, v.id, true, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 431,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 429,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 424,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3",
                                        children: "Missions récentes"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, this),
                                    branchMissions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 italic",
                                        children: "Aucune mission."
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 459,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden",
                                        children: branchMissions.slice(0, 5).map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 px-5 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                        size: 13,
                                                        className: "text-gray-400 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-medium text-gray-900 truncate",
                                                                children: m.manifestNumber
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                lineNumber: 466,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-400 truncate",
                                                                children: [
                                                                    m.recipientName,
                                                                    " · ",
                                                                    m.deliveryAddress
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                                lineNumber: 467,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 465,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${m.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700' : m.status === 'IN_TRANSIT' ? 'bg-blue-50 text-blue-700' : m.status === 'CANCELLED' ? 'bg-gray-100 text-gray-500' : m.status === 'FAILED' ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'}`,
                                                        children: m.status === 'DELIVERED' ? 'Livrée' : m.status === 'IN_TRANSIT' ? 'En transit' : m.status === 'PENDING' ? 'En attente' : m.status === 'ASSIGNED' ? 'Assignée' : m.status === 'CANCELLED' ? 'Annulée' : m.status === 'FAILED' ? 'Échouée' : m.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, m.id, true, {
                                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                                lineNumber: 463,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                                        lineNumber: 461,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BranchDetailDrawer.tsx",
                                lineNumber: 456,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BranchDetailDrawer.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchDetailDrawer.tsx",
                lineNumber: 326,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BranchDetailDrawer.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, this);
}
_s(BranchDetailDrawer, "dh5KPfPV8+SPyYeQsKn5YqVqe3c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useAgencyLookups$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAgencyLookups"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ToastContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c2 = BranchDetailDrawer;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Stat");
__turbopack_context__.k.register(_c1, "InfoRow");
__turbopack_context__.k.register(_c2, "BranchDetailDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/hooks/useService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useService": (()=>useService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useService(loader, fallback) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        data: fallback,
        loading: true,
        error: null
    });
    const fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useService.useCallback[fetch]": ()=>{
            setState({
                "useService.useCallback[fetch]": (s)=>({
                        ...s,
                        loading: true,
                        error: null
                    })
            }["useService.useCallback[fetch]"]);
            loader().then({
                "useService.useCallback[fetch]": (data)=>setState({
                        data,
                        loading: false,
                        error: null
                    })
            }["useService.useCallback[fetch]"]).catch({
                "useService.useCallback[fetch]": (e)=>setState({
                        "useService.useCallback[fetch]": (s)=>({
                                ...s,
                                loading: false,
                                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUserError"])(e, 'Impossible de charger les données. Réessayez.')
                            })
                    }["useService.useCallback[fetch]"])
            }["useService.useCallback[fetch]"]);
        }
    }["useService.useCallback[fetch]"], []); // eslint-disable-line react-hooks/exhaustive-deps
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useService.useEffect": ()=>{
            fetch();
        }
    }["useService.useEffect"], [
        fetch
    ]);
    const setData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useService.useCallback[setData]": (d)=>setState({
                "useService.useCallback[setData]": (s)=>({
                        ...s,
                        data: d
                    })
            }["useService.useCallback[setData]"])
    }["useService.useCallback[setData]"], []);
    return {
        ...state,
        refetch: fetch,
        setData
    };
}
_s(useService, "xXczIbdonWRUQdWFofeiVvAJel8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/emptyDefaults.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
    id: '',
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
    agencyId: '',
    branchesCount: 0,
    deliverersCount: 0,
    hubsCount: 0,
    vehiclesCount: 0,
    activeMissionsCount: 0,
    pendingCommissionsCount: 0
};
const EMPTY_REPORT = {
    agencyId: '',
    missionsByStatus: {},
    commissionsByStatus: {}
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/branches/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BranchesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$CreateBranchForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/forms/CreateBranchForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchDetailDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BranchDetailDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/branchService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/displayLabels.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$emptyDefaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/emptyDefaults.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function BranchStatusBadge({ status }) {
    const map = {
        OPEN: 'bg-emerald-50 text-emerald-700',
        TEMPORARILY_CLOSED: 'bg-orange-50 text-orange-700',
        PERMANENTLY_CLOSED: 'bg-red-50 text-red-700'
    };
    const labels = {
        OPEN: 'Ouverte',
        TEMPORARILY_CLOSED: 'Fermée temporairement',
        PERMANENTLY_CLOSED: 'Fermée définitivement'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${map[status]}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `w-1.5 h-1.5 rounded-full ${status === 'OPEN' ? 'bg-emerald-500' : status === 'TEMPORARILY_CLOSED' ? 'bg-orange-500' : 'bg-red-500'}`
            }, void 0, false, {
                fileName: "[project]/app/branches/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            labels[status]
        ]
    }, void 0, true, {
        fileName: "[project]/app/branches/page.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = BranchStatusBadge;
function BranchCard({ branch, photoUrl, onPhotoChange, onClick }) {
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFile = (e)=>{
        const f = e.target.files?.[0];
        if (!f) return;
        onPhotoChange(branch.id, URL.createObjectURL(f));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        className: "bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 hover:shadow-sm transition-all cursor-pointer group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-32 bg-gradient-to-br from-orange-50 to-gray-100",
                children: [
                    photoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: photoUrl,
                        alt: branch.name,
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full flex flex-col items-center justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
                                size: 28,
                                className: branch.status === 'OPEN' ? 'text-orange-300' : 'text-gray-300'
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-400",
                                children: "Aucune photo"
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            inputRef.current?.click();
                        },
                        className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                size: 20,
                                className: "text-white"
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-white font-medium",
                                children: photoUrl ? 'Changer la photo' : 'Ajouter une photo'
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        onChange: handleFile
                    }, void 0, false, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    branch.isHeadquarters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 left-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded uppercase tracking-wide shadow-sm",
                            children: "Siège"
                        }, void 0, false, {
                            fileName: "[project]/app/branches/page.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BranchStatusBadge, {
                            status: branch.status
                        }, void 0, false, {
                            fileName: "[project]/app/branches/page.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/branches/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold text-gray-900",
                                        children: branch.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mt-0.5",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$displayLabels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchCardMeta"])(branch)
                                    }, void 0, false, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    onClick();
                                },
                                className: "opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                    size: 16,
                                    className: "text-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/branches/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs text-gray-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        size: 11,
                                        className: "text-gray-400 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: [
                                            branch.address,
                                            ", ",
                                            branch.city
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs text-gray-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        size: 11,
                                        className: "text-gray-400 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: branch.openingHours
                                    }, void 0, false, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            branch.managerName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs text-gray-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                        size: 11,
                                        className: "text-gray-400 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Responsable : ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium text-gray-700",
                                                children: branch.managerName
                                            }, void 0, false, {
                                                fileName: "[project]/app/branches/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 pt-3 border-t border-gray-100 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        size: 12,
                                        className: "text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-gray-700",
                                                children: branch.deliverersCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/branches/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this),
                                            " livreur",
                                            branch.deliverersCount > 1 ? 's' : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/branches/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-400",
                                children: [
                                    "Créée le ",
                                    new Date(branch.createdAt).toLocaleDateString('fr-FR')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/branches/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/branches/page.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(BranchCard, "iD9XNNsNOlNDckBemnvlLS+aHYk=");
_c1 = BranchCard;
function BranchesPage() {
    _s1();
    const { data: branches, setData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useService"])({
        "BranchesPage.useService": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].getBranches()
    }["BranchesPage.useService"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$emptyDefaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_BRANCHES"]);
    const [formOpen, setFormOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedBranch, setSelectedBranch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detailOpen, setDetailOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [photoMap, setPhotoMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const openCount = branches.filter((b)=>b.status === 'OPEN').length;
    const refreshBranches = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$branchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["branchService"].getBranches().then((updated)=>{
            setData(updated);
            if (selectedBranch) {
                const fresh = updated.find((b)=>b.id === selectedBranch.id);
                if (fresh) setSelectedBranch(fresh);
            }
        });
    };
    const openDetail = (branch)=>{
        setSelectedBranch(branch);
        setDetailOpen(true);
    };
    const handlePhotoChange = (id, url)=>{
        setPhotoMap((prev)=>({
                ...prev,
                [id]: url
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-semibold text-gray-900",
                                children: "Antennes"
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-0.5",
                                children: [
                                    branches.length,
                                    " antennes · ",
                                    openCount,
                                    " ouvertes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFormOpen(true),
                        className: "inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 15
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            "Nouvelle antenne"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/branches/page.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                    {
                        label: 'Antennes ouvertes',
                        value: openCount,
                        sub: `sur ${branches.length} au total`,
                        color: 'text-emerald-600'
                    },
                    {
                        label: 'Total livreurs',
                        value: branches.reduce((s, b)=>s + b.deliverersCount, 0),
                        sub: 'rattachés aux antennes',
                        color: 'text-blue-600'
                    },
                    {
                        label: 'Siège social',
                        value: 'Akwa',
                        sub: '3 Rue Joss, Douala',
                        color: 'text-orange-600'
                    }
                ].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-gray-200 rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-2xl font-bold ${c.color}`,
                                children: c.value
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-gray-700 mt-0.5",
                                children: c.label
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-0.5",
                                children: c.sub
                            }, void 0, false, {
                                fileName: "[project]/app/branches/page.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        ]
                    }, c.label, true, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/branches/page.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                children: branches.map((branch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BranchCard, {
                        branch: branch,
                        photoUrl: photoMap[branch.id] ?? branch.photoUrl,
                        onPhotoChange: handlePhotoChange,
                        onClick: ()=>openDetail(branch)
                    }, branch.id, false, {
                        fileName: "[project]/app/branches/page.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/branches/page.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$forms$2f$CreateBranchForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: formOpen,
                onClose: ()=>setFormOpen(false),
                onSuccess: refreshBranches
            }, void 0, false, {
                fileName: "[project]/app/branches/page.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BranchDetailDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                branch: selectedBranch,
                open: detailOpen,
                onClose: ()=>setDetailOpen(false),
                onAction: refreshBranches
            }, void 0, false, {
                fileName: "[project]/app/branches/page.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/branches/page.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_s1(BranchesPage, "GHelOG5o5v6hL1YvtXcdIrqhMOU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useService"]
    ];
});
_c2 = BranchesPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "BranchStatusBadge");
__turbopack_context__.k.register(_c1, "BranchCard");
__turbopack_context__.k.register(_c2, "BranchesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_5de88c72._.js.map