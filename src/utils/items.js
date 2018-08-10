export const lastOrder = data => {
    const keys = Object.keys(data);

    return keys.map(key => data[key]).reduce((output, item) => {
        const { order = 0 } = item || {};

        return Math.max(output, order);
    }, 0);
};

export const getNewOrder = (sortedData, newIndex, delta) => {
    let itemBefore = sortedData[newIndex - 1 + delta],
        itemAfter = sortedData[newIndex + delta];

    if (!itemBefore && !itemAfter) return 1;

    if (!itemBefore) {
        itemBefore = { order: itemAfter.order - 1 };
    }

    if (!itemAfter) {
        itemAfter = { order: itemBefore.order + 1 };
    }

    return (itemBefore.order + itemAfter.order) / 2;
};
