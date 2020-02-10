export default function (state) {
    return {
        get (path, defaultValue) { return state.get(path, defaultValue); },
        set (path, value) { return state.set(path, value); },
        unset (path) { return state.unset(path); },
        has (path) { return state.has(path) },

        isTrue (path) { return !!state.get(path, false); },
        isFalse (path) { return !state.get(path, false); },
        isEqual (path1, path2) { return state.get(path1, path1) === state.get(path2, path2) },
        isNotEqual (path1, path2) { return state.get(path1, path1) !== state.get(path2, path2) },
        isLessThan (path1, path2) { return state.get(path1, path1) < state.get(path2, path2) },
        isGreaterThan (path1, path2) { return state.get(path1, path1) > state.get(path2, path2) },
        isEqualOrlessThan (path1, path2) { return state.get(path1, path1) <= state.get(path2, path2) },
        isEqualOrGreaterThan (path1, path2) { return state.get(path1, path1) >= state.get(path2, path2) },
    }
}