export const countOfDivsContainingString = (divCollection, str) => {
    let divCount = 0;

    divCollection.forEach((div) => {
        if (div.props().children.includes(str)) {
            divCount += 1;
        }
    });
    return divCount;
};