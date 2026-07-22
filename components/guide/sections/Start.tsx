import {
  Btn, Callout, Field, GLink, H2, H3, P, Path, StatusChip, Steps, Ul,
} from '@/components/guide/GuidePrimitives'

export function Demarrer() {
  return (
    <>
      <H2 id="a-propos">À propos</H2>
      <P>
        Ce guide est le mode d’emploi de <strong>TiiBnTick Agency</strong>. Pour chaque
        action, on décrit : où cliquer, <em>ce que l’écran affiche juste après</em>, puis
        <em>ce qu’il faut faire ensuite</em> (succès, erreur, toast, écran suivant). Les
        libellés de boutons et de champs sont ceux de l’app.
      </P>
      <P>
        Public : dirigeant d’agence, responsable d’antenne, dispatcher, comptable,
        livreur, et client qui suit un colis.
      </P>

      <H2 id="qui-fait-quoi">Qui fait quoi</H2>
      <Ul>
        <li><strong>Agence (HQ)</strong> — menu de gauche après connexion : dashboard, missions, flotte, hubs, personnel, facturation, paramètres.</li>
        <li><strong>Antenne</strong> — portail séparé (sidebar propre) : briefing, dispatch local, Mode Rush, GPS, hubs de la zone.</li>
        <li><strong>Livreur</strong> — app mobile web (barre du bas) : Accueil, Missions, Carte, Gains, Profil.</li>
        <li><strong>Client</strong> — pages publiques Suivi et dépôt, sans compte staff.</li>
      </Ul>

      <H2 id="parcours-complet">Le parcours d’un colis</H2>
      <P>
        Chaîne typique : dépôt (<GLink to="depot-client">Accueil client</GLink>) →
        mission créée (<GLink to="missions">Missions</GLink>) → assignation livreur →
        enlèvement / transit (<GLink to="vue-livreur">Espace Livreur</GLink>) →
        livraison ou <GLink to="hubs">hub</GLink> →{' '}
        <GLink to="facturation">facturation</GLink> +{' '}
        <GLink to="commissions">commission</GLink>.
      </P>
      <P>
        Version pas à pas avec écrans et toasts :{' '}
        <GLink to="workflow-complet">Workflow complet</GLink>.
      </P>

      <H2 id="comment-lire">Comment lire ce guide</H2>
      <Ul>
        <li>Colonne de gauche : sommaire de toutes les sections.</li>
        <li>Centre : le mode d’emploi.</li>
        <li>Droite : titres de la page (clic = scroll).</li>
        <li>Les mots <span className="font-medium text-blue-600">bleus</span> ouvrent une autre section.</li>
        <li>Un encadré <Btn>comme ceci</Btn> est le libellé exact d’un bouton dans l’app.</li>
        <li>Un encadré <Field>comme ceci</Field> est un champ ou une zone à remplir.</li>
        <li>« Ce que vous voyez » / « Ensuite » / « Succès » / « Échec » : lisez-les dans l’ordre — c’est le fil de l’action.</li>
      </Ul>
    </>
  )
}

