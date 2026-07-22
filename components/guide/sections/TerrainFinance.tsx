import {
  Btn, Callout, Field, GLink, H2, P, Path, StatusChip, Steps, Ul,
} from '@/components/guide/GuidePrimitives'

export function VueAntenne() {
  return (
    <>
      <H2 id="connexion">Se connecter</H2>
      <Path>
        Landing → <Btn>Connexion</Btn> → <Btn>Antenne</Btn>, ou carte « Je gère une
        antenne ». Écran « Connexion » / Espace Responsable d&apos;Antenne.
      </Path>
      <Steps
        items={[
          {
            title: 'Saisir les identifiants',
            body: (
              <>
                Remplissez <Field>Adresse email</Field> et <Field>Mot de passe</Field>,
                puis <Btn>Se connecter</Btn>.
              </>
            ),
          },
          {
            title: 'Après le clic',
            body: (
              <>
                <strong>Succès :</strong> vous entrez dans l’Espace Antenne (sidebar à
                gauche, contenu à droite). <strong>Échec :</strong> message d’erreur sous
                le formulaire — vérifiez email / mot de passe ou que le compte est bien
                un responsable d’antenne (pas un compte HQ / livreur).
              </>
            ),
          },
        ]}
      />

      <H2 id="menu">Menu latéral — ce que vous voyez</H2>
      <P>
        À gauche : Dashboard, Personnel, Flotte, Missions, Hubs Relais. Chaque entrée
        charge la page de l’antenne seulement (pas tout le réseau). Sur mobile / tablette,
        une invite PWA « Ajouter à l’écran d’accueil » peut apparaître : acceptez-la pour
        un accès rapide.
      </P>
      <P>
        <strong>Ensuite :</strong> commencez par le Dashboard pour le briefing du jour,
        ou allez direct dans Missions pour dispatcher.
      </P>

      <H2 id="briefing">Dashboard antenne — lire et agir</H2>
      <P>
        <strong>Ce que vous voyez :</strong> un briefing du jour, une file d’actions
        prioritaires, des KPI (Personnel actif, Véhicules dispo, Missions en cours, Hubs
        relais), puis « En cours maintenant » et « Missions récentes ».
      </P>
      <P>
        Si « Aucune mission pour cette antenne » : soit rien n’est encore créé, soit le
        dépôt client n’a pas encore été approuvé — voir{' '}
        <GLink to="depot-client" hash="demandes">Demandes en attente</GLink> côté HQ.
      </P>
      <P>
        <strong>Ensuite :</strong> cliquez une mission récente pour ouvrir le détail, ou
        passez à <Btn>Missions</Btn> pour le dispatch.
      </P>

      <H2 id="dispatch">Dispatch et Mode Rush — clic par clic</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir Missions',
            body: (
              <>
                Menu <Btn>Missions</Btn>. Titre <strong>Missions</strong> + « X missions ·
                Y en cours ». Pastilles de filtre (Toutes, En attente, Assignées…) et
                recherche « Bordereau, destinataire… ». En haut à droite :{' '}
                <Btn>Mode Rush</Btn> + bascule liste / carte.
              </>
            ),
          },
          {
            title: 'Assigner via le détail (mode normal)',
            body: (
              <>
                Cliquez une ligne <StatusChip>En attente</StatusChip>. Le tiroir détail
                s’ouvre (même logique que le{' '}
                <GLink to="missions" hash="assigner">HQ</GLink>). Choisissez livreur /
                véhicule → <Btn>Assigner un livreur</Btn>. Toast « Modification
                enregistrée. », tiroir fermé, statut Assignée.
              </>
            ),
          },
          {
            title: 'Dispatch rapide (modale)',
            body: (
              <>
                Depuis une action qui ouvre <strong>Dispatch rapide</strong> : vous voyez
                un titre « Dispatch rapide », listes <Field>Livreur</Field> et{' '}
                <Field>Véhicule</Field>. Cliquez <Btn>Confirmer l&apos;assignation</Btn>.
                La modale se ferme ; la mission passe Assignée. Annuler ferme sans
                changer le statut.
              </>
            ),
          },
          {
            title: 'Activer Mode Rush',
            body: (
              <>
                Cliquez <Btn>Mode Rush</Btn> (le bouton devient orange plein).{' '}
                <strong>Vous voyez alors :</strong> un bandeau « Dispatch express — N
                mission(s) en attente » avec des pastilles{' '}
                <Btn>bordereau → Assigner</Btn>. Les filtres classiques disparaissent
                tant que le rush est actif.
              </>
            ),
          },
          {
            title: 'Assigner en rush',
            body: (
              <>
                Cliquez une pastille <Btn>→ Assigner</Btn> : la modale Dispatch rapide
                s’ouvre pour cette mission. Confirmez livreur / véhicule. Dès que la
                file est vide, le bandeau disparaît. Cliquez à nouveau{' '}
                <Btn>Mode Rush</Btn> pour revenir à la liste filtrable.
              </>
            ),
          },
        ]}
      />
      <Callout tone="tip">
        Après assignation, le livreur voit la mission dans son app — guidez-le vers{' '}
        <GLink to="vue-livreur" hash="missions">Enlèvement</GLink>.
      </Callout>

      <H2 id="gps">Personnel et GPS</H2>
      <P>
        Menu <Btn>Personnel</Btn> : liste des livreurs de l’antenne. Pendant une mission
        active, les positions live s’affichent (carte / indicateurs). Si le{' '}
        <GLink to="dashboard">dashboard HQ</GLink> signale « livreur offline », ouvrez
        ici pour voir s’il a coupé le GPS ou l’app.
      </P>
      <P>
        <strong>Ensuite :</strong> rappel téléphonique, ou réassignation depuis Missions
        si le livreur ne peut plus continuer.
      </P>

      <H2 id="hubs-locaux">Hubs de l’antenne</H2>
      <P>
        Menu Hubs Relais : occupation, alertes, colis bientôt expirés — même logique que{' '}
        <GLink to="hubs">Hubs</GLink> HQ, limitée à votre zone. Si un hub est plein :
        redirigez les dépôts ou traitez les retraits / expirations avant d’accepter
        d’autres colis.
      </P>
    </>
  )
}

