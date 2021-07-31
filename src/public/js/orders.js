const socket = io();

socket.on('newOrder', function(order) {
   var content = document.getElementById('content');

   content.innerHTML +=
   `
   <div class="card" style="width: 18rem;">
      <div class="image" style="background-image: url('${order.imageInvetory}');">
      <h1><strong>${order.nameInvetory}</strong></h1>
   </div>

   <div class="card-body">
      <h5 class="card-title">${order.name}</h5>

      <p class="card-text">E-mail: ${order.email}</p>
      <p class="card-text">Telefone: ${order.number}</p>
      <p class="card-text">Endereco: ${order.address}</p>
      <p class="card-text">Quantidade: <strong>${order.quantity}</strong></p>

      <p><strong></strong></p>
   </div>
   </li>
   </ul>
      <div class="card-body">
      <a class="card-link"><button class="btn btn-success">Entregue &nbsp; <i class="fas fa-truck" aria-hidden="true"></i></button></a>
      </div>
</div>
   `
});