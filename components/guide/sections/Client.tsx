import {
  Btn, Callout, Field, GLink, H2, H3, P, Path, StatusChip, Steps, Ul,
} from '@/components/guide/GuidePrimitives'

export function DepotClient() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir Accueil client</H2>
      <Path>
        Connecté en agence → menu de gauche <Btn>Accueil client</Btn>, ou depuis le
        Centre de commandement le bouton <Btn>Accueillir un client</Btn> (haut droite,
        style orange clair).
      </Path>
      <P>
        <strong>Ce que vous voyez ensuite :</strong> la page « Accueil client » avec un
        sélecteur d’antenne en haut, deux grands modes (<Btn>Client avec téléphone</Btn> /{' '}
        <Btn>Sans smartphone</Btn>), et un accès <Btn>Demandes en attente</Btn>. Tant
        qu’aucune antenne n’est choisie, le QR et le formulaire comptoir ne sont pas
        utilisables correctement.
      </P>
      <P>
        <strong>À faire tout de suite :</strong> dans <Field>Antenne</Field>, choisissez
        le site où se trouve le client (seules les antennes « ouvertes » apparaissent).
        La première ouverte est souvent présélectionnée.
      </P>

      <H2 id="antenne">Choisir l’antenne</H2>
      <P>
        Après le choix, le QR (onglet téléphone) se régénère pour <em>cette</em> antenne :
        le client qui scanne sera rattaché au bon site. Si vous changez d’antenne en cours
        de file, refaites scanner / refaites le formulaire pour le nouveau site.
      </P>

      <H2 id="qr">Client avec téléphone (QR) — côté agent</H2>
      <Steps
        items={[
          {
            title: 'Basculer sur l’onglet QR',
            body: (
              <>
                Cliquez <Btn>Client avec téléphone</Btn>.{' '}
                <strong>Vous voyez :</strong> un grand QR code + un texte du type
                « Affichez ce QR à l’accueil… ». Ce n’est pas encore le formulaire client :
                c’est uniquement l’affiche pour le téléphone du client.
              </>
            ),
          },
          {
            title: 'Faire scanner le client',
            body: (
              <>
                Orientez l’écran (ou une impression) vers le client. Dès le scan,{' '}
                <strong>son téléphone</strong> ouvre le formulaire public de dépôt (voir
                section suivante). Chez vous, l’écran Accueil client ne change pas
                automatiquement : la demande arrivera dans « Demandes en attente ».
              </>
            ),
          },
          {
            title: 'Pendant que le client remplit',
            body: (
              <>
                Vous pouvez déjà ouvrir <Btn>Demandes en attente</Btn> dans un autre
                onglet navigateur, ou rester sur Accueil et y aller quand le client a fini.
                Tant que le client n’a pas appuyé sur <Btn>Envoyer ma demande</Btn>, rien
                n’apparaît dans la file.
              </>
            ),
          },
        ]}
      />

      <H2 id="formulaire-qr">Formulaire côté client — après le scan</H2>
      <P>
        <strong>Ce que le client voit :</strong> une page « Demande d’expédition /
        Formulaire client » en plusieurs blocs, sans menu agence.
      </P>
      <H3 id="bloc-vous">Bloc « Vos informations »</H3>
      <P>
        Il saisit <Field>Votre nom *</Field> (obligatoire) et{' '}
        <Field>Votre téléphone</Field>. S’il laisse le téléphone vide, l’agence aura
        plus de mal à le rappeler en cas de refus ou d’imprécision.
      </P>
      <H3 id="bloc-dest">Bloc « Destinataire &amp; livraison »</H3>
      <P>
        Il remplit destinataire, téléphones, adresses d’enlèvement et de livraison.
        Puis il choisit <Btn>À domicile</Btn> ou <Btn>Point relais</Btn>.
      </P>
      <P>
        <strong>S’il choisit Point relais :</strong> un sélecteur{' '}
        <Field>Choisir un point relais</Field> apparaît. Il doit en sélectionner un dans
        la liste. Sans hub choisi, l’envoi échouera ou restera incohérent.
      </P>
      <P>
        <strong>S’il choisit À domicile :</strong> le sélecteur de hub disparaît ; la
        livraison se fera à l’adresse saisie.
      </P>
      <H3 id="bloc-colis">Bloc « Colis » puis envoi</H3>
      <P>
        Poids, nombre de colis, notes (fragile…). Puis il appuie sur{' '}
        <Btn>Envoyer ma demande</Btn>. Le bouton peut afficher « Envoi... » pendant
        le traitement.
      </P>
      <P>
        <strong>Écrans suivants possibles pour le client :</strong>
      </P>
      <Ul>
        <li>
          <strong>« Demande en cours de traitement »</strong> — rien à faire d’autre ;
          attendre l’agent. Il pourra plus tard suivre avec le code s’il lui est communiqué.
        </li>
        <li>
          <strong>« Demande approuvée »</strong> — un code de suivi / référence est
          affiché ; bouton <Btn>Suivre mon colis</Btn> pour ouvrir le{' '}
          <GLink to="suivi-colis">suivi public</GLink>.
        </li>
        <li>
          <strong>« Demande non retenue »</strong> — refus ; message / motif. Le client
          doit repasser au comptoir ou renvoyer une demande corrigée.
        </li>
      </Ul>

      <H2 id="walkin">Sans smartphone (comptoir) — côté agent</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir le mode comptoir',
            body: (
              <>
                Cliquez <Btn>Sans smartphone</Btn>.{' '}
                <strong>Vous voyez :</strong> un formulaire complet sur la page Accueil
                (plus le QR). Le texte rappelle d’enregistrer un client présent au comptoir.
              </>
            ),
          },
          {
            title: 'Remplir avec le client devant vous',
            body: (
              <>
                Saisissez <Field>Nom expéditeur *</Field>, téléphone, destinataire,
                adresses, poids. Dans le mode de livraison, choisissez{' '}
                <Field>Livraison directe</Field> ou <Field>Point relais</Field>. En mode
                relais, un champ hub apparaît : sélectionnez le hub cible avant de valider.
              </>
            ),
          },
          {
            title: 'Valider',
            body: (
              <>
                Cliquez <Btn>Valider et imprimer le reçu</Btn>. Pendant l’envoi, un
                chargement peut s’afficher. En cas d’erreur, un toast rouge du type
                « Impossible d’enregistrer ce client » : corrigez les champs obligatoires
                et réessayez.
              </>
            ),
          },
          {
            title: 'Après succès — écran reçu',
            body: (
              <>
                <strong>Ce que vous voyez :</strong> titre vert « Reçu client — … » avec
                la référence, un aperçu de reçu imprimable, et les boutons{' '}
                <Btn>Imprimer le reçu</Btn> puis <Btn>Nouveau client</Btn>. Un toast
                confirme « Client enregistré — reçu prêt à imprimer. »
              </>
            ),
          },
          {
            title: 'Enchaîner',
            body: (
              <>
                Remettez le reçu papier / PDF au client (code de suivi dessus). Cliquez{' '}
                <Btn>Nouveau client</Btn> pour revenir au formulaire vide et enchaîner la
                file. La mission associée apparaîtra ensuite dans{' '}
                <GLink to="missions">Missions</GLink> pour le dispatch.
              </>
            ),
          },
        ]}
      />

      <H2 id="demandes">Valider les demandes QR — file d’attente</H2>
      <Path>
        Accueil client → <Btn>Demandes en attente</Btn> (ou lien dédié dans le menu /
        en-tête Accueil).
      </Path>
      <P>
        <strong>Ce que vous voyez :</strong> une liste de cartes (ou message « Aucune
        demande en attente. »). Chaque carte montre l’expéditeur, le destinataire, le
        mode (Direct / Point relais), et les actions <Btn>Approuver</Btn> /{' '}
        <Btn>Refuser</Btn>.
      </P>
      <P>
        <strong>Si vous cliquez Approuver :</strong> la demande disparaît de la file
        (ou change de statut). Le client, de son côté, pourra voir « Demande approuvée »
        et un code. Côté agence, une mission devient disponible pour assignation — ouvrez{' '}
        <GLink to="missions">Missions</GLink>, filtrez <Btn>En attente</Btn>, ouvrez la
        ligne, puis <Btn>Assigner un livreur</Btn> (
        <GLink to="missions" hash="assigner">détail</GLink>).
      </P>
      <P>
        <strong>Si vous cliquez Refuser :</strong> une boîte de dialogue demande le{' '}
        <Field>Motif du refus :</Field>. Saisissez un motif clair (adresse incomplète,
        hors zone…) puis validez. La demande sort de la file ; le client voit
        « Demande non retenue ». Prévenez-le au comptoir si besoin.
      </P>

      <H2 id="modes">Domicile ou point relais — impact ensuite</H2>
      <Ul>
        <li>
          <strong>Direct / domicile :</strong> le livreur devra faire un POD à l’adresse
          (<GLink to="vue-livreur" hash="pod">Confirmer livraison</GLink>).
        </li>
        <li>
          <strong>Point relais :</strong> le livreur fera un{' '}
          <GLink to="vue-livreur" hash="hub">Dépôt au hub</GLink> ; le destinataire
          retire ; vous pouvez aussi <Btn>Enregistrer le retrait</Btn> depuis le détail
          mission ou les <GLink to="hubs">Hubs</GLink>.
        </li>
      </Ul>
      <Callout tone="tip">
        Enchaînement global : après dépôt/approbation → assignation → terrain → finance.
        Voir <GLink to="workflow-complet">Workflow complet</GLink>.
      </Callout>
    </>
  )
}