export function VueLivreur() {
  return (
    <>
      <H2 id="connexion">Connexion et installation</H2>
      <Path>
        Landing → <Btn>Connexion</Btn> → <Btn>Livreur</Btn> (ou carte « Je livre »).
        Page « Bonjour, connectez-vous ».
      </Path>
      <Steps
        items={[
          {
            title: 'Se connecter',
            body: (
              <>
                Email + mot de passe → <Btn>Se connecter</Btn>. Lien{' '}
                <Btn>← Retour à l&apos;accueil</Btn> si vous vous êtes trompé de portail.
              </>
            ),
          },
          {
            title: 'Après connexion',
            body: (
              <>
                Vous arrivez sur Accueil (barre du bas visible). Sur mobile, une bannière
                peut proposer d’installer l’app (PWA) : acceptez pour un accès plein
                écran. Autorisez la localisation quand le navigateur le demande — sinon
                la carte et le suivi GPS restent incomplets.
              </>
            ),
          },
        ]}
      />

      <H2 id="nav">Barre du bas</H2>
      <P>
        Cinq onglets fixes : <Btn>Accueil</Btn>, <Btn>Missions</Btn>, <Btn>Carte</Btn>,{' '}
        <Btn>Gains</Btn>, <Btn>Profil</Btn>. Touchez-en un pour changer d’écran ; l’onglet
        actif est mis en évidence.
      </P>

      <H2 id="disponibilite">Disponibilité</H2>
      <P>
        Sur Accueil : interrupteur <Btn>Disponible</Btn> / <Btn>Hors ligne</Btn>.
      </P>
      <Ul>
        <li>
          Passez <strong>Disponible</strong> : l’antenne / HQ peut vous assigner. Bloc
          « Mission en cours » + « Missions récentes » avec <Btn>Voir tout</Btn>.
        </li>
        <li>
          <strong>Hors ligne</strong> : vous n’êtes plus assignable. Si une mission est
          déjà en cours, le bascule peut être bloqué — terminez d’abord la mission.
        </li>
      </Ul>

      <H2 id="missions">Missions — de la liste à l’enlèvement</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir la liste',
            body: (
              <>
                Onglet <Btn>Missions</Btn>. Filtres Toutes / En cours / Livrées / Autres.
                Touchez une carte mission pour ouvrir le détail.
              </>
            ),
          },
          {
            title: 'Lire le détail',
            body: (
              <>
                Écran <strong>Détail mission</strong> : numéro de bordereau, pastille de
                statut, carte, blocs Enlèvement / Livraison (adresses cliquables Maps),
                boutons <Btn>Appeler</Btn> / <Btn>WhatsApp</Btn>, résumé colis + prix. En
                bas (zone fixe) : les actions selon le statut.
              </>
            ),
          },
          {
            title: 'Scanner le colis (Assignée)',
            body: (
              <>
                Statut Assignée → touchez <Btn>Scanner le colis</Btn>. Un écran caméra
                « Scanner le colis » s’ouvre. Scannez le code du bordereau.{' '}
                <strong>Bon code :</strong> toast « Colis vérifié », le bouton devient
                « Colis scanné ✓ ». <strong>Mauvais code :</strong> toast « Code colis
                incorrect » — rescanner.
              </>
            ),
          },
          {
            title: 'Confirmer enlèvement',
            body: (
              <>
                Tant que le scan n’est pas OK, <Btn>Confirmer enlèvement</Btn> reste grisé.
                Après scan, touchez-le (affiche « Confirmation… »).{' '}
                <strong>Succès :</strong> toast « Enlèvement confirmé ! », statut passe à
                En transit, les boutons bas changent (POD + dépôt hub).{' '}
                <strong>Échec :</strong> toast « Impossible de confirmer l’enlèvement. »
                — réessayez ou signalez un problème.
              </>
            ),
          },
        ]}
      />

      <H2 id="pod">Confirmer la livraison (POD) — étape par étape</H2>
      <P>
        Mission <StatusChip>En transit</StatusChip>, livraison à domicile. En bas :
        bouton vert <Btn>Confirmer livraison (POD)</Btn>.
      </P>
      <Steps
        items={[
          {
            title: 'Ouvrir la feuille POD',
            body: (
              <>
                Au clic : panneau du bas « Preuve de livraison » avec le nom du
                destinataire, croix pour fermer, barre d’étapes Photo → Signature →
                Confirmer.
              </>
            ),
          },
          {
            title: 'Étape Photo',
            body: (
              <>
                Texte « Prenez une photo du colis livré. » Touchez{' '}
                <Btn>Prendre une photo</Btn> (caméra ou galerie). Aperçu affiché →{' '}
                <Btn>Continuer</Btn>.
              </>
            ),
          },
          {
            title: 'Étape Signature',
            body: (
              <>
                « Signature du destinataire. » Faites signer dans le cadre. Effacez si
                besoin, puis continuez vers Confirmer.
              </>
            ),
          },
          {
            title: 'Étape Confirmer',
            body: (
              <>
                Vérifiez le résumé. Touchez le bouton final de confirmation (libellé
                type <Btn>Confirmer la livraison</Btn>). Spinner pendant l’envoi.{' '}
                <strong>Succès :</strong> toast « Livraison confirmée — preuve
                enregistrée », feuille fermée, statut Livré, plus d’actions bas.{' '}
                <strong>Échec :</strong> toast « Impossible de confirmer la
                livraison. » — la feuille peut rester ouverte pour réessayer.
              </>
            ),
          },
        ]}
      />
      <Callout>
        Sans réseau, la preuve peut partir en file hors ligne — voir section Mode hors
        ligne. Ne forcez pas une seconde livraison tant que la sync n’est pas claire.
      </Callout>

      <H2 id="hub">Dépôt au hub relais</H2>
      <P>
        En transit, si la mission est un point relais (ou si on vous demande de déposer) :
        touchez <Btn>Dépôt au hub relais</Btn> (bouton violet).
      </P>
      <Steps
        items={[
          {
            title: 'Choisir le hub',
            body: (
              <>
                Feuille « Dépôt au hub relais ». Liste des hubs (nom, adresse,
                occupation). Si « Aucun hub disponible » : fermez et contactez
                l’antenne. Sinon touchez une carte hub (bordure orange = sélection).
              </>
            ),
          },
          {
            title: 'Code + confirmation',
            body: (
              <>
                Un champ <Field>Code de suivi</Field> apparaît +{' '}
                <Btn>Scanner QR</Btn> / <Btn>Confirmer dépôt</Btn>. Saisissez ou
                scannez (« Scanner le colis au hub »). Au scan réussi, le dépôt peut
                partir automatiquement.
              </>
            ),
          },
          {
            title: 'Après succès',
            body: (
              <>
                La feuille se ferme ; la mission n’est plus « à livrer chez le client »
                côté livreur (statut hub / suite côté agence). Le destinataire ira
                retirer au hub — voir <GLink to="hubs">Hubs</GLink> /{' '}
                <GLink to="suivi-colis" hash="hub">suivi</GLink>.
              </>
            ),
          },
        ]}
      />

      <H2 id="probleme">Signaler un problème</H2>
      <P>
        Bouton rouge <Btn>Signaler un problème</Btn> (visible Assignée ou En transit).
        Au clic : invite navigateur « Décrivez le problème rencontré : ». Saisissez un
        motif puis validez.
      </P>
      <Ul>
        <li>
          <strong>Succès :</strong> toast « Problème signalé. », statut Échoué / Failed —
          plus de POD. L’agence peut ouvrir un{' '}
          <GLink to="litiges">incident</GLink>.
        </li>
        <li>
          Annuler l’invite (vide / Cancel) : rien ne change.
        </li>
      </Ul>

      <H2 id="gains">Gains et contestation</H2>
      <Path>Onglet <Btn>Gains</Btn> — titre « Mes gains ».</Path>
      <P>
        <strong>Ce que vous voyez :</strong> trois KPI (En attente, Validées, Payées) +
        Historique. Empty : « Aucune commission pour le moment ».
      </P>
      <P>
        Sur une ligne encore <StatusChip>Calculée</StatusChip>, touchez{' '}
        <Btn>Contester</Btn>. Cela ouvre / envoie une contestation côté agence (statut
        litige). Ensuite : attendre la décision HQ (
        <GLink to="commissions">Commissions</GLink>) — ne pas recontester en boucle.
      </P>

      <H2 id="hors-ligne">Mode hors ligne</H2>
      <P>
        Sans réseau, une bannière ambre peut afficher « Mode hors ligne — actions mises
        en file d’attente » avec un compteur. Au retour réseau : bandeau bleu « N
        action(s) en attente de synchronisation » + bouton pour sync.
      </P>
      <Callout tone="warn">
        Photo / signature POD peuvent être en file. Ne confirmez pas une seconde fois
        la même livraison tant que la sync n’a pas abouti ou qu’un conflit n’a pas été
        résolu.
      </Callout>
    </>
  )
}

