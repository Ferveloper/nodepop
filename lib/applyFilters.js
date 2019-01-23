function applyFilters(name, forSale, price, tags) {
    const filter = {};
    if (name) filter.name = new RegExp(`^${name}`, 'i');
    if (forSale) filter.forSale = forSale;
    if (tags) filter.tags = {
        $in: (typeof tags === 'string') ? [tags] : tags
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