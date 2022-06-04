/* eslint no-unused-vars: 0 */

// JavaScript Document
class Piece {
	constructor(row, col, type, mineGame) {
		this.ID = 'p' + mineGame.padValue(row) + mineGame.padValue(col);
		this.type = type;
		this.isDug = false;
		this.row = row;
		this.col = col;
	}
	
	getID() { return this.ID; }
	getType() { return this.type; }
	getIsDug() { return this.isDug; }
	getRow() { return this.row; }
	getCol() { return this.col; }

	setType(value) { this.type = value; }
	setIsDug(value) { this.getIsDug = value; }
}
