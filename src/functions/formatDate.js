const formatDate = (date) => {
    const slice = date.slice(0, 10);
    const monthDay = slice.slice(5, 10);
    const catString = monthDay.concat("-", slice);
    return catString.slice(0, 10);
};

export default formatDate;