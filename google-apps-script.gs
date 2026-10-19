/**
 * Réception des réponses du questionnaire « Pass 1 match » (test A/B) dans un Google Sheet.
 * À coller dans le Sheet : Extensions > Apps Script, à la place du code existant.
 */
const NOM_ONGLET = 'Réponses';

// Ordre des colonnes = ordre des questions. Une donnée reçue qui n'est pas dans cette liste
// est ajoutée automatiquement en nouvelle colonne à droite (rien n'est jamais perdu).
const COLONNES = [
  'horodatage', 'version',
  'frequence_sport', 'sport_foot', 'sport_f1', 'sport_rugby',
  'abo_actuel', 'abo_passe', 'motif_arret',
  'vw_trop_bas', 'vw_bon_marche', 'vw_cher', 'vw_trop_cher',
  'gabor_granger_max_accepte',
  'qualite_1', 'qualite_2', 'qualite_3', 'qualite_4',
  'valeur_1', 'valeur_2', 'valeur_3', 'valeur_4',
  'risque_1', 'risque_2', 'risque_3', 'risque_4',
  'intention_1', 'intention_2', 'intention_3',
  'manipulation_check',
  'age', 'situation', 'genre', 'piege_attention'
];

// À lancer une fois à la main (bouton « Exécuter ») : crée l'onglet, les en-têtes,
// et fait apparaître la demande d'autorisation d'accès au Sheet.
function initialiser() {
  getOnglet_();
}

function doPost(e) {
  const verrou = LockService.getScriptLock();
  verrou.waitLock(10000); // deux réponses envoyées en même temps ne s'écrasent pas
  try {
    const onglet = getOnglet_();
    const params = e.parameter;

    let entetes = onglet.getRange(1, 1, 1, onglet.getLastColumn()).getValues()[0];
    const nouvelles = Object.keys(params).filter(cle => !entetes.includes(cle));
    if (nouvelles.length) {
      onglet.getRange(1, entetes.length + 1, 1, nouvelles.length).setValues([nouvelles]);
      entetes = entetes.concat(nouvelles);
    }

    const ligne = entetes.map(cle => cle === 'horodatage' ? new Date() : enValeur_(params[cle]));
    onglet.getRange(onglet.getLastRow() + 1, 1, 1, ligne.length).setValues([ligne]);
    return reponse_({ result: 'success' });
  } catch (err) {
    return reponse_({ result: 'error', error: String(err) });
  } finally {
    verrou.releaseLock();
  }
}

function getOnglet_() {
  const classeur = SpreadsheetApp.getActiveSpreadsheet();
  const onglet = classeur.getSheetByName(NOM_ONGLET) || classeur.insertSheet(NOM_ONGLET);
  if (onglet.getLastRow() === 0) {
    onglet.appendRow(COLONNES);
    onglet.setFrozenRows(1);
  }
  return onglet;
}

// Les nombres (prix « 5.99 », notes Likert, âge) sont enregistrés comme de vrais nombres :
// sinon un Sheet en français peut lire « 5.99 » comme du texte ou une date.
function enValeur_(valeur) {
  if (valeur === undefined) return '';
  return /^-?\d+(\.\d+)?$/.test(valeur) ? Number(valeur) : valeur;
}

function reponse_(objet) {
  return ContentService.createTextOutput(JSON.stringify(objet))
    .setMimeType(ContentService.MimeType.JSON);
}
