/* eslint no-unused-vars: 0 no-undef: 0*/
var cbmCharList;

$(document).ready(function() {
	$.get('/cbm/petscii.csv', function(data) {
		cbmCharList = Papa.parse(data, { header: true }).data;
	});
});

function cbmRND(seed) { 
	var rnd = Math.floor(Math.random() * seed) + 1; 
	return parseInt(rnd); 
}

function cbmRow(row, col, value) {
	var isCode = false;
	var cell = '';
	var rev = 'N';
	var convert = [];
	
	value.split('').forEach(function(char) {
		// get character(s)
		if(isCode == true) {
			cell += char;
			if(char == '}') { isCode = false; }
		} else {
			cell = char;
			if(char == '{') { isCode = true; }
		}
		
		// set cell
		if(isCode == false) {
			if(cell == '{RVON}') { rev = 'R'; }
			else if(cell == '{RVOFF}') { rev = 'N'; }
			else { convert.push({char: cell, rev: rev}); }
		}
	});
	
	// display row
	var display = cbmConvert(convert);
	cbmDisplay(display, row, col);
}

function cbmConvert(character, type='vice') {
	var display = [];
	
	character.forEach(function(item) {
		var itemObj = { hex: '', rev: '' };
		cbmCharList.forEach(function(charRow) {
			var itemType = charRow.Vice;
			if(type == 'poke') { itemType = charRow.Poke; }
			
			if(charRow.Hex == '63') {
				var a = 'Break 20';
			}
			
			if(item.char == itemType) {
				itemObj.hex = charRow.Hex;
				itemObj.rev = item.rev;
			}
		});
		display.push(itemObj);
	});
	
	return display;
}

function cbmDisplay(display, row, StartCol) {
	var col = StartCol;
	
	display.forEach(function(item) {
		board[row][col] = { char: item.hex, rev: item.rev };
		var id = 'R' + row + 'C' + col;

		// Change classes
		if(item.rev == 'R') {
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

		// display character
		$('#' + id).html('&#x0e0' + item.hex);
		col++;
	});
}

function cbmPeek(memValue, screen) {
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

function cbmPoke(value, rev, memValue, screen) {
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

function cbmSound() {
	
}

function cbmScreen() {
	var screen = [];
	var memVal = 32768;
	var html = '<table id="cbmTable" class="petme"><tbody id="cbmBody">';

	for(var row=0; row<26; row++) {
		var line = [];
		html += '<tr id="R' + row + '">';
		for(var col=0; col<40; col++) {
			line[col] = { char: '20', rev: 'N', mem: memVal };
			html += '<td id="R' + row + 'C' + col + '" class="bgnormal fgnormal">&#x0e020</td>';
			memVal++;
		}
		
		screen[row] = line;
	}
	
	html += '</tbody></table>';
	$('#cbmScreen').html(html);
	
	return screen;
}
