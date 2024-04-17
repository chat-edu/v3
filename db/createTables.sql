CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    profile_picture_url VARCHAR(255)
);

CREATE TABLE Graphs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    creator_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    text TEXT,
    graph_id INTEGER,
    FOREIGN KEY (graph_id) REFERENCES Graphs(id) ON DELETE CASCADE
);

CREATE TABLE TopicEdges (
    source_topic_id INTEGER,
    target_topic_id INTEGER,
    PRIMARY KEY (source_topic_id, target_topic_id),
    FOREIGN KEY (source_topic_id) REFERENCES Topics(id) ON DELETE CASCADE,
    FOREIGN KEY (target_topic_id) REFERENCES Topics(id) ON DELETE CASCADE
);