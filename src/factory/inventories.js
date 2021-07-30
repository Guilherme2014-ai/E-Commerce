module.exports = data => {
    let { name,img,price,category_id,desc } = data;
    price = Number(String(data.price).replace(',', '.').replace(' ', ''));

    return { name,img,price,category_id,desc,slug: String(String(name).replace(' ', '-').toLowerCase()) };
}