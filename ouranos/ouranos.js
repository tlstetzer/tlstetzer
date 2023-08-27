/* eslint no-unused-vars: 0 no-undef: 0*/

$(document).ready(function() {
	cbm = new CBM(initGame);
});

function initGame() {
	game = new OuranosGame(cbm);
	splashScreen(false);
}

// ================================================================================================================================= Game

function startGame(name2) {
	game.name2 = padName(name2.toLowerCase());
	
	// draw border
	cbm.cbmDisplay('{clr}{CBM-A}');
	for(var v=0; v<38; v++) { cbm.cbmDisplay('{SHIFT-*}'); }
	cbm.cbmDisplay('{CBM-S}');
	for(v=0; v<19; v++) { cbm.cbmDisplay('{SHIFT--}' + game.bl$ + '{SHIFT--}'); }
	
	// draw houses
	var houseBottom1 = '{rvon}{CBM-@}{SHIFT-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}';
	var houseBottom2 = '{rvon}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}L{CBM-@}';
	cbm.cbmDisplay('{up}{up}{up}{up}{rght}{rght}{rght}{rvon}{SHIFT-POUND}M    {CBM-*}' + game.spc20 + '{rvon}{SHIFT-POUND}    N{CBM-*}');
	cbm.cbmDisplay('{down}{rght}{rght}{rght}{rvon} {CBM-M}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}' + game.spc20 + '{rvon}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-G} ');
	cbm.cbmDisplay('{down}{rght}{rght}{rght}{rvon} {CBM-M}     ' + game.spc20 + '{rvon}     {CBM-G} ');
	cbm.cbmDisplay('{down}{rght}{rght}{rght}' + houseBottom1 + game.spc20 + houseBottom2);
	cbm.cbmDisplay('{up}{rght}{rght}{rght}{rvon}' + game.name1);
	for(v=0; v<20; v++) { cbm.cbmDisplay('{rght}'); }
	cbm.cbmDisplay('{rvon}' + game.name2);
	cbm.cbmDisplay(game.a$);
	for(v=0; v<40; v++) { cbm.cbmDisplay('{rvon}{CBM-I}'); }
	
	// sound
	// poke q,16:poker,15
	playGame();
}

function playGame() {
	// 300
	game.houseRemaining();
	var eog = game.checkEndOfGame();
	
	if(eog === true) { splashScreen(true); }
	else { 
		// 310 to 315
		var inLoop = true;

		while(inLoop === true) {
			game.m++;
			if(game.m > 3) {
				game.m = 1;
				game.mm ++;
				b = 0;
				cbm.cbmDisplay('{home}');
				cbm.col = 15;
				cbm.cbmDisplay('{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}');
//				if(game.m != 3 && cbm.cbmRND(1) <= .33) { inLoop = false; }
				if(game.m != 3) { inLoop = false; }
			} else { inLoop = false; }
		}

		// 320
		cbm.cbmDisplay('{home}{down}{rvof}');
		for(var v=1; v<3; v++) { cbm.cbmDisplay('{SHIFT--}' + game.bl$ + '{SHIFT--}'); }

		// 330
		a = 32812;
		aa = cbm.cbmRND(1) * 26;
		a = a + aa;
		b = 1 - b;

		// 340
		cbm.cbmPoke(a, 104);
		for(v=1; v<5; v++) { a++; cbm.cbmPoke(a, 102); }
		for(v=1; v<6; v++) { a++; cbm.cbmPoke(a, 104); }

		// 350
		a = a + 27;
		cbm.cbmPoke(a, 104);
		for(v=1; v<12; v++) { a++; cbm.cbmPoke(a, 102); }
		cbm.cbmPoke(a, 104);
		a = a + 33;
		
		// 360
		cbm.cbmPoke(a, 104);
		for(v=1; v<7; v++) { a++; cbm.cbmPoke(a, 102); }
		cbm.cbmPoke(a, 104);
		nn = 0;

		// 365
		cbm.cbmDisplay(game.a$ + '{rvon}' + game.bl$ + '  ' + game.a$ + '{rght}{rght}{rght}');

		// 370 to 390
		if(game.m == 3) { cbm.cbmDisplay('target                     target'); }
		else if(b == 0) { cbm.cbmDisplay('target                     {rvon}attacker'); }
		else { cbm.cbmDisplay('{rvon}attacker{rvof}                   target'); }
		cbm.row = 20;
		cbm.col = 14;

		// 400 to 420
		ee = parseInt(cbm.cbmRND(1) * 100);
		if(ee > 50) { 
			ee = parseInt(-ee / 2); 
			cbm.cbmDisplay('{rvon} wind <CC' + Math.abs(ee) + '{left}    {down}');
		} else {
			cbm.cbmDisplay(game.a$ + '               {rvon} wind CC>' + ee + '{left}     {down}');
		}
		
		// 430
		cbm.cbmDisplay(game.bl$ + game.bl$ + '{up}{up}');

		// 450 to 482
		var goto = 0;
		if(game.m < 3) { goto = 490; }
		else {
			// 460
			for(var x=1; x<5; x++) {
				cbm.cbmDisplay(game.bl$ + '{up}');
				gosub1280();
				gosub1260();
				
				// 470
				cbm.col = 13;
				cbm.cbmDisplay('{rvon}act of nature{rvof}{up}');
				gosub1280();
			}
			
			// 480
			gosub1270();
			gosub1270();
			cbm.cbmDisplay(game.bl$);

			// 482
			o = 1;
			b$ = 'hlrt'.substring(parseInt(cbm.cbmRND(1) * 4) + 1, o);
			in$ = b$;
			goto = 520;
		}

		// 490
		if(goto == 490) {
			if(game.m != 1) { gosub1280(); }
			else {
				// 500
				// pokes,255
				cbm.cbmDisplay('{home}');
				cbm.col = 15;
				cbm.cbmDisplay(' round ' + game.mm + ' ');
				for(var x=1; x<3; x++) { gosub1260(); }
				// pokes,0
			}
		}
	}
}

