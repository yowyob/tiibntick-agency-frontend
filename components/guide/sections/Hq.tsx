import {
  Btn, Callout, Field, GLink, H2, P, Path, StatusChip, Steps, Ul,
} from '@/components/guide/GuidePrimitives'

export function Dashboard() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir le dashboard</H2>
      <Path>
        Après login agence, menu gauche <Btn>Dashboard</Btn>. Titre :{' '}
        <strong>Centre de commandement</strong>.
      </Path>
      <P>
        <strong>Ce que vous voyez :</strong> une page longue scrollable — alertes éventuelles,
        résumé réseau, file « À traiter », KPI, pipeline, hubs, missions récentes. C’est
        le point de départ de la journée ops.
      </P>

      <H2 id="haut">En-tête et raccourcis</H2>
      <P>En haut à droite de la page :</P>
      <Ul>
        <li>
          <Btn>Accueillir un client</Btn> — vous quittez le dashboard pour{' '}
          <GLink to="depot-client">Accueil client</GLink> (QR / walk-in).
        </li>
        <li>
          <Btn>Nouvelle mission</Btn> — ouvre le tiroir de création (même flux que{' '}
          <GLink to="missions" hash="creer">Missions → Créer</GLink>). Après création :
          retour possible via le menu Missions pour assigner.
        </li>
      </Ul>

      <H2 id="alertes">Alertes hub</H2>
      <P>
        Si un hub est saturé, un bandeau rouge apparaît en haut (noms, %, bouton type{' '}
        <Btn>Voir hubs</Btn>).
      </P>
      <P>
        <strong>Après le clic Voir hubs :</strong> vous arrivez sur{' '}
        <GLink to="hubs">Hubs Relais</GLink>. Traitez occupation / retraits / expirations,
        puis revenez au dashboard (menu) : le bandeau doit s’atténuer après refresh.
      </P>

      <H2 id="resume">Vue opérationnelle</H2>
      <P>
        Bloc « Vue opérationnelle réseau » : compteurs En cours, Livrées, En attente,
        Échouées, Antennes, Hubs saturés, CA livré. Bouton refresh à droite du titre :
        cliquez pour recalculer les chiffres sans recharger toute l’app.
      </P>
      <P>
        <strong>Ensuite :</strong> si « En attente » ou « Hubs saturés » est élevé,
        descendez vers « À traiter » ou ouvrez Missions / Hubs.
      </P>

      <H2 id="actions">File « À traiter »</H2>
      <P>
        Section <strong>Centre de commandement — À traiter</strong> avec un badge
        numérique. Chaque ligne = un problème (missions non assignées, hub saturé,
        livreur offline, commissions…).
      </P>
      <Ul>
        <li>
          Bouton <Btn>Assigner</Btn> sur une mission : ouvre le flux d’assignation
          (souvent le détail mission). Choisissez livreur → validez → toast succès → la
          ligne disparaît ou se met à jour au prochain refresh.
        </li>
        <li>
          Flèche / lien à droite : vous amène sur la page concernée (Missions, Hubs,
          Personnel…). Traitez là-bas, puis revenez au dashboard pour vérifier que la
          file a baissé.
        </li>
      </Ul>

      <H2 id="kpi">Cartes KPI</H2>
      <P>
        Quatre cartes : Missions actives, Livreurs actifs, Véhicules disponibles,
        Commissions en attente. Ce ne sont pas des boutons de création : elles indiquent
        où aller (ex. commissions en attente →{' '}
        <GLink to="commissions">valider / payer</GLink>).
      </P>

      <H2 id="pipeline">Pipeline et hubs</H2>
      <P>
        Graphique <strong>Pipeline des missions</strong> (répartition des statuts) et
        panneau <strong>Occupation des hubs</strong> + résumé livreurs (Disponibles /
        En mission / Hors ligne). Plus bas : tableau <strong>Missions récentes</strong>.
      </P>
      <P>
        Cliquez <Btn>Voir tout</Btn> → page{' '}
        <GLink to="missions">Missions</GLink> complète. Cliquez une ligne récente →
        souvent ouverture du détail pour agir.
      </P>
    </>
  )
}

