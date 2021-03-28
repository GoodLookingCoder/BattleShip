export const getRowAndColumn = ( start, axis, ship_length ) => {
    return axis === 'y'
        ? `${Math.floor(start / 10) + 1} / ${Number(start.toString().charAt(start.toString().length - 1)) + 1} / span ${ship_length} / span 1`
        : `${Math.floor(start / 10) + 1} / ${Number(start.toString().charAt(start.toString().length - 1)) + 1} / span 1 / span ${ship_length}`;
}