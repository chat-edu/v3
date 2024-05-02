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

CREATE TABLE GraphMedia (
    id SERIAL PRIMARY KEY,
    graph_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    media_url VARCHAR(255) NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    processed BOOLEAN NOT NULL,
    FOREIGN KEY (graph_id) REFERENCES Graphs(id) ON DELETE CASCADE
);

CREATE TABLE Videos (
    media_id INTEGER PRIMARY KEY,
    video_analyzer_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (media_id) REFERENCES GraphMedia(id) ON DELETE CASCADE
);

CREATE TABLE GraphUpdates (
    media_id SERIAL PRIMARY KEY,
    updates JSON NOT NULL,
    FOREIGN KEY (media_id) REFERENCES GraphMedia(id) ON DELETE CASCADE
);

-- get the graphmedia with id 23
SELECT * FROM GraphMedia WHERE id = 23;


CREATE TABLE QuestionSubmissions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    topic_id INT,
    question TEXT NOT NULL,
    correct BOOLEAN,
    explanation TEXT,
    timestamp TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE FreeResponseQuestionSubmissions (
    question_id SERIAL PRIMARY KEY,
    answer TEXT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES QuestionSubmissions(id) ON DELETE CASCADE
);

CREATE TABLE MultipleChoiceQuestions (
    question_id SERIAL PRIMARY KEY,
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    correct_answer CHAR(1) CHECK(correct_answer IN ('A', 'B', 'C', 'D')),
    answer CHAR(1) CHECK(answer IN ('A', 'B', 'C', 'D')),
    FOREIGN KEY (question_id) REFERENCES QuestionSubmissions(id) ON DELETE CASCADE
);