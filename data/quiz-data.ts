export interface Question {
    question: string
    options: string[]
    correctAnswer: string
  }
  
  export interface Quiz {
    id: string
    title: string
    description: string
    questions: Question[]
  }
  
  export const quizData: Quiz[] = [
    {
      id: "vocabulary",
      title: "French Vocabulary Quiz",
      description: "Test your knowledge of essential French vocabulary across various topics.",
      questions: [
        {
          question: "What is 'une pomme' in English?",
          options: ["An apple", "A pear", "A banana", "An orange"],
          correctAnswer: "An apple",
        },
        {
          question: "What is 'un chat' in English?",
          options: ["A dog", "A cat", "A bird", "A fish"],
          correctAnswer: "A cat",
        },
        {
          question: "What is 'une maison' in English?",
          options: ["A house", "An apartment", "A building", "A room"],
          correctAnswer: "A house",
        },
        {
          question: "What is 'une voiture' in English?",
          options: ["A car", "A bus", "A train", "A bicycle"],
          correctAnswer: "A car",
        },
        {
          question: "What is 'un livre' in English?",
          options: ["A book", "A notebook", "A magazine", "A newspaper"],
          correctAnswer: "A book",
        },
        {
          question: "What is 'le pain' in English?",
          options: ["Bread", "Cake", "Pastry", "Cookie"],
          correctAnswer: "Bread",
        },
        {
          question: "What is 'l'eau' in English?",
          options: ["Water", "Wine", "Juice", "Milk"],
          correctAnswer: "Water",
        },
        {
          question: "What is 'la table' in English?",
          options: ["The table", "The chair", "The desk", "The bed"],
          correctAnswer: "The table",
        },
        {
          question: "What is 'le soleil' in English?",
          options: ["The sun", "The moon", "The star", "The sky"],
          correctAnswer: "The sun",
        },
        {
          question: "What is 'la lune' in English?",
          options: ["The moon", "The sun", "The star", "The planet"],
          correctAnswer: "The moon",
        },
        {
          question: "What is 'un arbre' in English?",
          options: ["A tree", "A flower", "A bush", "A plant"],
          correctAnswer: "A tree",
        },
        {
          question: "What is 'une fleur' in English?",
          options: ["A flower", "A leaf", "A petal", "A stem"],
          correctAnswer: "A flower",
        },
        {
          question: "What is 'un oiseau' in English?",
          options: ["A bird", "A bee", "A butterfly", "A bat"],
          correctAnswer: "A bird",
        },
        {
          question: "What is 'le poisson' in English?",
          options: ["Fish", "Chicken", "Beef", "Pork"],
          correctAnswer: "Fish",
        },
        {
          question: "What is 'la fenêtre' in English?",
          options: ["The window", "The door", "The wall", "The floor"],
          correctAnswer: "The window",
        },
        {
          question: "What is 'le téléphone' in English?",
          options: ["The telephone", "The television", "The computer", "The radio"],
          correctAnswer: "The telephone",
        },
        {
          question: "What is 'un stylo' in English?",
          options: ["A pen", "A pencil", "A marker", "A crayon"],
          correctAnswer: "A pen",
        },
        {
          question: "What is 'un ordinateur' in English?",
          options: ["A computer", "A printer", "A scanner", "A keyboard"],
          correctAnswer: "A computer",
        },
        {
          question: "What is 'le fromage' in English?",
          options: ["Cheese", "Butter", "Yogurt", "Cream"],
          correctAnswer: "Cheese",
        },
        {
          question: "What is 'le vin' in English?",
          options: ["Wine", "Beer", "Whiskey", "Vodka"],
          correctAnswer: "Wine",
        },
      ],
    },
    {
      id: "grammar",
      title: "French Grammar Quiz",
      description: "Challenge yourself with questions on French grammar rules and structures.",
      questions: [
        {
          question: "Which is the correct way to say 'I am' in French?",
          options: ["Je suis", "Tu es", "Il est", "Nous sommes"],
          correctAnswer: "Je suis",
        },
        {
          question: "What is the feminine form of 'petit'?",
          options: ["Petite", "Petits", "Petites", "Petit"],
          correctAnswer: "Petite",
        },
        {
          question: "Which article is used before feminine nouns?",
          options: ["La", "Le", "Les", "L'"],
          correctAnswer: "La",
        },
        {
          question: "How do you form the plural of most French nouns?",
          options: ["Add -s", "Add -x", "Add -ent", "No change"],
          correctAnswer: "Add -s",
        },
        {
          question: "Which is the correct way to say 'they have' in French?",
          options: ["Ils ont", "Ils sont", "Ils vont", "Ils font"],
          correctAnswer: "Ils ont",
        },
        {
          question: "What is the past participle of 'faire'?",
          options: ["Fait", "Faisant", "Faisait", "Faire"],
          correctAnswer: "Fait",
        },
        {
          question: "Which tense is used in 'J'ai mangé'?",
          options: ["Passé composé", "Imparfait", "Présent", "Futur simple"],
          correctAnswer: "Passé composé",
        },
        {
          question: "What is the correct negation of 'Je mange'?",
          options: ["Je ne mange pas", "Je mange ne pas", "Ne je mange pas", "Je pas mange"],
          correctAnswer: "Je ne mange pas",
        },
        {
          question: "Which pronoun replaces a direct object?",
          options: ["Le/La/Les", "Lui/Leur", "Y", "En"],
          correctAnswer: "Le/La/Les",
        },
        {
          question: "What is the correct form of 'this' for a masculine singular noun?",
          options: ["Ce", "Cette", "Ces", "Cet"],
          correctAnswer: "Ce",
        },
        {
          question: "Which preposition is used with countries that are feminine?",
          options: ["En", "Au", "Aux", "À"],
          correctAnswer: "En",
        },
        {
          question: "What is the correct way to form a question with inversion?",
          options: [
            "Parles-tu français?",
            "Tu parles français?",
            "Est-ce que tu parles français?",
            "Français tu parles?",
          ],
          correctAnswer: "Parles-tu français?",
        },
        {
          question: "Which is the correct comparative form of 'bon'?",
          options: ["Meilleur", "Plus bon", "Mieux", "Bien"],
          correctAnswer: "Meilleur",
        },
        {
          question: "What is the correct possessive adjective for 'her book' (livre is masculine)?",
          options: ["Son livre", "Sa livre", "Ses livre", "Leur livre"],
          correctAnswer: "Son livre",
        },
        {
          question: "Which is the correct way to say 'I would like' in French?",
          options: ["Je voudrais", "J'ai voulu", "Je veux", "Je voulais"],
          correctAnswer: "Je voudrais",
        },
        {
          question: "What is the correct form of the verb in 'Il faut que tu ___ (être) là'?",
          options: ["sois", "es", "est", "soit"],
          correctAnswer: "sois",
        },
        {
          question: "Which conjunction introduces a cause?",
          options: ["Parce que", "Pour que", "Afin que", "Bien que"],
          correctAnswer: "Parce que",
        },
        {
          question:
            "What is the correct relative pronoun to replace the underlined word: 'C'est le livre ____ j'ai acheté'?",
          options: ["que", "qui", "dont", "où"],
          correctAnswer: "que",
        },
        {
          question: "Which is the correct form of the imperative for 'Finir' (tu form)?",
          options: ["Finis", "Fini", "Finit", "Finies"],
          correctAnswer: "Finis",
        },
        {
          question: "What is the correct way to express 'I have been reading' in French?",
          options: [
            "Je lis depuis une heure",
            "J'ai lu depuis une heure",
            "Je lisais depuis une heure",
            "Je vais lire depuis une heure",
          ],
          correctAnswer: "Je lis depuis une heure",
        },
      ],
    },
    {
      id: "literature",
      title: "French Literature Quiz",
      description: "Test your knowledge of famous French authors and literary works.",
      questions: [
        {
          question: "Who wrote 'Les Misérables'?",
          options: ["Victor Hugo", "Gustave Flaubert", "Émile Zola", "Albert Camus"],
          correctAnswer: "Victor Hugo",
        },
        {
          question: "Which of these works was written by Albert Camus?",
          options: ["L'Étranger", "Madame Bovary", "Le Père Goriot", "Les Fleurs du mal"],
          correctAnswer: "L'Étranger",
        },
        {
          question: "Who is considered the father of French classical tragedy?",
          options: ["Jean Racine", "Molière", "Pierre Corneille", "Voltaire"],
          correctAnswer: "Pierre Corneille",
        },
        {
          question: "Which literary movement did Charles Baudelaire belong to?",
          options: ["Symbolism", "Romanticism", "Realism", "Surrealism"],
          correctAnswer: "Symbolism",
        },
        {
          question: "Who wrote 'Madame Bovary'?",
          options: ["Gustave Flaubert", "Honoré de Balzac", "Stendhal", "Émile Zola"],
          correctAnswer: "Gustave Flaubert",
        },
        {
          question: "Which of these authors is associated with the Existentialist movement?",
          options: ["Jean-Paul Sartre", "Marcel Proust", "André Gide", "Guy de Maupassant"],
          correctAnswer: "Jean-Paul Sartre",
        },
        {
          question: "Who wrote 'À la recherche du temps perdu' (In Search of Lost Time)?",
          options: ["Marcel Proust", "André Gide", "Albert Camus", "Jean-Paul Sartre"],
          correctAnswer: "Marcel Proust",
        },
        {
          question: "Which of these works was written by Molière?",
          options: ["Le Misanthrope", "Phèdre", "Le Cid", "Candide"],
          correctAnswer: "Le Misanthrope",
        },
        {
          question: "Who wrote 'Les Fleurs du mal' (The Flowers of Evil)?",
          options: ["Charles Baudelaire", "Arthur Rimbaud", "Paul Verlaine", "Stéphane Mallarmé"],
          correctAnswer: "Charles Baudelaire",
        },
        {
          question: "Which literary movement is Émile Zola associated with?",
          options: ["Naturalism", "Romanticism", "Symbolism", "Surrealism"],
          correctAnswer: "Naturalism",
        },
        {
          question: "Who wrote 'Candide'?",
          options: ["Voltaire", "Jean-Jacques Rousseau", "Denis Diderot", "Montesquieu"],
          correctAnswer: "Voltaire",
        },
        {
          question: "Which of these works was written by Simone de Beauvoir?",
          options: ["Le Deuxième Sexe", "La Nausée", "L'Étranger", "Huis Clos"],
          correctAnswer: "Le Deuxième Sexe",
        },
        {
          question: "Who wrote 'Le Petit Prince' (The Little Prince)?",
          options: ["Antoine de Saint-Exupéry", "Jules Verne", "Albert Camus", "Victor Hugo"],
          correctAnswer: "Antoine de Saint-Exupéry",
        },
        {
          question: "Which century is known as the 'Grand Siècle' (Great Century) in French literature?",
          options: ["17th century", "18th century", "19th century", "20th century"],
          correctAnswer: "17th century",
        },
        {
          question: "Who wrote 'Les Trois Mousquetaires' (The Three Musketeers)?",
          options: ["Alexandre Dumas", "Victor Hugo", "Honoré de Balzac", "Gustave Flaubert"],
          correctAnswer: "Alexandre Dumas",
        },
        {
          question: "Which of these authors received the Nobel Prize in Literature?",
          options: ["Albert Camus", "Marcel Proust", "Gustave Flaubert", "Honoré de Balzac"],
          correctAnswer: "Albert Camus",
        },
        {
          question: "Who wrote 'Germinal'?",
          options: ["Émile Zola", "Victor Hugo", "Gustave Flaubert", "Honoré de Balzac"],
          correctAnswer: "Émile Zola",
        },
        {
          question: "Which literary movement emerged in France after World War I?",
          options: ["Surrealism", "Romanticism", "Naturalism", "Classicism"],
          correctAnswer: "Surrealism",
        },
        {
          question: "Who wrote 'Phèdre'?",
          options: ["Jean Racine", "Molière", "Pierre Corneille", "Voltaire"],
          correctAnswer: "Jean Racine",
        },
        {
          question: "Which of these works was written by Stendhal?",
          options: ["Le Rouge et le Noir", "Madame Bovary", "Germinal", "Notre-Dame de Paris"],
          correctAnswer: "Le Rouge et le Noir",
        },
      ],
    },
  ]
  
  