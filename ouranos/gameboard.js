/* eslint no-unused-vars: 0 no-undef: 0*/

function buildBoard() {
	// top row
	var sRow = '{CBM-A}';
	for(var col=1; col<39; col++) { sRow += '{SHIFT-*}'; }
	sRow += '{CBM-S}';
	cbmRow(0, 0, sRow);
	
	// outline
	for(var row=1; row<17; row++) { 
		sRow = '{SHIFT--}                                      {SHIFT--}';
		cbmRow(row, 0, sRow);
	}
	
	// house row 1
	sRow = '{SHIFT--}  {RVON}{SHIFT-POUND}M    {CBM-*}{RVOFF}                    {RVON}{SHIFT-POUND}    N{CBM-*}{RVOFF}  {SHIFT--}';
	cbmRow(row++, 0, sRow);
	
	// house row 2
	sRow = '{SHIFT--}  {RVON} {CBM-M}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{RVOFF}                    {RVON}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-T}{CBM-G} {RVOFF}  {SHIFT--}';
	cbmRow(row++, 0, sRow);
	
	// house row 3
	sRow = '{SHIFT--}  {RVON} {CBM-M}     {RVOFF}                    {RVON}     {CBM-G} {RVOFF}  {SHIFT--}';
	cbmRow(row++, 0, sRow);
	
	// house row 4
	sRow = '{SHIFT--}  {RVON}{CBM-@}{SHIFT-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{RVOFF}                    ';
	sRow += '{RVON}{CBM-@}{CBM-@}{CBM-@}{CBM-@}{CBM-@}L{CBM-@}{RVOFF}  {SHIFT--}';
	cbmRow(row++, 0, sRow);
	
	// names
	var pad1 = Math.ceil((7 - name1.length) / 2);
	cbmRow(19, pad1, name1);
	var pad2 = Math.ceil((7 - name2.length) / 2);
	cbmRow(19, pad2 + 26, name2);
	
	// bottom
	sRow = '{RVON}';
	for(col=0; col<40;col++) { sRow += '{CBM-I}'; }
	cbmRow(22, 0, sRow);
	
	// start game
	house1 = 28;
	house2 = 28;
	m = 3;
	mm = 0;
	playGame();
}
