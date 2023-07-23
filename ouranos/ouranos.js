/* eslint no-unused-vars: 0 no-undef: 0*/

$(document).ready(function() {
	memory = 33530;
	board = cbmScreen();
	$('#names').hide();
	$('#gameboard').hide();
	$('#playAgain').hide();
	showTitle();
});

function playGame() {
	houseStanding();
	if(house1 < 1 || house2 < 1) { endGame(); }
/*
  310 m=m+1:ifm>3thenm=1:mm=mm+1:b=0:print"{home}";tab(15);"{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}
  315 ifm=3andrnd(1)>.33then310
  320 print"{home}{down}{rvof}";:forv=1to3:print"{SHIFT--}";bl$;"{SHIFT--}";:nextv:print
  330 a=32812:aa=rnd(1)*26:a=a+aa:b=1-b
  340 pokea,104:forv=1to4:a=a+1:pokea,102:next:forv=1to5:a=a+1:pokea,104:next
  350 a=a+27:pokea,104:forv=1to11:a=a+1:pokea,102:next:pokea,104:a=a+33
  360 pokea,104:forv=1to6:a=a+1:pokea,102:next:pokea,104:nn=0
  365 printa$"{rvon}";bl$;"  ":printa$;"{rght}{rght}{rght}";
  370 ifm=3thenprint"target"spc(21)"target":goto400
  380 ifb=0thenprint"target"spc(21)"{rvon}attacker":goto400
  390 print"{rvon}attacker{rvof}"spc(20)"target
*/
	
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

function houseStanding() {
	var g=-1, p=0;
	
	while(g == -1) {
		for(var y=1; y<5; y++) {
			for(var x=1; x<8; x++) {
				memory++;
				var peek = cbmPeek(memory, board);
				if(peek != 32) { p++; }
			}

			memory = memory - 47;
		}
		
		if(g == -1) {
			house1 = p;
			g = 0;
			p = 0;
			memory = memory + 187;
		}
		
		house2 = p;
		memory = 33530;
	}

	return;
}

function endGame() {
	// clear bottom
	var sRow = '{RVON}                                        ';
	cbmRow(21, 0, sRow);
	cbmRow(22, 0, sRow);
	cbmRow(23, 0, sRow);
	
	// get totals
	b$ = name2;
	var p=house1 * 3.6;
	if(house2 > 0) {
		b$=name1;
		p=house2 * 3.6;
	}
	
	// display names
	var pad1 = Math.ceil((7 - name.length) / 2);
	var pad2 = Math.ceil((7 - name2.length) / 2);
	cbmRow(14, pad1, '{RVON}' + name1);
	cbmRow(14, pad2 + 26, '{RVON}' + name2);
	
	// print % left
	cbmRow(16, pad, parseInt(house1 * 3.6) + ' % left');
	cbmRow(16, pad + 26, parseInt(house2 * 3.6) + ' % left');
	
	// print winner
	if(house1 == house2) { cbmRow(18, 35, "it's a tie!"); }
	else if(house1 < house2) { cbmRow(18, 18 - pad2, "the winner is: " + house2); }
	else { cbmRow(18, 18 - pad1, "the winner is: " + house2); }
	
	$('#playAgain').show();
	$('#playButton').on('click', function() {
		var temp = name1;
		name1 = name2;
		name2 = temp;
		buildBoard();
	});
	$('#playButton').on('click', function() { location.reload(); });
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
