buildList()
let list_snapshot = [];
function buildList(){
    let url = 'http://127.0.0.1:8000/api/product-list/';
    fetch(url)
    .then((res)=>res.json())
    .then(function (data){
        let list = data;
        //click remove to delete elements when list change 
        if (list_snapshot.length > list.length){
            for(let i=list.length;i < list_snapshot.length;i++){
                document.getElementById(`${i}`).remove()
            }
        }
        list_snapshot = list
        for (let i in list){
            //Delete element after add product already.
            try{
                document.getElementById(`${i}`).remove()
            }catch(err){
                console.log(err)
            }
            let task_class = "task";
            let item = `
            <div id="${i}" class=${task_class}>
                <div class="text-todo">
                    <a href="http://127.0.0.1:8000/api/product-detail/${list[i].id}">
                        ${list[i].name}
                    </a>
                </div>
                <span class="close" onclick='deleteTask()'>&#215;</span>
            </div>
            `
            document.getElementById("todo-list").innerHTML += item;
        }
        //click deleteproduct
        for (let i in list){
            let deleteBtn = document.getElementsByClassName("close")[i];
            deleteBtn.addEventListener('click',(function (item){
                console.log("Data",item)
                return function (ev){
                    if (ev.target.tagName === "SPAN"){
                        deleteTask(item)
                    }
                }
            })(list[i])
            )   
        }
    })
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
    const csrftoken = getCookie("csrftoken");
    document.addEventListener("DOMContentLoaded",() =>{
        document.getElementById("header").addEventListener('submit',function (e){
            e.preventDefault()
            let url = "http://127.0.0.1:8000/api/product-create/";
            let title = document.getElementById("title").value;
            let desc = document.getElementById("desc").value;
            let price = document.getElementById("price").value;
            fetch(url,{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({name:title,description:desc,price:parseInt(price)})
                
            })
            .then(function (res){
                buildList()
                document.getElementById("form").reset();
            })
        })
    })
    
function deleteTask(task){
    let url = `http://127.0.0.1:8000/api/product-delete/${task.id}`
    fetch(url,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json",
            "X-CSRFToken":csrftoken,
        },
    }).then(()=>{
        buildList()
    })
}