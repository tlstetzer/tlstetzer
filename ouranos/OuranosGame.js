/* eslint no-unused-vars: 0 no-undef: 0*/

class OuranosGame {
	constructor(cbm) {
		this.cbm = cbm;
//		q=59467;:r=59466:s=59464:pokeq,16:poker,15:pokes,0: (sound)
		this.a$ = '{home}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}';
		this.bl$ = '                                      ';
		this.c$ = '{CBM-M}{left}{down}N{left}{down}M{down}M{left}{down}NM{CBM-@}{left}{left}{left}{down}M  M{left}{left}{left}{left}{down}{CBM-M}{left}{down}N{left}{left}{down}N{left}{down}';
		this.d$ = ' {left}{down} {left}{down} {down} {left}{down}   {left}{left}{left}{down}    {left}{left}{left}{left}{down} {left}{down} {left}{left}{down} {left}{down}';
		this.e$ = this.c$ + 'M{left}{down}N{left}{left}{down}N{left}{down}{CBM-G}{left}{left}{down}N{left}{left}{left}{left}{down} {CBM-@}N {left}{left}{left}{left}{down}N ';
		this.f$ = this.d$ + ' {left}{down} {left}{left}{down} {left}{down} {left}{left}{down} {left}{left}{left}{down}  {left}{left}{left}{down} ';
		this.g$ = this.c$ + 'M{down}{CBM-G}{left}{down}{CBM-G}{left}{down}M{down}M{left}{down} M{CBM-@} {left}{left}{down} M';
		this.h$ = this.d$ + ' {down} {left}{down} {left}{down} {down} {down}  {down} ';
		this.i$ = this.c$ + 'M{down}M{down}{CBM-G}{left}{left}{down} {CBM-G}{left}{left}{left}{down} N {left}{left}{left}{left}{down} N {left}{left}{left}{down} {CBM-G}';
		this.j$ = this.d$ + ' {down} {down} {left}{down} {left}{left}{down} {left}{left}{down} {left}{down} ';
		this.spc20 = '{rvof}                    ';
		
		this.name1='', this.name2='', this.house1=28, this.house2=28, this.memLoc = 33530;
		this.m=3, this.mm=0;
	}

// ================================================================================================================================= Play Game

// ================================================================================================================================= Subroutines

	houseRemaining() {
		this.house1 = 0, this.house2 = -1;
		var p = 0;

		while(this.house2 == -1) {
			for(var y=1; y<5; y++) {
				for(var x=1; x<8; x++) {
					this.memLoc++;
					var peek = cbm.cbmPeek(this.memLoc);
					if(peek != 32) { p++; }
				}

				this.memLoc = this.memLoc - 47;
			}

			if(this.house2 == -1) {
				this.house1 = p;
				this.house2 = 0;
				p = 0;
				this.memLoc = this.memLoc + 187;
			}

			this.house2 = p;
			this.memLoc = 33530;
		}

		return;
	}

	checkEndOfGame() {
		if(this.house1 < 1 || this.house1 < 1) {
			cbm.cbmDisplay(this.row20 + '{rvon}  ' + spc39 + spc39 + spc39);
			// sys826:forx=1to500:next
			// forv=200to50step-1:pokes,v:next:pokes,0:poker,0:pokeq,0 (sound)
			// sys826;
			
			// display percentage remaining
			cbm.cbmDisplay('{up}{up}{up}{up}{rvon}' + this.name1 + spc20 + '{rvon}' + this.name2);
			cbm.cbmDisplay('{up}{up}{up}{up}{up}{up}{up}{up}{rght}{rght}' + int(this.house1 * 3.6) + '{left}% left');
			cbm.cbmDisplay('{up}{up}' + this.spc20 + int(this.house1 * 3.6) + '{left}% left');
			cbm.cbmDisplay('{home}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{down}{rght}{rght}{rght}{rght}{rght}{rght}{rght}{rght}{rght}{rght}');

			if(this.house1 == this.house2) { cbm.cbmDisplay("     it's a tie!"); }
			else if(this.house1 < this.house2) { cbm.cbmDisplay("the winner is " + this.name2); }
			else { cbm.cbmDisplay("the winner is " + this.name1); }
			
			cbm.cbmDisplay(this.a$ + '{down}{down}want to play again? ');
			
			return true;
		} else {
			return false;
		}
	}

}
