// Access to Document
let range = document.getElementById("input");
let showRange = document.getElementById("p_showRange")
let showResualt = document.getElementById("dispaly_parent")
let itemsParent = document.querySelector(".itemsParent")
let li = document.getElementsByClassName("li-history")
let HistoryParent = document.querySelector(".history-parent")
let item = document.getElementsByClassName("item")
let showInResualt = document.getElementById("dispaly_parent")
// ----------------------------------------------------------------------------------------------------------------------------------------------

// Array 
var repository; 
var id;
// ----------------------------------------------------------------------------------------------------------------------------------------------

// Handle Copy or remove item
itemsParent.addEventListener("click",function(e){
    let target = e.target
    let target_Controller = target.getAttribute("target");
    if(target_Controller !== null){
        if(target_Controller == "copy"){
            copy(target)
        }else{
            deleted(target)
        }
    }
    localStorage.setItem("item",JSON.stringify(repository))
})
// ------------------------------

// handle Copy
function copy(target){
    let parent_Node = target.parentNode
    let input = parent_Node.querySelector("input");
    input.removeAttribute("disabled")
    input.select();
    document.execCommand("copy")
    input.setAttribute("disabled","")
}
// ------------------------------

// handle Remove
function deleted(target){
    target.parentNode.parentNode.removeChild(target.parentNode)
    repository[target.parentNode.id].deleted = true;
    checkCount_li()
}
// ----------------------------------------------------------------------------------------------------------------------------------------------

// get Data in localStorage And changed to object
var AllitemSaved = localStorage.getItem("item")
var AllitemSaved_To_OBJ = JSON.parse(AllitemSaved) // typeOf AllitemSaved is string And this method changed to object
// ------------------------------

// if data is
if(AllitemSaved){
    // get data
    repository = AllitemSaved_To_OBJ
    id = repository.length
    AllitemSaved_To_OBJ.forEach(element => {
        create_li(element.password,element.id-1,element.deleted)
    });
}else{
    // and else Array has empty
    repository = []
    id = 0
}
// ----------------------------------------------------------------------------------------------------------------------------------------------
function generate() {
    let Password = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*";
    let show = "";
// ------------------------------
    for(let i = 0 ; i <= range.value ; i++){
        show = show + Password.charAt(Math.floor(Math.random() * Math.floor(Password.length - 1)));
    }
// ------------------------------
    showResualt.value = show;

// Send the generated text and ID to create_li
    create_li(show,id)
    // ------------------------------

    checkCount_li()

    id++
// ------------------------------
    repository.push({
        password : show,
        id : id,
        deleted : false
    });
// ------------------------------

// set Data in LocalStorage and changed type to string
localStorage.setItem("item",JSON.stringify(repository))
    }
// ----------------------------------------------------------------------------------------------------------------------------------------------

// create li
function create_li(data,id,deleted){

// Do not display if the item was deleted
    if(deleted){
        return;
    }
// ------------------------------

// create Tag
    let position = "afterbegin";
    let htmlTags =`
    <div class="item" id="${id}">
        <i class="far fa-trash-alt" target="delete"></i>
        <input class="li-history" value="${data}" disabled>
        <i class="far fa-copy" target="copy"></i>
    </div>
    `
// ------------------------------

// set data in Local storage and or Sync it
    itemsParent.insertAdjacentHTML(position,htmlTags)
}
// ----------------------------------------------------------------------------------------------------------------------------------------------

// show input(slider) value's
range.oninput = function(){
    let strToNum = Number(range.value)
   showRange.innerHTML =  (strToNum + 1) + " character "
}
// ----------------------------------------------------------------------------------------------------------------------------------------------


function checkCount_li(){

    // If not an item 
    if(li.length < 1){
        itemsParent.style.overflowY = "hidden";
        itemsParent.innerHTML = 
        `
        <div class="item NoData">
            <p class="li-history">No Data In History</p>
        </div>
        `
    }
// And else --- If there is no data, show the user that there is no data
    else if(isNaN(itemsParent.querySelector(".NoData")) == true){
        itemsParent.removeChild(itemsParent.querySelector(".NoData"))
        itemsParent.style.overflowY = "scroll";
    }
}
// ----------------------------------------------------------------------------------------------------------------------------------------------
checkCount_li()
function clearAll(){
    location.reload()
    localStorage.removeItem("item")
}

function copyToClipbord() {
    showInResualt.select();
    document.execCommand("copy");
};