const socket = io();

function buyList() {
    var buy = document.getElementById('content');
    var id = document.getElementById('id').value;

    buy.innerHTML =
    `<form action="/buy" method="POST">
        <input type="hidden" name="orderId" id="orderId" value="${id}">
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input type="text" class="form-control" name="address" id="address" aria-describedby="endereco" placeholder="Ex. Rua jose pereira de assis, 445">
        </div>
        <br>
        <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <input type="number" class="form-control" name="quantity" id="quantity" placeholder="Ex. 4">
        </div>
        <br>
        <button onclick="sendBuy()" type="submit" class="btn btn-primary form-control">Comprar</button>
    </form>`
}



function sendBuy () {
  const userChild = document.getElementById('user');

  const address = document.getElementById('address').value;
  const quantity = document.getElementById('quantity').value;
  const nameInvetory = document.getElementById('nameInvetory').value;
  const imageInvetory = document.getElementById('imageInvetory').value;

  if(userChild.value == 'desconected'){}else{
    const user = JSON.parse(userChild.value);
    
    const order = {
      name: user["name"],
      email: user["email"],
      address,
      quantity,
      number: user["number"],
      imageInvetory,
      nameInvetory
    };

    socket.emit('buy', order);
  }
}