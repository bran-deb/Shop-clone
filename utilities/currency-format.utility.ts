
export const format = (value: number) => {
    //crear formateador INTL
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    return formatter.format(value); // $239.50
}