export function Missions() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir Missions</H2>
      <Path>
        Menu gauche <Btn>Missions</Btn>. Titre <strong>Missions</strong> + compteurs
        « X missions · Y en cours ».
      </Path>
      <P>
        <strong>Ce que vous voyez :</strong> pastilles de statut, barre de recherche,
        tableau (bordereau, trajet, livreur, antenne, priorité, statut, colis, montant),
        pagination en bas. En haut à droite : bascule liste/carte +{' '}
        <Btn>Nouvelle mission</Btn>.
      </P>

      <H2 id="liste">Liste, chips et recherche</H2>
      <P>
        Cliquez une pastille (ex. <Btn>En attente</Btn>) : le tableau se filtre
        immédiatement et n’affiche que ce statut. <Btn>Toutes</Btn> remet la vue
        complète. Tapez dans la recherche : la liste se réduit aux bordereaux /
        noms correspondants. Si rien ne match : « Aucune mission trouvée ».
      </P>
      <P>
        <strong>Ensuite :</strong> cliquez une ligne pour ouvrir le détail (section
        ci-dessous), ou créez une mission.
      </P>

      <H2 id="creer">Créer une mission (formulaire)</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir',
            body: (
              <>
                Cliquez <Btn>Nouvelle mission</Btn>.{' '}
                <strong>Vous voyez :</strong> un tiroir depuis la droite, fond grisé
                derrière, titre <strong>Créer une mission</strong>, croix pour fermer.
                Le tableau reste visible en arrière-plan mais n’est plus cliquable.
              </>
            ),
          },
          {
            title: 'Remplir le contexte',
            body: (
              <>
                Choisissez <Field>Antenne émettrice</Field>, le{' '}
                <Field>Mode de livraison</Field> (direct ou via hub), la{' '}
                <Field>Priorité</Field>. Si « Via hub relais », un champ{' '}
                <Field>Hub relais cible</Field> apparaît : sélectionnez-le avant de créer.
              </>
            ),
          },
          {
            title: 'Parties, adresses, planning',
            body: (
              <>
                Renseignez expéditeur / destinataire, adresses, dates de collecte /
                livraison prévues, nombre de colis, poids, distance, instructions.
                Optionnel dès la création : <Field>Livreur</Field> et{' '}
                <Field>Véhicule</Field> (sinon vous assignerez plus tard).
              </>
            ),
          },
          {
            title: 'Créer',
            body: (
              <>
                Cliquez <Btn>Créer la mission</Btn> en bas. Le tiroir se ferme, la
                mission apparaît dans la liste (souvent En attente ou déjà Assignée si
                vous avez choisi un livreur). Si erreur de validation, le formulaire
                reste ouvert : corrigez les champs manquants.
              </>
            ),
          },
          {
            title: 'Annuler sans créer',
            body: (
              <>
                <Btn>Annuler</Btn> ou la croix ferme le tiroir sans enregistrer. Le
                tableau revient interactif.
              </>
            ),
          },
        ]}
      />

      <H2 id="statuts">Statuts et priorités</H2>
      <P>
        <StatusChip>Brouillon</StatusChip> <StatusChip>En attente</StatusChip>{' '}
        <StatusChip>Assignée</StatusChip> <StatusChip>En transit</StatusChip>{' '}
        <StatusChip>Au hub</StatusChip> <StatusChip>Livré</StatusChip>{' '}
        <StatusChip>Échoué</StatusChip> <StatusChip>Annulé</StatusChip> — la pastille
        du tableau et la timeline du détail restent synchronisées après chaque action.
      </P>

      <H2 id="detail">Ouvrir le détail — ce qui s’affiche</H2>
      <P>
        Clic sur une ligne → <strong>tiroir droit ~520 px</strong>, fond assombri.
        En-tête : numéro de bordereau + sous-titre (antenne · date) + croix. Corps
        scrollable : pastille de priorité, bloc Progression (cercles de timeline),
        cartes Expéditeur / Destinataire, Logistique (livreur, plaque, hub), Colis &amp;
        planning, Facturation (prix). Pied collé en bas : les boutons d’action selon
        le statut.
      </P>
      <P>
        Fermer : croix, clic sur le fond grisé, ou touche Échap. La liste reste filtrée
        comme avant.
      </P>

      <H2 id="assigner">Assigner / réassigner — après le clic</H2>
      <Steps
        items={[
          {
            title: 'Préparer',
            body: (
              <>
                Mission en <StatusChip>En attente</StatusChip> ou{' '}
                <StatusChip>Brouillon</StatusChip>. En bas du tiroir : deux listes
                déroulantes vides au départ.
              </>
            ),
          },
          {
            title: 'Choisir livreur (et véhicule)',
            body: (
              <>
                Ouvrez <Field>Livreur…</Field> : liste des livreurs actifs de l’antenne.
                Sélectionnez-en un. Optionnel : <Field>Véhicule (opt.)</Field> parmi les
                disponibles. Tant qu’aucun livreur n’est choisi,{' '}
                <Btn>Assigner un livreur</Btn> reste grisé / inactif.
              </>
            ),
          },
          {
            title: 'Cliquer Assigner',
            body: (
              <>
                Un spinner peut apparaître sur le bouton. <strong>Succès :</strong> toast
                « Modification enregistrée. », le tiroir se ferme, le statut passe à
                Assignée, le livreur voit la mission dans son app. <strong>Échec :</strong>{' '}
                toast d’erreur (« Impossible d’assigner… ») — le tiroir reste ouvert,
                corrigez livreur/véhicule.
              </>
            ),
          },
          {
            title: 'Réassigner',
            body: (
              <>
                Sur une mission déjà Assignée, changez les listes puis{' '}
                <Btn>Réassigner</Btn> — même feedback toast / fermeture. Le nouveau
                livreur récupère la mission ; l’ancien ne la voit plus comme active.
              </>
            ),
          },
          {
            title: 'Attention au bouton Annuler',
            body: (
              <>
                <Btn>Annuler</Btn> dans le pied du détail <em>annule la mission</em>{' '}
                (statut Annulé), ce n’est pas « fermer le panneau ». Pour fermer sans
                action : croix ou fond grisé.
              </>
            ),
          },
        ]}
      />
      <Callout tone="tip">
        Auto-assignation possible via{' '}
        <GLink to="parametres" hash="auto">Paramètres</GLink> — vous pouvez toujours
        corriger ici à la main.
      </Callout>

      <H2 id="actions-statut">Actions selon le statut — et la suite</H2>
      <Ul>
        <li>
          <StatusChip>En transit</StatusChip> — message bleu « Mission en cours de
          livraison » + <Btn>Dépôt au hub relais</Btn>. Au clic : enregistrement du
          dépôt (hub cible / livreur requis). Succès → toast + fermeture, statut vers
          Au hub. Erreur typique : « Aucun hub disponible » ou « Aucun livreur assigné ».
        </li>
        <li>
          <StatusChip>Au hub</StatusChip> — <Btn>Enregistrer le retrait</Btn> ouvre une
          invite navigateur pour le nom du retraitant. Validez : toast succès, statut
          livré/retiré selon le flux ; le <GLink to="suivi-colis">suivi public</GLink>{' '}
          se met à jour.
        </li>
        <li>
          Terminaux (Livré / Échoué / Annulé) — pied : « Mission terminée · Aucune
          action disponible ». Sur Livré / Échoué, zones d’upload de preuve si
          présentes : ajoutez le fichier puis laissez le système enregistrer.
        </li>
      </Ul>

      <H2 id="carte">Vue carte</H2>
      <P>
        Cliquez l’icône carte (à côté de la liste). <strong>Vous voyez :</strong> une
        carte avec les missions / positions ; un compte à rebours de refresh peut
        s’afficher. Revenez à la liste via l’icône liste. Pour le GPS livreurs côté
        antenne : <GLink to="vue-antenne" hash="gps">Espace Antenne</GLink>.
      </P>
    </>
  )
}

