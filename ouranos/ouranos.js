/* eslint no-unused-vars: 0 no-undef: 0*/

var debug = true;
var player1, player2, cbm, cursor, currentPlayer, gameRound;
var row20, spc20, spc38, lightning;

$(document).ready(function() {
	initGlobalVariables();
	cbm = new CBM(gameIntro);
	//readaa,bb:forz=aatobb:readw:pokez,w:next
	//data826,849,162,128,160,0,132,33,134,34,177,33,73,128,145,33
	//data200,208,247,232,224,132,208,240,96,0
	//q=59467:r=59466:s=59464:pokeq,16:poker,15:pokes,0
});

function getPlayer2(name) {
	if(debug === true) {
		player1 = padName('daisy');
		drawScreen('skeeter');
	} else {
		player1 = padName(name.toLowerCase());
		cbm.display("{down}{down}what's player 2's name? ");
		cbm.getInput(drawScreen);
	}
}

function drawScreen(name) {
	player2 = padName(name.toLowerCase());

	cbm.display('{clr}{CBM-A}');
	cbm.displayLoop('{SHIFT-*}', 38);
	cbm.display('{CBM-S}');
	cbm.displayLoop('{SHIFT--}' + spc38 + '{SHIFT--}', 19);
	cbm.print('{up}{up}{up}{up}{rght}{rght}{rght}{rvon}{SHIFT-POUND}M    {CBM-*}' + spc20 + '{rvon}{SHIFT-POUND}    N{CBM-*}');
	cbm.print('{rght}{rght}{rght}{rvon} {CBM-M}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}' + spc20 + '{rvon}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-G} ');
	cbm.print('{rght}{rght}{rght}{rvon} {CBM-M}     ' + spc20 + '{rvon}     {CBM-G} ');
	cbm.print('{up}{rght}{rght}{rght}{rvon}' + player1 + spc20 + '{rvon}' + player2);
	cbm.print('{rght}{rght}{rght}{rvon}{CBM-@}{SHIFT-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}' + spc20 + '{rvon}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}L{CBM-@}');
	cbm.print(row20);
	cbm.displayLoop('{rvon}{CBM-I}', 40);
	playGame();
	//poke q,16:poker,15
}

function playGame() {
	var eog = checkEndOfGame();
	
	if(eog == false) {
		var b = 0;
		var nn = 0;
		initPlay();
		if(currentPlayer == 3 && cbm.rnd(1) > .33) { initPlay(); }

		b = displayCloud(b);
		printWeather(b);
		if(currentPlayer == 3) { randomAttack(); }
		else { displayRound(); playerAttack(b); }
	}
}

function attackHouse(input) {
	
}

