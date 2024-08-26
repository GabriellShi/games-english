CREATE DATABASE match_game_db;

USE match_game_db;

CREATE TABLE cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO cards (word, translation, image_url) VALUES 
('cat', 'gato', 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg'),
('dog', 'cachorro', 'https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png'),
('house', 'casa', 'https://img.freepik.com/vetores-gratis/bela-casa_24877-50819.jpg'),
('tree', 'árvore', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3pFV5kAjx4aLvs21GqMxxCIhvoRohuJPdw&s');


SELECT * FROM cards;


DROP TABLE cards;
// -------------- 
