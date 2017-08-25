const http = require('request-promise');
const _ = require('lodash');

/*
 * Server: Starting Game!
 * Clients: Join Game if ready
 *  Ready for question
 *  Server: wait for all ready
 *
 *  #SEND$
 *  Send question
 *  wait for all answers
 *  Clients: Send answers after 10 second timeout
 *
 * Server: receives all answers
 * sends results
 * waits for ready users
 *
 * if (moreQuestions)
 *  goto #SEND#
 *
 * else end game send results
 *
 * Clients, display results, back to loby
 *
 * Server: set timeout to start next game
 *
 */


module.exports = function (socket, server) {
  const game = {
    triviaApi: 'https://opentdb.com/api.php?amount=10',

    get current_user () {
      return game.users[game.socket.id];
    },

    onQuestionRequest: function (data) {
      game.current_user.answer_ready = false;
      game.current_user.question_ready = true;

      let next = true;
      _.each(game.users, (u) => {
        console.dir(u);
        if (!u.question_ready) {
          next = false;
        }
      });

      console.log(next);
      if (next) {
        game.currentQuestionSet = game.questions.pop();
        if (game.currentQuestionSet) {
          game.socket.emit('game-question', _.omit(game.currentQuestionSet, 'answer'));
        } else {
          const scores = game.users.map((u) => {
            return {
              username: u.username,
              score: u.score
            };
          });
          game.socket.emit('game-over', scores);
        }
      }
    },

    onUserAnswer: function (data) {
      game.current_user.answer_ready = true;
      game.current_user.question_ready = false;

      game.saveAnswer(data);

      let next = true;
      game.users.forEach((u) => {
        if (!u.answer_ready) {
          next = false;
        }
      });

      if (next) {
        game.socket.emit('game-answer', game.currentQuestionSet.answer);
      }
    },

    loadQuestions: function () {
      return http.get(game.triviaApi);
    },

    parseQuestions: function (results) {
      const questions = game.questions;
      results.forEach((r) => {
        const answers = r.incorrect_answers;
        answers.push(r.correct_answer);
        questions.push({
          question: r.question,
          answer: r.correct_answer,
          answers: answers
        });
      });
    },

    startGame: function () {
      game.loadQuestions().then((data) => {
        const results = JSON.parse(data).results;
        game.parseQuestions(results);

        game.socket.emit('game-start-ready');
      });
    },

    saveAnswer: function (data) {
      if (data.answer === game.currentQuestionSet.answer) {
        game.current_user.score++;
      }
    }
  };

  game.socket = socket;
  game.users = server.clients;
  game.questions = [];


  game.socket.on('game-question-request', game.onQuestionRequest.bind(game) );
  game.socket.on('game-answer-request', game.onUserAnswer.bind(game));

  return game;
};
