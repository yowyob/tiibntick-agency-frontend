(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/contexts/ThemeContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider),
    "useTheme": (()=>useTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    theme: 'light',
    toggleTheme: ()=>{},
    setTheme: ()=>{}
});
function ThemeProvider({ children }) {
    _s();
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('light');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const stored = localStorage.getItem('tnt-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initial = stored ?? (prefersDark ? 'dark' : 'light');
            setThemeState(initial);
            document.documentElement.classList.toggle('dark', initial === 'dark');
        }
    }["ThemeProvider.useEffect"], []);
    const setTheme = (t)=>{
        setThemeState(t);
        document.documentElement.classList.toggle('dark', t === 'dark');
        localStorage.setItem('tnt-theme', t);
    };
    const toggleTheme = ()=>setTheme(theme === 'light' ? 'dark' : 'light');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme,
            setTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/ThemeContext.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "a/I2Pz4jlASt48yPPSCSl9Hbhqo=");
_c = ThemeProvider;
const useTheme = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
};
_s1(useTheme, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/layout/Sidebar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Sidebar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const navSections = [
    {
        items: [
            {
                label: 'Dashboard',
                href: '/',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
            }
        ]
    },
    {
        title: 'Agence',
        items: [
            {
                label: 'Profil Agence',
                href: '/profile',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"]
            },
            {
                label: 'Antennes',
                href: '/branches',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"]
            }
        ]
    },
    {
        title: 'Opérations',
        items: [
            {
                label: 'Missions',
                href: '/missions',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
            },
            {
                label: 'Flotte',
                href: '/fleet',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
            },
            {
                label: 'Hubs Relais',
                href: '/hubs',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
                isNew: true
            }
        ]
    },
    {
        title: 'Ressources Humaines',
        items: [
            {
                label: 'Personnel',
                href: '/staff',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            }
        ]
    },
    {
        title: 'Finance',
        items: [
            {
                label: 'Facturation',
                href: '/billing',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"]
            }
        ]
    },
    {
        title: 'Système',
        items: [
            {
                label: 'Paramètres',
                href: '/settings',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
            },
            {
                label: 'Suivi colis',
                href: '/track',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"]
            },
            {
                label: 'Espace Livreur',
                href: '/livreur/login',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"],
                isExternal: true
            },
            {
                label: 'Espace Antenne',
                href: '/branch/login',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"],
                isExternal: true
            }
        ]
    }
];
function Sidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Agency Manager');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            setEmail(localStorage.getItem('tnt-user-email') ?? '');
            setRole(localStorage.getItem('tnt-user-role')?.replace(/_/g, ' ') ?? 'Agency Manager');
        }
    }["Sidebar.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-64 flex-shrink-0 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 flex flex-col h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-16 flex items-center px-5 border-b border-gray-200 dark:border-slate-800 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white font-bold text-xs",
                                children: "TA"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-gray-900 dark:text-slate-100 truncate",
                                    children: "TiiBnTick Agency"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-gray-400 dark:text-slate-500 truncate",
                                    children: "Portail Agence"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 overflow-y-auto py-4 px-3",
                children: navSections.map((section, si)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: si > 0 ? 'mt-5' : '',
                        children: [
                            section.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-600 px-3 mb-1.5",
                                children: section.title
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-0.5",
                                children: section.items.map((item)=>{
                                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                                    const Icon = item.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: 'isExternal' in item && item.isExternal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: item.href,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 group relative text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 16,
                                                    className: "flex-shrink-0 text-orange-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex-1 truncate",
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded uppercase tracking-wide",
                                                    children: "APP"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/Sidebar.tsx",
                                            lineNumber: 99,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 group relative', isActive ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-gray-900 dark:hover:text-slate-200'),
                                            children: [
                                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-500 rounded-r"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 16,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('flex-shrink-0', isActive ? 'text-orange-500' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex-1 truncate",
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 25
                                                }, this),
                                                'isNew' in item && item.isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wide",
                                                    children: "NEW"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/Sidebar.tsx",
                                            lineNumber: 110,
                                            columnNumber: 23
                                        }, this)
                                    }, item.href, false, {
                                        fileName: "[project]/components/layout/Sidebar.tsx",
                                        lineNumber: 97,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, si, true, {
                        fileName: "[project]/components/layout/Sidebar.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-200 dark:border-slate-800 p-3 flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 px-2 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-orange-700 dark:text-orange-400 text-xs font-semibold",
                                children: email.slice(0, 2).toUpperCase() || 'AM'
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-medium text-gray-900 dark:text-slate-200 truncate",
                                    children: role
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-gray-400 dark:text-slate-500 truncate",
                                    children: email || '—'
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/Sidebar.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                window.location.href = '/login';
                            },
                            title: "Déconnexion",
                            className: "p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/layout/Sidebar.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Sidebar.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Sidebar.tsx",
                    lineNumber: 147,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/Sidebar.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Sidebar.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "kRVxvbj4VrFfB5F7GC+eKnNPqtQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/config.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Variables d'environnement — source de vérité : backend/.env (section NEXT_PUBLIC_*)
/**
 * Auth IAM — Kernel RT-ComOps (PAS tnt-trust).
 * tnt-trust (:8090) = blockchain/preuves logistiques, service séparé.
 */ __turbopack_context__.s({
    "AGENCY_FRONTEND_URL": (()=>AGENCY_FRONTEND_URL),
    "AGENCY_PUBLIC_BASE_URL": (()=>AGENCY_PUBLIC_BASE_URL),
    "API_BASE_URL": (()=>API_BASE_URL),
    "KERNEL_API_KEY": (()=>KERNEL_API_KEY),
    "KERNEL_AUTH_BASE_URL": (()=>KERNEL_AUTH_BASE_URL),
    "KERNEL_CLIENT_ID": (()=>KERNEL_CLIENT_ID),
    "MAPS_PROVIDER_URL": (()=>MAPS_PROVIDER_URL),
    "MAP_ATTRIBUTION": (()=>MAP_ATTRIBUTION),
    "MAP_CENTER_LAT": (()=>MAP_CENTER_LAT),
    "MAP_CENTER_LNG": (()=>MAP_CENTER_LNG),
    "MAP_DEFAULT_CITY": (()=>MAP_DEFAULT_CITY),
    "MAP_TILE_URL": (()=>MAP_TILE_URL),
    "TNT_TRUST_BASE_URL": (()=>TNT_TRUST_BASE_URL),
    "WHATSAPP_BASE_URL": (()=>WHATSAPP_BASE_URL),
    "YOWAUTH_BASE_URL": (()=>YOWAUTH_BASE_URL)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const KERNEL_AUTH_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_KERNEL_AUTH_BASE_URL ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_YOWAUTH_BASE_URL ?? 'https://kernel-core.yowyob.com';
const YOWAUTH_BASE_URL = KERNEL_AUTH_BASE_URL;
const KERNEL_CLIENT_ID = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_KERNEL_CLIENT_ID ?? '';
const KERNEL_API_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_KERNEL_API_KEY ?? '';
const TNT_TRUST_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8090") ?? 'http://localhost:8090';
const AGENCY_PUBLIC_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8081/agency") ?? 'http://localhost:8081/agency';
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8081/agency/v1") ?? `${AGENCY_PUBLIC_BASE_URL}/v1`;
const MAP_TILE_URL = ("TURBOPACK compile-time value", "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png") ?? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTION = ("TURBOPACK compile-time value", "&copy; OpenStreetMap contributors") ?? '&copy; OpenStreetMap contributors';
const MAP_CENTER_LAT = Number(("TURBOPACK compile-time value", "4.0511") ?? '4.0511');
const MAP_CENTER_LNG = Number(("TURBOPACK compile-time value", "9.7022") ?? '9.7022');
const MAP_DEFAULT_CITY = ("TURBOPACK compile-time value", "Douala, Cameroun") ?? 'Douala, Cameroun';
const MAPS_PROVIDER_URL = ("TURBOPACK compile-time value", "https://maps.google.com/?q=") ?? 'https://maps.google.com/?q=';
const WHATSAPP_BASE_URL = ("TURBOPACK compile-time value", "https://wa.me/") ?? 'https://wa.me/';
const AGENCY_FRONTEND_URL = ("TURBOPACK compile-time value", "http://localhost:3001") ?? 'http://localhost:3001';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/session.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/** Session helpers — no hardcoded demo tenant IDs. */ __turbopack_context__.s({
    "getAgencyId": (()=>getAgencyId),
    "getAuthToken": (()=>getAuthToken),
    "getBranchId": (()=>getBranchId),
    "getSharedSessionToken": (()=>getSharedSessionToken),
    "getTenantId": (()=>getTenantId),
    "getUserEmail": (()=>getUserEmail),
    "getUserId": (()=>getUserId),
    "getUserRole": (()=>getUserRole)
});
function ls(primary, fallback) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return localStorage.getItem(primary) ?? (fallback ? localStorage.getItem(fallback) : null) ?? '';
}
function getAgencyId() {
    return ls('tnt-agency-id', 'tnt-branch-agency-id');
}
function getTenantId() {
    return ls('tnt-tenant-id', 'tnt-branch-tenant-id');
}
function getUserId() {
    return ls('tnt-user-id', 'tnt-branch-user-id');
}
function getAuthToken() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return localStorage.getItem('tnt-token') ?? localStorage.getItem('tnt-branch-token');
}
function getSharedSessionToken() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return localStorage.getItem('tnt-shared-session');
}
function getUserEmail() {
    return ls('tnt-user-email', 'tnt-branch-email');
}
function getUserRole() {
    const role = ls('tnt-user-role', 'tnt-branch-user-role');
    if (role) return role;
    if ("object" !== 'undefined' && localStorage.getItem('tnt-branch-token')) {
        return 'BRANCH_MANAGER';
    }
    return '';
}
function getBranchId() {
    return ls('tnt-branch-id');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/realtime.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "openMissionStream": (()=>openMissionStream),
    "openNotificationStream": (()=>openNotificationStream),
    "openTrackingStream": (()=>openTrackingStream),
    "subscribeRealtime": (()=>subscribeRealtime)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
;
;
const WS_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"].replace(/^http/, 'ws');
let sharedSocket = null;
let sharedHandlers = new Set();
function ensureWebSocket() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    if (sharedSocket && sharedSocket.readyState <= WebSocket.OPEN) return sharedSocket;
    const tenantId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTenantId"])();
    if (!tenantId) return null;
    sharedSocket = new WebSocket(`${WS_BASE_URL}/ws/realtime?tenantId=${encodeURIComponent(tenantId)}`);
    sharedSocket.onmessage = (msg)=>{
        try {
            const event = JSON.parse(msg.data);
            sharedHandlers.forEach((h)=>h(event));
        } catch  {}
    };
    sharedSocket.onclose = ()=>{
        sharedSocket = null;
        setTimeout(()=>{
            if (sharedHandlers.size > 0) ensureWebSocket();
        }, 3000);
    };
    return sharedSocket;
}
function subscribeRealtime(handler) {
    sharedHandlers.add(handler);
    ensureWebSocket();
    return ()=>{
        sharedHandlers.delete(handler);
        if (sharedHandlers.size === 0 && sharedSocket) {
            sharedSocket.close();
            sharedSocket = null;
        }
    };
}
function openTrackingStream(code, onUpdate) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/tracking/${encodeURIComponent(code.trim().toUpperCase())}/stream`;
    const es = new EventSource(url, {
        withCredentials: false
    });
    es.onmessage = (e)=>{
        try {
            onUpdate(JSON.parse(e.data));
        } catch  {}
    };
    return es;
}
function openMissionStream(missionId, onUpdate) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const tenantId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTenantId"])();
    if (!tenantId) return null;
    const es = new EventSource(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/missions/${missionId}/events?tenantId=${encodeURIComponent(tenantId)}`);
    es.onmessage = (e)=>{
        try {
            onUpdate(JSON.parse(e.data));
        } catch  {}
    };
    return es;
}
function openNotificationStream(token, onNotif) {
    const tenantId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTenantId"])();
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/notifications/stream?token=${encodeURIComponent(token)}&tenantId=${encodeURIComponent(tenantId)}`;
    const es = new EventSource(url);
    es.onmessage = (e)=>{
        try {
            onNotif(JSON.parse(e.data));
        } catch  {}
    };
    return es;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/errors.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "formatUserError": (()=>formatUserError),
    "isUuid": (()=>isUuid)
});
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const TECHNICAL_PATTERNS = [
    /failed to fetch/i,
    /networkerror/i,
    /network request failed/i,
    /load failed/i,
    /fetch failed/i,
    /aborterror/i,
    /internal server error/i,
    /bad gateway/i,
    /service unavailable/i,
    /gateway timeout/i,
    /unexpected token/i,
    /syntaxerror/i,
    /typeerror/i,
    /referenceerror/i,
    /^error api$/i,
    /^erreur api$/i,
    /^error$/i,
    /^unknown error$/i
];
const HTTP_MESSAGES = {
    400: 'Les informations envoyées sont invalides. Vérifiez le formulaire et réessayez.',
    401: 'Votre session a expiré. Veuillez vous reconnecter.',
    403: 'Vous n\'avez pas les droits pour effectuer cette action.',
    404: 'L\'élément demandé est introuvable ou n\'existe plus.',
    408: 'La requête a pris trop de temps. Vérifiez votre connexion et réessayez.',
    409: 'Cette action entre en conflit avec l\'état actuel. Actualisez la page.',
    422: 'Certaines données ne respectent pas les règles métier.',
    429: 'Trop de tentatives. Patientez quelques instants avant de réessayer.',
    500: 'Le serveur rencontre une difficulté temporaire. Réessayez dans un instant.',
    502: 'Le service est momentanément indisponible. Réessayez dans un instant.',
    503: 'Le service est en maintenance. Réessayez plus tard.',
    504: 'Le délai de réponse a été dépassé. Vérifiez votre connexion et réessayez.'
};
function isUuid(value) {
    return !!value && UUID_RE.test(value.trim());
}
function isTechnicalMessage(message) {
    const trimmed = message.trim();
    if (!trimmed) return true;
    if (isUuid(trimmed)) return true;
    if (TECHNICAL_PATTERNS.some((p)=>p.test(trimmed))) return true;
    if (/^[A-Z][A-Z0-9_]+$/.test(trimmed)) return true;
    if (trimmed.length > 180) return true;
    return false;
}
function isNetworkError(error) {
    if (error instanceof TypeError) return true;
    const msg = extractRawMessage(error).toLowerCase();
    return msg.includes('failed to fetch') || msg.includes('network') || msg.includes('load failed') || msg.includes('fetch failed');
}
function extractRawMessage(error) {
    if (!error) return '';
    if (typeof error === 'string') return error;
    if (typeof error === 'object' && error !== null && 'message' in error) {
        const msg = error.message;
        if (typeof msg === 'string') return msg;
    }
    return '';
}
function extractStatus(error) {
    if (typeof error === 'object' && error !== null && 'status' in error) {
        const status = error.status;
        if (typeof status === 'number') return status;
    }
    return undefined;
}
function formatUserError(error, fallback) {
    if (isNetworkError(error)) {
        return 'Impossible de joindre le serveur. Vérifiez votre connexion internet et réessayez.';
    }
    const status = extractStatus(error);
    if (status && HTTP_MESSAGES[status]) {
        const raw = extractRawMessage(error);
        if (raw && !isTechnicalMessage(raw) && raw.length <= 120) {
            return raw;
        }
        return HTTP_MESSAGES[status];
    }
    const raw = extractRawMessage(error);
    if (raw && !isTechnicalMessage(raw)) {
        return raw;
    }
    return fallback;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/api/envelope.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/** Backend envelope (Agency + Branch controllers) */ __turbopack_context__.s({
    "isApiEnvelope": (()=>isApiEnvelope),
    "unwrapApiData": (()=>unwrapApiData)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-client] (ecmascript)");
;
function isApiEnvelope(value) {
    return typeof value === 'object' && value !== null && 'status' in value && 'data' in value;
}
function unwrapApiData(body) {
    if (isApiEnvelope(body)) {
        if (body.status === 'ERROR' || body.error) {
            throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUserError"])({
                message: body.error?.message ?? ''
            }, 'Le serveur n\'a pas pu traiter votre demande. Réessayez.'));
        }
        return body.data;
    }
    return body;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/api/client.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "apiClient": (()=>apiClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$envelope$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/envelope.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
;
;
;
;
function buildHeaders(options, tenantId) {
    const tid = tenantId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTenantId"])();
    const aid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
    const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserId"])();
    if (!tid || !uid) {
        throw toApiError(401, '', 'Session invalide. Veuillez vous reconnecter.');
    }
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
        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUserError"])({
            status,
            message: rawMessage
        }, fallback)
    };
}
async function request(path, options = {}, overrideTenantId) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    let res;
    try {
        res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}${normalizedPath}`, {
            ...options,
            headers: buildHeaders(options, overrideTenantId)
        });
    } catch  {
        throw toApiError(0, 'network', 'Impossible de joindre le serveur. Vérifiez votre connexion internet et réessayez.');
    }
    if (res.status === 401) {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('tnt-token');
            window.location.href = '/login';
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$envelope$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unwrapApiData"])(json);
}
function getAuthHeaders() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])() ?? '';
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
}
async function upload(path, file, overrideTenantId) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const form = new FormData();
    form.append('file', file);
    const tid = overrideTenantId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTenantId"])();
    const aid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
    const uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserId"])();
    if (!tid || !uid) {
        throw toApiError(401, '', 'Session invalide. Veuillez vous reconnecter.');
    }
    let res;
    try {
        res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}${normalizedPath}`, {
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
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('tnt-token');
            window.location.href = '/login';
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$envelope$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unwrapApiData"])(json);
}
const apiClient = {
    get: (path, tenantId, options)=>request(path, {
            method: 'GET',
            ...options
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/notificationService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "notificationService": (()=>notificationService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
;
function formatRelativeTime(iso) {
    const date = new Date(iso);
    const diffMs = Date.now() - date.getTime();
    const mins = Math.floor(diffMs / 60_000);
    if (mins < 1) return "À l'instant";
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Hier';
    return `Il y a ${days}j`;
}
function mapNotification(dto) {
    return {
        id: dto.id,
        type: dto.type ?? 'info',
        title: dto.title,
        body: dto.body,
        time: formatRelativeTime(dto.createdAt),
        read: dto.read,
        href: dto.href ?? '/'
    };
}
const notificationService = {
    async getNotifications (agencyId, limit = 50) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const dtos = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${id}/notifications?limit=${limit}`);
        return dtos.map(mapNotification);
    },
    async markRead (notificationId) {
        const dto = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/notifications/${notificationId}/read`, {});
        return mapNotification(dto);
    },
    async markAllRead (agencyId) {
        const id = agencyId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].patch(`/agencies/${id}/notifications/read-all`, {});
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/searchService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "searchResultHref": (()=>searchResultHref),
    "searchService": (()=>searchService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/client.ts [app-client] (ecmascript)");
;
;
const ROUTES = {
    MISSION: ()=>'/missions',
    mission: ()=>'/missions',
    DELIVERER: ()=>'/staff',
    deliverer: ()=>'/staff',
    BRANCH: ()=>'/branches',
    branch: ()=>'/branches',
    HUB: ()=>'/hubs',
    hub: ()=>'/hubs',
    VEHICLE: ()=>'/fleet',
    vehicle: ()=>'/fleet',
    STAFF: ()=>'/staff',
    staff: ()=>'/staff'
};
function searchResultHref(hit) {
    const key = hit.entityType.toUpperCase();
    const builder = ROUTES[key] ?? ROUTES[hit.entityType.toLowerCase()];
    return builder ? builder(hit.entityId) : '/';
}
const searchService = {
    async search (query, entityType, limit = 8) {
        const agencyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAgencyId"])();
        const params = new URLSearchParams({
            q: query.trim(),
            limit: String(limit)
        });
        if (entityType) params.set('entityType', entityType);
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/agencies/${agencyId}/search?${params.toString()}`);
        return result ?? {
            hits: [],
            total: 0
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/agency/AgencyGlobalSearch.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AgencyGlobalSearch)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/searchService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AgencyGlobalSearch() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hits, setHits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const runSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AgencyGlobalSearch.useCallback[runSearch]": async (q)=>{
            if (q.trim().length < 2) {
                setHits([]);
                return;
            }
            setLoading(true);
            try {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchService"].search(q);
                setHits(result.hits);
                setOpen(true);
            } catch  {
                setHits([]);
            } finally{
                setLoading(false);
            }
        }
    }["AgencyGlobalSearch.useCallback[runSearch]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AgencyGlobalSearch.useEffect": ()=>{
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout({
                "AgencyGlobalSearch.useEffect": ()=>void runSearch(query)
            }["AgencyGlobalSearch.useEffect"], 300);
            return ({
                "AgencyGlobalSearch.useEffect": ()=>{
                    if (timerRef.current) clearTimeout(timerRef.current);
                }
            })["AgencyGlobalSearch.useEffect"];
        }
    }["AgencyGlobalSearch.useEffect"], [
        query,
        runSearch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AgencyGlobalSearch.useEffect": ()=>{
            const handler = {
                "AgencyGlobalSearch.useEffect.handler": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
                }
            }["AgencyGlobalSearch.useEffect.handler"];
            document.addEventListener('mousedown', handler);
            return ({
                "AgencyGlobalSearch.useEffect": ()=>document.removeEventListener('mousedown', handler)
            })["AgencyGlobalSearch.useEffect"];
        }
    }["AgencyGlobalSearch.useEffect"], []);
    const selectHit = (hit)=>{
        setOpen(false);
        setQuery('');
        router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$searchService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchResultHref"])(hit));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative hidden md:flex items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                size: 14,
                className: "absolute left-3 text-gray-400 pointer-events-none z-10"
            }, void 0, false, {
                fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: query,
                onChange: (e)=>setQuery(e.target.value),
                onFocus: ()=>hits.length > 0 && setOpen(true),
                placeholder: "Rechercher missions, livreurs…",
                className: "pl-8 pr-8 py-1.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 w-52"
            }, void 0, false, {
                fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                size: 14,
                className: "absolute right-3 text-gray-400 animate-spin"
            }, void 0, false, {
                fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this),
            open && hits.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 mt-1 w-80 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50",
                children: hits.map((hit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>selectHit(hit),
                        className: "w-full text-left px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-slate-800 border-b border-gray-50 dark:border-slate-800 last:border-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-gray-900 dark:text-slate-100 truncate",
                                children: hit.title
                            }, void 0, false, {
                                fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-orange-600 uppercase font-semibold",
                                children: hit.entityType
                            }, void 0, false, {
                                fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            hit.snippet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5",
                                children: hit.snippet
                            }, void 0, false, {
                                fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
                                lineNumber: 80,
                                columnNumber: 17
                            }, this)
                        ]
                    }, `${hit.entityType}-${hit.entityId}`, true, {
                        fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/agency/AgencyGlobalSearch.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(AgencyGlobalSearch, "3RUmUmwKpQhf253cqSoDhO1CYNM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AgencyGlobalSearch;
var _c;
__turbopack_context__.k.register(_c, "AgencyGlobalSearch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/layout/Header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-check.js [app-client] (ecmascript) <export default as CheckCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ThemeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/realtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/notificationService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$agency$2f$AgencyGlobalSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/agency/AgencyGlobalSearch.tsx [app-client] (ecmascript)");
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
;
const breadcrumbMap = {
    '/': 'Dashboard',
    '/profile': 'Profil Agence',
    '/branches': 'Antennes',
    '/missions': 'Missions',
    '/fleet': 'Flotte',
    '/hubs': 'Hubs Relais',
    '/staff': 'Personnel',
    '/billing': 'Facturation',
    '/settings': 'Paramètres'
};
const cfg = {
    alert: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
        iconCls: 'text-red-500',
        bg: 'bg-red-50'
    },
    warning: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
        iconCls: 'text-orange-500',
        bg: 'bg-orange-50'
    },
    success: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"],
        iconCls: 'text-emerald-500',
        bg: 'bg-emerald-50'
    },
    info: {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
        iconCls: 'text-blue-500',
        bg: 'bg-blue-50'
    }
};
function eventTypeToNotifType(eventType) {
    if (eventType === 'HUB_ALERT' || eventType === 'PARCEL_EXPIRED') return 'warning';
    if (eventType === 'DELIVERY_CONFIRMED' || eventType === 'BRANCH_CREATED') return 'success';
    return 'info';
}
function prependNotif(prev, item) {
    if (prev.some((n)=>n.id === item.id)) return prev;
    return [
        item,
        ...prev
    ];
}
function useDynamicDate() {
    _s();
    const [label, setLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDynamicDate.useEffect": ()=>{
            const fmt = {
                "useDynamicDate.useEffect.fmt": ()=>{
                    const now = new Date();
                    return now.toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }).replace(/^./, {
                        "useDynamicDate.useEffect.fmt": (c)=>c.toUpperCase()
                    }["useDynamicDate.useEffect.fmt"]);
                }
            }["useDynamicDate.useEffect.fmt"];
            setLabel(fmt());
            const id = setInterval({
                "useDynamicDate.useEffect.id": ()=>setLabel(fmt())
            }["useDynamicDate.useEffect.id"], 60_000);
            return ({
                "useDynamicDate.useEffect": ()=>clearInterval(id)
            })["useDynamicDate.useEffect"];
        }
    }["useDynamicDate.useEffect"], []);
    return label;
}
_s(useDynamicDate, "DHXRUwZX5SaRGJCIwH7DHrimuyM=");
function Header() {
    _s1();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const pageTitle = breadcrumbMap[pathname] ?? 'Page';
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const today = useDynamicDate();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [notifs, setNotifs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const unread = notifs.filter((n)=>!n.read).length;
    const displayed = filter === 'unread' ? notifs.filter((n)=>!n.read) : notifs;
    const markAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Header.useCallback[markAll]": async ()=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationService"].markAllRead();
                setNotifs({
                    "Header.useCallback[markAll]": (ns)=>ns.map({
                            "Header.useCallback[markAll]": (n)=>({
                                    ...n,
                                    read: true
                                })
                        }["Header.useCallback[markAll]"])
                }["Header.useCallback[markAll]"]);
            } catch  {
                setNotifs({
                    "Header.useCallback[markAll]": (ns)=>ns.map({
                            "Header.useCallback[markAll]": (n)=>({
                                    ...n,
                                    read: true
                                })
                        }["Header.useCallback[markAll]"])
                }["Header.useCallback[markAll]"]);
            }
        }
    }["Header.useCallback[markAll]"], []);
    const markOne = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Header.useCallback[markOne]": async (id)=>{
            setNotifs({
                "Header.useCallback[markOne]": (ns)=>ns.map({
                        "Header.useCallback[markOne]": (n)=>n.id === id ? {
                                ...n,
                                read: true
                            } : n
                    }["Header.useCallback[markOne]"])
            }["Header.useCallback[markOne]"]);
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationService"].markRead(id);
            } catch  {
            /* optimistic UI */ }
        }
    }["Header.useCallback[markOne]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const h = {
                "Header.useEffect.h": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
                }
            }["Header.useEffect.h"];
            if (open) document.addEventListener('mousedown', h);
            return ({
                "Header.useEffect": ()=>document.removeEventListener('mousedown', h)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const h = {
                "Header.useEffect.h": (e)=>{
                    if (e.key === 'Escape') setOpen(false);
                }
            }["Header.useEffect.h"];
            document.addEventListener('keydown', h);
            return ({
                "Header.useEffect": ()=>document.removeEventListener('keydown', h)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthToken"])();
            if (!token) return;
            let cancelled = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$notificationService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationService"].getNotifications().then({
                "Header.useEffect": (items)=>{
                    if (!cancelled) setNotifs(items);
                }
            }["Header.useEffect"]).catch({
                "Header.useEffect": ()=>{
                    if (!cancelled) setNotifs([]);
                }
            }["Header.useEffect"]);
            const es = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openNotificationStream"])(token, {
                "Header.useEffect.es": (n)=>{
                    setNotifs({
                        "Header.useEffect.es": (prev)=>prependNotif(prev, {
                                id: String(n.id ?? crypto.randomUUID()),
                                type: n.type ?? 'info',
                                title: String(n.title ?? 'Notification'),
                                body: String(n.body ?? ''),
                                time: String(n.time ?? "À l'instant"),
                                read: false,
                                href: String(n.href ?? '/')
                            })
                    }["Header.useEffect.es"]);
                }
            }["Header.useEffect.es"]);
            const unsubWs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeRealtime"])({
                "Header.useEffect.unsubWs": (event)=>{
                    if (event.channel !== 'notifications') return;
                    setNotifs({
                        "Header.useEffect.unsubWs": (prev)=>prependNotif(prev, {
                                id: crypto.randomUUID(),
                                type: eventTypeToNotifType(event.type),
                                title: event.title,
                                body: event.body,
                                time: "À l'instant",
                                read: false,
                                href: event.href ?? '/'
                            })
                    }["Header.useEffect.unsubWs"]);
                }
            }["Header.useEffect.unsubWs"]);
            return ({
                "Header.useEffect": ()=>{
                    cancelled = true;
                    es.close();
                    unsubWs();
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "h-16 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-6 relative z-30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-400 dark:text-slate-500",
                        children: "TiiBnTick Agency"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-300 dark:text-slate-700",
                        children: "/"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-900 dark:text-slate-100 font-medium",
                        children: pageTitle
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/Header.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$agency$2f$AgencyGlobalSearch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleTheme,
                        className: "p-2 rounded-md text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors",
                        title: theme === 'dark' ? 'Mode clair' : 'Mode sombre',
                        children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Header.tsx",
                            lineNumber: 166,
                            columnNumber: 31
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/components/layout/Header.tsx",
                            lineNumber: 166,
                            columnNumber: 51
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        ref: ref,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpen((v)=>!v),
                                className: `relative p-2 rounded-md transition-colors ${open ? 'bg-orange-50 dark:bg-orange-500/10' : 'hover:bg-gray-50 dark:hover:bg-slate-800'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        size: 18,
                                        className: open ? 'text-orange-500' : 'text-gray-500 dark:text-slate-400'
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this),
                                    unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-1 right-1 min-w-[16px] h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none",
                                        children: unread
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Header.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-12 w-[380px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-gray-900 dark:text-slate-100",
                                                        children: "Notifications"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 19
                                                    }, this),
                                                    unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-xs font-semibold px-1.5 py-0.5 rounded-full",
                                                        children: [
                                                            unread,
                                                            " non lues"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/layout/Header.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: markAll,
                                                        className: "flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-medium px-2 py-1 rounded transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/Header.tsx",
                                                                lineNumber: 198,
                                                                columnNumber: 23
                                                            }, this),
                                                            " Tout lire"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setOpen(false),
                                                        className: "p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 14,
                                                            className: "text-gray-400 dark:text-slate-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/Header.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/layout/Header.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/layout/Header.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex border-b border-gray-100 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/60",
                                        children: [
                                            'all',
                                            'unread'
                                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilter(f),
                                                className: `flex-1 py-2 text-xs font-medium transition-colors border-b-2 ${filter === f ? 'text-orange-600 border-orange-500 bg-white dark:bg-slate-900' : 'text-gray-500 dark:text-slate-500 border-transparent hover:text-gray-700'}`,
                                                children: f === 'all' ? `Toutes (${notifs.length})` : `Non lues (${unread})`
                                            }, f, false, {
                                                fileName: "[project]/components/layout/Header.tsx",
                                                lineNumber: 210,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-[400px] overflow-y-auto divide-y divide-gray-50 dark:divide-slate-800",
                                        children: displayed.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "py-10 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                    size: 28,
                                                    className: "mx-auto text-gray-200 dark:text-slate-700 mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-400 dark:text-slate-500",
                                                    children: "Aucune notification"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/layout/Header.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 220,
                                            columnNumber: 19
                                        }, this) : displayed.map((n)=>{
                                            const { icon: Icon, iconCls, bg } = cfg[n.type];
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: n.href,
                                                onClick: ()=>{
                                                    markOne(n.id);
                                                    setOpen(false);
                                                },
                                                className: `flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/60 ${!n.read ? 'bg-orange-50/20 dark:bg-orange-500/5' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            size: 14,
                                                            className: iconCls
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/layout/Header.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start justify-between gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: `text-sm leading-snug ${!n.read ? 'font-semibold text-gray-900 dark:text-slate-100' : 'font-normal text-gray-700 dark:text-slate-300'}`,
                                                                        children: n.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/layout/Header.tsx",
                                                                        lineNumber: 236,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    !n.read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/layout/Header.tsx",
                                                                        lineNumber: 239,
                                                                        columnNumber: 39
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/layout/Header.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 dark:text-slate-500 mt-0.5 leading-relaxed line-clamp-2",
                                                                children: n.body
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/Header.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] text-gray-400 dark:text-slate-600 mt-1",
                                                                children: n.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/layout/Header.tsx",
                                                                lineNumber: 242,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/layout/Header.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, n.id, true, {
                                                fileName: "[project]/components/layout/Header.tsx",
                                                lineNumber: 227,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-gray-100 dark:border-slate-800 px-4 py-2.5 bg-gray-50/80 dark:bg-slate-800/40",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-center text-gray-400 dark:text-slate-600",
                                            children: "Synchronisé avec le serveur"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/Header.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/Header.tsx",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/Header.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    today && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "hidden lg:block text-xs text-gray-400 dark:text-slate-600 border-l border-gray-200 dark:border-slate-700 pl-3",
                        children: today
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/Header.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/Header.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s1(Header, "uRDmnBGktQyb0+c+ktsc0KL32MI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        useDynamicDate
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/PageTransition.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PageTransition)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function PageTransition({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageTransition.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            el.classList.remove('page-enter');
            // Force reflow
            void el.offsetHeight;
            el.classList.add('page-enter');
        }
    }["PageTransition.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "page-enter min-h-full",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/PageTransition.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(PageTransition, "wdlMVIDqXu7/N7lNL9kC5gP++Rs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = PageTransition;
var _c;
__turbopack_context__.k.register(_c, "PageTransition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/auth-session.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/** Cookie de session agence (lu par middleware Next.js). */ __turbopack_context__.s({
    "AUTH_COOKIE": (()=>AUTH_COOKIE),
    "clearAuthCookie": (()=>clearAuthCookie),
    "setAuthCookie": (()=>setAuthCookie)
});
const AUTH_COOKIE = 'tnt-auth';
function setAuthCookie(token, maxAgeSec = 86400) {
    if (typeof document === 'undefined') return;
    document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSec}; SameSite=Lax`;
}
function clearAuthCookie() {
    if (typeof document === 'undefined') return;
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/jwt.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/** Decode JWT payload claims without external dependency. */ __turbopack_context__.s({
    "claimRoles": (()=>claimRoles),
    "claimString": (()=>claimString),
    "hasRole": (()=>hasRole),
    "isPlatformAdmin": (()=>isPlatformAdmin),
    "parseJwtPayload": (()=>parseJwtPayload)
});
function parseJwtPayload(token) {
    try {
        const parts = token.split('.');
        if (parts.length < 2) return {};
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
        const json = atob(padded);
        return JSON.parse(json);
    } catch  {
        return {};
    }
}
function claimString(claims, ...keys) {
    for (const key of keys){
        const value = claims[key];
        if (typeof value === 'string' && value.trim()) return value;
    }
    return '';
}
function claimRoles(claims) {
    const roles = claims.roles ?? claims.authorities;
    if (Array.isArray(roles)) {
        return roles.map(String);
    }
    if (typeof roles === 'string') {
        return roles.split(/[,;\s]+/).filter(Boolean);
    }
    return [];
}
function hasRole(roles, role) {
    return roles.some((r)=>r === role || r === `ROLE_${role}`);
}
const PLATFORM_ADMIN_ROLES = [
    'TNT_ADMIN',
    'SYSTEM_ADMIN',
    'TENANT_ADMIN',
    'GENERAL_ADMIN',
    'IAM_ADMIN'
];
function isPlatformAdmin(roles) {
    return PLATFORM_ADMIN_ROLES.some((role)=>hasRole(roles, role));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/yowauthService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "challengeToTokens": (()=>challengeToTokens),
    "isMfaRequiredError": (()=>isMfaRequiredError),
    "yowAuthService": (()=>yowAuthService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$envelope$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/envelope.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/errors.ts [app-client] (ecmascript)");
;
;
;
async function agencyAuthPost(path, body) {
    let res;
    try {
        res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    } catch  {
        throw new Error('Impossible de joindre le serveur Agency. Vérifiez que tnt-agency est démarré.');
    }
    const payload = await res.json().catch(()=>({}));
    if (!res.ok) {
        const message = payload?.error?.message ?? payload?.message ?? '';
        throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUserError"])({
            message
        }, 'Authentification impossible.'));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$envelope$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unwrapApiData"])(payload);
}
function toChallenge(data, fallbackEmail) {
    if (data.status === 'EMAIL_VERIFICATION_REQUIRED') {
        return {
            status: 'EMAIL_VERIFICATION_REQUIRED',
            email: data.email ?? fallbackEmail
        };
    }
    if (data.status === 'MFA_REQUIRED') {
        return {
            status: 'MFA_REQUIRED',
            mfaToken: data.mfaToken,
            mfaChannel: data.mfaChannel,
            codePreview: data.codePreview ?? null
        };
    }
    const accessToken = data.accessToken ?? '';
    if (!accessToken) {
        throw new Error('Réponse auth invalide : token manquant.');
    }
    return {
        status: 'AUTHENTICATED',
        accessToken,
        tenantId: data.tenantId ?? '',
        userId: data.userId ?? '',
        email: data.email ?? fallbackEmail,
        role: data.role ?? '',
        sharedSessionToken: data.sharedSessionToken
    };
}
function challengeToTokens(challenge, fallbackEmail) {
    if (challenge.status === 'MFA_REQUIRED') {
        const err = new Error('MFA_REQUIRED');
        err.mfa = {
            mfaToken: challenge.mfaToken ?? '',
            mfaChannel: challenge.mfaChannel,
            codePreview: challenge.codePreview
        };
        throw err;
    }
    if (challenge.status === 'EMAIL_VERIFICATION_REQUIRED') {
        throw new Error('Compte créé. Vérifiez votre email avant de vous connecter.');
    }
    if (challenge.status !== 'AUTHENTICATED' || !challenge.accessToken) {
        throw new Error('Authentification incomplète.');
    }
    return {
        accessToken: challenge.accessToken,
        tenantId: challenge.tenantId ?? '',
        userId: challenge.userId ?? '',
        email: challenge.email ?? fallbackEmail,
        role: challenge.role ?? '',
        sharedSessionToken: challenge.sharedSessionToken
    };
}
function isMfaRequiredError(err) {
    return err instanceof Error && err.message === 'MFA_REQUIRED' && 'mfa' in err;
}
const yowAuthService = {
    async login (email, password) {
        const data = await agencyAuthPost('/auth/login', {
            email,
            password
        });
        return toChallenge(data, email);
    },
    async signup (payload) {
        const data = await agencyAuthPost('/auth/signup', payload);
        return toChallenge(data, payload.email);
    },
    async confirmMfa (mfaToken, code) {
        const data = await agencyAuthPost('/auth/login/mfa/confirm', {
            mfaToken,
            code
        });
        return toChallenge(data, '');
    },
    /** Rétrocompat — propage MFA / email verification. */ async loginTokens (email, password) {
        return challengeToTokens(await yowAuthService.login(email, password), email);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/services/authService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "authService": (()=>authService),
    "isMfaRequiredError": (()=>isMfaRequiredError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/jwt.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$yowauthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/yowauthService.ts [app-client] (ecmascript)");
;
;
;
;
function persistSession(result) {
    localStorage.setItem('tnt-token', result.accessToken);
    localStorage.setItem('tnt-tenant-id', result.tenantId);
    if (result.agencyId) {
        localStorage.setItem('tnt-agency-id', result.agencyId);
    } else {
        localStorage.removeItem('tnt-agency-id');
    }
    localStorage.setItem('tnt-user-id', result.userId);
    localStorage.setItem('tnt-user-email', result.email);
    localStorage.setItem('tnt-user-role', result.role);
    if (result.sharedSessionToken) {
        localStorage.setItem('tnt-shared-session', result.sharedSessionToken);
    } else {
        localStorage.removeItem('tnt-shared-session');
    }
    localStorage.setItem('tnt-agency-status', result.agencyStatus);
    localStorage.setItem('tnt-agency-active', String(result.agencyActive));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setAuthCookie"])(result.accessToken);
}
function sessionFromToken(tokens) {
    const claims = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJwtPayload"])(tokens.accessToken);
    const roles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimRoles"])(claims);
    const primaryRole = tokens.role || roles.find((r)=>r.startsWith('ROLE_'))?.replace(/^ROLE_/, '') || roles[0] || 'AGENCY_MANAGER';
    return {
        accessToken: tokens.accessToken,
        tenantId: tokens.tenantId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimString"])(claims, 'tid', 'tenantId'),
        userId: tokens.userId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimString"])(claims, 'sub', 'userId'),
        email: tokens.email || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimString"])(claims, 'email'),
        displayName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimString"])(claims, 'name', 'email') || tokens.email || '',
        role: primaryRole,
        sharedSessionToken: tokens.sharedSessionToken,
        agencyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimString"])(claims, 'aid', 'agencyId') || null,
        agencyStatus: 'PENDING_VALIDATION',
        agencyActive: false
    };
}
async function enrichFromAgency(session) {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/auth/session`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'X-Tenant-Id': session.tenantId,
            'X-User-Id': session.userId,
            'X-Agency-Id': session.agencyId ?? '',
            'X-User-Email': session.email
        }
    });
    if (!res.ok) return session;
    const data = await res.json();
    return {
        ...session,
        agencyId: data.agencyId ?? session.agencyId,
        agencyStatus: data.agencyStatus ?? session.agencyStatus,
        agencyActive: Boolean(data.agencyActive),
        role: data.role ?? session.role
    };
}
function assertAuthenticated(challenge, fallbackEmail) {
    if (challenge.status === 'MFA_REQUIRED') {
        const err = new Error('MFA_REQUIRED');
        err.mfa = {
            mfaToken: challenge.mfaToken ?? '',
            mfaChannel: challenge.mfaChannel,
            codePreview: challenge.codePreview
        };
        throw err;
    }
    if (challenge.status === 'EMAIL_VERIFICATION_REQUIRED') {
        throw new Error('Compte créé. Vérifiez votre email avant de vous connecter.');
    }
    return sessionFromToken({
        accessToken: challenge.accessToken,
        tenantId: challenge.tenantId,
        userId: challenge.userId,
        email: challenge.email ?? fallbackEmail,
        role: challenge.role
    });
}
async function finalizeSession(session) {
    const enriched = await enrichFromAgency(session);
    persistSession(enriched);
    return enriched;
}
const authService = {
    async signup (payload) {
        const challenge = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$yowauthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["yowAuthService"].signup(payload);
        const session = assertAuthenticated(challenge, payload.email);
        return finalizeSession(session);
    },
    async login (credentials) {
        const challenge = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$yowauthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["yowAuthService"].login(credentials.email, credentials.password);
        const session = assertAuthenticated(challenge, credentials.email);
        return finalizeSession(session);
    },
    async confirmMfa (mfaToken, code, fallbackEmail = '') {
        const challenge = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$yowauthService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["yowAuthService"].confirmMfa(mfaToken, code);
        const session = assertAuthenticated(challenge, fallbackEmail);
        return finalizeSession(session);
    },
    async adminConfirmMfa (mfaToken, code, email) {
        const session = await authService.confirmMfa(mfaToken, code, email);
        const roles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimRoles"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJwtPayload"])(session.accessToken));
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(roles) && session.role !== 'TNT_ADMIN') {
            throw new Error('Ce compte n\'a pas les droits administrateur TiiBnTick.');
        }
        const adminSession = {
            ...session,
            role: 'TNT_ADMIN',
            agencyStatus: 'ACTIVE',
            agencyActive: true
        };
        persistSession(adminSession);
        return adminSession;
    },
    async adminLogin (credentials) {
        let session;
        try {
            session = await authService.login(credentials);
        } catch (err) {
            if (err instanceof Error && err.message === 'MFA_REQUIRED') throw err;
            throw err;
        }
        const roles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimRoles"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJwtPayload"])(session.accessToken));
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlatformAdmin"])(roles) && session.role !== 'TNT_ADMIN') {
            throw new Error('Ce compte n\'a pas les droits administrateur TiiBnTick.');
        }
        const adminSession = {
            ...session,
            role: 'TNT_ADMIN',
            agencyStatus: 'ACTIVE',
            agencyActive: true
        };
        persistSession(adminSession);
        return adminSession;
    },
    async refreshSession () {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const token = localStorage.getItem('tnt-token');
        const tenantId = localStorage.getItem('tnt-tenant-id');
        const userId = localStorage.getItem('tnt-user-id');
        if (!token || !tenantId || !userId) return null;
        let session = sessionFromToken({
            accessToken: token,
            tenantId,
            userId,
            email: localStorage.getItem('tnt-user-email') ?? '',
            role: localStorage.getItem('tnt-user-role') ?? ''
        });
        session = await enrichFromAgency(session);
        if (session.accessToken) persistSession(session);
        return session;
    },
    logout () {
        localStorage.removeItem('tnt-token');
        localStorage.removeItem('tnt-tenant-id');
        localStorage.removeItem('tnt-agency-id');
        localStorage.removeItem('tnt-user-id');
        localStorage.removeItem('tnt-user-email');
        localStorage.removeItem('tnt-user-role');
        localStorage.removeItem('tnt-shared-session');
        localStorage.removeItem('tnt-agency-status');
        localStorage.removeItem('tnt-agency-active');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAuthCookie"])();
        if ("TURBOPACK compile-time truthy", 1) {
            window.location.href = '/login';
        }
    },
    isAuthenticated () {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return !!localStorage.getItem('tnt-token');
    },
    isAgencyActive () {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return localStorage.getItem('tnt-agency-active') === 'true';
    },
    getAgencyStatus () {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return localStorage.getItem('tnt-agency-status') ?? '';
    },
    getRole () {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return localStorage.getItem('tnt-user-role') ?? '';
    },
    isAdmin () {
        const role = this.getRole();
        if (role === 'TNT_ADMIN') return true;
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('tnt-token') : ("TURBOPACK unreachable", undefined);
        if (!token) return false;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPlatformAdmin"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimRoles"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jwt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJwtPayload"])(token)));
    }
};
function isMfaRequiredError(err) {
    return err instanceof Error && err.message === 'MFA_REQUIRED' && 'mfa' in err;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/AuthGuard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AuthGuard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/authService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const PUBLIC_PREFIXES = [
    '/login',
    '/register',
    '/track',
    '/livreur',
    '/branch'
];
const PENDING_ALLOWED = [
    '/pending',
    '/admin'
];
function AuthGuard({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].isAuthenticated()) {
                const loginPath = pathname.startsWith('/admin') ? '/admin/login' : '/login';
                router.replace(`${loginPath}?from=${encodeURIComponent(pathname)}`);
                return;
            }
            if (pathname.startsWith('/admin')) {
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].isAdmin()) {
                    router.replace('/admin/login');
                }
                return;
            }
            const status = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getAgencyStatus();
            const active = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].isAgencyActive();
            if (status === 'REJECTED') {
                router.replace('/pending?rejected=1');
                return;
            }
            if (!active && !PENDING_ALLOWED.some({
                "AuthGuard.useEffect": (p)=>pathname.startsWith(p)
            }["AuthGuard.useEffect"])) {
                router.replace('/pending');
                return;
            }
            if (active && pathname === '/pending') {
                router.replace('/');
            }
        }
    }["AuthGuard.useEffect"], [
        pathname,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AuthGuard, "qIbXzL/glMgPmW/TFWAi/FqCkIk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthGuard;
var _c;
__turbopack_context__.k.register(_c, "AuthGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/LayoutController.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LayoutController)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ThemeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PageTransition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PageTransition.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AuthGuard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const STANDALONE_PREFIXES = [
    '/login',
    '/register',
    '/pending',
    '/track',
    '/livreur',
    '/branch',
    '/admin'
];
function LayoutController({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isStandalone = STANDALONE_PREFIXES.some((r)=>pathname === r || pathname.startsWith(r + '/'));
    if (isStandalone) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gray-50",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/LayoutController.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LayoutController.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthGuard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-screen overflow-hidden bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/LayoutController.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-w-0 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/components/LayoutController.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                className: "flex-1 overflow-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PageTransition$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    children: children
                                }, void 0, false, {
                                    fileName: "[project]/components/LayoutController.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/LayoutController.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LayoutController.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LayoutController.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LayoutController.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/LayoutController.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(LayoutController, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = LayoutController;
var _c;
__turbopack_context__.k.register(_c, "LayoutController");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/contexts/ToastContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ToastProvider": (()=>ToastProvider),
    "useToast": (()=>useToast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const ICONS = {
    success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"],
    warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
    info: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"]
};
const STYLES = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
};
const ICON_STYLES = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500'
};
function ToastProvider({ children }) {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[dismiss]": (id)=>{
            setToasts({
                "ToastProvider.useCallback[dismiss]": (prev)=>prev.filter({
                        "ToastProvider.useCallback[dismiss]": (t)=>t.id !== id
                    }["ToastProvider.useCallback[dismiss]"])
            }["ToastProvider.useCallback[dismiss]"]);
        }
    }["ToastProvider.useCallback[dismiss]"], []);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[toast]": (message, variant = 'info')=>{
            const id = crypto.randomUUID();
            setToasts({
                "ToastProvider.useCallback[toast]": (prev)=>[
                        ...prev,
                        {
                            id,
                            message,
                            variant
                        }
                    ]
            }["ToastProvider.useCallback[toast]"]);
            setTimeout({
                "ToastProvider.useCallback[toast]": ()=>dismiss(id)
            }["ToastProvider.useCallback[toast]"], 4000);
        }
    }["ToastProvider.useCallback[toast]"], [
        dismiss
    ]);
    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[success]": (m)=>toast(m, 'success')
    }["ToastProvider.useCallback[success]"], [
        toast
    ]);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[error]": (m)=>toast(m, 'error')
    }["ToastProvider.useCallback[error]"], [
        toast
    ]);
    const warning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[warning]": (m)=>toast(m, 'warning')
    }["ToastProvider.useCallback[warning]"], [
        toast
    ]);
    const info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[info]": (m)=>toast(m, 'info')
    }["ToastProvider.useCallback[info]"], [
        toast
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            toast,
            success,
            error,
            warning,
            info
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-5 right-5 z-[200] flex flex-col gap-2 w-80",
                children: toasts.map((t)=>{
                    const Icon = ICONS[t.variant];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-start gap-3 p-3 rounded-lg border shadow-md text-sm animate-slide-up ${STYLES[t.variant]}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                size: 16,
                                className: `mt-0.5 shrink-0 ${ICON_STYLES[t.variant]}`
                            }, void 0, false, {
                                fileName: "[project]/contexts/ToastContext.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-1",
                                children: t.message
                            }, void 0, false, {
                                fileName: "[project]/contexts/ToastContext.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>dismiss(t.id),
                                className: "shrink-0 opacity-60 hover:opacity-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/contexts/ToastContext.tsx",
                                    lineNumber: 77,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/contexts/ToastContext.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/contexts/ToastContext.tsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/contexts/ToastContext.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/contexts/ToastContext.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(ToastProvider, "wPrC272ThLMal9kObKweFwHiUyg=");
_c = ToastProvider;
function useToast() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside ToastProvider');
    return ctx;
}
_s1(useToast, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_5a37bc0e._.js.map