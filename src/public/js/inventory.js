function buyList() {
    var buy = document.getElementById('content');

    buy.innerHTML =
    `<form action="/buy" method="POST">
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input type="email" class="form-control" id="address" aria-describedby="endereco" placeholder="Ex. Rua jose pereira de assis, 445">
        </div>
        <br>
        <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <input type="number" class="form-control" id="quantity" placeholder="Ex. 4">
        </div>
        <br>
        <button type="submit" class="btn btn-primary form-control">Comprar</button>
    </form>`
}