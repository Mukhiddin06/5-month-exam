let elStudentRenderList = document.querySelector(".render-product-here")
let elChoosedInput = document.querySelector(".choosed-input")
let elChoosedImg = document.querySelector(".choosed-img")

let elUser = document.querySelector(".user")

let elSearchInput = document.querySelector(".search-input")
let elSortBtn = document.querySelector(".sort-img")

let elLogout = document.querySelector(".logout")

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

// Chagne Avatar img end


let students = JSON.parse(localStorage.getItem("students")) || []


// chagne Avatar

const data = JSON.parse(localStorage.getItem("loginData"))
elUser.textContent = data.username

// chagne Avatar

// modal start
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "modal-wrapper") elModalWrapper.classList.add("scale-0")
})

function handleAddStudentBtnClick(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML =`
    <form class="add-student-form">
        <div class="relative">
            <img src="./Images/Close.svg" alt="close" width="30" height="30" class="close-btn absolute cursor-pointer top-0 right-0"/>
            <label>
                <input class="choosed-user-input hidden" type="file"/>
                <img src="./Images/Empty.png" alt="Choose Img" width="80%" class="choosed-user-img mx-auto"/>
            </label>
            <div class="px-[40px] flex justify-between mt-[33px]">
                 <div class="w-[49%] space-y-4">
                    <label class="flex flex-col px-[45px]">
                        <span class="text-[15px] text-[#898989]">Name</span>
                        <input type="text" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentName" autocomplete="off" required/>
                    </label>
                    <label class="flex flex-col px-[45px]">
                        <span class="text-[15px] text-[#898989]">Email</span>
                        <input type="text" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentEmail" autocomplete="off" required/>
                    </label>
                    <label class="flex flex-col px-[45px]">
                        <span class="text-[15px] text-[#898989]">Phone</span>
                        <input type="number" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentPhone" autocomplete="off" required/>
                    </label>
                 </div>
                 <div class="w-[49%] space-y-4">
                    <label class="flex flex-col px-[45px]"> 
                        <span class="text-[15px] text-[#898989]">Enroll Number</span>
                        <input type="number" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentEnrollNumber" autocomplete="off" required/>
                    </label>
                    <label class="flex flex-col px-[45px]">
                        <span class="text-[15px] text-[#898989]">Date admission</span>
                        <input type="text" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentDateAdmission" autocomplete="off" required/>
                    </label>
                 </div>
            </div>
            <div class="flex justify-center mt-[35px] pb-[10px]">
                <button class="add-btn px-[15px] py-[6px] w-[237.5px] bg-[#FEAF00] rounded-[25px] text-white">Add Student</button>
            </div>
        </div>
    </form>
    `
    let elCloseBtn = document.querySelector(".close-btn")
    elCloseBtn.addEventListener("click", function(){
        elModalWrapper.classList.add("scale-0")
    })

    let elAddStudentForm = document.querySelector(".add-student-form")


    let elChoosedUserInput = document.querySelector(".choosed-user-input")
    let elChoosedUserImg = document.querySelector(".choosed-user-img")

    elChoosedUserInput.addEventListener("change", function(e){
    elChoosedUserImg.src = URL.createObjectURL(e.target.files[0])
    elChoosedUserImg.classList.add("bg-white border-[1px] border-dashed rounded-[21px] border-[#3A3A3A]")
    })
    elAddStudentForm.addEventListener("submit", function(e){
        e.preventDefault()
        const data = {
            id:students.length ? students[students.length - 1].id +1 : 1,
            name: e.target.studentName.value,
            email: e.target.studentEmail.value,
            phone: e.target.studentPhone.value,
            enroll: e.target.studentEnrollNumber.value,
            admisson: e.target.studentDateAdmission.value,
            img: elChoosedUserImg.src
        }
        students.push(data)
        elModalWrapper.classList.add("scale-0")
        renderProducts(students)
    })
}

// modal end
// Render Function start

function renderProducts(arr){
    elStudentRenderList.innerHTML = null
    arr.forEach(item => {
        let elStudentRow = document.createElement("tr")
        elStudentRow.className = "bg-white"
        elStudentRow.innerHTML = `
        <td class="text-center py-[15px] pl-[15px] rounded-l-[8px]">
            <img src=${item.img} alt="Avatar" width="65" height="55" class="rounded-[4px]">
        </td>
        <td class="py-[15px] text-[14px] text-start">${item.name}</td>
        <td class="py-[15px] text-[14px] text-start">${item.email}</td>
        <td class="py-[15px] text-[14px] text-start">${item.phone}</td>
        <td class="py-[15px] text-[14px] text-start">${item.enroll}</td>
        <td class="py-[15px] text-[14px] text-start">${item.admisson}</td>
        <td class="py-[15px] rounded-r-[8px] text-center space-x-[15px]">
            <button onclick="handleMoreProduct(${item.id})" class="hover:scale-[1.3] duration-300">
                <img src="./Images/more.svg" alt="More" width="19.5" height="9">
            </button>
            <button onclick="handleUpdateProduct(${item.id})" class="hover:scale-[1.3] duration-300">
                <img src="./Images/edit.svg" alt="Edit" width="19" height="19">
            </button>
            <button onclick="handleDeleteProduct(${item.id})" class="hover:scale-[1.3] duration-300">
                <img src="./Images/delete.svg" alt="Delete" width="16" height="18">
            </button>
        </td>
    `
    elStudentRenderList.appendChild(elStudentRow)
    });
    localStorage.setItem("students", JSON.stringify(students))
}
renderProducts(students)


// Render Function end


// More Function start

