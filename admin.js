import { auth, db } from "./firebase.js";

import {
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
collection,
getDocs,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const loginBtn=document.getElementById("loginBtn");
const logoutBtn=document.getElementById("logoutBtn");

const email=document.getElementById("email");
const password=document.getElementById("password");

const search=document.getElementById("search");

const leadList=document.getElementById("leadList");

const loading=document.getElementById("loading");

let leads=[];

loginBtn.onclick=async()=>{

if(email.value===""||password.value===""){

alert("Please enter email and password.");

return;

}

loginBtn.disabled=true;

loginBtn.innerHTML="Signing In...";

try{

await signInWithEmailAndPassword(

auth,

email.value,

password.value

);

alert("Login Successful");

loadLeads();

}
catch(error){

alert(error.message);

}
finally{

loginBtn.disabled=false;

loginBtn.innerHTML="Login";

}

};
async function loadLeads(){

loading.style.display="block";

leadList.innerHTML="";

const snapshot=await getDocs(collection(db,"leads"));

leads=[];

snapshot.forEach((item)=>{

leads.push({

id:item.id,

...item.data()

});

});

loading.style.display="none";

displayLeads(leads);

}

function displayLeads(data){

leadList.innerHTML="";

if(data.length===0){

leadList.innerHTML=`

<div class="lead">

<h3>No Leads Found</h3>

<p>Try another search.</p>

</div>

`;

return;

}

data.forEach((lead)=>{

leadList.innerHTML+=`

<div class="lead">

<h3>${lead.name}</h3>

<p><strong>Email:</strong> ${lead.email}</p>

<p><strong>Budget:</strong> ${lead.budget}</p>

<p><strong>Message:</strong><br>${lead.message}</p>

<p><strong>Status:</strong> ${lead.status}</p>

<select
onchange="updateStatus('${lead.id}',this.value)">

<option value="New"
${lead.status==="New"?"selected":""}>

New

</option>

<option value="Contacted"
${lead.status==="Contacted"?"selected":""}>

Contacted

</option>

<option value="Closed"
${lead.status==="Closed"?"selected":""}>

Closed

</option>

</select>

</div>

`;

});

}

search.addEventListener("keyup",()=>{

const keyword=search.value.toLowerCase();

const filtered=leads.filter((lead)=>{

return(

lead.name.toLowerCase().includes(keyword)||

lead.email.toLowerCase().includes(keyword)

);

});

displayLeads(filtered);

});
window.updateStatus = async (id, status) => {

try{

await updateDoc(

doc(db,"leads",id),

{

status:status

}

);

loadLeads();

}
catch(error){

alert(error.message);

}

};

logoutBtn.onclick = async () => {

await signOut(auth);

alert("Logged Out Successfully");

leadList.innerHTML="";

loading.style.display="none";

email.value="";

password.value="";

};

onAuthStateChanged(auth,(user)=>{

if(user){

loadLeads();

}else{

leadList.innerHTML=`

<div class="lead">

<h3>🔒 Login Required</h3>

<p>Please login to view and manage leads.</p>

</div>

`;

}

});