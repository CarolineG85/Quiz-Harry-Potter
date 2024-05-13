DROP TABLE IF EXISTS `Question`;

DROP TABLE IF EXISTS `Answer`;

CREATE TABLE `Question` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `content` VARCHAR(500) NOT NULL
);

INSERT INTO
    Question (content)
VALUES (
        "Quel est le nom de la chouette de Harry?"
    ),
    (
        "Quel est le prénom de la fondatrice de Serdaigle?"
    ),
    (
        "Combien existe-il de sorts impardonnables?"
    ),
    (
        "Madame Maxime donne quoi comme boisson à ses chevaux?"
    ),
    (
        "Quels sont les créateurs de la carte du Maraudeur?"
    ),
    ("Je jure solennement que..."),
    (
        "Lors du Tournoi des 3 sorciers, Poudlard, BeauxBâtons et une autre école s'affrontent, laquelle?"
    ),
    (
        "Dans quel conte sont mentionnées les Reliques de la Mort?"
    ),
    (
        "Quel type de dragon garde les chambres fortes de Gringotts?"
    ),
    (
        "Quel sort permet de créer de l'eau?"
    ),
    (
        "Quel sort permet d'ouvrir une porte?"
    ),
    (
        "Quelle est la dernière épreuve du Tournoi des Trois Sorciers?"
    ),
    (
        "Quel professeur enseigne l'Occlumancie à Harry?"
    ),
    (
        "Comment s'appelle le directeur de l'école de Durmstrang?"
    ),
    (
        "À quelques années près, quel âge a Dumbledore?"
    ),
    ("Drago Malefoy traite Hermione de...?"),
    ("Neville est:"),
    ("Nymphadora Tonks se marie avec quel autre sorcier?"),
    ("Quelle créature veut empêcher Harry de retourner à Poudlard en 2ème année?"),
    ("Comment s'appelle la maison des Weasley?");

CREATE TABLE `Answer` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `contentAnswer` VARCHAR(250) NOT NULL,
  `isTheRightAnswer` BOOLEAN DEFAULT 0,
  `question_id` INT, CONSTRAINT `fk_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE


);

INSERT INTO
    Answer (
        contentAnswer,
        isTheRightAnswer,
        question_id
    )
VALUES ("Pattenrond", 0, 1),
    ("Coquecigrue", 0, 1),
    ("Hedwige", 1, 1),
    ("Errol", 0, 1),
    ("Helga", 0, 2),
    ("Rowena", 1, 2),
    ("Helena", 0, 2),
    ("Mathilda", 0, 2),
    ("5", 0, 3),
    ("2", 0, 3),
    ("3", 1, 3),
    ("4", 0, 3),
    ("Du jus de citrouille", 0, 4),
    ("Du whisky pur malt", 1, 4),
    ("De l'eau", 0, 4),
    ("De la bièreaubeurre", 0, 4),
    ("Les jumeaux Weasley", 0, 5),
    (
        "Queudver, Patmol, Cornedrue et Lunard",
        1,
        5
    ),
    (
        "Les fondateurs de Poudlard",
        0,
        5
    ),
    (
        "Seamus, Dean, Neville et Colin",
        0,
        5
    ),
    (
        "... je ne dirai rien à personne",
        0,
        6
    ),
    (
        "... Dolores Ombrage est géniale",
        0,
        6
    ),
    ("... Dobby est libre!!", 0, 6),
    (
        "... mes intentions sont mauvaises",
        1,
        6
    ),
    ("Ilvermony", 0, 7),
    ("Castelobruxo", 0, 7),
    ("Durmstrang", 1, 7),
    ("Uagadou", 0, 7),
    (
        "Les contes de Beedle le Barde",
        1,
        8
    ),
    (
        "Les contes du Chicaneur",
        0,
        8
    ),
    ("Les contes de Grimm", 0, 8),
    (
        "Les contes de Bathilda Tourdesac",
        0,
        8
    ),
    ("Un Magyar à pointes", 0, 9),
    (
        "Un Suédois à museau court",
        0,
        9
    ),
    ("Un Gallois vert", 0, 9),
    (
        "Un Pansedefer ukrainien",
        1,
        9
    ),
    ("Aguamenti", 1, 10),
    ("Alohomora", 0, 10),
    ("Accio", 0, 10),
    ("Avada Kedavra", 0, 10),
    ("Alohomora", 1, 11),
    ("Accio", 0, 11),
    ("Avada Kedavra", 0, 11),
    ("Aguamenti", 0, 11),
    ("Le labyrinthe", 1, 12),
    ("Le bal de Noël", 0, 12),
    ("Le dragon", 0, 12),
    ("Le lac", 0, 12),
    ("Professeur Rogue", 1, 13),
    (
        "Professeur McGonagall",
        0,
        13
    ),
    ("Professeur Lupin", 0, 13),
    ("Professeur Flitwick", 0, 13),
    ("Igor Kourkouroff", 0, 14),
    ("Igor Goukaroff", 0, 14),
    ("Igor Karkaroff", 1, 14),
    ("Iggor Karkarof", 0, 14),
    ("300 ans", 0, 15),
    ("150 ans", 1, 15),
    ("110 ans", 0, 15),
    ("800 ans", 0, 15),
    ("Sang-de-Bourbe", 1, 16),
    ("Pure-Sang", 0, 16),
    ("Moldue", 0, 16),
    ("Sang-Mêlé", 0, 16),
    ("Gringalet", 0, 17),
    ("Court sur pattes", 0, 17),
    ("Londuhaut", 0, 17),
    ("Londubat", 1, 17),
    ("Charlie Weasley", 0, 18),
    ("Bill Weasley", 0, 18),
    ("Remus Lupin", 1, 18),
    ("Sirius Black", 0, 18),
    ("un basilic", 0, 19),
    ("un strangulot", 0, 19),
    ("un loup-garou", 0, 19),
    ("un elfe de maison", 1, 19),
    ("La Chaumière aux Coquillages", 0, 20),
    ("Le Terrier", 1, 20),
    ("Le Privet Drive", 0, 20),
    ("Le Manoir", 0, 20);