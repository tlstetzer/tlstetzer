/* eslint no-unused-vars: 0 no-undef: 0*/

$(document).ready(function() {
	cbm = new CBM(splashScreen);
	$('#names').hide();
	$('#playAgain').hide();
});

function initGame() {
	setVariables();
	spc20 = '{rvof}                    ';
	padEP = '       '.substring(0, Math.ceil((7 - ep$.length) / 2));
	padWP = '       '.substring(0, Math.ceil((7 - wp$.length) / 2));
	
	// draw border
	cbm.cbmDisplay('{clr}{CBM-A}');
	for(var v=0; v<38; v++) { cbm.cbmDisplay('{SHIFT-*}'); }
	cbm.cbmDisplay('{CBM-S}');
	for(v=0; v<19; v++) { cbm.cbmDisplay('{SHIFT--}' + bl$ + '{SHIFT--}'); }
	
	// draw houses
	cbm.cbmDisplay('{up}{up}{up}{up}{rght}{rght}{rght}{rvon}{SHIFT-POUND}M    {CBM-*}' + spc20 + '{rvon}{SHIFT-POUND}    N{CBM-*}');
	cbm.cbmDisplay('{down}{rght}{rght}{rght}{rvon} {CBM-M}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}' + spc20 + '{rvon}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-G} ');
	cbm.cbmDisplay('{down}{rght}{rght}{rght}{rvon} {CBM-M}     ' + spc20 + '{rvon}     {CBM-G} ');
	cbm.cbmDisplay('{down}{rght}{rght}{rght}{rvon}{CBM-@}{SHIFT-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}' + spc20 + '{rvon}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}L{CBM-@}');
	cbm.cbmDisplay('{up}{rght}{rght}{rght}{rvon}' + padEP + ep$.substring(0, 7));
	for(v=0; v<21; v++) { cbm.cbmDisplay('{rght}'); }
	cbm.cbmDisplay('{rvon}' + padWP + wp$.substring(0, 7));
	cbm.cbmDisplay(a$);
	for(v=0; v<40; v++) { cbm.cbmDisplay('{rvon}{CBM-I}'); }
	
	// sound
	// poke q,16:poker,15
	
	
/*
  240 forv=1to19:print"{SHIFT--}";bl$;"{SHIFT--}";:next
  250 print"{up}{up}{up}{up}{rght}{rght}{rght}{rvon}{SHIFT-POUND}M    {CBM-*}"spc(20)"{SHIFT-POUND}    N{CBM-*}"
  255 print"{up}{rght}{rght}{rght}{rvon} {CBM-M}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}"spc(20)"{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-G} "
  260 print"{rght}{rght}{rght}{rvon} {CBM-M}     "spc(20)"     {CBM-G} "
  265 t$=left$(ep$,7):print"{up}{up}{rvon}";spc(3.5+(7-len(t$))/2);t$
  275 t$=left$(wp$,7):print"{up}{up}{rvon}";spc(30+(7-len(t$))/2);t$
  285 print"{up}{rght}{rght}{rght}{rvon}{CBM-@}{SHIFT-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}"spc(20)"{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}L{CBM-@}"
  290 printa$:forv=1to40:print"{rvon}{CBM-I}";:next:print
  295 poke q,16:poker,15
*/
}

function setVariables() {
//	q=59467;:r=59466:s=59464:pokeq,16:poker,15:pokes,0: (sound)
	h = 33530;
	a$ = '{home}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}';
	bl$ = '                                      ';
	c$ = '{CBM-M}{left}{down}N{left}{down}M{down}M{left}{down}NM{CBM-@}{left}{left}{left}{down}M  M{left}{left}{left}{left}{down}{CBM-M}{left}{down}N{left}{left}{down}N{left}{down}';
	d$ = ' {left}{down} {left}{down} {down} {left}{down}   {left}{left}{left}{down}    {left}{left}{left}{left}{down} {left}{down} {left}{left}{down} {left}{down}';
	e$ = c$ + 'M{left}{down}N{left}{left}{down}N{left}{down}{CBM-G}{left}{left}{down}N{left}{left}{left}{left}{down} {CBM-@}N {left}{left}{left}{left}{down}N ';
	f$ = d$ + ' {left}{down} {left}{left}{down} {left}{down} {left}{left}{down} {left}{left}{left}{down}  {left}{left}{left}{down} ';
	g$ = c$ + 'M{down}{CBM-G}{left}{down}{CBM-G}{left}{down}M{down}M{left}{down} M{CBM-@} {left}{left}{down} M';
	h$ = d$ + ' {down} {left}{down} {left}{down} {down} {down}  {down} ';
	i$ = c$ + 'M{down}M{down}{CBM-G}{left}{left}{down} {CBM-G}{left}{left}{left}{down} N {left}{left}{left}{left}{down} N {left}{left}{left}{down} {CBM-G}';
	j$ = d$ + ' {down} {down} {left}{down} {left}{left}{down} {left}{left}{down} {left}{down} ';
	f=28;
	g=28;
	m=3;
	mm=0;
}

function getNames() {
	// get names
	if(debug === false) {
		cbm.cbmDisplay("{down}what's player 1's name? ");
		ep$ = cbm.cbmInput(7);
		cbm.cbmDisplay("{down}what's player 2's name? ");
		wp$ = cbm.cbmInput(7);
	} else {
		ep$ = 'terri';
		wp$ = 'skeeter';
		initGame();
	}
}

function splashScreen() {
	if(debug === false) {
		cbm.cbmDisplay('{clr}{down}{down}');
		cbm.cbmTab(9);
		cbm.cbmDisplay('cursor #' + '21  ' + 'ouranos!');
		cbm.cbmDisplay('{down} copyright (c) 1980  by kathy higby{down}');
		for(var i=0; i<10; i++) { cbm.cbmDisplay('{SHIFT-*}{SHIFT-*}{SHIFT-*}{SHIFT-*}'); }
		cbm.cbmDisplay('{down}take the enemy by storm');
		cbm.cbmDisplay('{down}{down}{down}press {rvon}return{rvof} to begin');

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