export function SuiviColis() {
  return (
    <>
      <H2 id="ouvrir">Ouvrir le suivi</H2>
      <Path>
        Site public → « Je suis un colis » / <Btn>Suivre un colis</Btn>. Pas de login
        staff. Titre du type <strong>Suivre mon colis</strong>.
      </Path>
      <P>
        <strong>Ce que vous voyez :</strong> un champ code, le bouton{' '}
        <Btn>Rechercher</Btn>, un lien <Btn>Déposer un colis</Btn>, et tant qu’aucun
        code n’est cherché : le message d’invitation à saisir un code.
      </P>

      <H2 id="rechercher">Rechercher un colis</H2>
      <Steps
        items={[
          {
            title: 'Saisir le code',
            body: (
              <>
                Collez le code du reçu (placeholder du style{' '}
                <Field>ex : TRK-…</Field>). Sans code, la recherche ne donne rien
                d’utile.
              </>
            ),
          },
          {
            title: 'Cliquer Rechercher',
            body: (
              <>
                Un chargement peut apparaître. <strong>Si le code est bon :</strong> la
                fiche colis se déploie sous le champ (statut, destinataire, timeline,
                hub éventuel). <strong>Si le code est faux / inconnu :</strong> un message
                d’erreur ou une fiche vide — revérifiez le code avec le reçu.
              </>
            ),
          },
          {
            title: 'Ensuite sur la fiche',
            body: (
              <>
                Utilisez <Btn>Copier</Btn> (devient brièvement « Copié ») pour le code, ou{' '}
                <Btn>Partager</Btn> pour envoyer le lien. Pour une nouvelle expédition :{' '}
                <Btn>Déposer un colis</Btn> ouvre le formulaire décrit dans{' '}
                <GLink to="depot-client" hash="formulaire-qr">Dépôt client</GLink>.
              </>
            ),
          },
        ]}
      />

      <H2 id="carte">Lire la fiche colis</H2>
      <P>
        De haut en bas, vous lisez en général : le code, le destinataire, le statut
        actuel (pastille colorée), la timeline des étapes de la mission si elle est
        liée, puis le bloc hub (nom, adresse, horaires, délai de retrait) quand le
        colis est en point relais.
      </P>
      <P>
        <strong>Rien à « valider » ici</strong> pour un simple suivi : la page est en
        lecture. Les actions staff (retrait, assignation) se font dans l’app agence /
        livreur, pas sur cet écran public.
      </P>

      <H2 id="statuts">Comprendre les statuts</H2>
      <Ul>
        <li><StatusChip>Déposé au hub — en attente de retrait</StatusChip> — le destinataire doit venir au hub indiqué.</li>
        <li><StatusChip>Retiré par le destinataire</StatusChip> — terminé côté hub.</li>
        <li><StatusChip>Délai de retrait dépassé</StatusChip> — contacter l’agence ; le colis peut être retourné.</li>
        <li><StatusChip>Retourné à l’agence</StatusChip> — récupération / traitement côté staff.</li>
      </Ul>
      <P>
        Sur la timeline mission, les étapes se cochent au fur et à mesure (enregistrée →
        assignée → en livraison → relais / livré). Les étapes grises sont encore à venir.
      </P>

      <H2 id="hub">Retrait au hub</H2>
      <P>
        Si le statut indique un dépôt hub, notez le nom et l’adresse du hub sur la fiche.
        Présentez-vous avec une pièce et le code. Côté agence, l’agent peut confirmer le
        retrait : détail mission → <Btn>Enregistrer le retrait</Btn> → une invite demande
        le <Field>Nom de la personne qui retire le colis :</Field> → après validation,
        toast de succès et statut mis à jour ; le suivi public reflète « Retiré ».
      </P>

      <H2 id="reclamation">Déposer une réclamation — pas à pas</H2>
      <Steps
        items={[
          {
            title: 'Ouvrir',
            body: (
              <>
                Sur une fiche trouvée, si le bouton est proposé, cliquez{' '}
                <Btn>Signaler un problème</Btn>.{' '}
                <strong>Vous voyez :</strong> le panneau / formulaire « Déposer une
                réclamation » (type, email, description) avec <Btn>Annuler</Btn> et{' '}
                <Btn>Envoyer</Btn>.
              </>
            ),
          },
          {
            title: 'Remplir puis envoyer',
            body: (
              <>
                Choisissez un <Field>Type</Field> (endommagé, perdu, retard, autre),
                laissez un <Field>Email de contact</Field> joignable, décrivez le
                problème, puis <Btn>Envoyer</Btn>.
              </>
            ),
          },
          {
            title: 'Après envoi',
            body: (
              <>
                Un accusé / confirmation s’affiche (contact sous 48 h selon le texte à
                l’écran). Côté agence, le dossier apparaît dans{' '}
                <GLink to="litiges">Litiges clients</GLink> : l’équipe ouvre le détail
                (lecture) et traite hors de cet écran public. Ce n’est{' '}
                <em>pas</em> une contestation de{' '}
                <GLink to="commissions">commission</GLink> livreur.
              </>
            ),
          },
        ]}
      />
    </>
  )
}
