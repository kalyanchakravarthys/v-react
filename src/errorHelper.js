const pickError = (e, error) => e.group === error.group && e.name === error.name && e.type === error.type;
export const getErrors = (state, error) => {
    if (!state) {
        return [...error];
    }
    let newErrors = [];
    const isExisting = state.find(e => pickError(e, error));
    if (isExisting && !error.hasError) {
        newErrors = state.filter(e => !pickError(e, error));
    } else if (!isExisting) {
        newErrors = state.map(e => Object.assign({}, e));
        newErrors.push(error);
    } else {
        newErrors = state;
    }
    return newErrors.filter(e => e.hasError);
}