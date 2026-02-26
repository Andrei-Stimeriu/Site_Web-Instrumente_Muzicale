//Facem legatura cu css-ul
function legCSS(){
	const head = document.getElementsByTagName("head")[0];
	
	const css = document.createElement("link");
	css.rel = "stylesheet";
	css.href = "css.css";
	
	head.appendChild(css);
}

////////////////

const divCeas = document.getElementById("divCeas");

const cheiaSol = document.getElementById("cheiaSol");
const saispre = document.getElementById("saispre");
const bemol = document.getElementById("bemol");

const c = document.getElementById("c");
const cc = c.getContext("2d");

var wiDiv, wiDivPe306;
var wiCanPe2, wiCanPe306, raport;
var valJos;

var rH, rM, rS, gH, gM, gS;

var culoareAce;

function initializari(){
	//se executa la incarcarea si la fiecare
	//redimensionare a paginii
	
	//aici se calculeaza cat mai multi parametri
	//pentru eficienta. (nu se mai calculeaza la
	//fiecare cadru, in functia ceas())
	
	wiDiv = divCeas.clientWidth;
	c.width = Math.max(wiDiv, 612); c.height = c.width;
	wiDivPe306 = wiDiv/306;
	valJos = -wiDiv*5/6;
	wiCanPe2 = c.width / 2;
	wiCanPe306 = c.width / 306;
	raport = wiDiv / c.width;
	
	//lungimile si grosimile acelor ceasului
	rH = 100*wiCanPe306, rM = 130*wiCanPe306, rS = 140*wiCanPe306; //lungimile acelor
	gH = 10*wiCanPe306, gM = 6*wiCanPe306, gS = 3*wiCanPe306; //grosimile acelor

	cc.strokeStyle = culoareAce;
}

const culoareZi = "#770000";
const culoareNoapte = "#ffc5ae";

function modZiNoapte(h){
	//seteaza modul de zi sau de noapte al ceasului
	//in functie de ora (h)
	//De la 6 AM - mod zi
	//De la 8 PM - mod noapte / seara
	if(h >= 6 && h < 20){
		divCeas.style.backgroundImage = "url(\"Ceas/Imagini/ceas zi.png\")";
		cc.strokeStyle = culoareZi;
		culoareAce = culoareZi;
		return;
	}
	divCeas.style.backgroundImage = "url(\"Ceas/Imagini/ceas noapte.png\")";
	cc.strokeStyle = culoareNoapte;
	culoareAce = culoareNoapte;
}

window.onload=function(){
	legCSS();
	setTimeout(()=>{
		initializari();
		modZiNoapte((new Date()).getHours());
		document.body.onresize = initializari;
		setInterval(ceas, 16); //60+ fps
	}, 32);
	
}

function desenAc(poz, g){
	cc.beginPath();
	cc.moveTo(wiCanPe2, wiCanPe2); //centru
	cc.lineWidth = g;
	cc.lineTo(poz[0], poz[1]); //pozitia varfului
	cc.stroke();
}

function desen(pozH, pozM, pozS, grH, grM, grS){
	desenAc(pozH, grH);
	desenAc(pozM, grM);
	desenAc(pozS, grS);
}


const piPe6 = Math.PI/6;
const piPe30 = Math.PI/30;
const piPe1800 = Math.PI/1800;
//Asa nu se mai fac de fiecare data impartirile
// => codul e mai eficient
function ceas(){
	//preluam ora computerului
	var time = new Date();
	
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	var ms = time.getMilliseconds();
	
	//unghiurile acelor fata de verticala
	var unghiH = (h + m/60 + s/3600)*piPe6;
	var unghiM = (m + s/60)*piPe30;
	var unghiS = (s + ms/1000)*piPe30;
	
	//mod zi sau mod noapte?
	if(unghiM < piPe1800){ //daca e ora fixa
		//(minutul si secunda = 0)
		modZiNoapte(h);
	}
	
	//pozitiile varfurilor acelor ceasului
	var pozH = [wiCanPe2 + rH*Math.sin(unghiH), wiCanPe2 - rH*Math.cos(unghiH)];
	var pozM = [wiCanPe2 + rM*Math.sin(unghiM), wiCanPe2 - rM*Math.cos(unghiM)];
	var pozS = [wiCanPe2 + rS*Math.sin(unghiS), wiCanPe2 - rS*Math.cos(unghiS)];
	//desenam acele
	cc.clearRect(0, 0, c.width, c.height);
	desen(pozH, pozM, pozS, gH, gM, gS);
	
	//pozitionam notele muzicale
	cheiaSol.style.left = ((pozH[0]*0.80 + 15)*raport).toString() + "px";
	cheiaSol.style.top = ((pozH[1]*0.80 - 12)*raport).toString() + "px";
	
	saispre.style.left = ((pozS[0]*0.9 - 6)*raport).toString() + "px";
	saispre.style.top = ((pozS[1]*0.9 - 6)*raport).toString() + "px";
	
	bemol.style.left = ((pozM[0]*0.86 + 9)*raport).toString() + "px";
	bemol.style.top = ((pozM[1]*0.86 - 6)*raport).toString() + "px";
}

var pozitie = "normala";
function miscare(){
	//muta ceasul jos (sau inapoi) cand dam click pe el
	if(pozitie == "normala"){
		divCeas.style.bottom = valJos.toString() + "px"; //se muta in jos
		pozitie = "jos";
	}
	else{ //daca e jos
		divCeas.style.bottom = "0"; //se muta inapoi (in sus)
		pozitie = "normala";
	}
}