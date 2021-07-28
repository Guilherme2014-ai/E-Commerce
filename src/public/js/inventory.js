function buyList() {
    var buy = document.getElementById('content');

    buy.innerHTML =
    `<form action="/buy" method="POST">
    <div class="form-group">
      <label for="endereco">Endereço</label>
      <input type="email" class="form-control" id="endereco" aria-describedby="endereco" placeholder="Ex. Rua jose pereira de assis, 445">

      <label for="email">E-mail</label>
      <input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Ex. gui@hotmail.com">

      <label for="telefone">Telefone</label>
      <input type="tel" class="form-control" id="telefone" aria-describedby="telefone" placeholder="Ex. (15) 98844567">
    </div>
    <br>
    <div class="form-group">
      <label for="quantidade">Quantidade</label>
      <input type="number" class="form-control" id="quantidade" placeholder="Ex. 4">
    </div>
    <br>
    <button type="submit" class="btn btn-primary">Comprar</button>
</form>`
}