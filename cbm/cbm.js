/* eslint no-unused-vars: 0 no-undef: 0*/

class CBM {
	constructor(callback) {
		this.row = 0;
		this.col = 0;
		this.screen = {};
		this.cbmCharList = [];
		
		$.get('/cbm/petscii.csv', {cbm: this}, function(data) {
			cbm.cbmCharList = Papa.parse(data, { header: true }).data;
			cbm.cbmScreen();
//			cbm.cbmSetThis(cbm);
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

	cbmPeek(memValue, screen) {
		var cell = '20';

		for(var row=0; row<26; row++) {
			for(var col=0; col<40; col++) {
				if(screen[row][cell].mem == memValue) {
					cell = screen[row][cell].poke;
				}
			}
		}

		return cell;
	}

	cbmPoke(value, rev, memValue, screen) {
		for(var row=0; row<26; row++) {
			for(var col=0; col<40; col++) {
				if(screen[row][cell].mem == memValue) {
					convert = [{char: value, rev: rev}];
					display = cbmConvert(convert);
					cbmDisplay(display, row, col);
				}
			}
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
		var cbm = this;
		var memVal = 32768;
		var html = '<table id="cbmTable" class="petme"><tbody id="cbmBody">';

		for(cbm.row=0; cbm.row<26; cbm.row++) {
			html += '<tr id="R' + this.row + '">';
			for(cbm.col=0; cbm.col<40; cbm.col++) {
				var id = cbm.cbmSetID();
				var cell = { char: '20', rev: 'N', mem: memVal };
				cbm.screen[id] = cell;
				html += '<td id="' + id + '" class="bgnormal fgnormal">&#x0e020</td>';
				
				memVal++;
			}
		}

		html += '</tbody></table>';
		$('#cbmScreen').html(html);
		this.row = 0;
		this.col = 0;
	}
	
	cbmInput(max) {
		
	}
	
	cbmSetID() {
		var id = 'R' + this.row + 'C' + this.col;
		if(this.col < 0) {
			var b = 'break 162';
		}
		return id;
	}

}
