"use strict";

function get_tasks(){
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if(tasks){

    let list_html = "";

    tasks.forEach(function(item, i){ // [{}, {}]

      list_html += `
        <li data-id="${item.item_id}">
          <div class="item_flex">
            <div class="middle_block">
              <p class="para">${item.name}</p>
              <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${item.name}">
            </div>
            <div class="right_block">
              <div class="btn_flex">
                <button type="button" class="btn_update">更新</button>
                <button type="button" class="btn_delete">移除</button>
              </div>
            </div>
          </div>
        </li>
      `;

    });
    let ul_task_list = document.getElementsByClassName("task_list")[0];
    ul_task_list.innerHTML = list_html;

  }

}

// 更新 localStorage 中的排序
function items_sort(item_id, direction) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (direction == "up") {
    let current_li_index;
    let current_li_data;
    let before_li_data;

    tasks.forEach(function (task, i) {
      if (item_id == task.item_id) {
        current_li_index = i;
        current_li_data = task;
        before_li_data = tasks[i - 1];
      }
    })
    tasks[current_li_index - 1] = current_li_data;
    tasks[current_li_index] = before_li_data;
  }

  if (direction == "down") {
    let current_li_index;
    let current_li_data;
    let after_li_data;

    tasks.forEach(function(task, i){
      if(item_id == task.item_id) {
        current_li_index = i;
        current_li_data = task;
        after_li_data = tasks[i + 1];
      }
    })
    tasks[current_li_index + 1] = current_li_data;
    tasks[current_li_index] = after_li_data;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", function(){
  get_tasks();
  var input_task_name = document.getElementsByClassName("task_name")[0];

  input_task_name.addEventListener("focus", function(){
    this.closest("div.task_add_block").classList.add("-on");
  });
  input_task_name.addEventListener("blur", function(){
    this.closest("div.task_add_block").classList.remove("-on");
  });

  input_task_name.addEventListener("keyup", function(e){
    console.log( e.which );
    if(e.which == 13){
      let button_task_add = document.getElementsByClassName("task_add")[0];
      button_task_add.click();
    }
  });

  var button_task_add = document.getElementsByClassName("task_add")[0];
  button_task_add.addEventListener("click", function(){
    let task_text = (input_task_name.value).trim();
    // let task_text = input_task_name.value;
    if(task_text != ""){

      let item_id = Date.now(); 


      let list_html = `
        <li data-id="${item_id}">
          <div class="item_flex">
            <div class="middle_block">
              <p class="para">` + task_text + `</p>
              <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${task_text}">
            </div>
            <div class="right_block">
              <div class="btn_flex">
                <button type="button" class="btn_update">更新</button>
                <button type="button" class="btn_delete">移除</button>
              </div>
            </div>
          </div>
        </li>
      `;

      let ul_task_list = document.getElementsByClassName("task_list")[0];
      ul_task_list.insertAdjacentHTML("afterbegin", list_html);
      input_task_name.value = "";


      let task = {
        "item_id": item_id,
        "name": task_text,
        "star": 0
      };
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      console.log(tasks);

      if(tasks){ 
        tasks.unshift(task); // [{}, {}]
      }else{ 
        tasks = [task];
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));

    }

  });
});

document.addEventListener("click", function(e){
  //console.log(e);
  //if(e.target.getAttribute("id") == "abc"){
  if(e.target.classList.contains("btn_delete")){
    let r = confirm("確認移除？");
    if (r){

      let item_id = e.target.closest("li").getAttribute("data-id");
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      let updated_tasks = [];
      tasks.forEach(function(task, i){
        if(item_id != task.item_id){
          updated_tasks.push(task);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(updated_tasks));

      e.target.closest("li").classList.add("fade_out");
      setTimeout(function(){
        e.target.closest("li").remove();
      }, 1000);
    }

  }
});

document.addEventListener("click", function(e){
  if(e.target.classList.contains("btn_update")){
    if(e.target.getAttribute("data-edit") == undefined){ // 進入編輯狀態

      e.target.setAttribute("data-edit", true);
      let li_el = e.target.closest("li");
      li_el.querySelector("p.para").classList.toggle("-none");
      li_el.querySelector("input.task_name_update").classList.toggle("-none");

    }else{
      let update_task_name = (e.target.closest("li").querySelector("input.task_name_update").value).trim();

      if(update_task_name == ""){
        alert("請輸入待辦事項");
      }else{
        let p_el = e.target.closest("li").querySelector("p.para");
        p_el.innerHTML = update_task_name;
        p_el.classList.toggle("-none");

        let input_update_el = e.target.closest("li").querySelector("input.task_name_update");
        input_update_el.value = update_task_name;
        input_update_el.classList.toggle("-none");

        e.target.removeAttribute("data-edit");


        let item_id = e.target.closest("li").getAttribute("data-id");
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(function(task, i){
          if(item_id == task.item_id){
            tasks[i].name = update_task_name;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));

      }
    }

  }
});


document.addEventListener("click", function(e){

  //console.log( e.target.closest("li").previousElementSibling );
  if(e.target.classList.contains("btn_up") && e.target.closest("li").previousElementSibling ){
    let li_el = e.target.closest("li");
    let item_id = li_el.getAttribute("data-id");
    let clone_html = li_el.outerHTML; // <li>...</li>
    li_el.previousElementSibling.insertAdjacentHTML("beforebegin", clone_html);
    li_el.remove();

    items_sort(item_id, "up");
  }


  if(e.target.classList.contains("btn_down") && e.target.closest("li").nextElementSibling){
    let li_el = e.target.closest("li");
    let item_id = li_el.getAttribute("data-id");
    let clone_html = li_el.outerHTML; // <li>...</li>
    li_el.nextElementSibling.insertAdjacentHTML("afterend", clone_html);
    li_el.remove();

    items_sort(item_id, "down");
  }

});

document.addEventListener("click", function(e){

  //console.log(e.target);

  if(e.target.closest("span")){
    let span_el = e.target.closest("span");
    if(span_el.classList.contains("star")){

      let current_star = parseInt(span_el.getAttribute("data-star"));
      let star_span = span_el.closest("div.star_block").querySelectorAll("span.star");
      //console.log(star_span);
      // [span, span, span, span, span]
      star_span.forEach(function(star_item, i){

        if( parseInt(star_item.getAttribute("data-star")) <= current_star ){
          star_span[i].classList.add("-on");
        }else{
          star_span[i].classList.remove("-on");
        }

      });

      let item_id = span_el.closest("li").getAttribute("data-id");
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.forEach(function(task, i){
        if(item_id == task.item_id){
          tasks[i].star = current_star;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));

    }
  }

});