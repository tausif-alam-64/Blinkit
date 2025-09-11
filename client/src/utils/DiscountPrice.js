export const DiscountPrice = (price, discount = 1) => {
    const discountPrice = Math.ceil((Number(price) * Number(discount)) / 100)
    const actualPrice = Number(price) - discountPrice
    return actualPrice
}