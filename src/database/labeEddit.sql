-- Active: 1678304084970@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        nick_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    );

CREATE TABLE posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        comments INTEGER DEFAULT(0) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );

CREATE TABLE
    likes_dislikes_comment  (
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments (id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    );

CREATE TABLE
    likes_dislikes_post  (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    );


CREATE TABLE comments(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    comments TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO
    users (id, nick_name, email, password, role)
VALUES (
        "u001",
        "Fulano",
        "fulano@email.com",
        "fulano123",
        "NORMAL"
), (
        "u002",
        "Beltrana",
        "beltrana@email.com",
        "beltrana00",
        "NORMAL"
    ), (
        "u003",
        "Pessoa",
        "pessoa@email.com",
        "pesssoa321",
        "ADMIN"
    );

INSERT INTO
    posts (id, creator_id, content, likes)
VALUES (
        "p001",
        "u001",
        "Criar o componente Header do site",
        1
    ), (
        "p002",
        "u002",
        "Criar o componente Footer do site",
        2
    ), (
        "p003",
        "u001",
        "Teste de usabilidade de todo o site",
        0
    ), (
        "p004",
        "u003",
        "Subir o site no surge",
        2
    );

INSERT INTO
    likes_dislikes_post ( user_id, post_id, like)
VALUES 
    ("u001","p002",1),
    ("u003","p002",1),
    ("u001","p004",1),
    ("u002","p004",1),
    ("u003","p001",1);
   
   
INSERT INTO
    likes_dislikes_comment ( user_id, comment_id, like)
VALUES 
    ("u001","c002",1),
    ("u003","c002",1),
    ("u001","c004",1),
    ("u002","c004",1),
    ("u003","c001",1);

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

DROP TABLE users;
 
DROP TABLE posts;
 
DROP TABLE likes_dislikes;