export function Portails() {
  return (
    <>
      <H2 id="landing">Depuis la page d’accueil</H2>
      <Path>
        Ouvrez le site public TiiBnTick Agency (page d’accueil). En haut à droite :
        menu <Btn>Connexion</Btn> (Agence / Antenne / Livreur). Dans la section
        « portails », quatre cartes cliquables. En bas : lien{' '}
        <Btn>Guide utilisateur</Btn>.
      </Path>
      <P>
        <strong>Après un clic sur une carte ou une entrée Connexion :</strong> vous
        quittez la landing pour la page de login du rôle choisi (ou le suivi public).
      </P>

      <H2 id="agence">Portail agence</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir la connexion',
            body: <>Cliquez <Btn>Connexion</Btn> → <Btn>Agence</Btn>, ou la carte « Je dirige l’agence ».</>,
          },
          {
            title: 'Se connecter',
            body: (
              <>
                Remplissez <Field>Adresse email</Field> et <Field>Mot de passe</Field>,
                puis <Btn>Se connecter</Btn>. Si la MFA est demandée, un second écran /
                champ code apparaît : saisissez le code puis validez.
              </>
            ),
          },
          {
            title: 'Après connexion',
            body: (
              <>
                Vous arrivez sur le <GLink to="dashboard">Centre de commandement</GLink>.
                À gauche : menu (Dashboard, Missions, Flotte, Hubs, Personnel,
                Facturation, Paramètres…). Première action typique du jour : lire « À
                traiter » ou ouvrir Accueil client.
              </>
            ),
          },
        ]}
      />

      <H2 id="antenne">Portail antenne</H2>
      <P>
        <Btn>Connexion</Btn> → <Btn>Antenne</Btn>, ou carte « Je gère une antenne ».
        Écran titré autour de <strong>Espace Responsable d&apos;Antenne</strong> :
        <Field>Adresse email</Field>, <Field>Mot de passe</Field>, puis{' '}
        <Btn>Se connecter</Btn>.
      </P>
      <P>
        <strong>Ensuite :</strong> sidebar antenne + dashboard local. Détail des
        écrans : <GLink to="vue-antenne">Espace Antenne</GLink>.
      </P>

      <H2 id="livreur">Portail livreur</H2>
      <P>
        <Btn>Connexion</Btn> → <Btn>Livreur</Btn>, ou carte « Je livre ». Page
        « Bonjour, connectez-vous » : email, mot de passe, <Btn>Se connecter</Btn>.
      </P>
      <P>
        <strong>Ensuite :</strong> Accueil livreur + barre du bas. Voir{' '}
        <GLink to="vue-livreur">Espace Livreur</GLink> (scan, POD, gains).
      </P>

      <H2 id="suivi">Suivi public</H2>
      <P>
        Carte « Je suis un colis » ou lien Suivi. Pas de login staff. Vous voyez un
        champ de recherche de code — suite dans{' '}
        <GLink to="suivi-colis">Suivi de colis</GLink>.
      </P>

      <H2 id="inscription">Créer une agence (pas à pas)</H2>
      <Path>
        Landing → <Btn>Créer mon agence</Btn> (section Démarrer) ou lien footer.
      </Path>
      <P>
        <strong>Ce que vous voyez :</strong> un formulaire multi-étapes avec{' '}
        <Btn>Continuer</Btn> / <Btn>Retour</Btn>. Tant qu’une étape obligatoire est
        incomplète, Continuer reste bloqué ou affiche l’erreur sous le champ.
      </P>
      <Steps
        items={[
          {
            title: 'Identité',
            body: (
              <>
                <Field>Nom commercial de l&apos;agence</Field>,{' '}
                <Field>Raison sociale</Field>, <Field>N° RCCM / Registre de commerce</Field>,{' '}
                <Field>Type de structure</Field> → <Btn>Continuer</Btn>.
              </>
            ),
          },
          {
            title: 'Contact',
            body: (
              <>
                Siège, ville, pays, téléphone pro, email pro, site optionnel → Continuer.
              </>
            ),
          },
          {
            title: 'Vérification',
            body: (
              <>
                Identité du responsable + uploads (CNI recto, RCCM, justificatif de
                domicile). Sans fichiers requis, vous ne pourrez pas finaliser.
              </>
            ),
          },
          {
            title: 'Opérations',
            body: (
              <>
                Devise, rétention hub, toggles auto-assignation et freelancers — ce
                seront les défauts une fois l’agence validée.
              </>
            ),
          },
          {
            title: 'Finalisation',
            body: (
              <>
                Mot de passe ×2, cases CGU / confidentialité, puis{' '}
                <Btn>Soumettre la demande</Btn>.
              </>
            ),
          },
        ]}
      />
      <Callout>
        Après envoi : écran « Demande envoyée ! » puis page d’attente jusqu’à validation
        admin. Vous ne pouvez pas encore ouvrir le Centre de commandement. Dès
        validation : connectez-vous via le portail agence avec l’email / mot de passe
        choisis.
      </Callout>
    </>
  )
}

