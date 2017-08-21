import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Http } from '@angular/http';
import { MdRadioGroup } from '@angular/material';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public username;
  public questions = [];
  public status = 'loading';
  public currentQuestionSet;
  public currentQuestionTimeout;
  public updateInterval;
  public selectedAnswer;
  private correct = 0;
  private incorrect = 0;
  private triviaApi = '/api/api.php?amount=10';

  @ViewChild('answer') answer: MdRadioGroup;

  constructor(
    private Http: Http
  ) { }

  get getIncorrect() {
    return this.incorrect;
  }

  get getCorrect() {
    return this.correct;
  }

  ngOnInit() {
    this.username = localStorage.getItem('name');
    this.loadQuestions().subscribe((data) => {
      const results = data.json().results;
      this.parseQuestions(results);
      this.startGame();
    });
  }

  loadQuestions () {
    return this.Http.get(this.triviaApi);
  }

  parseQuestions(results: Array<any>) {
    const questions = this.questions;
    results.forEach((r) => {
      const answers = r.incorrect_answers;
      answers.push(r.correct_answer);
      questions.push({
        question: r.question,
        answer: r.correct_answer,
        answers: answers
      });
    });
  }

  startGame() {
    this.currentQuestionSet = this.questions.pop();
    let questionSet ;

    const update = () => {
      if (!this.currentQuestionSet) {
        this.updateInterval.clear();
        this.status = 'gameResult';
      }

      if (questionSet !== this.currentQuestionSet) {
        questionSet = this.currentQuestionSet;
        this.currentQuestionTimeout = setTimeout(this.saveAnswer.bind(this), 10000);
        this.status = 'question';
      }
    };

    this.updateInterval = setInterval(update.bind(this), 500);
  }


  saveAnswer() {
    if (this.selectedAnswer === this.currentQuestionSet.answer) {
      this.correct++;
    } else {
      this.incorrect++;
    }

    this.status = 'questionResult';

    setTimeout(() => {
      this.currentQuestionSet = this.questions.pop();
    }, 2500);
  }

}
