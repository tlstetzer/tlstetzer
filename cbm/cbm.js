/* eslint no-unused-vars: 0 no-undef: 0*/

class CBM {
	constructor(callback) {
		this.row = 0;
		this.col = 0;
		this.screen = {};
		this.memory = {};
		this.cbmCharList = [];
		
		$.get('/cbm/petscii.csv', {cbm: this}, function(data) {
			cbm.cbmCharList = Papa.parse(data, { header: true }).data;
			cbm.cbmScreen();
			if(callback) { callback(); }
		});
	}
	
	cbmSetThis(cbm) {
		this.row = cbm.row;
		this.col = cbm.col;
		this.screen = cbm.screen;
	}

	cbmRND(seed) { 
		var rnd = Math.floor(Math.random() * seed) + 1; 
		return parseInt(rnd); 
	}

	cbmPeek(mem) {
		var cbm = this;
		var id = cbm.memory[mem].id;
		var cell = cbm.screen[id].poke;

		return cell;
	}

	cbmPoke(mem, poke) {
		// get poke character
		var cell = 'bad';
		var rev = 'N';
		var cbm = this;
		cbm.cbmCharList.forEach(function(item) {
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
			cbm.cbmDisplayCell(cell, rev);
			cbm.col = col;
			cbm.row = row;
		}
	}

	cbmSound() {

	}

	cbmDisplay(value) {
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
				else if(cell == '{left}') { cbm.col = cbm.col - 1; if(cbm.col < 0) { cbm.col = 0;} }
				else if(cell == '{rght}') { cbm.col = cbm.col + 1; }
				else if(cell == '{down}') { cbm.row = cbm.row + 1; cbm.col = 0; }
				else if(cell == '{up}') { cbm.row = cbm.row - 1; cbm.col = 0; if(cbm.row < 0) { cbm.row = 0;} }
				else if(cell == '{rvon}') { rev = 'R'; }
				else if(cell == '{rvof}') { rev = 'N'; }
				else if(cell == '{clr}') { cbm.cbmScreen(); }
				else { cbm.cbmDisplayCell(cell, rev); }
			}
		});
	}
	
	cbmDisplayCell(cell, rev) {
		var id = this.cbmSetID();
		var cbm = this;
		
		this.cbmCharList.forEach(function(charRow) {
			if(cell == charRow.Vice) {
				// set cell
				cbm.screen[id].char = charRow.Hex;
				cbm.screen[id].rev = charRow.Rev;
				cbm.screen[id].poke = charRow.Poke;
				
				// set class
				var charRev = charRow.Rev;
				if(rev == 'R' && charRev == 'N') { charRev = 'R'; }
				else if(rev == 'R' && charRev == 'R') { charRev = 'N'; }
				if(cbm.screen[id].rev != charRev) { cbm.cbmReverse(charRev); }
				
				// display cell
				$('#' + id).html('&#x0e0' + cbm.screen[id].char);
				cbm.col++;
				if(cbm.col > 39) { cbm.col = 0; cbm.row++; }
			}
		});
	}

	cbmReverse(rev) {
		var id = this.cbmSetID();
		
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
	
	cbmTab(value) {
		this.col = value;
	}

	cbmScreen() {
		this.screen = {};
		this.memory = {};
		var cbm = this;
		var memVal = 32768;
		var html = '<table id="cbmTable" class="petme"><tbody id="cbmBody">';

		for(cbm.row=0; cbm.row<26; cbm.row++) {
			html += '<tr id="R' + this.row + '">';
			for(cbm.col=0; cbm.col<40; cbm.col++) {
				var id = cbm.cbmSetID();
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
	
	cbmInput(callback) {
		var allow = [8, 13, 186, 157, 188, 189, 190, 191, 219, 220, 221, 222];
		var cbm = this;
		var inputLoc = cbm.col;
		for(var c=48; c<91; c++) { allow.push(c); }
		for(c=96; c<112; c++) { allow.push(c); }
		var input = '';

		$(document).on('keydown', function(event) {
			var key = event.key;
			var code = event.which;

			if(allow.includes(event.which)) { 
				if(event.key == 'Enter') {
					$(document).off('keypress');
					callback(input);
				} else if(event.key == 'Backspace') {
					input = input.substring(0, input.length - 1);
					cbm.col = inputLoc;
					cbm.cbmDisplay(input);
				} else {
					cbm.col = inputLoc;
					cbm.cbmDisplay(input);
				}
			}
		});
	}
	
	cbmSetID() {
		var id = 'R' + this.row + 'C' + this.col;
		return id;
	}

}