export function WorkflowComplet() {
  return (
    <>
      <H2 id="etape-1">1. Le client dépose</H2>
      <P>
        Au comptoir HQ : menu <Btn>Accueil client</Btn> (ou{' '}
        <Btn>Accueillir un client</Btn> sur le dashboard).
      </P>
      <Ul>
        <li>
          Choisissez l’antenne → QR ou walk-in. Détail des écrans :{' '}
          <GLink to="depot-client">Dépôt et accueil client</GLink>.
        </li>
        <li>
          Walk-in : après enregistrement vous voyez le reçu / toast « Client enregistré
          — reçu prêt à imprimer. » → <Btn>Imprimer le reçu</Btn> puis{' '}
          <Btn>Nouveau client</Btn>.
        </li>
        <li>
          QR : le client envoie sa demande ; chez vous rien ne change tant que vous
          n’ouvrez pas Demandes en attente.
        </li>
      </Ul>

      <H2 id="etape-2">2. Validation et mission</H2>
      <P>
        Si dépôt QR : <Btn>Demandes en attente</Btn> → ouvrez la demande →{' '}
        <Btn>Approuver</Btn> (ou Refuser avec motif).
      </P>
      <P>
        <strong>Après Approuver :</strong> une mission apparaît dans{' '}
        <GLink to="missions">Missions</GLink> (souvent{' '}
        <StatusChip>En attente</StatusChip>). Le client voit « Demande approuvée » +
        code ; il peut ouvrir le <GLink to="suivi-colis">suivi</GLink>.
      </P>

      <H2 id="etape-3">3. Dispatch</H2>
      <P>
        Ouvrez la ligne mission → tiroir → <Field>Livreur…</Field> +{' '}
        <Field>Véhicule (opt.)</Field> → <Btn>Assigner un livreur</Btn>.
      </P>
      <P>
        <strong>Succès :</strong> toast « Modification enregistrée. », tiroir fermé,
        statut Assignée ; le livreur voit la mission dans son app. En antenne : bandeau
        Mode Rush <Btn>bordereau → Assigner</Btn> ou{' '}
        <Btn>Dispatch rapide</Btn> (
        <GLink to="vue-antenne" hash="dispatch">Espace Antenne</GLink>).
      </P>

      <H2 id="etape-4">4. Enlèvement et transit</H2>
      <P>
        Livreur : <Btn>Missions</Btn> → détail → <Btn>Scanner le colis</Btn> (toast
        « Colis vérifié ») → <Btn>Confirmer enlèvement</Btn>.
      </P>
      <P>
        <strong>Succès :</strong> toast « Enlèvement confirmé ! », statut{' '}
        <StatusChip>En transit</StatusChip>. Le suivi public avance. En cas d’échec :
        toast « Impossible de confirmer l’enlèvement. »
      </P>

      <H2 id="etape-5">5. Livraison ou hub</H2>
      <Ul>
        <li>
          <strong>Domicile :</strong> <Btn>Confirmer livraison (POD)</Btn> → Photo →
          Signature → Confirmer. Toast « Livraison confirmée — preuve enregistrée »,
          statut Livré.
        </li>
        <li>
          <strong>Relais :</strong> <Btn>Dépôt au hub relais</Btn> → choisir hub →
          code / <Btn>Scanner QR</Btn> → <Btn>Confirmer dépôt</Btn>. Plus tard, retrait
          au hub ou détail mission <Btn>Enregistrer le retrait</Btn>.
        </li>
        <li>
          Problème terrain : <Btn>Signaler un problème</Btn> → motif → toast « Problème
          signalé. » / statut échoué → traiter dans{' '}
          <GLink to="litiges">Litiges</GLink>.
        </li>
      </Ul>

      <H2 id="etape-6">6. Facturation et commission</H2>
      <P>
        Prix / facture : <GLink to="facturation">Facturation</GLink> (politique active,
        <Btn>Générer la facture</Btn> si besoin).
      </P>
      <P>
        Commission : Personnel → Commissions → ouvrir la ligne →{' '}
        <Btn>Valider la commission</Btn> (toast « Modification enregistrée. ») puis plus
        tard <Btn>Marquer comme payée</Btn>. Le livreur suit dans{' '}
        <GLink to="vue-livreur" hash="gains">Gains</GLink> ; s’il{' '}
        <Btn>Contester</Btn>, traitez le litige avant de payer.
      </P>
    </>
  )
}
