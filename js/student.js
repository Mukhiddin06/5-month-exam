let elRender = document.querySelector(".render-here")
let elChoosedInput = document.querySelector(".choosed-input")
let elChoosedImg = document.querySelector(".choosed-img")

let elTitleName = document.querySelector(".title-name")

let elUser = document.querySelector(".user")

let elLogout = document.querySelector(".logout")

let elNextBtn = document.querySelector(".next-img")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "modal-wrapper") elModalWrapper.classList.add("scale-0")
})



// Chagne Avatar img start
elChoosedInput.addEventListener("change", function(e){
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(){
        const imgData = reader.result;
        elChoosedImg.src = imgData; 
        localStorage.setItem("profileImage", imgData);
    };

    reader.readAsDataURL(file);
});
const savedImage = localStorage.getItem("profileImage");
if (savedImage) {
    elChoosedImg.src = savedImage;
}

// Chagne Avatar img start


// chagne Avatar

const data = JSON.parse(localStorage.getItem("loginData"))
elUser.textContent = data.username

// chagne Avatar

// Pervous start

elNextBtn.addEventListener("click", () => {
    window.location.pathname = "/admin.html"
})


// Pervous end


// logout start
elLogout.addEventListener("click", () =>{
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
    <div class="relative">
        <img src="./Images/Close.svg" alt="close" width="30" height="30" class="close-btn absolute cursor-pointer top-0 right-0"/>
        <h2 class="text-center text-[30px] font-semibold font-trebuchet text-[#009398] mt-5 ">Do you want logout</h2>
        <div class="flex justify-between mt-10 mb-5">
            <button onclick="cancelUser()" class="add-btn px-[15px] py-[6px] w-[49%] bg-[#009398] rounded-[25px] text-white">Cencel</button>
            <button onclick="sureUser()" class="add-btn px-[15px] py-[6px] w-[49%] bg-red-500 rounded-[25px] text-white">Yes</button>
        </div>
    </div>
    `
    let elCloseBtn = document.querySelector(".close-btn")
    elCloseBtn.addEventListener("click", function(){
        elModalWrapper.classList.add("scale-0")
    })
})

function cancelUser(){
    elModalWrapper.classList.add("scale-0")
}

function sureUser(){
    window.localStorage.clear()
    window.location.pathname = "/"
}

// logout end


let student = JSON.parse(localStorage.getItem("student"))

function renderList(obj){
    elRender.innerHTML = ""

    let elItem = document.createElement("div")
    elItem.className = "w-[592px] mt-[41px] bg-white px-[22px] pt-[28px] pb-[147px] rounded-[8px] relative flex items-center gap-[50px]"

    elItem.innerHTML = `
        <img src="./Images/large.svg" alt="Large" width="11" height="82" class="absolute top-[15px] right-[15px]">
        <div class="w-[209px]">
            <img src="${obj.img ? obj.img : './Images/profile.png'}" alt="${obj.img}" width="209" height="216">
        </div>
        <ul class="space-y-[15px]">
            <li>
                <span class="font-semibold text-[12px] leading-[14px] text-[#ACACAC]">Name</span>
                <p class="font-normal text-[16px] leading-[19.5px] text-[#000000]">${obj.name}</p>
            </li>
            <li>
                <span class="font-semibold text-[12px] leading-[14px] text-[#ACACAC]">Email</span>
                <p class="font-normal text-[16px] leading-[19.5px] text-[#000000]">${obj.email}</p>
            </li>
            <li>
                <span class="font-semibold text-[12px] leading-[14px] text-[#ACACAC]">Phone</span>
                <p class="font-normal text-[16px] leading-[19.5px] text-[#000000]">${obj.phone}</p>
            </li>
            <li>
                <span class="font-semibold text-[12px] leading-[14px] text-[#ACACAC]">Date admission</span>
                <p class="font-normal text-[16px] leading-[19.5px] text-[#000000]">${obj.admisson}</p>
            </li>
        </ul>
    `
    elRender.appendChild(elItem) 
    elTitleName.textContent = obj.name
}

renderList(student)

