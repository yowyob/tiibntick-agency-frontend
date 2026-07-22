import { Demarrer, Portails, WorkflowComplet } from '@/components/guide/sections/Start'
import { DepotClient, SuiviColis } from '@/components/guide/sections/Client'
import {
  Antennes, Dashboard, Flotte, Hubs, Missions, Parametres, Personnel,
} from '@/components/guide/sections/Hq'
import {
  Commissions, Facturation, Litiges, VueAntenne, VueLivreur,
} from '@/components/guide/sections/TerrainFinance'
import { P } from '@/components/guide/GuidePrimitives'

export function GuideSectionBody({ slug }: { slug: string }) {
  switch (slug) {
    case 'demarrer': return <Demarrer />
    case 'portails': return <Portails />
    case 'depot-client': return <DepotClient />
    case 'suivi-colis': return <SuiviColis />
    case 'dashboard': return <Dashboard />
    case 'missions': return <Missions />
    case 'antennes': return <Antennes />
    case 'flotte': return <Flotte />
    case 'hubs': return <Hubs />
    case 'personnel': return <Personnel />
    case 'vue-antenne': return <VueAntenne />
    case 'vue-livreur': return <VueLivreur />
    case 'commissions': return <Commissions />
    case 'facturation': return <Facturation />
    case 'litiges': return <Litiges />
    case 'parametres': return <Parametres />
    case 'workflow-complet': return <WorkflowComplet />
    default: return <P>Section introuvable.</P>
  }
}
