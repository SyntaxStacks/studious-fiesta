import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { MultiplayerService } from './multiplayer.service';
import { MdRadioGroup } from '@angular/material';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
})
export class MultiplayerComponent implements OnInit, OnDestroy {

  public socket;
  public scores;
  public correctAnswer;
  public selectedAnswer;
  public currentQuestionSet;
  public currentQuestionTimeout;
  public status = 'loading';
  @ViewChild('answer') answer: MdRadioGroup;

  username;

  constructor(
    private MultiplayerService: MultiplayerService
  ) { }

  ngOnInit() {
    // this.MultiplayerService.openSocket();
    this.socket = this.MultiplayerService.socket;
    this.configureSocketEvents();
    this.setupGame();
  }

  ngOnDestroy() {
    this.MultiplayerService.closeSocket();
  }

  configureSocketEvents() {
    this.socket.on('game-question', this.handleQuestion.bind(this));
    this.socket.on('game-answer', this.handleAnswer.bind(this));
    this.socket.on('game-over', this.handleGameOver.bind(this));
  }

  setupGame() {
    this.requestQuestion();
  }

  requestQuestion() {
    this.socket.emit('game-question-request');
  }

  submitAnswer() {
    this.socket.emit('game-answer-request', this.answer.value);
  }

  handleQuestion(questionSet) {
    console.log('questing here');
    this.currentQuestionSet = questionSet;
    this.currentQuestionTimeout = setTimeout(this.submitAnswer.bind(this), 10000);
    this.status = 'question';
  }

  handleAnswer(answer) {
    this.correctAnswer = answer;
    if (this.selectedAnswer === answer) {
      // do something
    }

    this.status = 'questionResult';
    setTimeout(this.requestQuestion.bind(this), 3000);
  }

  handleGameOver(scores) {
    this.scores = scores;
    this.status = 'gameResult';
  }

}
