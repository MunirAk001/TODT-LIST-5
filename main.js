let box = document.querySelector(".box")
let Add = document.querySelector(".Add")
let modalAdd = document.querySelector(".modalAdd")
let btn1 = document.querySelector(".btn1")
let btn2 = document.querySelector(".btn2")
let history1 = document.querySelector(".history1")
let history = document.querySelector(".history")
let btn = document.querySelector(".btn")
let btnInfo = document.querySelector(".btnInfo")
let btn6 = document.querySelector(".btn6")
let info = document.querySelector(".info")
let btnDel = document.querySelector(".btnDel")
let modal = document.querySelector(".Modal")
let modall = document.querySelector(".modall")
let Add1 = document.querySelector(".Add1")
let form = document.querySelector(".form1")
let btnSave = document.querySelector(".btnSave")
let form2 = document.querySelector(".form2")
let editModal = document.querySelector(".editModal")
let inp4 = document.querySelector(".inp4")
let search = document.querySelector(".search")
let dark = document.querySelector(".dark")
let light = document.querySelector(".light")
let body = document.querySelector(".body")
let table = document.querySelector(".table")
let inp3 = document.querySelectorAll(".inp3")
let api = "http://localhost:3000/data";
let idSave = null
let idx = null

let statusFilter = null;
let cityFilter = null;
let savedResponse = null;

const selectActive = (event) => {
    statusFilter = event.target.value === "true";
    writeData();
  };
  const selectCity = (event) => {
    cityFilter = event.target.value;
    writeData();
  }

Add.onclick = () => {
    modalAdd.showModal()


}

inp4.oninput = async()=>{
    try{
        let {data} = await axios.get(`${api}?q=${inp4.value}`)
        get(data)
    }catch (error){
        console.log(error);
    }
}


history1.onclick = async()=>{
    try{
        let {data} = await axios.get(`${api}?city=${history1.value}`)
      
        get(data)
    }catch (error){
        console.log(error);
    }
}
history.onclick = async()=>{
    try{
        let {data}= await axios.get(`${api}?status=${history.value}`)
        get(data)
    }catch (error){
        console.log(error);
    }
}




async function editUser() {
    try {
        const {data} = await axios.put(`${api}/${idSave}`,{ title: form2['inp3'].value, email: form2['inp4'].value, city: form2['inp5'].value, avatar: form2['inp7'].value, phone: form2['inp6'].value, status: false })
        getData()
    }
    catch (error) {
        console.log(error);
    }
}

const writeData = (response = null) => {
    if (response == null) {
      response = savedResponse;
    } else {
      savedResponse = response;
    }
}


dark.onclick = () => {
    body.style.backgroundColor = "black"
    table.style.backgroundColor = "gray"
    body.style.color = "white"
    inp3.style.border = "2px solid gold";
    inp3.style.boxShadow = "0px 0px 7px 1px white";

}
light.onclick = () => {
    body.style.backgroundColor = "white"
    table.style.backgroundColor = "white"
    body.style.color = "black"
}


async function getData() {
    try {
        let {data} = await axios.get(api)
        
        get(data);
    }
    catch (error) {
        console.log(error);
    }
}
getData();



function get(info) {
    box.innerHTML = ""
    info.forEach(el => {

        let tr = document.createElement("tr")
        tr.classList.add("tr1")
        let div = document.createElement("div")
        div.classList.add("div1")
        let div2 = document.createElement("div")
        div2.classList.add("div2")
        let tdimg = document.createElement("img")
        tdimg.classList.add("img1")
        let tdimg1 = document.createElement("img")
        tdimg1.classList.add("img2")
        tdimg1.src = "./photo_2023-12-12_17-31-18.jpg"
        tdimg.src = el.avatar
        let tdTitle = document.createElement("td")
        tdTitle.innerHTML = el.title
        let tdEmail = document.createElement("td")
        tdEmail.innerHTML = el.email
        let tdCity = document.createElement("td")
        tdCity.classList.add("td1")
        tdCity.innerHTML = el.city
        let tdStatus = document.createElement("td")
        tdStatus.classList.add("td2")
        tdStatus.innerHTML = el.status
        let tdPhone = document.createElement("td")
        tdPhone.classList.add("td3")
        tdPhone.innerHTML = el.phone

       

            if (el.status !== statusFilter && statusFilter !== null) return;

            if (el.city !== cityFilter && cityFilter !== null) return;
            




        btnInfo.onclick = (el) => {
            modall.showModal()
            let a = document.createElement("img")
            a.innerHTML = el.avatar
            let b = document.createElement("h1")
            b.innerHTML = el.title
            let c = document.createElement("p")
            c.innerHTML = el.email
            let d = document.createElement("p")
            d.innerHTML = el.phone
            let e = document.createElement("p")
            e.innerHTML = el.city
            let f = document.createElement("p")
            f.innerHTML = el.status

            info.append(a, b, c, d, e, f)           


        }

        tdimg1.onclick = () => {
            modal.showModal()
            idx = el.id
            console.log(idx);

            btn.onclick = () => {
                idSave = el.id
                editModal.showModal()
                form2['inp3'].value = el.title
                form2['inp4'].value = el.email
                form2['inp5'].value = el.city
                form2['inp6'].value = el.phone
                form2['inp7'].value = el.avatar
            }
        }



        btnDel.onclick = () => {
            deleteUser(idx)
            modal.close()
        }
        form2.onsubmit = (event) => {
            event.preventDefault()
            editUser()

        }

        btn6.onclick = () => {

            modall.close()
        }
        btn2.onclick = () => {
            modalAdd.close()
        }

        div.append(tdTitle, tdEmail)
        div2.append(tdimg, div)
        tr.append(div2, tdCity, tdStatus, tdPhone, tdimg1)
        box.appendChild(tr)
    });
}

async function deleteUser(idx) {
    try {
        const response = await axios.delete(`${api}/${idx}`)
        getData()
    }
    catch (error) {
        console.log(error);
    }
}

// async function serch() {
//     try {
//         const response = await fetch(`${api}?q=${inp4.value}`)
//         getData()
//     }
//     catch (error) {
//         console.log(error);
//     }
// }



Add.onclick = () => {
    modalAdd.showModal()
}

// add

async function postuser(user) {
    try {
        const {data} = await axios.post(api,user)
        getData()
    }
    catch (error) {
        console.log(error);
    }
}
let date = Date.now()

Add1.onsubmit = (event) => {
    event.preventDefault()
    let user = {
        title: Add1["title"].value,
        city: Add1["city"].value,
        email: Add1["email"].value,
        phone: Add1["phone"].value,
        status: false,
        id: date

    }
    postuser(user)
    Add1.reset()
    modalAdd.close()
}