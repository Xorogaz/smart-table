import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                      .map(name => {
                          const option = document.createElement('option');
                          option.value = name;
                          option.textContent = name;
                          return option;
                      })
        )
    });

    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector('input');
            if (input) {
                input.value = '';
            }
            if (field) {
                state[field] = '';
            }
        }

        const filterState = {
            ...state,
            total: [
                state.totalFrom ? Number(state.totalFrom) : undefined,
                state.totalTo ? Number(state.totalTo) : undefined
            ]
        };

        return data.filter(row => compare(row, filterState));
    }
}