/*
  520 w$="rain":ifleft$(w$,o)=in$thenff=5:tt=ff:o=2:goto590
  530 w$="hail":ifleft$(w$,o)=in$thencc=58:ff=4:tt=ff:o=0:goto590
  540 w$="tornado":ifleft$(w$,o)=in$thencc=102:ff=7:tt=ff:o=1:goto590
  550 w$="lightning":ifleft$(w$,o)=in$theno=0:goto590
  560 w$="quit":ifleft$(w$,o)=in$then1390
  580 print"{up}{up}":goto430
  590 print"{up} weapon is {rvon}";w$
  595 ifo=1thenprint"{home}{down}";:forv=1to40:print"{CBM-+}{CBM-+}";:next:printa$;"{down}{down}
  600 ifm=3thena1=0:print
  610 ifm<3thenprint"{rght}charge? ";:gosub60000:bb$=in$:a1=val(bb$)
  615 print"{up} charge is";a1
  620 ifa1<-150thena1=-150
  630 ifa1>150thena1=150
  640 ifb$="h"thengosub1270:goto670
  650 ifb$="l"thengosub1270:goto1070
  660 ifo=1thenprint"{home}{down}{down}{down}";:forv=1to20:print"{CBM-+}{CBM-+}";:next:print:ee=1.5*ee
  670 e=(a1+ee)/50:dd=0:gg=104
  680 ifo=2ande<0thencc=47:goto710
  690 ifo=2ande>0thencc=28:goto710
  700 ifo=2thencc=66
  710 a=32892+aa:bb=0:ff=tt:t=ww:i=0:forw=1to16:ww=w:pokes,w*10
  720 ifo<>1ordd=1thenpokes,0
  730 ift=wwthenw=16:ww=0
  740 a=a+(40+e):gosub870:next
  750 ifo<>1then840
  760 ifpeek(c+1)=93orpeek(c-1)=93then840
  770 pokec+1,gg:pokec-1,gg
  780 ifpeek(c+2)=93orpeek(c-2)=93then840
  790 pokec+2,gg:pokec-2,gg
  800 ife>0ore=0thenpokec-38,32:pokec-39,32
  810 ife<0ore=0thenpokec-41,32:pokec-42,32
  820 ifdd=0thengosub1370:goto840
  830 ifdd=1thenpoker,51:forv=100to10step-2:pokes,v:next:poker,15:pokes,0
  840 ifnn<>1thengosub1270
  850 ifdd=0thendd=1:cc=32:gg=cc:goto710
  860 goto300
  865 goto 300
  870 c=a:forz=1toff:c=c+1:d=peek(c):ifo=1ande<0thend=peek(c-1)
  880 ifd=93thengosub1310:w=16:o=0:return
  890 ifd>127anddd=0thengosub940
  900 ifi>2thenw=16
  910 pokec,cc:ifcc=58thenpokes,ff*10:pokes,0
  920 next:bb=1-bb:ifbb=0andb$="t"thenff=ff-1
  930 return
  940 forx=1to3:pokec,170:gosub960:pokec,58:gosub960:next:i=i+1:ifo<>0thenw=16
  950 return
  960 pokes,z*10:forv=1to50:next:pokes,0:return

 1070 a1=a1/33:ifa1<-4thena1=-4
 1080 ifa1>4thena1=4
 1090 ifa1>1thena1=a1-1
 1100 aa=aa+a1+7
 1110 ifaa>33thenaa=33
 1120 ifaa<6thenaa=6
 1130 forz=1to3:gosub1250:printc$:sys826:sys826:gosub1250:printd$:next
 1140 gosub1260:gosub1250:printc$:sys826:sys826:gosub1250:printd$:gosub1270
 1150 ifa1>0then1200
 1160 ifa1=0then1230
 1170 forz=1to2:gosub1250:printe$:sys826:gosub1290:sys826:gosub1250:printf$
 1180 aa=aa+1
 1190 next:goto300
 1200 forz=1to2:gosub1250:printg$:sys826:gosub1290:sys826:gosub1250:printh$
 1210 aa=aa-1
 1220 next:goto300
 1230 forz=1to2:gosub1250:printi$:sys826:gosub1290:sys826:gosub1250:printj$
 1240 next:goto300
 1250 print"{home}{down}{down}{down}{down}"spc(aa);:forv=1to25:next:return

 1290 pokeq,0:forv=1to30:poke59468,194:poke59468,12:next:pokeq,16:poker,15
 1300 return
 1310 ifnn=1thenreturn
 1330 print"{home}";tab(13);"{rvon}out of bounds!":gosub1370:forv=1to2500:next
 1350 print"{home}";tab(13)"{SHIFT-*}{SHIFT-*} round"mm"{left} {SHIFT-*}{SHIFT-*}{SHIFT-*}":nn=1:return
 1370 forx=1to10:forv=10to200step25:pokes,v:next:next:pokes,0:return

 9999 end


*/

function initPlay() {
	gameRound++;
	currentPlayer++;
	if(currentPlayer > 3) { currentPlayer = 1; }
	cbm.display('{home}');
	cbm.tab(15);
	cbm.display('{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}');
}