function gosub1260() {
	for(var v=1; v<501; v++) { var tmp = 'wait'; }
	return
}

function gosub1270() {
	for(var v=1; v<1001; v++) { var tmp = 'wait'; }
	return
}

function gosub1280() {
	//pokes,m*50
	for(var v=1; v<101; v++) { var tmp = 'wait'; }
	// pokes,0
	return
}

function rerunGame(value) {
	if(value.toLowerCase() == 'y') {
		var oldname1 = game.name1, oldname2 = game.name2;
		game = new OuranosGame(cbm);
		game.name1 = oldname1;
		startGame(oldname2);
		game.name2 = oldname2;
	} else {
		location.reload();
	}
}

// ================================================================================================================================= Init Game

function splashScreen(rerun) {
	if(debug === false) {
		cbm.cbmDisplay('{clr}{down}{down}');
		cbm.cbmTab(9);
		cbm.cbmDisplay('cursor #' + '21  ' + 'ouranos!');
		cbm.cbmDisplay('{down} copyright (c) 1980  by kathy higby{down}');
		for(var i=0; i<10; i++) { cbm.cbmDisplay('{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}'); }
		cbm.cbmDisplay('{down}take the enemy by storm');
		cbm.cbmDisplay('{down}{down}{down}press {rvon}return{rvof} to begin');

		// wait for enter key
		if(rerun === true) {
			cbm.cbmInput(rerunGame);
		} else {
			$(document).on('keypress', function(key) {
				if(key.which == 13) { 
					$('#title').html('');
					$(document).off('keypress');
					getName1();
				}
			});
		}
	} else {
		getName1();
	}
}

function getName1() {
	if(debug === false) {
		cbm.cbmDisplay("{down}what's player 1's name? ");
		cbm.cbmInput(getName2);
	} else {
		getName2('Terri');
	}
}

function getName2(name1) {
	game.name1 = padName(name1.toLowerCase());
	// get names
	if(debug === false) {
		cbm.cbmDisplay("{down}what's player 2's name? ");
		cbm.cbmInput(startGame);
	} else {
		startGame('Skeeter');
	}
}

function padName(name) {
	if(name.length == 7) { return name; }
	else if(name.length == 6) { return name + ' '; }
	else if(name.length == 5) { return ' ' + name + ' '; }
	else if(name.length == 4) { return ' ' + name + '  '; }
	else if(name.length == 3) { return '  ' + name + '  '; }
	else if(name.length == 2) { return '  ' + name + '   '; }
	else if(name.length == 1) { return '   ' + name + '   '; }
}
