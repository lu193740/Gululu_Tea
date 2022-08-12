let storage = localStorage;
function doFirst(){
    if(storage['addItemList'] == null){
        storage['addItemList'] = '';         // storage.setItem('addItemList', '')
    }
    
    // 幫每個 Add Cart 建立事件聆聽功能
    let list = document.querySelectorAll('.addButton');     // list 是陣列
    for(let i = 0; i < list.length; i++){
        list[i].addEventListener('click',function(e){
            // alert(e.target.id)
            // alert(this.id)
            // let teddyInfo = document.querySelector('#A1001 input').value
            // let teddyInfo = document.querySelector('#' + e.target.id + ' input').value
            let teddyInfo = document.querySelector(`#${e.target.id} input`).value
            addItem(e.target.id, teddyInfo)
        })
    }
}
function addItem(itemId,itemValue){
    // alert(`${itemId}: ${itemValue}`)
    let image = document.createElement('img')
    image.src = 'img/index/' + itemValue.split('|')[1]

    let title = document.createElement('span')
    title.innerText = itemValue.split('|')[0]

    let price = document.createElement('span')
    price.innerText = itemValue.split('|')[2]

    let newItem = document.getElementById('newItem')
    // 先判斷 newItem 內是否已有物件，如果有要先刪除
    // alert(newItem.childNodes.length)
    // if(newItem.hasChildNodes()){
    //     while(newItem.childNodes.length >= 1){
    //         newItem.removeChild(newItem.firstChild)
    //     }
    // }

    // // 再顯示新物件
    // newItem.appendChild(image)
    // newItem.appendChild(title)
    // newItem.appendChild(price)

    // 存入 storage
    if(storage[itemId]){
        alert('You have checked.')
    }else{
        storage['addItemList'] += `${itemId}, `
        storage.setItem(itemId,itemValue)
    }

    // 計算購買數量和小計
    // let itemString = storage.getItem('addItemList')
    //     // console.log(itemString); // A1001, A1005, A1006, A1002, 
    // let items = itemString.substr(0,itemString.length - 2).split(', ')
    //     console.log(items); // ['A1001', 'A1005', 'A1006', 'A1002']

    // subtotal = 0
    // for(let i = 0; i < items.length; i++){
    //     let itemInfo = storage.getItem(items[i])
    //     let itemPrice = parseInt(itemInfo.split('|')[2])

    //     subtotal += itemPrice
    // }
    
    document.getElementById('itemCount').innerText = items.length
    document.getElementById('subtotal').innerText = subtotal
}
window.addEventListener('load', doFirst);


// 字串切割成陣列: 字串.split('')
// 陣列組合成字串: 陣列.join('')

// let monthString = 'Jan, Feb, Mar, Apr, May'
// monthString.split(', ')         --> ['Jan', 'Feb', 'Mar', 'Apr', 'May']
// monthString.split(', ')[0]      --> Jan

// let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
// monthArray.join(' - ')  --> 'Jan - Feb - Mar - Apr - May'