function displayCloud(b) {
	var a = 32812;
	var aa = parseInt(cbm.rnd(1) * 26);
	
	cbm.display('{home}{down}{rvof}');
	cbm.displayLoop('{SHIFT--}' + spc38 + '{SHIFT--}', 3);
	a += aa;
	b = 1 - b;
	cbm.poke(a, 104);
	for(var v=0; v<4; v++) { a++; cbm.poke(a, 102); }
	for(v=0; v<5; v++) { a++; cbm.poke(a, 104); }
	a += 27;
	cbm.poke(a, 104);
	for(v=0; v<11; v++) { a++; cbm.poke(a, 102); }
	cbm.poke(a, 104);
	a += 33;
	cbm.poke(a, 104);
	for(v=0; v<6; v++) { a++; cbm.poke(a, 102); }
	cbm.poke(a, 104);
	
	return b;
}

function printWeather(b) {
	// target
	cbm.display(row20 + '{rvon}  ' + spc38 + row20 + '{rght}{rght}{rght}');
	if(currentPlayer == 3) { cbm.display('{rvof}target                    target'); }
	else if(b == 0) { cbm.display('{rvof}target{rvon}                    attacker'); }
	else { cbm.display('{rvon}attacker                   {rvof}target'); }
	
	// wind
	var dir = 'CC>';
	var ee = parseInt(cbm.rnd(1) * 100);
//	var ee = parseInt(cbm.rnd(1) * 100);
	if(ee > 50) {
		ee = parseInt(-ee / 2);
		dir = '<CC';
	}
	
	var a = Math.abs(ee);
	
	cbm.display(row20);
	cbm.tab(15);
	cbm.display('{rvon} wind ' + dir + Math.abs(ee) + '{    {down}');
	cbm.print('{down}  ' + spc38);
}

async function randomAttack() {
	for(var x=0; x<4; x++) {
		cbm.print(spc38);
		cbm.display('{up}');
		gosub1280();
		await cbm.sleep(500);
		cbm.tab(13);
		cbm.print('{rvon}act of nature{rvof}{up}');
	}

	await cbm.sleep(2000);
	cbm.print(spc38);
	
	// get weather type
	var rValue = parseInt(cbm.rnd(1)*4) + 1;
	if(rValue == 1) { attackHouse('h'); }
	else if(rValue == 2) { attackHouse('l'); }
	else if(rValue == 3) { attackHouse('r'); }
	else if(rValue == 4) { attackHouse('t'); }
}

function playerAttack(b) {
	var allowed = ['h', 'l', 'r', 't'];
	var name = player1;
	if(b == 0) { name == player2; }
	cbm.display(row20 + '{down}{down}' + name.trim() + ': weapon (h,l,r,t) ? ');
	
	// wait for player input
	$(document).on('keydown', function(event) {
		var key = event.key.lowercase();

		if(allowed.includes(key)) { 
			$(document).off('keydown');
			attackHouse(key);
		}
	});
}

async function displayRound() {
	if(currentPlayer != 1) { gosub1280(); }
	else {
		//pokes,255:
		cbm.display('{home}');
		cbm.tab(15);
		cbm.display(' round' + gameRound + '{left} ');
		for(var x=0; x<2; x++) { await cbm.sleep(500); }
		//pokes,0
	}
}




function gosub1280() {
	//pokes,m*50:forv=1to100:next:pokes,0:return
}

