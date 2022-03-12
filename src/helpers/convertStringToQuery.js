export const convertToQuery = (fieldName, value) => {
    let queryString = `{"${fieldName}": "null"}`;
    let query = JSON.parse(queryString);
    query[fieldName] = value;
    return query;
};