function handleMoreProduct(id) {
    const student = students.find(item => item.id == id);
    if (student) {
        localStorage.removeItem("student");
        localStorage.setItem("student", JSON.stringify(student));
        window.location.pathname = "/student.html";
    } else {
        console.log("Student");
    }
}

// More Function end

// Delete function start

function handleDeleteProduct(id){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
    <div class="relative">
    <img src="./Images/Close.svg" alt="close" width="30" height="30" class="close-btn absolute cursor-pointer top-0 right-0"/>
        <h2 class="text-center text-[30px] font-semibold font-trebuchet text-[#009398] mt-5 ">Do you want delete</h2>
        <div class="flex justify-between mt-10 mb-5">
            <button onclick="cancelDeleteModal()" class="add-btn px-[15px] py-[6px] w-[49%] bg-[#009398] rounded-[25px] text-white font-trebuchet">Cencel</button>
            <button onclick="sureDeleteModal(${id})" class="add-btn px-[15px] py-[6px] w-[49%] bg-red-500 rounded-[25px] text-white font-trebuchet">Yes</button>
        </div>
    </div>
    `
    let elCloseBtn = document.querySelector(".close-btn")
    elCloseBtn.addEventListener("click", function(){
        elModalWrapper.classList.add("scale-0")
    })
}


function cancelDeleteModal(){
    elModalWrapper.classList.add("scale-0")
}

function sureDeleteModal(){
    const index = students.findIndex(item => item.id === parseInt(arguments[0]))
    students.splice(index, 1)
    localStorage.setItem("students", JSON.stringify(students))
    renderProducts(students)
    elModalWrapper.classList.add("scale-0")
}

// Delete function end




// Update Function start
function handleUpdateProduct(id){
    elModalWrapper.classList.remove("scale-0")
    const uptadeData = students.find(item => item.id == id)
    elModalInner.innerHTML = `
    <form class="update-product-form">
    <div class="relative">
    <img src="./Images/Close.svg" alt="close" width="30" height="30" class="close-btn absolute cursor-pointer top-0 right-0"/>
    <label>
        <input class="updated-input hidden" type="file"/>
        <img onerror="imgUploadError()" src="${uptadeData.img ? uptadeData.img : './Images/Empty.png'}" alt="Choose Img" width="80%" class="updated-img mx-auto"/>
    </label>
    <div class="px-[40px] flex justify-between mt-[33px]">
         <div class="w-[49%] space-y-4">
            <label class="flex flex-col px-[45px]">
                <span class="text-[15px] text-[#898989]">Name</span>
                <input value="${uptadeData.name}" type="text" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentName" autocomplete="off" required/>
            </label>
            <label class="flex flex-col px-[45px]">
                <span class="text-[15px] text-[#898989]">Email</span>
                <input value="${uptadeData.email}" type="text" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentEmail" autocomplete="off" required/>
            </label>
            <label class="flex flex-col px-[45px]">
                <span class="text-[15px] text-[#898989]">Phone</span>
                <input value="${uptadeData.phone}" type="number" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentPhone" autocomplete="off" required/>
            </label>
         </div>
         <div class="w-[49%] space-y-4">
            <label class="flex flex-col px-[45px]"> 
                <span class="text-[15px] text-[#898989]">Enroll Number</span>
                <input value="${uptadeData.enroll}" type="number" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentEnrollNumber" autocomplete="off" required/>
            </label>
            <label class="flex flex-col px-[45px]">
                <span class="text-[15px] text-[#898989]">Date admission</span>
                <input value="${uptadeData.admisson}" type="text" class="p-2 rounded-t-md border-b-[1px] border-b-[#545454] mt-[2px] outline-none focus:shadow" name="studentDateAdmission" autocomplete="off" required/>
            </label>
         </div>
    </div>
    <div class="flex justify-center mt-[35px] pb-[10px]">
        <button class="add-btn px-[15px] py-[6px] w-[237.5px] bg-[#FEAF00] rounded-[25px] text-white">Update Student</button>
    </div>
</div>
    </form>
    `
    let elUpdatedForm = document.querySelector(".update-product-form")
    let elUpdatedInput = document.querySelector(".updated-input")
    let elUpdatedImg = document.querySelector(".updated-img")

    elUpdatedInput.addEventListener("change", function(e){
        elUpdatedImg.src = URL.createObjectURL(e.target.files[0])
    })

    elUpdatedForm.addEventListener("submit", function(e){
        e.preventDefault()
        uptadeData.img = elUpdatedImg.src
        uptadeData.name = e.target.studentName.value
        uptadeData.email = e.target.studentEmail.value
        uptadeData.phone = e.target.studentPhone.value
        uptadeData.enroll = e.target.studentEnrollNumber.value
        uptadeData.admisson = e.target.studentDateAdmission.value
        
        renderProducts(students)
        localStorage.setItem("students", JSON.stringify(students))
        elModalWrapper.classList.add("scale-0")
    })

}

function imgUploadError(){
    let elUpdatedImg = document.querySelector(".updated-img")
    elUpdatedImg.src = "./Images/Empty.png"
}
// Update function end



// Search Function start

elSearchInput.addEventListener("keyup", function(e){
    let searchValue = e.target.value.toLowerCase()
    let filteredStudents = students.filter(item => item.name.toLowerCase().includes(searchValue) || item.email.toLowerCase().includes(searchValue))
    renderProducts(filteredStudents)
})

// Search Function end

// Sort Function start

let isSortedAsc = false; 

elSortBtn.addEventListener("click", function(){
    if (!isSortedAsc) {
        students.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });
        isSortedAsc = true;
    } else {
        students.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        });
        isSortedAsc = false;
    }
    renderProducts(students);
});
// Sort Function end



// Logout Function start

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
// Logout Function end