export function Commissions() {
  return (
    <>
      <H2 id="ou">Où les trouver</H2>
      <Path>
        Agence → <Btn>Personnel</Btn> → onglet <Btn>Commissions</Btn>, ou{' '}
        <Btn>Facturation</Btn> → onglet Commissions. Livreur → onglet{' '}
        <Btn>Gains</Btn>.
      </Path>
      <P>
        <strong>Ce que vous voyez (HQ) :</strong> un registre (lignes montant, livreur,
        bordereau, statut). Cliquez une ligne pour le tiroir détail.
      </P>

      <H2 id="cycle">Le cycle</H2>
      <P>
        Après une mission réussie, une ligne apparaît :{' '}
        <StatusChip>Calculée</StatusChip> → <StatusChip>Validée</StatusChip> →{' '}
        <StatusChip>Payée</StatusChip>, ou <StatusChip>En litige</StatusChip> si
        contestée.
      </P>

      <H2 id="valider">Valider et payer — après chaque clic</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir la ligne',
            body: (
              <>
                Tiroir à droite : bannière de statut (ex. « La commission a été calculée
                et est en attente de validation. »), montant en grand, fiche livreur,
                détails mission. Pied collé avec les boutons d’action.
              </>
            ),
          },
          {
            title: 'Si Calculée → Valider',
            body: (
              <>
                Cliquez <Btn>Valider la commission</Btn> (spinner possible).{' '}
                <strong>Succès :</strong> toast « Modification enregistrée. », tiroir
                fermé, statut Validée. Le livreur voit le montant passer dans « Validées »
                sur Gains.
              </>
            ),
          },
          {
            title: 'Si Validée → Payer',
            body: (
              <>
                Rouvrez la ligne → <Btn>Marquer comme payée</Btn>. Même toast succès /
                fermeture. Statut Payée ; le livreur voit l’entrée dans « Payées ».
              </>
            ),
          },
          {
            title: 'En cas d’erreur',
            body: (
              <>
                Toast du type « Impossible de valider… » / « Impossible d’enregistrer le
                paiement… » — le tiroir reste ouvert. Vérifiez les droits ou réessayez.
              </>
            ),
          },
        ]}
      />

      <H2 id="litige">Signaler un litige (côté agence)</H2>
      <P>
        Sur une commission Calculée, pied du tiroir : <Btn>Signaler un litige</Btn> (à
        côté de Valider). Au succès : toast « Modification enregistrée. », statut En
        litige — plus de « Marquer comme payée » tant que ce n’est pas traité. Distinct
        d’une réclamation client (
        <GLink to="suivi-colis" hash="reclamation">suivi</GLink> /{' '}
        <GLink to="litiges">Litiges</GLink>).
      </P>

      <H2 id="livreur">Côté livreur</H2>
      <P>
        Voir <GLink to="vue-livreur" hash="gains">Gains</GLink> : le livreur suit les
        montants et peut <Btn>Contester</Btn> une ligne Calculée. Votre rôle ensuite :
        ouvrir le registre, trancher (valider autrement / garder litige), puis payer
        quand c’est clair.
      </P>
    </>
  )
}

