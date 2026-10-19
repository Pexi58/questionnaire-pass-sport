# Questionnaire A/B : le « Pass 1 match »

**Lien du questionnaire : https://pexi58.github.io/questionnaire-pass-sport/**

Questionnaire en ligne réalisé dans le cadre du cours *Prix et budget marketing*. Il présente une offre fictive, le « Pass 1 match » : un pass sans abonnement pour regarder un seul match ou une seule course en direct. Il mesure ensuite le prix que les répondants sont prêts à payer et leur perception de l'offre.

> L'offre est fictive et Canal+ n'est pas associé à cette étude. Les réponses sont anonymes.

## Le test A/B

L'objectif est de mesurer l'effet de la marque sur le prix accepté et sur la perception de l'offre. Chaque répondant voit une seule des deux versions de l'offre :

| | Version A : avec la marque | Version B : sans la marque |
|---|---|---|
| Logo | Logo Canal+ | Aucun |
| Titre | Le Pass 1 match Canal+ | Le Pass 1 match |
| Première phrase | *Canal+* lance un pass sans engagement… | *Une plateforme de streaming* lance un pass sans engagement… |

Le reste du questionnaire est identique dans les deux versions. Aucune question ne cite la marque, sauf la Q10, posée après toutes les questions sur la perception de l'offre.

**Tirage au sort.** La version est tirée au hasard, à 50/50, à la première visite. Elle reste ensuite enregistrée dans le navigateur : recharger la page ne fait pas changer de version. Un test sur le site en ligne, avec 200 nouveaux visiteurs simulés, a donné 93 A et 107 B. Cet écart est normal avec un tirage au hasard.

**Pour tester une version précise**, ajoute `?version=A` ou `?version=B` à la fin du lien. Ne diffuse que le lien sans ce paramètre, sinon tout le monde tombe sur la même version.

## Déroulé du questionnaire (environ 5 minutes)

1. **Votre rapport au sport** : fréquence (Q1), sports regardés (Q2), abonnements actuels et passés (Q3 à Q5).
2. **L'offre** : présentation de la version A ou B.
3. **Estimation du prix** (méthode de Van Westendorp) : prix « trop bas », « bonne affaire », « cher » et « trop cher » (Q6a à Q6d). Les réponses incohérentes sont bloquées.
4. **Intention d'achat** (méthode Gabor-Granger) : « Achèteriez-vous ce pass à X € ? ». Le prix monte à chaque « oui » : 3,99 €, 5,99 €, 7,99 €, 10,99 €, 14,99 € puis 21,99 €.
5. **Perception de l'offre** : échelles de Likert en 7 points tirées de la littérature scientifique (voir le tableau ci-dessous).
6. **Votre profil** : âge, situation, genre, et une question pour vérifier l'attention (Q11 à Q14).

| Question | Ce qui est mesuré | Items | Source |
|---|---|---|---|
| Q8 | Qualité perçue | 4 | Dodds, Monroe & Grewal (1991) |
| Q8 | Valeur perçue | 4 | Netemeyer et al. (2004), version adaptée au sport par Shapiro et al. (2019) |
| Q9a | Risque financier perçu | 4 | Shapiro, Reams & So (2019) |
| Q9b | Intention d'achat | 3 | Dodds et al. (1991), version de Shapiro et al. (2019) |
| Q10 | Pertinence de la marque : « Je trouverais pertinent que la marque Canal+ propose ce service de streaming » | 1 | — |

## Les données (Google Sheet)

Chaque réponse est envoyée dans un Google Sheet, dans l'onglet « Réponses », avec une ligne par répondant. Le code qui reçoit les réponses est dans [`google-apps-script.gs`](google-apps-script.gs). Il est installé dans le Sheet (Extensions > Apps Script).

| Colonne | Question | Contenu |
|---|---|---|
| `horodatage` | — | Date et heure de la réponse |
| `version` | — | `A` (avec Canal+) ou `B` (sans marque) |
| `frequence_sport` | Q1 | De « Jamais » à « Tous les jours » |
| `sport_foot`, `sport_f1`, `sport_rugby` | Q2 | De 1 (jamais) à 6 (systématiquement) |
| `abo_actuel` | Q3 | Abonnements cochés, séparés par des virgules |
| `abo_passe` | Q4 | Oui / Non |
| `motif_arret` | Q5 | Texte libre |
| `vw_trop_bas`, `vw_bon_marche`, `vw_cher`, `vw_trop_cher` | Q6a à Q6d | Prix en euros |
| `gabor_granger_max_accepte` | Partie 4 | Prix le plus élevé accepté (0 = refus dès 3,99 €) |
| `qualite_1` à `qualite_4` | Q8 | De 1 (pas du tout d'accord) à 7 (tout à fait d'accord) |
| `valeur_1` à `valeur_4` | Q8 | De 1 à 7 |
| `risque_1` à `risque_4` | Q9a | De 1 (pas du tout risqué) à 7 (très risqué) |
| `intention_1` à `intention_3` | Q9b | De 1 à 7 |
| `manipulation_check` | Q10 | Pertinence de Canal+ pour ce service, de 1 à 7 |
| `age` | Q11 | Âge en années |
| `situation` | Q12 | Etudiant / Actif / Sans emploi / Retraite |
| `genre` | Q13 | Femme / Homme / Autre / NSP |
| `piege_attention` | Q14 | Bonne réponse : « Souvent » |

### Pistes pour l'analyse

1. **Écarter les réponses non attentives** : supprimer les lignes où `piege_attention` n'est pas « Souvent ».
2. **Pertinence de la marque (Q10)** : comparer `manipulation_check` entre A et B pour voir si Canal+ paraît légitime pour proposer ce pass. Cette question ne vérifie pas que les répondants ont remarqué la marque en version A.
3. **Calculer un score par échelle** : faire la moyenne des items (par exemple `qualite_1` à `qualite_4`). Vérifier la fiabilité avec l'alpha de Cronbach, qui doit être d'au moins 0,7.
4. **Comparer A et B** sur la qualité, la valeur, le risque, l'intention, les prix de Van Westendorp et le prix maximum Gabor-Granger (test t ou test de Mann-Whitney).

## Mettre à jour le site

1. Modifier `index.html`.
2. Double-cliquer sur `envoyer-sur-github.cmd`.
3. Le site se met à jour une ou deux minutes après.

Après une modification du script Google, il faut le redéployer : Déployer > Gérer les déploiements > Modifier > Nouvelle version. L'adresse du script reste la même.

## Références

- Dodds, W. B., Monroe, K. B., & Grewal, D. (1991). Effects of price, brand, and store information on buyers' product evaluations. *Journal of Marketing Research, 28*(3), 307–319.
- Netemeyer, R. G., Krishnan, B., Pullig, C., Wang, G., Yagci, M., Dean, D., Ricks, J., & Wirth, F. (2004). Developing and validating measures of facets of customer-based brand equity. *Journal of Business Research, 57*, 209–224. https://doi.org/10.1016/S0148-2963(01)00303-4
- Shapiro, S. L., Reams, L., & So, K. K. F. (2019). Is it worth the price? The role of perceived financial risk, identification, and perceived value in purchasing pay-per-view broadcasts of combat sports. *Sport Management Review, 22*, 235–246. https://doi.org/10.1016/j.smr.2018.03.002