function checkEndOfGame() {
	var house1 = houseRemaining(33530);
	var house2 = houseRemaining(33557);
	
	if(house1 < 1 || house2 < 0) {
		cbm.display(row20 + '{rvon}  ' + spc38)
		cbm.print(spc38);
		cbm.print(spc38);
		
		//sys826:forx=1to500:next
		//forv=200to50step-1:pokes,v:next:pokes,0:poker,0:pokeq,0
		//sys826
		

		var winner = player1;
		var pct = house1 * 3.6;
		
		if(house2 > 0) {
			winner = player2;
			pct = house2 * 3.6;
		}
		
		cbm.display('{up}{up}{up}{up}{rvon}' + player1 + spc20 + player2);
		cbm.display('{up}{up}{up}{up}{up}{up}{up}{up}{rght}{rght}' + parseInt(house1 * 3.6) + '{left}% left');
		cbm.display(spc20 + parseInt(house2 * 3.6) + '{left}% left');
		cbm.print('{home}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{rght}{rght}{rght}{rght}{rght}{rght}{rght}{rght}{rght}{rght}');
		
		if(house1 == house2) { cbm.print("     it's a tie!"); }
		else if(house1 < house2) { cbm.print('the winner is ' + player2); }
		else { cbm.print('the winner is ' + player1); }
		
		cbm.display(row20 + '{down}{down}want to play again? ');

		// wait for y or n key
		$(document).on('keydown', function(event) {
			var key = event.key.lowercase();

			if(key == 'y') { 
				$(document).off('keydown');
				var temp = player1;
				player1 = player2;
				drawScreen(temp);
			} else if(key == 'n') {
				$(document).off('keydown');
				cbm.print('{clr}{down}{down}' + spc20 + 'game over!');
			}
			
			return true;
		});
	} else {
		return false;
	}
/*

 1530 goto 230
 1600 print"{clr}{down}{down}":end
*/
}

function houseRemaining(housePos) {
	var pct = 0;
	
	for(var y=0; y<4; y++) {
		for(var x=0; x<7; x++) {
			housePos++;
			var d = cbm.peek(housePos);
			if(d != 32) { pct++; }
		}
		housePos -= 47;
	}
	
	return pct;
}

function gameIntro() {
	if(debug === true) {
		getPlayer2('terri');
	} else {
		cbm.display('{clr}{down}{down}');
		cbm.tab(9);
		cbm.display('cursor #' + '21  ' + 'ouranos!');
		cbm.display('{down} copyright (c) 1980  by kathy higby{down}');
		cbm.displayLoop('{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}', 10);
		cbm.display('{down}take the enemy by storm');
		cbm.display('{down}{down}{down}press {rvon}return{rvof} to begin');

		cbm.display('');

		// wait for enter key
		$(document).on('keydown', function(key) {
			if(key.which == 13) { 
				$('#title').html('');
				$(document).off('keydown');
				cbm.display("{clr}{down}what's player 1's name? ");
				cbm.getInput(getPlayer2);
			}
		});
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

function initGlobalVariables() {
	debug = true;
	player1 = '', player2 = '';
	cbm, cursor = 33530, currentPlayer = 3, gameRound = 0;
	row20 = '{home}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{home}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}';
	spc20 = '{rvof}                    ';
	spc38 = '                                      ';
	lightning = {};
	lightning.show = '{CBM-M}{left}{down}N{left}{down}M{down}M{left}{down}NM{CBM-@}{left}{left}{left}{down}M  M{left}{left}{left}{left}{down}{CBM-M}{left}{down}N{left}{left}{down}N{left}{down}';
	lightning.hide = ' {left}{down} {left}{down} {down} {left}{down}   {left}{left}{left}{down}    {left}{left}{left}{left}{down} {left}{down} {left}{left}{down} {left}{down}';
	lightning.show1 = lightning.show + 'M{left}{down}N{left}{left}{down}N{left}{down}{CBM-G}{left}{left}{down}N{left}{left}{left}{left}{down} {CBM-@}N {left}{left}{left}{left}{down}N ';
	lightning.hide1 = lightning.hide + ' {left}{down} {left}{left}{down} {left}{down} {left}{left}{down} {left}{left}{left}{down}  {left}{left}{left}{down} ';
	lightning.show2 = lightning.show + 'M{down}{CBM-G}{left}{down}{CBM-G}{left}{down}M{down}M{left}{down} M{CBM-@} {left}{left}{down} M';
	lightning.hide2 = lightning.hide + ' {down} {left}{down} {left}{down} {down} {down}  {down} ';
	lightning.show3 = lightning.show + 'M{down}M{down}{CBM-G}{left}{left}{down} {CBM-G}{left}{left}{left}{down} N {left}{left}{left}{left}{down} N {left}{left}{left}{down} {CBM-G}';
	lightning.show4 = lightning.hide + ' {down} {down} {left}{down} {left}{left}{down} {left}{left}{down} {left}{down} ';
}
