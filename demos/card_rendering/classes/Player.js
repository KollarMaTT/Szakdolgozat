/**
 * Syntax of the players
 */
class Player {
  constructor(type) {
    this.colors = {
      white: 0,
      blue: 0,
      green: 0,
      red: 0,
      black: 0,
    };

    this.fixColors = {
      white: 0,
      blue: 0,
      green: 0,
      red: 0,
      black: 0,
    };

    this.score = {
      value: 0,
    };

    this.type = type;
  }
}
