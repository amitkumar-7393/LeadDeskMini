import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form=document.getElementById("leadForm");

const status=document.getElementById("status");

const btn=form.querySelector("button");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const name=document.getElementById("name").value.trim();

const email=document.getElementById("email").value.trim();

const budget=document.getElementById("budget").value;

const message=document.getElementById("message").value.trim();

if(name===""||email===""||budget===""||message===""){

status.innerHTML="⚠️ Please fill all fields.";

status.style.background="#fef3c7";

status.style.color="#92400e";

return;

}

btn.disabled=true;

btn.innerHTML="Submitting...";

try{

await addDoc(collection(db,"leads"),{

name,

email,

budget,

message,

status:"New",

createdAt:serverTimestamp()

});
status.innerHTML="✅ Lead submitted successfully!";

status.style.background="#dcfce7";

status.style.color="#166534";

form.reset();

}
catch(error){

status.innerHTML="❌ "+error.message;

status.style.background="#fee2e2";

status.style.color="#b91c1c";

}
finally{

btn.disabled=false;

btn.innerHTML="Submit Lead";

setTimeout(()=>{

status.innerHTML="";

status.style.background="transparent";

status.style.color="#334155";

},3000);

}

});
