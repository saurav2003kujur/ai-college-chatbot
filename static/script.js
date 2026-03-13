function sendMessage(){

let input = document.getElementById("userInput").value;
let chatbox = document.getElementById("chatbox");

chatbox.innerHTML += "<div class='user'>" + input + "</div>";

document.getElementById("userInput").value = "";

/* show typing message */

let typing = document.createElement("p");
typing.className = "bot";
typing.id = "typing";
typing.innerHTML = "Bot is typing...";
chatbox.appendChild(typing);

chatbox.scrollTop = chatbox.scrollHeight;

fetch("/get", {
method: "POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({message: input})
})

.then(response => response.json())
.then(data => {

setTimeout(() => {

document.getElementById("typing").remove();

/* bot reply */

chatbox.innerHTML += "<div class='bot'>" + data.reply + "</div>";

/* show map only if location response */

if(data.reply.toLowerCase().includes("map")){

chatbox.innerHTML += `
<iframe
width="300"
height="200"
style="border:0"
loading="lazy"
src="https://www.google.com/maps?q=Sarala+Birla+University+Ranchi&output=embed">
</iframe>
`;

}

chatbox.scrollTop = chatbox.scrollHeight;

},1500);

});

}

/* DARK MODE BUTTON (OUTSIDE FUNCTION) */

const toggleBtn = document.getElementById("darkModeToggle");

toggleBtn.addEventListener("click", () => {

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
toggleBtn.textContent = "☀ Light Mode";
}else{
toggleBtn.textContent = "🌙 Dark Mode";
}

});