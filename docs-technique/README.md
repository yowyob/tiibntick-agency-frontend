# Documentation technique Agency (LaTeX) — v2.0

Document d’**ingénierie** basé sur l’analyse du code (`frontend/` runtime +
`backend/tnt-agency` rollback + docs `backend/docs`).

Ce n’est **pas** le guide utilisateur (`/guide` dans l’app).

## Compiler

```bash
cd docs-technique
pdflatex main.tex
pdflatex main.tex
# ou : latexmk -pdf main.tex
```

Prérequis : TeX Live / MiKTeX avec `babel-french`, `hyperref`, `booktabs`,
`listings`, `fancyhdr`, `longtable`, `tabularx`.

Sortie : `main.pdf`.

## Plan (12 chapitres)

| # | Fichier | Contenu |
|---|---------|---------|
| 1 | `01-introduction` | Objet, glossaire, sources, écarts docs |
| 2 | `02-stack` | Versions exactes (Next 15.5, React 19, jose, Vitest…) |
| 3 | `03-architecture` | Kernel/Core/Agency, dual BFF, ADR core-first |
| 4 | `04-bff` | Pipeline `agency-bff`, routes publiques, envelope |
| 5 | `05-portails-auth` | Portails, middleware, cookies, MFA, sessions |
| 6 | `06-processus` | Onboarding, intake, mission, billing, FleetMan |
| 7 | `07-domaines-services` | Cartographie `lib/services`, patterns UI |
| 8 | `08-integrations` | Core, Search, FleetMan, Trust, SSO Yowyob |
| 9 | `09-realtime-offline` | SSE/WS, IndexedDB livreur, sync |
| 10 | `10-deploiement` | Env, SEO, checklist prod |
| 11 | `11-securite-dette` | Runbook + dette technique priorisée |
| 12 | `12-annexes` | Index fichiers, séquences, contribution |

## Règle de maintenance

Tout changement de contrat BFF / auth / offline → mettre à jour le chapitre
concerné **et** le journal des versions dans `main.tex`.
