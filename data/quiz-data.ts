export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const quizData: Quiz[] = [
  {
    id: "Histoire",
    title: "Quiz de l'histoire des idées et de l'art",
    description:
      'Test your knowledge of French history of ideas and art during key periods like the Renaissance and the Enlightenment.',
    questions: [
      {
        question:
          'Quel mouvement culturel marque la redécouverte des textes antiques au XVe siècle ?',
        options: [
          "L'Humanisme",
          'Le Romantisme',
          'Le Baroque',
          'Le Surréalisme',
        ],
        correctAnswer: "L'Humanisme",
      },
      {
        question: 'Quel est le siècle de la Renaissance en France ?',
        options: ['XIVe siècle', 'XVe siècle', 'XVIe siècle', 'XVIIe siècle'],
        correctAnswer: 'XVIe siècle',
      },
      {
        question:
          "Quel philosophe italien est considéré comme un des fondateurs de l'Humanisme ?",
        options: ['Pétrarque', 'Machiavel', 'Dante', 'Galilée'],
        correctAnswer: 'Pétrarque',
      },
      {
        question:
          'Quelle invention a permis une large diffusion des idées humanistes ?',
        options: [
          "L'imprimerie",
          'Le microscope',
          'Le télescope',
          'La boussole',
        ],
        correctAnswer: "L'imprimerie",
      },
      {
        question:
          'Quel roi français est associé au mécénat des arts pendant la Renaissance ?',
        options: ['Louis XIV', 'François Ier', 'Henri IV', 'Charles V'],
        correctAnswer: 'François Ier',
      },
      {
        question:
          "Quel est l'ouvrage célèbre de Thomas More, emblématique de la pensée utopique ?",
        options: [
          'Le Prince',
          'Utopia',
          'Discours de la méthode',
          'Le Contrat social',
        ],
        correctAnswer: 'Utopia',
      },
      {
        question:
          "Quel mouvement religieux remet en cause l'Église catholique au XVIe siècle ?",
        options: [
          'La Contre-Réforme',
          'Le Protestantisme',
          'Le Catholicisme',
          'Le Calvinisme',
        ],
        correctAnswer: 'Le Protestantisme',
      },
      {
        question:
          "Qui est l'auteur du 'Prince', manuel politique de la Renaissance ?",
        options: ['Machiavel', 'Erasme', 'Montaigne', 'Rabelais'],
        correctAnswer: 'Machiavel',
      },
      {
        question: "Que valorise particulièrement l'humanisme ?",
        options: [
          'La foi aveugle',
          'La nature',
          'La raison humaine',
          'La guerre',
        ],
        correctAnswer: 'La raison humaine',
      },
      {
        question:
          "Comment s'appelle le mouvement artistique qui se développe en Italie pendant la Renaissance ?",
        options: [
          'Le Cubisme',
          'Le Gothique',
          'La Renaissance artistique',
          'Le Rococo',
        ],
        correctAnswer: 'La Renaissance artistique',
      },
      {
        question:
          "Quel philosophe français du XVIe siècle est célèbre pour ses 'Essais' ?",
        options: ['Voltaire', 'Descartes', 'Montaigne', 'Pascal'],
        correctAnswer: 'Montaigne',
      },
      {
        question:
          'Dans quelle ville Léonard de Vinci passe-t-il les dernières années de sa vie ?',
        options: ['Florence', 'Rome', 'Paris', 'Amboise'],
        correctAnswer: 'Amboise',
      },
      {
        question: "Quelle valeur devient centrale avec l'Humanisme ?",
        options: [
          'La soumission',
          "L'individualisme",
          'La tradition',
          'La hiérarchie',
        ],
        correctAnswer: "L'individualisme",
      },
      {
        question:
          "Quel auteur français incarne la critique de la société dans 'Gargantua' et 'Pantagruel' ?",
        options: ['Montaigne', 'Rabelais', 'Descartes', 'Rousseau'],
        correctAnswer: 'Rabelais',
      },
      {
        question:
          'Quel événement marque symboliquement la fin du Moyen Âge et le début de la Renaissance ?',
        options: [
          'La chute de Constantinople',
          "La découverte de l'Amérique",
          'La Guerre de Cent Ans',
          'La Réforme',
        ],
        correctAnswer: 'La chute de Constantinople',
      },
      {
        question:
          'Quelle discipline est particulièrement encouragée par les humanistes ?',
        options: [
          'La théologie',
          'La médecine',
          'La philologie',
          "L'astrologie",
        ],
        correctAnswer: 'La philologie',
      },
      {
        question:
          'Quel terme désigne la peinture de la vie quotidienne, née à la Renaissance ?',
        options: [
          'La fresque',
          'Le portrait',
          'La scène de genre',
          'Le vitrail',
        ],
        correctAnswer: 'La scène de genre',
      },
      {
        question:
          "Quel philosophe est associé au doute méthodique et au 'Cogito, ergo sum' ?",
        options: ['Rousseau', 'Pascal', 'Descartes', 'Montaigne'],
        correctAnswer: 'Descartes',
      },
      {
        question:
          'Quel courant du XVIIIe siècle valorise la raison, la science et la liberté ?',
        options: [
          'Le Romantisme',
          'Les Lumières',
          'Le Naturalisme',
          "L'Absolutisme",
        ],
        correctAnswer: 'Les Lumières',
      },
      {
        question:
          "Quel est le but des 'utopies' écrites pendant la Renaissance ?",
        options: [
          'Décrire des sociétés idéales',
          'Critiquer la monarchie',
          'Encourager les croisades',
          'Glorifier la féodalité',
        ],
        correctAnswer: 'Décrire des sociétés idéales',
      },
    ],
  },

  {
    id: 'Morphosyntaxe',
    title: 'Quiz de Morphosyntaxe',
    description:
      "Testez vos connaissances sur la morphologie et la syntaxe françaises, essentielles à l'étude de la langue.",
    questions: [
      {
        question: "Qu'est-ce qu'un morphème ?",
        options: [
          'Un groupe de mots ayant un sens complet',
          'La plus petite unité de sens',
          'Une phrase complexe',
          'Un type de verbe conjugué',
        ],
        correctAnswer: 'La plus petite unité de sens',
      },
      {
        question: "Dans le mot 'chanteur', que représente '-eur' ?",
        options: ['Un préfixe', 'Un radical', 'Un suffixe', 'Un pronom'],
        correctAnswer: 'Un suffixe',
      },
      {
        question:
          'Quel est l’ordre classique des constituants dans une phrase déclarative en français ?',
        options: [
          'Verbe - Sujet - Complément',
          'Complément - Sujet - Verbe',
          'Sujet - Verbe - Complément',
          'Sujet - Complément - Verbe',
        ],
        correctAnswer: 'Sujet - Verbe - Complément',
      },
      {
        question: "Quel terme désigne la catégorie grammaticale d'un mot ?",
        options: [
          'Sa flexion',
          'Sa fonction',
          'Sa nature',
          'Son rôle syntaxique',
        ],
        correctAnswer: 'Sa nature',
      },
      {
        question: "Le mot 'rapidement' est un exemple de :",
        options: ['Nom', 'Adjectif', 'Adverbe', 'Pronom'],
        correctAnswer: 'Adverbe',
      },
      {
        question:
          "Quelle fonction syntaxique occupe 'le livre' dans la phrase 'Je lis le livre' ?",
        options: [
          'Sujet',
          'Attribut du sujet',
          "Complément d'objet direct",
          'Complément circonstanciel',
        ],
        correctAnswer: "Complément d'objet direct",
      },
      {
        question:
          "Qu'est-ce qu'une subordonnée relative introduite par 'qui' ?",
        options: [
          'Une proposition principale',
          "Un complément d'objet direct",
          'Un adjectif',
          'Une proposition subordonnée relative',
        ],
        correctAnswer: 'Une proposition subordonnée relative',
      },
      {
        question: "Quel est le rôle d'un déterminant dans une phrase ?",
        options: [
          'Il remplace le verbe',
          'Il qualifie un nom',
          'Il introduit un nom',
          'Il relie deux propositions',
        ],
        correctAnswer: 'Il introduit un nom',
      },
      {
        question: "Dans 'Elle est partie rapidement', quel est l'adverbe ?",
        options: ['Elle', 'Est', 'Partie', 'Rapidement'],
        correctAnswer: 'Rapidement',
      },
      {
        question: 'Lequel de ces mots est un pronom personnel sujet ?',
        options: ['Le', 'Lui', 'Nous', 'Que'],
        correctAnswer: 'Nous',
      },
      {
        question:
          "Comment appelle-t-on un verbe qui n'a pas besoin de complément d'objet ?",
        options: [
          'Un verbe transitif',
          'Un verbe pronominal',
          'Un verbe intransitif',
          'Un verbe réfléchi',
        ],
        correctAnswer: 'Un verbe intransitif',
      },
      {
        question: "Dans la phrase 'Je mange une pomme', quel est le verbe ?",
        options: ['Je', 'Mange', 'Pomme', 'Une'],
        correctAnswer: 'Mange',
      },
      {
        question: "Que désigne le terme 'flexion' en morphologie ?",
        options: [
          'La création de mots nouveaux',
          'La variation des mots selon leur fonction grammaticale',
          "La suppression d'un mot",
          'La fusion de deux mots',
        ],
        correctAnswer: 'La variation des mots selon leur fonction grammaticale',
      },
      {
        question: "Quel est l'infinitif du verbe conjugué 'prendront' ?",
        options: ['Prendre', 'Prendrez', 'Pris', 'Prenant'],
        correctAnswer: 'Prendre',
      },
      {
        question: "Quelle est la nature du mot 'beaucoup' ?",
        options: ['Nom', 'Adverbe', 'Adjectif', 'Préposition'],
        correctAnswer: 'Adverbe',
      },
      {
        question:
          "Dans 'Le chat que j'ai vu dort', quel est le rôle de 'que' ?",
        options: [
          'Conjonction de coordination',
          'Pronom relatif',
          'Déterminant',
          'Préposition',
        ],
        correctAnswer: 'Pronom relatif',
      },
      {
        question: 'Quelle est la différence entre syntaxe et morphologie ?',
        options: [
          'La syntaxe étudie la structure des mots ; la morphologie étudie leur assemblage',
          "La syntaxe étudie l'assemblage des mots ; la morphologie étudie leur structure interne",
          'La syntaxe est une branche de la morphologie',
          'La syntaxe étudie uniquement les verbes',
        ],
        correctAnswer:
          "La syntaxe étudie l'assemblage des mots ; la morphologie étudie leur structure interne",
      },
      {
        question:
          'Comment appelle-t-on un mot qui peut être modifié en genre et en nombre ?',
        options: ['Invariable', 'Variable', 'Nom propre', 'Adverbe'],
        correctAnswer: 'Variable',
      },
      {
        question:
          "Dans 'Marie lit un roman', quelle est la fonction de 'Marie' ?",
        options: [
          "Complément d'objet",
          'Complément circonstanciel',
          'Sujet',
          'Attribut du sujet',
        ],
        correctAnswer: 'Sujet',
      },
      {
        question: "Quel type de mot est 'et' dans 'Paul et Marie étudient' ?",
        options: [
          'Conjonction de coordination',
          'Pronom',
          'Adverbe',
          'Adjectif',
        ],
        correctAnswer: 'Conjonction de coordination',
      },
    ],
  },

  {
    id: "Lexicologie",
    title: "Quiz de lexicologie",
    description: "Test your knowledge of French words, roots, and vocabulary structures.",
    questions: [
      {
        question: "Que signifie le préfixe 'in-' dans 'invisible' ?",
        options: ["À l'intérieur", "Pas", "Très", "Sous"],
        correctAnswer: "Pas",
      },
      {
        question: "Quel est le radical du mot 'chanteur' ?",
        options: ["Chant", "Chanter", "Chante", "Chanteur"],
        correctAnswer: "Chant",
      },
      {
        question: "Que signifie le suffixe '-able' dans 'adorable' ?",
        options: ["Capable de", "Négatif", "Rapide", "Petit"],
        correctAnswer: "Capable de",
      },
      {
        question: "Quel est le champ lexical du mot 'joie' ?",
        options: ["Tristesse", "Bonheur", "Maladie", "Peine"],
        correctAnswer: "Bonheur",
      },
      {
        question: "Quel mot est formé par dérivation ?",
        options: ["Maison", "Maçon", "Inquiet", "Inquiétude"],
        correctAnswer: "Inquiétude",
      },
      {
        question: "Quelle est la nature du mot 'rapidement' ?",
        options: ["Adverbe", "Nom", "Adjectif", "Verbe"],
        correctAnswer: "Adverbe",
      },
      {
        question: "Dans quel mot trouve-t-on le préfixe 're-' ?",
        options: ["Rencontrer", "Compter", "Entrer", "Décider"],
        correctAnswer: "Rencontrer",
      },
      {
        question: "Le mot 'bibliothèque' est formé à partir de racines provenant de quelle langue ?",
        options: ["Latin", "Grec", "Arabe", "Hébreu"],
        correctAnswer: "Grec",
      },
      {
        question: "Quel mot est un synonyme de 'rapide' ?",
        options: ["Lent", "Vif", "Fixe", "Stable"],
        correctAnswer: "Vif",
      },
      {
        question: "Quelle est l'opposition sémantique de 'clair' ?",
        options: ["Lumineux", "Opaque", "Sombre", "Brillant"],
        correctAnswer: "Sombre",
      },
      {
        question: "Le mot 'impossible' contient :",
        options: ["Un suffixe et un radical", "Un préfixe et un suffixe", "Un radical et un préfixe", "Seulement un radical"],
        correctAnswer: "Un radical et un préfixe",
      },
      {
        question: "Dans 'biologie', que signifie le préfixe 'bio-' ?",
        options: ["Terre", "Vie", "Eau", "Soleil"],
        correctAnswer: "Vie",
      },
      {
        question: "Le mot 'écriture' appartient au champ lexical de :",
        options: ["La lecture", "La parole", "La peinture", "L'éducation"],
        correctAnswer: "La lecture",
      },
      {
        question: "Quel mot appartient au même champ lexical que 'peur' ?",
        options: ["Terreur", "Amour", "Colère", "Joie"],
        correctAnswer: "Terreur",
      },
      {
        question: "Que signifie le suffixe '-logue' dans 'psychologue' ?",
        options: ["Étude", "Maladie", "Groupe", "Vie"],
        correctAnswer: "Étude",
      },
      {
        question: "Que signifie le préfixe 'pré-' dans 'préhistoire' ?",
        options: ["Après", "Pendant", "Avant", "En dehors"],
        correctAnswer: "Avant",
      },
      {
        question: "Quel mot est formé par composition ?",
        options: ["Beau", "Bateau", "Portemanteau", "Maître"],
        correctAnswer: "Portemanteau",
      },
      {
        question: "Le mot 'inoubliable' contient :",
        options: ["Un préfixe", "Un suffixe", "Un préfixe et un suffixe", "Aucun affixe"],
        correctAnswer: "Un préfixe et un suffixe",
      },
      {
        question: "Quel est le contraire de 'actif' ?",
        options: ["Réactif", "Inactif", "Attractif", "Captif"],
        correctAnswer: "Inactif",
      },
      {
        question: "Le mot 'télévision' est formé de racines signifiant :",
        options: ["Voir de loin", "Écouter de près", "Parler vite", "Écrire de loin"],
        correctAnswer: "Voir de loin",
      },
    ],
  }
  
];
