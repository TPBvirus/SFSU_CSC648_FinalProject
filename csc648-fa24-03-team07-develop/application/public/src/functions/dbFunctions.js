/*
File Name:  dbFunctions.js
Course: CSC 648
Author:  Team 7    
Last-Updated:  12/01/2024
Description: Functions used for querying the database
Editors: Jaylin Jack

-----Peer Reviewed by Zarko Cosovic 12/17/2024-----
*/

const mysql2 = require('mysql2');

// AWS Server Connection
const connection = mysql2.createConnection({ 
    host: "127.0.0.1", 
    port: "3306",
    user: "root",
    password: "team7",
    database: "csc648"
});

// JJ Server Connection
// const connection = mysql2.createConnection({ 
//   host: "127.0.0.1", 
//   port: "3306",
//   user: "teamuser",
//   password: "team77",
//   database: "csc648"
// });

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

/*
  JJ and query help from Chat-GPT
  Get tutors by anded selected subject and search bar input
*/
function getTutorsBySearch(subjectSelected, search, callback) {
  // Using %like feature to search tutor values.
  const likeQuery = `%${search}%`;

  // Access all datafields of any tutor that matches the input and subject selected.
  // Input from user can either search the bio, name of tutor, or courses tutor teaches.
  // Keep in mind we only show approved tutors
  connection.query(`SELECT ru.name AS tutor_name, t.subject, t.tutor_id, t.reg_user_id, t.bio, t.courses, t.photo, t.video
         FROM tutor t 
         JOIN registered_user ru ON t.reg_user_id = ru.registered_user_id 
         WHERE t.subject = ? AND (t.bio LIKE ? OR ru.name LIKE ? OR t.courses LIKE ?) AND t.approval_status = 'approved'`, [subjectSelected, likeQuery, likeQuery, likeQuery], (err, rows) => {
    if (err) throw err;
    const tutors = rows.map(row => ({
      id: row.tutor_id,
      reg_user_id: row.reg_user_id,
      subject: row.subject,
      bio: row.bio,
      courses: row.courses,
      name: row.tutor_name,
      photo: row.photo,
      video: row.video
    }));
    callback(tutors);
  });
}

/*
  JJ and query help from Chat-GPT
  Get tutors by only subject selected
*/

function getTutorsBySubject(subjectSelected, callback) {

  // Access all datafields of any tutor that matches the subject selected
  // Keep in mind we only show approved tutors
  connection.query(`SELECT ru.name AS tutor_name, t.subject, t.tutor_id, t.reg_user_id, t.bio, t.courses, t.photo, t.video 
            FROM tutor t 
            JOIN registered_user ru ON t.reg_user_id = ru.registered_user_id 
            WHERE t.subject = ? AND t.approval_status = 'approved'`, [subjectSelected], (err, rows) => {
    if (err) throw err;

    const tutors = rows.map(row => ({
      id: row.tutor_id,
      reg_user_id: row.reg_user_id,
      subject: row.subject,
      bio: row.bio,
      courses: row.courses,
      name: row.tutor_name,
      photo: row.photo,
      video: row.video
    }));
    callback(tutors);
  });
}

/*
  JJ and query help from Chat-GPT
  Get tutors by only search bar.
*/

function getTutorsByInput(search, callback) {
  // Like query is the search input from the user,
  // use %like search to search our tutor values.
  const likeQuery = `%${search}%`;

  /*
    Access all datafields of any tutor that matches the search bar input
    input from user can either search the bio, name of tutor, or courses tutor teaches.
    Keep in mind we only show approved tutors
  */
  connection.query(`SELECT ru.name AS tutor_name, t.subject, t.tutor_id, t.reg_user_id, t.bio, t.courses, t.photo, t.video
            FROM tutor t 
            JOIN registered_user ru ON t.reg_user_id = ru.registered_user_id 
            WHERE (t.bio LIKE ? OR ru.name LIKE ? OR t.courses LIKE ?)
            AND t.approval_status = 'approved'`, [likeQuery, likeQuery, likeQuery], (err, rows) => {
    if (err) throw err;
    console.log(rows);
    const tutors = rows.map(row => ({
      id: row.tutor_id,
      reg_user_id: row.reg_user_id,
      subject: row.subject,
      bio: row.bio,
      courses: row.courses,
      name: row.tutor_name,
      photo: row.photo,
      video: row.video
    }));
    callback(tutors);
  });
}