export function Flotte() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir Flotte</H2>
      <Path>Menu gauche <Btn>Flotte</Btn>. Titre <strong>Flotte</strong>.</Path>
      <P>
        <strong>Ce que vous voyez :</strong> quatre cartes de stats, barre de recherche,
        tableau des véhicules, bouton orange <Btn>Ajouter un véhicule</Btn> en haut à
        droite.
      </P>

      <H2 id="stats">Cartes de stats</H2>
      <P>
        Disponibles / En service / En maintenance / Retirés. Elles se mettent à jour
        après chaque action (maintenance, retrait, assignation). Ce ne sont pas des
        filtres cliquables : utilisez la recherche et le menu ⋯ pour agir.
      </P>

      <H2 id="tableau">Lire le tableau</H2>
      <P>
        Recherche : <Field>Rechercher immatriculation, modèle, livreur...</Field> — la liste
        se réduit au fur et à mesure. Colonnes : photo / immat., modèle, antenne,
        livreur, capacité, entretien, statut, actions (⋯). Badge Agency ou FleetMan sous
        l’immatriculation. Sans livreur : lien <Btn>Assigner</Btn> dans la cellule.
      </P>

      <H2 id="ajouter">Ajouter un véhicule</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir le formulaire',
            body: (
              <>
                Cliquez <Btn>Ajouter un véhicule</Btn>. Formulaire / tiroir : immatriculation,
                type, modèle, antenne, capacités…
              </>
            ),
          },
          {
            title: 'Enregistrer',
            body: (
              <>
                Validez (Créer / Enregistrer). Le véhicule apparaît dans le tableau
                (souvent Disponible). Annuler ferme sans créer.
              </>
            ),
          },
        ]}
      />

      <H2 id="assigner">Assigner un livreur — après le clic</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir',
            body: (
              <>
                Menu ⋯ → <Btn>Assigner un livreur</Btn>, ou le lien Assigner de la ligne.
                Modale <strong>Assigner un livreur</strong> : liste des livreurs sans
                véhicule.
              </>
            ),
          },
          {
            title: 'Choisir et confirmer',
            body: (
              <>
                Cliquez une carte livreur (sélection visuelle), puis <Btn>Assigner</Btn>.
                La modale se ferme ; le nom du livreur apparaît dans la colonne. {' '}
                <Btn>Annuler</Btn> ferme sans changement.
              </>
            ),
          },
        ]}
      />

      <H2 id="menu">Menu d’actions (⋯) — résultat de chaque choix</H2>
      <Ul>
        <li>
          <Btn>Assigner un livreur</Btn> / <Btn>Désassigner le livreur</Btn> — après
          désassignation, la cellule livreur redevient vide / lien Assigner.
        </li>
        <li>
          <Btn>Envoyer en maintenance</Btn> — modale de confirmation → statut En
          maintenance ; le véhicule n’est plus assignable en mission. {' '}
          <Btn>Retour de maintenance</Btn> le remet Disponible.
        </li>
        <li>Suivi GPS si proposé — ouvre / affiche la position du véhicule.</li>
        <li>
          <Btn>Retirer de la flotte</Btn> — confirmation → passe en Retiré ; n’apparaît
          plus comme disponible.
        </li>
      </Ul>

      <H2 id="fleetman">FleetMan</H2>
      <P>
        Bouton / lien type <Btn>Connecter FleetMan</Btn> en haut de page. Après
        connexion / sync réussie : véhicules externes apparaissent avec badge FleetMan.
        En cas d’échec de sync, le tableau Agency reste inchangé — réessayez plus tard.
      </P>
    </>
  )
}

