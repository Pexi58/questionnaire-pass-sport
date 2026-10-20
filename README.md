# Questionnaire A/B : le « Pass 1 match »

**Lien du questionnaire : https://pexi58.github.io/questionnaire-pass-sport/**

Questionnaire en ligne réalisé dans le cadre du cours *Prix et budget marketing* (Master 1 Marketing-Vente, IAE Clermont-Auvergne). Il présente une offre fictive, le « Pass 1 match » : un Pass Sport sans abonnement, valable pour un seul match ou un seul Grand Prix en direct. Il mesure ensuite si les répondants achèteraient ce pass et à quel prix.

> L'offre est fictive. Les réponses sont anonymes.

## Le test A/B

L'objectif est de mesurer l'effet de la marque sur l'intention d'achat et sur le prix accepté. Chaque répondant voit une seule des deux versions de l'offre :

| | Version A : avec la marque | Version B : sans la marque |
|---|---|---|
| Logo | Logo Canal+ | Aucun |
| Titre | Le Pass 1 match Canal+ | Le Pass 1 match |
| Texte | Bénéficiez d'un Pass Sport *sur CANAL+*, valable uniquement pour 1 match ou 1 Grand Prix… | Bénéficiez d'un Pass Sport *sur un site de streaming*, valable uniquement pour 1 match ou 1 Grand Prix… |

Le reste du questionnaire est identique dans les deux versions. Le groupe B voit le nom Canal+ uniquement dans les listes d'abonnements des Q3 et Q4, au milieu des autres offres et avant la présentation du pass.

**Tirage au sort.** La version est tirée au hasard, à 50/50, à la première visite. Elle reste ensuite enregistrée dans le navigateur : recharger la page ne fait pas changer de version. Un test sur le site en ligne, avec 200 nouveaux visiteurs simulés, a donné 93 A et 107 B. Cet écart est normal avec un tirage au hasard.

**Pour tester une version précise**, ajoute `?version=A` ou `?version=B` à la fin du lien. Ne diffuse que le lien sans ce paramètre, sinon tout le monde tombe sur la même version.

## Déroulé du questionnaire (environ 3 minutes)

1. **Votre rapport au sport** : fréquence (Q1), sports regardés (Q2 : football, Formule 1, rugby, tennis, MotoGP, basket et un autre sport au choix), abonnements actuels (Q3) et passés (Q4).
2. **L'offre** : présentation de la version A ou B.
3. **Prix et perception de l'offre** :
   - Q5 : « Seriez-vous prêt(e) à acheter ce pass ? » (Oui / Non) ;
   - Q6a à Q6d : méthode de Van Westendorp, avec les prix « trop bas », « bonne affaire », « cher » et « trop cher ». Les réponses incohérentes sont bloquées ;
   - Q7 : méthode Gabor-Granger, « Achèteriez-vous ce pass à X € ? ». Le prix monte à chaque « oui » : 3,99 €, 5,99 €, 7,99 €, 10,99 €, 14,99 € puis 21,99 €.
4. **Votre profil** : âge (Q8), situation (Q9), genre (Q10), et une question pour vérifier l'attention (Q11).

## Les données (Google Sheet)

Chaque réponse est envoyée dans un Google Sheet, avec une ligne par répondant. Depuis la nouvelle version du questionnaire, les réponses arrivent dans l'onglet « Réponses v2 », créé automatiquement. L'ancien onglet « Réponses » contient les réponses à l'ancienne version. Le code qui reçoit les réponses est dans [`google-apps-script.gs`](google-apps-script.gs). Il est installé dans le Sheet (Extensions > Apps Script).

| Colonne | Question | Contenu |
|---|---|---|
| `horodatage` | — | Date et heure de la réponse |
| `version` | — | `A` (avec Canal+) ou `B` (sans marque) |
| `frequence_sport` | Q1 | De « Jamais » à « Tous les jours » |
| `sport_foot`, `sport_f1`, `sport_rugby`, `sport_tennis`, `sport_motogp`, `sport_basket` | Q2 | De 1 (jamais) à 6 (systématiquement) |
| `sport_autre_nom`, `sport_autre` | Q2 | Autre sport cité (facultatif) et sa fréquence, de 1 à 6 |
| `abo_actuel` | Q3 | Abonnements actuels cochés, séparés par des virgules |
| `abo_actuel_autre` | Q3 | Précision si « Autre » est coché |
| `abo_passe` | Q4 | Abonnements passés cochés, séparés par des virgules |
| `abo_passe_autre` | Q4 | Précision si « Autre » est coché |
| `intention_achat` | Q5 | Oui / Non |
| `vw_trop_bas`, `vw_bon_marche`, `vw_cher`, `vw_trop_cher` | Q6a à Q6d | Prix en euros |
| `gabor_granger_max_accepte` | Q7 | Prix le plus élevé accepté (0 = refus dès 3,99 €) |
| `age` | Q8 | Âge en années |
| `situation` | Q9 | Etudiant / Actif / Sans emploi / Retraite / Autre |
| `genre` | Q10 | Femme / Homme / Autre / NSP |
| `piege_attention` | Q11 | Bonne réponse : « Souvent » |

### Pistes pour l'analyse

1. **Écarter les réponses non attentives** : supprimer les lignes où `piege_attention` n'est pas « Souvent ».
2. **Intention d'achat (Q5)** : comparer la part de « Oui » entre A et B (test du khi-deux).
3. **Van Westendorp (Q6)** : tracer les quatre courbes pour chaque groupe et comparer les fourchettes de prix acceptables de A et de B.
4. **Gabor-Granger (Q7)** : pour chaque prix, calculer la part de répondants qui l'acceptent, dans chaque groupe. On obtient une courbe de demande pour A et une pour B. Comparer aussi le prix maximum accepté (test de Mann-Whitney).

## Mettre à jour le site

1. Modifier `index.html`.
2. Double-cliquer sur `envoyer-sur-github.cmd`.
3. Le site se met à jour une ou deux minutes après.

Après une modification du script Google, il faut le redéployer : Déployer > Gérer les déploiements > Modifier > Nouvelle version. L'adresse du script reste la même.
