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

CREATE TABLE Tasks (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    graph_id INTEGER NOT NULL,
    creator_id VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL,
    FOREIGN KEY (graph_id) REFERENCES Graphs(id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE TaskTopics (
    task_id INTEGER,
    topic_id INTEGER,
    PRIMARY KEY (task_id, topic_id),
    FOREIGN KEY (task_id) REFERENCES Tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES Topics(id) ON DELETE CASCADE
);

CREATE TABLE FreeResponseQuestions (
    id SERIAL PRIMARY KEY,
    topic_id INT,
    question TEXT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    answer TEXT,
    correct BOOLEAN,
    explanation TEXT,
    FOREIGN KEY (topic_id) REFERENCES Topics(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE MultipleChoiceQuestions (
    id SERIAL PRIMARY KEY,
    topic_id INT,
    question TEXT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    correct_answer CHAR(1) CHECK(correct_answer IN ('A', 'B', 'C', 'D')),
    answer CHAR(1),
    explanation TEXT,
    correct BOOLEAN,
    FOREIGN KEY (topic_id) REFERENCES Topics(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- delete all tasks with graph id 44
DELETE FROM Tasks WHERE graph_id = 44;