export function Hubs() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir Hubs Relais</H2>
      <Path>Menu <Btn>Hubs Relais</Btn>. Titre autour de Hubs Relais Agence.</Path>
      <P>
        <strong>Ce que vous voyez :</strong> onglets Hubs / Colis, bouton{' '}
        <Btn>Nouveau hub relais</Btn>, cartes d’occupation.
      </P>

      <H2 id="onglets">Onglets Hubs / Colis</H2>
      <Ul>
        <li>
          <Btn>Hubs</Btn> — cartes des points relais (occupation, Ouvert / Plein /
          Fermé…). Cliquez une carte pour le détail / actions photo &amp; ouverture.
        </li>
        <li>
          <Btn>Colis au hub</Btn> — liste des colis déposés, retirés, expirés. C’est
          l’écran pour <Btn>Retirer</Btn> un colis au comptoir.
        </li>
      </Ul>

      <H2 id="creer">Nouveau hub</H2>
      <Steps
        items={[
          {
            title: 'Formulaire',
            body: (
              <>
                <Btn>Nouveau hub relais</Btn> → nom, antenne, capacité, adresse,
                horaires → enregistrez. Le hub apparaît dans l’onglet Hubs.
              </>
            ),
          },
          {
            title: 'Ensuite sur la carte',
            body: (
              <>
                <Btn>Ajouter une photo</Btn> / <Btn>Changer la photo</Btn>, bascule
                Ouvert / Fermé temporairement. Un hub fermé ne doit plus recevoir de
                nouveaux dépôts livreur.
              </>
            ),
          },
        ]}
      />

      <H2 id="occupation">Occupation et alertes</H2>
      <P>
        Barres de remplissage ; seuils Attention / Critique. Quand c’est critique, le{' '}
        <GLink to="dashboard" hash="alertes">dashboard</GLink> affiche un bandeau rouge.
        <strong> Ensuite :</strong> accélérez les retraits, traitez les expirés, ou
        fermez temporairement le hub.
      </P>

      <H2 id="depot-retrait">Déposer / retirer un colis</H2>
      <Steps
        items={[
          {
            title: 'Déposer',
            body: (
              <>
                <Btn>Déposer un colis</Btn> — associe un colis / mission au hub. Après
                succès : le colis apparaît dans « Colis au hub », occupation +1.
              </>
            ),
          },
          {
            title: 'Retirer',
            body: (
              <>
                Sur un colis : <Btn>Retirer</Btn> → invite{' '}
                <Field>Nom de la personne qui retire le colis :</Field>. Validez : colis
                marqué retiré, occupation −1, suivi public mis à jour. Annuler l’invite :
                rien ne change.
              </>
            ),
          },
        ]}
      />
      <P>
        Même logique côté mission HQ : <Btn>Dépôt au hub relais</Btn> /{' '}
        <Btn>Enregistrer le retrait</Btn> (
        <GLink to="missions" hash="actions-statut">Missions</GLink>).
      </P>

      <H2 id="expiration">Colis expirés</H2>
      <P>
        Cliquez <Btn>Traiter colis expirés</Btn> → confirmez le traitement groupé. Les
        colis concernés quittent la file « actifs ». Le délai vient de{' '}
        <GLink to="parametres" hash="ops">Rétention hub (heures)</GLink> — changez-le
        puis <Btn>Sauvegarder</Btn> si 72 h ne convient pas.
      </P>
    </>
  )
}

