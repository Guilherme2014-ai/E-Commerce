module.exports = data => {
    let { name,img,price,category_id,desc } = data;
    const newPrice = Number(String(price).replace(',', '.').replace(' ', ''));

    return { name,img,price: newPrice,category_id,desc,slug: String(String(name).replace(' ', '-').toLowerCase()) };
}