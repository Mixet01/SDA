const settings={

BASE_GIORNO:10,
BASE_NOTTE:12,

OT_GIORNO:14,
OT_NOTTE:16,

SABATO_GIORNO:13,
SABATO_NOTTE:15,

FESTIVO_GIORNALIERO:18,
FESTIVO_NOTTURNO:20,

FERIE:80,
MALATTIA:80,
FESTIVO_GODUTO:80,

SOGLIA_STRAORDINARIO:8

}

let data=JSON.parse(localStorage.getItem("sda_data")||"[]")

function salva(){

localStorage.setItem("sda_data",JSON.stringify(data))

}

function aggiungi(){

let date=document.getElementById("date").value
let start=document.getElementById("start").value
let end=document.getElementById("end").value

let festivo=document.getElementById("festivo").checked
let festivo_goduto=document.getElementById("festivo_goduto").checked
let ferie=document.getElementById("ferie").checked
let malattia=document.getElementById("malattia").checked

let risultato=calcola(date,start,end,festivo,festivo_goduto,ferie,malattia)

data=data.filter(e=>e.date!=date)

data.push({

date,
start,
end,
desc:risultato.desc,
total:risultato.total

})

salva()

render()

}

function calcola(date,start,end,festivo,festivo_goduto,ferie,malattia){

if(ferie)
return{desc:"Ferie",total:settings.FERIE}

if(malattia)
return{desc:"Malattia",total:settings.MALATTIA}

if(festivo_goduto)
return{desc:"Festivo Goduto",total:settings.FESTIVO_GODUTO}

let startDate=new Date(date+"T"+start)
let endDate=new Date(date+"T"+end)

if(endDate<=startDate)
endDate.setDate(endDate.getDate()+1)

let minuti=0
let totale=0

while(startDate<endDate){

let notte=startDate.getHours()>=22||startDate.getHours()<6

let voce

let sabato=startDate.getDay()==6

if(sabato)
voce=notte?"SABATO_NOTTE":"SABATO_GIORNO"

else if(festivo)
voce=notte?"FESTIVO_NOTTURNO":"FESTIVO_GIORNALIERO"

else if(minuti>=settings.SOGLIA_STRAORDINARIO*60)
voce=notte?"OT_NOTTE":"OT_GIORNO"

else
voce=notte?"BASE_NOTTE":"BASE_GIORNO"

totale+=settings[voce]/60

minuti++

startDate.setMinutes(startDate.getMinutes()+1)

}

return{

desc:"Lavorato",

total:totale.toFixed(2)

}

}

function render(){

let tbody=document.getElementById("tabella")

tbody.innerHTML=""

let totale=0

data.sort((a,b)=>a.date.localeCompare(b.date))

data.forEach((e,i)=>{

let tr=document.createElement("tr")

tr.innerHTML=`

<td>${e.date}</td>
<td>${e.start}</td>
<td>${e.end}</td>
<td>${e.desc}</td>
<td>${e.total}</td>

<td>
<button onclick="cancella(${i})">X</button>
</td>

`

tbody.appendChild(tr)

totale+=Number(e.total)

})

document.getElementById("totale_mese").innerText="Totale mese: "+totale.toFixed(2)+" €"

}

function cancella(i){

data.splice(i,1)

salva()

render()

}

render()