export function Antennes() {
  return (
    <>
      <H2 id="role">Rôle d’une antenne</H2>
      <P>
        L’antenne est le site local (accueil, dispatch, hubs de zone). Le siège voit tout
        dans ce menu ; le responsable du site travaille au quotidien dans l’
        <GLink to="vue-antenne">Espace Antenne</GLink>.
      </P>

      <H2 id="ouvrir">Où les gérer</H2>
      <Path>
        Menu agence <Btn>Antennes</Btn> : liste / fiches (ville, horaires, siège ou non).
      </Path>
      <P>
        Ouvrez une fiche pour modifier les infos. Si vous ne pouvez plus activer une
        antenne : vérifiez le plafond{' '}
        <Field>Antennes actives max.</Field> dans{' '}
        <GLink to="parametres" hash="ops">Paramètres</GLink>, augmentez-le,{' '}
        <Btn>Sauvegarder</Btn>, puis réessayez.
      </P>

      <H2 id="lien-ops">Lien avec les opérations</H2>
      <P>
        Chaque <GLink to="missions">mission</GLink>, véhicule et livreur est rattaché à
        une antenne. Au dépôt client, le choix d’antenne décide où la demande et le QR
        s’appliquent. Le dashboard peut comparer les antennes (benchmark).
      </P>
    </>
  )
}

export function Personnel() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir Personnel</H2>
      <Path>Menu <Btn>Personnel</Btn>. Titre <strong>Personnel</strong>.</Path>
      <P>
        <strong>Ce que vous voyez :</strong> cinq onglets sous le titre, une recherche, et
        un bouton d’action à droite qui change selon l’onglet.
      </P>

      <H2 id="onglets">Les cinq onglets</H2>
      <P>
        <Btn>Managers &amp; Admin</Btn>, <Btn>Livreurs</Btn>, <Btn>Contrats</Btn>,{' '}
        <Btn>Commissions</Btn>, <Btn>Freelancers Associés</Btn>. Cliquez un onglet : le
        tableau change immédiatement. Boutons typiques :{' '}
        <Btn>Ajouter un membre</Btn>, <Btn>Enregistrer un livreur</Btn>,{' '}
        <Btn>Nouveau contrat</Btn>, <Btn>Associer un freelancer</Btn>. Recherche :{' '}
        <Field>Rechercher...</Field>.
      </P>

      <H2 id="livreurs">Onglet Livreurs</H2>
      <Steps
        items={[
          {
            title: 'Enregistrer',
            body: (
              <>
                <Btn>Enregistrer un livreur</Btn> → formulaire (identité, antenne, accès
                app) → validez. Le livreur apparaît dans le tableau (souvent Hors ligne /
                Disponible).
              </>
            ),
          },
          {
            title: 'Ouvrir une fiche',
            body: (
              <>
                Cliquez une ligne : coordonnées, statut (Disponible / En mission / Hors
                ligne), véhicule lié. Pour lier un véhicule : allez dans{' '}
                <GLink to="flotte" hash="assigner">Flotte → Assigner</GLink>.
              </>
            ),
          },
        ]}
      />

      <H2 id="contrats">Contrats</H2>
      <P>
        <Btn>Nouveau contrat</Btn> → lier un livreur (taux, dates) → enregistrer. Statuts
        visibles : Actif, Signé, Brouillon, Résilié, Expiré. Un contrat actif conditionne
        souvent le calcul des{' '}
        <GLink to="commissions">commissions</GLink>.
      </P>

      <H2 id="commissions-tab">Onglet Commissions</H2>
      <P>
        Bloc <strong>Registre des commissions</strong>. Cliquez une ligne → tiroir détail
        avec Valider / Payer / Litige. Procédure complète :{' '}
        <GLink to="commissions" hash="valider">Commissions</GLink>.
      </P>

      <H2 id="freelancers">Freelancers</H2>
      <P>
        <Btn>Associer un freelancer</Btn> ouvre le flux d’association. Si le bouton /
        l’action est refusée : activez{' '}
        <Field>Associations freelancers autorisées</Field> dans{' '}
        <GLink to="parametres" hash="auto">Paramètres</GLink> puis{' '}
        <Btn>Sauvegarder</Btn>.
      </P>
    </>
  )
}