/*
  JJ
  -----Essential for search---------
  Retrieve the subjects from our DB
    - used for our dropdown menu for search and tutor application.
  This function is called at each point of the website, since search exists on any page.
*/
function getSubjects(callback) {
  // Lists the names of each subject. 
  connection.query('SELECT name FROM subject;', (err, rows) => {
    if (err) throw err;
    const subjects = rows.map(row => ({
      id: row.subject_id,
      name: row.name
    }));
    callback(subjects);
  });
}

/*
  JJ and query help from Chat-GPT
  -----Essential for homepage and search-------
  Retrieve all approved tutors from our DB
    - listed by recently added.
  This function is called at each point of the website, since search shall be able to exists on any page.
*/
function getTutors(callback) {

  /*
    Access all datafields of tutors 
    Keep in mind we only show approved tutors
  */
  connection.query(`
  SELECT 
      ru.name AS tutor_name, 
      t.subject, 
      t.tutor_id, 
      t.reg_user_id, 
      t.bio, 
      t.courses, 
      t.photo, 
      t.video 
  FROM 
      tutor t 
  JOIN 
      registered_user ru 
      ON t.reg_user_id = ru.registered_user_id 
  WHERE 
      t.approval_status = 'approved' 
  ORDER BY 
      t.tutor_id DESC;`, (err, rows) => {
    if (err) throw err;


    const tutors = rows.map(row => ({
      id: row.tutor_id,
      reg_user_id: row.reg_user_id,
      subject: row.subject,
      bio: row.bio,
      courses: row.courses,
      name: row.tutor_name,
      photo: row.photo,
      video: row.video
    })); 
    callback(tutors);
  });
}

/*
  JJ and entire function help from Chat-GPT
  -----Essential for dashboard-------
  Retrieve all approved messages for the logged in user from our DB
  
*/
function getMessages(userId, callback) {
  // Query to fetch messages where the user is the recipient
  connection.query(`
      SELECT m.content, ru.name AS sender_name
      FROM message m
      JOIN registered_user ru ON m.sender_id = ru.registered_user_id
      WHERE m.recipient_id = ? AND m.approval_status = 'approved'`, [userId], (err, rows) => {

      if (err) {
          console.error(err);  // Log any errors
          return callback([], []);  // Return empty arrays if there's an error
      }

      const messages = rows.map(row => row.content);  // Extract content
      const senders = rows.map(row => row.sender_name);  // Extract sender names

      // Call the callback function with the messages and senders arrays
      callback(messages, senders);
  });
}

/*
  JJ and entire function help from Chat-GPT
  -----Essential for dashboard-------
  Retrieve all approved tutor postings for the logged in user from our DB
  
*/
function getPostings(userId, callback) {
  // Query to fetch tutor_applications where the user is the poster
  connection.query(`
    SELECT t.tutor_id, t.subject, t.bio, t.courses, t.photo, t.video, t.approval_status, ru.name AS tutor_name
    FROM tutor t
    JOIN registered_user ru ON t.reg_user_id = ru.registered_user_id
    WHERE t.reg_user_id = ? AND t.approval_status = 'approved'`, [userId], (err, rows) => {

  if (err) {
      console.error(err);  // Log any errors
      return callback([], []);  // Return empty arrays if there's an error
  }

  // Return viable info for 
  const tutorPostings = rows.map(row => ({
    tutor_id: row.tutor_id,
    subject: row.subject,
    bio: row.bio,
    courses: row.courses,
    photo: row.photo,
    video: row.video,
    tutor_name: row.tutor_name
  }));

    // Call the callback function with the messages and senders arrays
    callback(tutorPostings);
  });
}


module.exports = {
  getTutors,
  getTutorsBySearch,
  getTutorsBySubject,
  getTutorsByInput,
  getSubjects, 
  getMessages,
  getPostings,
  connection
};
