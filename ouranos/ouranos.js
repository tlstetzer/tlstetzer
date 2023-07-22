/* eslint no-unused-vars: 0 no-undef: 0*/

$(document).ready(function() {
	initGame();
	board = cbmScreen();
	$('#names').hide();
});

function initGame() {
	// game title
	$('#names').hide();
	$('#gameboard').hide();
	showTitle('OURANOS!', '21');  // gosub 62000
	
	
	
//	q=59467:r=59466:s=59464:pokeq,16:poker,15:pokes,0:h=33530;
//	f=28:g=28:m=3:mm=0
}

// 100 to 108
function getNames() {
	if(debug == true) {
		name1 = 'terri';
		name2 = 'skeeter';
		setTimeout(function() { buildBoard(); }, 300);
	} else {
		$('#title').hide();
		$('#names').show();

		// button click
		$('#nameButton').on('click', function() {
			$('#names').hide();
			name1 = $('#name1').val().toLowerCase();
			name2 = $('#name2').val().toLowerCase();
			buildBoard();
		});
	}
}

function gosub970() {
	var f=0, g=-1, p=0;
	
	while(g == -1) {
		for(var y=1; y<5; y++) {
			for(var x=1; x<8; x++) {
				h++;
				d = peek(h);
				if(d != 32) { p++; }
			}
			h = h - 47;
		}
		
		if(g == -1) {
			f = p;
			g = 0;
			p = 0;
			h = h + 187;
		}
	}

	g = p;
	h = 33530;
	return;
}

// 62000 to 62060
function showTitle() {
	if(debug == false) {
		var html = '<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CURSOR #21&nbsp;&nbsp;Ouranos';
		html += '<br> COPYRIGHT (c) 1980  by KATHY HIGBY<br>'
		html += '<hr>';
		html += '<br>TAKE THE ENEMY BY STORM';
		html += '<br><br><br>PRESS {RV}RETURN{RV} TO BEGIN';
		$('#title').html(html);

		// wait for enter key
		$(document).on('keypress', function(key) {
			if(key.which == 13) { 
				$('#title').html('');
				$(document).off('keypress');
				getNames();
			}
		});
	} else {
		getNames();
	}
}