export function Facturation() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir Facturation</H2>
      <Path>
        Menu gauche <Btn>Facturation</Btn>. Onglets en haut de la page.
      </Path>
      <P>
        <strong>Ce que vous voyez :</strong> une barre d’onglets (Politiques tarifaires,
        Factures &amp; Revenus, Commissions…). Le contenu change sans quitter la page.
      </P>

      <H2 id="politiques">Politiques tarifaires — créer et activer</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir l’onglet',
            body: (
              <>
                Cliquez <Btn>Politiques tarifaires</Btn>. Liste / cartes des grilles +
                panneau d’aide <strong>Guide de la tarification</strong>.
              </>
            ),
          },
          {
            title: 'Créer',
            body: (
              <>
                <Btn>Nouvelle politique</Btn> ouvre un formulaire (base, km, kg,
                surcharges…). Remplissez → enregistrez. La politique apparaît dans la
                liste (souvent inactive / brouillon selon l’écran).
              </>
            ),
          },
          {
            title: 'Activer ou archiver',
            body: (
              <>
                Sur une politique : <Btn>Activer</Btn> la rend utilisable pour le calcul
                des prix missions. <Btn>Archiver</Btn> la retire du circuit sans
                forcément supprimer l’historique.
              </>
            ),
          },
        ]}
      />

      <H2 id="factures">Factures &amp; Revenus</H2>
      <P>
        Onglet <Btn>Factures &amp; Revenus</Btn>. KPI type Revenus du mois, Commissions
        versées, Politiques actives. Sur une mission éligible :{' '}
        <Btn>Générer la facture</Btn>.
      </P>
      <P>
        <strong>Après génération :</strong> la facture apparaît dans la liste /
        détail ; vous pouvez télécharger le PDF depuis le tiroir facture si proposé.
        Erreur typique : « Facture introuvable… Générez-la d’abord » ou PDF Core
        indisponible — regénérez ou vérifiez le lien billing.
      </P>

      <H2 id="commissions-tab">Onglet Commissions</H2>
      <P>
        Même registre et mêmes actions que Personnel → Commissions (
        <GLink to="commissions" hash="valider">valider / payer</GLink>). Bouton éventuel{' '}
        <Btn>Nouvelle commission</Btn> pour une saisie manuelle.
      </P>

      <H2 id="lien-missions">Lien avec les missions</H2>
      <P>
        Le prix s’affiche déjà dans le détail mission (bloc Facturation). Ici vous
        formalisez l’encaissement après clôture ops — enchaînement dans le{' '}
        <GLink to="workflow-complet" hash="etape-6">workflow</GLink>.
      </P>
    </>
  )
}

