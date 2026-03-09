
let currentUser = null

function register(){
let u = document.getElementById("reg_user").value
let p = document.getElementById("reg_pass").value

let users = JSON.parse(localStorage.getItem("users") || "{}")

if(users[u]){
alert("Utente esiste")
return
}

users[u] = {password:p,settings:{},history:[]}
localStorage.setItem("users",JSON.stringify(users))

alert("Account creato")
}

function login(){
let u = document.getElementById("login_user").value
let p = document.getElementById("login_pass").value

let users = JSON.parse(localStorage.getItem("users") || "{}")

if(!users[u] || users[u].password!==p){
alert("Login errato")
return
}

currentUser = u
document.getElementById("auth").style.display="none"
document.getElementById("app").style.display="block"

loadSettings()
loadHistory()
}

function logout(){
location.reload()
}

function saveSettings(){

let users = JSON.parse(localStorage.getItem("users"))

users[currentUser].settings = {
base_day:document.getElementById("base_day").value,
base_night:document.getElementById("base_night").value,
ot_day:document.getElementById("ot_day").value,
ot_night:document.getElementById("ot_night").value,
sat:document.getElementById("sat").value,
holiday:document.getElementById("holiday").value
}

localStorage.setItem("users",JSON.stringify(users))

alert("Salvato")
}

function loadSettings(){

let users = JSON.parse(localStorage.getItem("users"))
let s = users[currentUser].settings

if(!s) return

document.getElementById("base_day").value=s.base_day||""
document.getElementById("base_night").value=s.base_night||""
document.getElementById("ot_day").value=s.ot_day||""
document.getElementById("ot_night").value=s.ot_night||""
document.getElementById("sat").value=s.sat||""
document.getElementById("holiday").value=s.holiday||""
}

function saveHours(){

let h = document.getElementById("hours").value

let users = JSON.parse(localStorage.getItem("users"))

users[currentUser].history.push({
date:new Date().toLocaleDateString(),
hours:h
})

localStorage.setItem("users",JSON.stringify(users))

loadHistory()
}

function loadHistory(){

let users = JSON.parse(localStorage.getItem("users"))
let list = document.getElementById("history")

list.innerHTML=""

users[currentUser].history.forEach(i=>{
let li=document.createElement("li")
li.innerText=i.date + " - " + i.hours + " ore"
list.appendChild(li)
})
}
