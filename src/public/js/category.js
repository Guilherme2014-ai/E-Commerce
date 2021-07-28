function liClick(id) {
    window.location.href = `/inventory/${id}`
}

function startContent(params) {
    var ul = document.getElementById('grid')
    var inventoryRaw = JSON.parse(params)

    var n = 0
    var i = true

    var inventory = inventoryRaw.slice(1, inventoryRaw.length)

    ul.innerHTML = `
    <li onclick="liClick(${inventoryRaw[0].id})" class="small" style="background-image: url('${inventoryRaw[0].img}');">
        <h1><strong>${inventoryRaw[0].name}</strong></h1><br><br>
        <p>${inventoryRaw[0].desc}</p>
        <h3><strong>${inventoryRaw[0].price} R$</strong></h3>
        <p>asd</p>
    </li>
    `

    inventory.forEach(look => {
        if(!i){
            ul.innerHTML += `
            <li onclick="liClick(${look.id})" class="small" style="background-image: url('${look.img}');">
                <h1><strong>${look.name}</strong></h1><br><br>
                <p>${look.desc}</p>
                <h3><strong>${look.price} R$</strong></h3>
            </li>
            `

            if(n == 1){
                n = 0
                i = true
            }else{
                n++
            }
        }else{
            ul.innerHTML += `
            <li onclick="liClick(${look.id})" class="large" style="background-image: url('${look.img}');">
                <h1><strong>${look.name}</strong></h1><br><br>
                <p>${look.desc}</p>
                <h3><strong>${look.price} R$</strong></h3>
            </li>
            `

            if(n == 1){
                n = 0
                i = false
                console.log(i)
            }else{
                n++
            }
        }
    });
}