export function Parametres() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir Paramètres</H2>
      <Path>
        Menu <Btn>Paramètres</Btn>. Titre <strong>Paramètres</strong>. Bouton en haut à
        droite <Btn>Sauvegarder</Btn> (devient « Sauvegarde... » pendant l’envoi).
      </Path>
      <P>
        <strong>Important :</strong> changer un interrupteur ou un chiffre ne suffit pas
        toujours — validez avec <Btn>Sauvegarder</Btn> pour les réglages serveur (ops,
        auto, sécu). Le thème Clair/Sombre peut s’appliquer dès le clic.
      </P>

      <H2 id="apparence">Apparence</H2>
      <P>
        Deux grandes cartes : <Btn>Clair</Btn> et <Btn>Sombre</Btn>. Au clic, toute
        l’interface bascule (fond, textes). Aucune autre action requise pour le thème.
      </P>

      <H2 id="notifications">Notifications</H2>
      <P>
        Interrupteurs <Field>SMS</Field>, <Field>Email</Field>, <Field>Push App</Field>,{' '}
        <Field>WhatsApp</Field>. Activez ceux que vous utilisez réellement, puis{' '}
        <Btn>Sauvegarder</Btn>. Sans canal actif, l’équipe ne reçoit pas les alertes
        configurées.
      </P>

      <H2 id="auto">Automatisation</H2>
      <Ul>
        <li>
          <Field>Auto-assignation des missions</Field> — si ON, certaines missions
          reçoivent un livreur sans clic manuel (vous pouvez toujours corriger dans{' '}
          <GLink to="missions" hash="assigner">Missions</GLink>).
        </li>
        <li>
          <Field>Associations freelancers autorisées</Field> — débloque Personnel →
          Freelancers.
        </li>
        <li>
          <Field>Reroutage automatique</Field> / <Field>Alertes hub plein</Field> —
          comportement réseau et alertes dashboard.
        </li>
      </Ul>

      <H2 id="ops">Paramètres opérationnels</H2>
      <Ul>
        <li>
          <Field>Rétention hub (heures)</Field> — ex. 72 : après ce délai, les colis
          entrent dans le flux « expirés » (
          <GLink to="hubs" hash="expiration">Hubs</GLink>).
        </li>
        <li>
          <Field>Antennes actives max.</Field> — plafond avant d’activer une nouvelle
          antenne.
        </li>
        <li>
          <Field>Commission par défaut (%)</Field> — base de calcul des commissions
          livreur.
        </li>
      </Ul>

      <H2 id="securite">Sécurité</H2>
      <P>
        Interrupteurs <Field>Authentification 2FA</Field> et{' '}
        <Field>Journal d&apos;audit</Field>. Après activation 2FA, les prochaines
        connexions peuvent demander un code — prévenez l’équipe.
      </P>

      <H2 id="sauver">Sauvegarder</H2>
      <P>
        Cliquez <Btn>Sauvegarder</Btn>. Pendant l’envoi : libellé « Sauvegarde... ». En
        cas de succès, les nouveaux comportements (rétention, auto-assign, etc.)
        s’appliquent ; en cas d’erreur, un toast / message apparaît — ne quittez pas la
        page sans avoir réussi.
      </P>
    </>
  )
}
