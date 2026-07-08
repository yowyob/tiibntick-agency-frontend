(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/MissionsMap.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MissionsMap)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Positions démo (mode mock)
const DEMO_MISSION_POSITIONS = {
    'MSN-001': [
        4.0481,
        9.6992
    ],
    'MSN-002': [
        4.0441,
        9.6952
    ],
    'MSN-003': [
        4.0482,
        9.7005
    ],
    'MSN-004': [
        4.0440,
        9.7032
    ],
    'MSN-005': [
        4.0562,
        9.7145
    ],
    'MSN-006': [
        4.0558,
        9.7118
    ],
    'MSN-007': [
        4.0392,
        9.6782
    ],
    'MSN-008': [
        4.0742,
        9.7287
    ],
    'MSN-009': [
        4.0498,
        9.7015
    ],
    'MSN-010': [
        4.0440,
        9.6960
    ]
};
/** Position approximative dérivée de l'identifiant (GPS réel via TiiBnTick Core en prod). */ function missionPosition(mission) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMO_MODE"] && DEMO_MISSION_POSITIONS[mission.id]) {
        return DEMO_MISSION_POSITIONS[mission.id];
    }
    let hash = 0;
    for(let i = 0; i < mission.id.length; i++){
        hash = (hash << 5) - hash + mission.id.charCodeAt(i);
        hash |= 0;
    }
    const lat = 4.0511 + ((hash & 0xff) / 255 - 0.5) * 0.08;
    const lng = 9.7022 + ((hash >> 8 & 0xff) / 255 - 0.5) * 0.08;
    return [
        lat,
        lng
    ];
}
const MARKER_COLORS = {
    PENDING: '#9ca3af',
    ASSIGNED: '#6366f1',
    IN_TRANSIT: '#f97316',
    AT_HUB: '#8b5cf6',
    DELIVERED: '#10b981',
    FAILED: '#ef4444',
    CANCELLED: '#9ca3af',
    DRAFT: '#d1d5db'
};
const STATUS_LABELS = {
    PENDING: 'En attente',
    ASSIGNED: 'Assignée',
    IN_TRANSIT: 'En transit',
    AT_HUB: 'Au hub',
    DELIVERED: 'Livrée',
    FAILED: 'Échouée',
    CANCELLED: 'Annulée',
    DRAFT: 'Brouillon'
};
function createIcon(status) {
    const color = MARKER_COLORS[status] ?? '#9ca3af';
    const isActive = status === 'IN_TRANSIT' || status === 'ASSIGNED';
    const html = isActive ? `<div style="position:relative;width:26px;height:26px">
         <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.25;animation:mping 1.6s ease-out infinite"></div>
         <div style="position:absolute;inset:5px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>
       </div>` : `<div style="width:13px;height:13px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>`;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
        html,
        className: '',
        iconSize: isActive ? [
            26,
            26
        ] : [
            13,
            13
        ],
        iconAnchor: isActive ? [
            13,
            13
        ] : [
            6.5,
            6.5
        ],
        popupAnchor: [
            0,
            -14
        ]
    });
}
function MissionsMap({ missions, onMissionClick }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionsMap.useEffect": ()=>{
            const id = 'mping-style';
            if (document.getElementById(id)) return;
            const style = document.createElement('style');
            style.id = id;
            style.textContent = `@keyframes mping { 0% { transform:scale(1); opacity:.25; } 70% { transform:scale(2.2); opacity:0; } 100% { opacity:0; } }`;
            document.head.appendChild(style);
        }
    }["MissionsMap.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
        center: [
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_CENTER_LAT"],
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_CENTER_LNG"]
        ],
        zoom: 13,
        style: {
            width: '100%',
            height: '100%'
        },
        zoomControl: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                attribution: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_ATTRIBUTION"],
                url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_TILE_URL"]
            }, void 0, false, {
                fileName: "[project]/components/MissionsMap.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            missions.map((mission)=>{
                const pos = missionPosition(mission);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: pos,
                    icon: createIcon(mission.status),
                    eventHandlers: {
                        click: ()=>onMissionClick(mission)
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'sans-serif',
                                minWidth: 190
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontWeight: 700,
                                        fontSize: 13,
                                        marginBottom: 4
                                    },
                                    children: mission.manifestNumber
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionsMap.tsx",
                                    lineNumber: 120,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 11,
                                        color: '#6b7280',
                                        marginBottom: 6
                                    },
                                    children: [
                                        STATUS_LABELS[mission.status],
                                        mission.delivererName ? ` · ${mission.delivererName}` : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MissionsMap.tsx",
                                    lineNumber: 121,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: '#111827',
                                        marginBottom: 2
                                    },
                                    children: mission.recipientName || 'Destinataire'
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionsMap.tsx",
                                    lineNumber: 125,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 11,
                                        color: '#9ca3af'
                                    },
                                    children: mission.deliveryAddress || 'Adresse — TiiBnTick Core'
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionsMap.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onMissionClick(mission),
                                    style: {
                                        marginTop: 8,
                                        width: '100%',
                                        padding: '5px 0',
                                        background: '#f97316',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 6,
                                        fontSize: 11,
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    },
                                    children: "Voir le détail"
                                }, void 0, false, {
                                    fileName: "[project]/components/MissionsMap.tsx",
                                    lineNumber: 129,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/MissionsMap.tsx",
                            lineNumber: 119,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MissionsMap.tsx",
                        lineNumber: 118,
                        columnNumber: 13
                    }, this)
                }, mission.id, false, {
                    fileName: "[project]/components/MissionsMap.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/MissionsMap.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(MissionsMap, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = MissionsMap;
var _c;
__turbopack_context__.k.register(_c, "MissionsMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/MissionsMap.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/components/MissionsMap.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=components_MissionsMap_tsx_8a3ed2f9._.js.map