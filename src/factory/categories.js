module.exports = categories => {
    const Category = {
        name: '',
        img: '',
        inventory: []
    }

    Category['name'] = categories[0]["nameC"];
    Category['img'] = categories[0]["imgC"];

    categories.forEach(category => {
        Category.inventory.push({
            id: category['id'],
            name: category['name'],
            img: category['img'],
            slug: category['slug'],
            desc: category['desc'],
            price: category['price']
        })
    })

    return Category;
}