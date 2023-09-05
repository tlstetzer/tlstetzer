/* eslint no-unused-vars: 0 no-undef: 0*/

class CBM {
	constructor(callback) {
		this.row = 0;
		this.col = 0;
		this.screen = {};
		this.memory = {};
		this.charList = [];
		
		$.get('/cbm/petscii.csv', {cbm: this}, function(data) {
			cbm.charList = Papa.parse(data, { header: true }).data;
			cbm.buildScreen();
			if(callback) { callback(); }
		});
	}

	rnd(seed) { 
		var rnd = Math.random() * seed; 
		return rnd; 
	}

	peek(mem) {
		var cbm = this;
		var id = cbm.memory[mem].id;
		var cell = cbm.screen[id].poke;

		return cell;
	}

	poke(mem, poke) {
		// get poke character
		var cell = 'bad';
		var rev = 'N';
		var cbm = this;
		cbm.charList.forEach(function(item) {
			if(item.Poke == poke) { 
				cell = item.Vice;
				rev = item.Rev;
			}
		});
		
		if(cell == 'bad') { alert('Invalid Poke Character!'); }
		else {
			// set row and column
			var row = cbm.row;
			var col = cbm.col;
			cbm.row = cbm.memory[mem].row;
			cbm.col = cbm.memory[mem].col;

			// display character
			cbm.displayCell(cell, rev);
			cbm.col = col;
			cbm.row = row;
		}
	}

	sound() {

	}
	
	print(value) {
		var cbm = this;
		cbm.display(value);
		cbm.col = 0;
		cbm.row = cbm.row + 1;
		if(cbm.row > 24) { cbm.row = 24; }
	}
	
	printLoop(value, loop) {
		for(var l=0; l<loop; l++) {
			this.display(value);
			cbm.col = 0;
			cbm.row = cbm.row + 1;
			if(cbm.row > 24) { cbm.row = 24; }
		}
	}
	
	display(value) {
		var isCode = false;
		var cell = '';
		var rev = 'N';
		var cbm = this;
		
		value.split('').forEach(function(char) {
			// get code or character
			if(char == '{') { isCode = true; cell = char; } 
			else if(char == '}') { isCode = false; cell += char; } 
			else if(isCode == true) { cell += char; }
			else { isCode = false; cell = char; }
			
			// process cell
			if(isCode == false) {
				if(cell == '{home}') { cbm.row = 0; cbm.col = 0; }
				else if(cell == '{left}') { cbm.col = cbm.col - 1; if(cbm.col < 0) {cbm.col = 0;} }
				else if(cell == '{rght}') { cbm.col = cbm.col + 1; }
				else if(cell == '{down}') { cbm.row = cbm.row + 1; cbm.col = 0; if(cbm.row > 24) {cbm.row = 24;} }
				else if(cell == '{up}') { cbm.row = cbm.row - 1; cbm.col = 0; if(cbm.row < 0) {cbm.row = 0;} }
				else if(cell == '{rvon}') { rev = 'R'; }
				else if(cell == '{rvof}') { 
					rev = 'N'; 
				}
				else if(cell == '{clr}') { cbm.buildScreen(); }
				else { cbm.displayCell(cell, rev); }
			}
		});
	}
	
	displayLoop(value, loop) {
		for(var l=0; l<loop; l++) {
			this.display(value);
		}
	}
	
	displayCell(cell, rev) {
		var id = this.setID();
		var cbm = this;
		
		this.charList.forEach(function(charRow) {
			if(cell == charRow.Vice) {
				// set cell
				cbm.screen[id].char = charRow.Hex;
				cbm.screen[id].rev = charRow.Rev;
				cbm.screen[id].poke = charRow.Poke;
				
				// set class
				var charRev = charRow.Rev;
				if(rev == 'R' && charRev == 'N') { charRev = 'R'; }
				else if(rev == 'R' && charRev == 'R') { charRev = 'N'; }
				cbm.reverse(charRev);
				
				// display cell
				$('#' + id).html('&#x0e0' + cbm.screen[id].char);
				cbm.col++;
				if(cbm.col > 39) { cbm.col = 0; cbm.row++; }
			}
		});
	}

	reverse(rev) {
		var id = this.setID();
		
		if(rev == 'R') {
			$('#' + id).removeClass('bgnormal');
			$('#' + id).removeClass('fgnormal');
			$('#' + id).addClass('bgreverse');
			$('#' + id).addClass('fgreverse');
		} else {
			$('#' + id).removeClass('bgreverse');
			$('#' + id).removeClass('fgreverse');
			$('#' + id).addClass('bgnormal');
			$('#' + id).addClass('fgnormal');
		}
	}
	
	tab(value) {
		this.col = value;
	}

	buildScreen() {
		this.screen = {};
		this.memory = {};
		var cbm = this;
		var memVal = 32768;
		var html = '<table id="cbmTable" class="petme"><tbody id="cbmBody">';

		for(cbm.row=0; cbm.row<26; cbm.row++) {
			html += '<tr id="R' + this.row + '">';
			for(cbm.col=0; cbm.col<40; cbm.col++) {
				var id = cbm.setID();
				var cell = { char: '20', poke: 32 , rev: 'N', mem: memVal };
				var mem = { row: cbm.row, col: cbm.col, id: id };
				cbm.screen[id] = cell;
				cbm.memory[memVal] = mem;
				
				html += '<td id="' + id + '" class="bgnormal fgnormal">&#x0e020</td>';
				
				memVal++;
			}
		}

		html += '</tbody></table>';
		$('#cbmScreen').html(html);
		this.row = 0;
		this.col = 0;
	}
	
	getInput(callback) {
		var allow = [8, 13, 186, 157, 188, 189, 190, 191, 219, 220, 221, 222];
		var cbm = this;
		var inputLoc = cbm.col;
		for(var c=48; c<91; c++) { allow.push(c); }
		for(c=96; c<112; c++) { allow.push(c); }
		var input = '';

		$(document).on('keydown', function(event) {
			var key = event.key;
			var code = event.which;

			if(allow.includes(code)) { 
				if(key == 'Enter') {
					$(document).off('keydown');
					callback(input);
				} else if(key == 'Backspace') {
					input = input.substring(0, input.length - 1);
					cbm.col = inputLoc;
					cbm.display(input);
				} else {
					input += key;
					cbm.col = inputLoc;
					cbm.display(input);
				}
			}
		});
	}
	
	setID() {
		var id = 'R' + this.row + 'C' + this.col;
		return id;
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

}