export function Litiges() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir Litiges</H2>
      <Path>
        Menu <Btn>Litiges &amp; incidents</Btn>. Bouton <Btn>Actualiser</Btn> en haut à
        droite pour recharger la liste.
      </Path>
      <P>
        <strong>Ce que vous voyez :</strong> deux onglets principaux + listes. Empty
        client : « Aucun litige client pour le moment. »
      </P>

      <H2 id="clients">Litiges clients — ouvrir et lire</H2>
      <Steps
        items={[
          {
            title: 'Onglet',
            body: <>Cliquez <Btn>Litiges clients</Btn>. Tableau / cartes avec statuts.</>,
          },
          {
            title: 'Ouvrir le détail',
            body: (
              <>
                Cliquez une ligne → tiroir <strong>Détail litige</strong> (lecture :
                motif, colis, statut Ouvert / Enquête / Médiation / Résolu / Clôturé /
                Retiré). Fermez avec la croix quand vous avez noté l’action terrain à
                faire (rappel client, contrôle hub, etc.).
              </>
            ),
          },
        ]}
      />

      <H2 id="incidents">Incidents livraison</H2>
      <P>
        Onglet <Btn>Incidents livraison</Btn> → même schéma : clic ligne →{' '}
        <strong>Détail incident</strong> (accident, vol, panne, plainte…).{' '}
        <strong>Ensuite :</strong> coordonnez avec le livreur / l’antenne, puis mettez
        à jour le statut selon les actions disponibles dans le tiroir.
      </P>

      <H2 id="origine">D’où viennent-ils — et que faire</H2>
      <Ul>
        <li>
          Client : <Btn>Signaler un problème</Btn> sur le{' '}
          <GLink to="suivi-colis" hash="reclamation">suivi public</GLink> → apparaît
          ici → ouvrez le détail et traitez.
        </li>
        <li>
          Livreur : <Btn>Signaler un problème</Btn> (
          <GLink to="vue-livreur" hash="probleme">Espace Livreur</GLink>) → mission
          échouée + incident possible.
        </li>
        <li>Saisie / sync depuis cet écran Litiges si l’équipe enregistre manuellement.</li>
      </Ul>
    </>
  )
}
