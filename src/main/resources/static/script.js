async function login(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const response=await fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
});

const data=await response.json();

if(data.status==="success"){

sessionStorage.setItem("loggedIn","true");

window.location.href="dashboard.html";

}else{
document.getElementById("msg").innerHTML="Invalid Credentials";
}
}

function logout(){

sessionStorage.removeItem("loggedIn");

window.location.href="index.html";
}

function toggleMenu(id){

const menu=document.getElementById(id);

menu.style.display=
menu.style.display==="block"?"none":"block";
}

function showSection(id){

document.querySelectorAll(".section")
.forEach(sec=>sec.classList.remove("active"));

document.getElementById(id)
.classList.add("active");
}

function openTab(id){

document.querySelectorAll(".tab")
.forEach(tab=>tab.classList.remove("activeTab"));

document.getElementById(id)
.classList.add("activeTab");
}

function showAlert(){
alert("Alert Box");
}

function showConfirm(){
confirm("Confirm Message");
}

function showPrompt(){
prompt("Enter Your Name");
}

async function saveEmployee(){

const id=document.getElementById("empId").value;
const name=document.getElementById("empName").value;
const email=document.getElementById("empEmail").value;
const department=document.getElementById("empDept").value;

if(name===""||email===""){
alert("Fill all fields");
return;
}

await fetch("/employees",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id,name,email,department})
});

showToast();
loadEmployees();
}

async function deleteEmployee(id){

await fetch("/employees/"+id,{
method:"DELETE"
});

loadEmployees();
}

async function loadEmployees(){

const response=await fetch("/employees");

const employees=await response.json();

document.getElementById("employeeTable").innerHTML="";

employees.forEach(emp=>{

document.getElementById("employeeTable").innerHTML+=`
<tr>
<td>${emp.id}</td>
<td>${emp.name}</td>
<td>${emp.email}</td>
<td>${emp.department}</td>
<td>
<button onclick="deleteEmployee(${emp.id})">
Delete
</button>
</td>
</tr>
`;
});

document.getElementById("employeeCount")
.innerHTML=employees.length;
}

function showToast(){

const toast=document.getElementById("toast");

toast.style.display="block";

setTimeout(()=>{
toast.style.display="none";
},2000);
}

window.onload=async function(){

if(window.location.pathname.includes("dashboard")
&& !sessionStorage.getItem("loggedIn")){

window.location.href="index.html";
}

const accordion=document.querySelector(".accordionBtn");

if(accordion){

accordion.addEventListener("click",function(){

const content=document.querySelector(".accordionContent");

content.style.display=
content.style.display==="block"?"none":"block";
});
}

const slider=document.getElementById("sliderInput");

if(slider){

slider.addEventListener("input",function(){

document.getElementById("sliderValue")
.innerHTML=this.value;
});
}

const imageInput=document.getElementById("imageInput");

if(imageInput){

imageInput.addEventListener("change",function(e){

const file=e.target.files[0];

const reader=new FileReader();

reader.onload=function(){

document.getElementById("preview")
.src=reader.result;
}

reader.readAsDataURL(file);

});
}

const search=document.getElementById("searchBox");

if(search){

const response=await fetch("/api/languages");

const data=await response.json();

search.addEventListener("input",function(){

const value=this.value.toLowerCase();

document.getElementById("suggestions").innerHTML="";

data.forEach(item=>{

if(item.toLowerCase().includes(value)){

document.getElementById("suggestions")
.innerHTML+="<p>"+item+"</p>";
}
});
});
}

const searchEmployee=document.getElementById("searchEmployee");

if(searchEmployee){

searchEmployee.addEventListener("input",function(){

const value=this.value.toLowerCase();

document.querySelectorAll("#employeeTable tr")
.forEach(row=>{

row.style.display=
row.innerText.toLowerCase().includes(value)
?"":"none";
});
});
}

loadEmployees();
}

function openLinkTab(id){

    document.querySelectorAll(".linkContent")
        .forEach(tab=>{
            tab.style.display="none";
        });

    document.getElementById(id).style.display="block";
}

function showStatus(code){

    const result=document.getElementById("statusResult");

    if(code===200){
        result.innerHTML="200 Success";
    }

    else if(code===404){
        result.innerHTML="404 Page Not Found";
    }

    else{
        result.innerHTML="500 Internal Server Error";
    }
}

function openCssTab(id){

    document.querySelectorAll(".cssContent")
        .forEach(tab=>{
            tab.style.display="none";
        });

    document.getElementById(id).style.display="block";
}