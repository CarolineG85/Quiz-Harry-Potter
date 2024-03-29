DROP TABLE IF EXISTS `Admin`;

DROP TABLE IF EXISTS `Question`;

DROP TABLE IF EXISTS `Answer`;

CREATE TABLE `Admin` (
    `id` INT PRIMARY KEY AUTO_INCREMENT, `email` VARCHAR(50) NOT NULL, `password` VARCHAR(150) NOT NULL
);

INSERT INTO
    Admin (email, password)
VALUES (
        "carolinehp@gmail.com", "welcometoharry"
    );

CREATE TABLE `Question` (
    `id` INT PRIMARY KEY AUTO_INCREMENT, `content` VARCHAR(500) NOT NULL
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
    );

CREATE TABLE `Answer` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `contentAnswer` VARCHAR(250) NOT NULL,
  `isTheRightAnswer` BOOLEAN NOT NULL DEFAULT 0,
  `question_id` INT NOT NULL, CONSTRAINT `fk_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `Question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE


);

INSERT INTO
    Answer (
        contentAnswer, isTheRightAnswer, question_id
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
        "Queudver, Patmol, Cornedrue et Lunard", 1, 5
    ),
    (
        "Les fondateurs de Poudlard", 0, 5
    ),
    (
        "Seamus, Dean, Neville et Colin", 0, 5
    ),
    (
        "... je ne dirai rien à personne", 0, 6
    ),
    (
        "... Dolores Ombrage est géniale", 0, 6
    ),
    ("... Dobby est libre!!", 0, 6),
    (
        "... mes intentions sont mauvaises", 1, 6
    ),
    ("Ilvermony", 0, 7),
    ("Castelobruxo", 0, 7),
    ("Durmstrang", 1, 7),
    ("Uagadou", 0, 7),
    (
        "Les contes de Beedle le Barde", 1, 8
    ),
    (
        "Les contes du Chicaneur", 0, 8
    ),
    ("Les contes de Grimm", 0, 8),
    (
        "Les contes de Bathilda Tourdesac", 0, 8
    ),
    ("Un Magyar à pointes", 0, 9),
    (
        "Un Suédois à museau court", 0, 9
    ),
    ("Un Gallois vert", 0, 9),
    (
        "Un Pansedefer ukrainien", 1, 9
    ),
    ("Aguamenti", 1, 10),
    ("Alohomora", 0, 10),
    ("Accio", 0, 10),
    ("Avada Kedavra", 0, 10);