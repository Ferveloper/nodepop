function applyFilters(name, sale, price, tag) {
    const filter = {};
    if (name) filter.name = new RegExp(`^${name}`, 'i');
    if (sale) filter.forSale = sale;
    if (tag) filter.tags = {
        $in: (typeof tag === 'string') ? [tag] : tag
    };
    if (price) filter.price = parsePrice(price)
    return filter;
}

function parsePrice(price) {
    const parsedPrice = {};
    const arr = price.split('-')
    if (arr.length === 1) return price;
    if (arr.length === 2) {
        if (arr[0] !== "") parsedPrice.$gte = arr[0];
        if (arr[1] !== "") parsedPrice.$lte = arr[1];
    }
    return parsedPrice;
}

module.exports = applyFilters;