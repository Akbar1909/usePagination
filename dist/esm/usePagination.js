import { __assign } from "tslib";
import { useReducer, useCallback } from 'react';
var defaultState = {
    list: {},
    page: 1,
    limit: 4,
    total: 0,
    filters: {},
    isFetching: false
};
var paginationReducer = function (state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case PAGINATION_ACTION_TYPES.SET_PAGE:
            return __assign(__assign({}, state), { page: payload });
        case PAGINATION_ACTION_TYPES.SET_TOTAL:
            return __assign(__assign({}, state), { total: payload });
        case PAGINATION_ACTION_TYPES.SET_IS_FETCHING:
            return __assign(__assign({}, state), { isFetching: payload });
        case PAGINATION_ACTION_TYPES.SET_LIMIT:
            return __assign(__assign({}, state), { limit: payload });
        case PAGINATION_ACTION_TYPES.SET_LIST:
            return __assign(__assign({}, state), { list: payload });
        case PAGINATION_ACTION_TYPES.ADD_NEW_FILTERS:
            return __assign(__assign({}, state), { filters: __assign(__assign({}, state.filters), payload) });
        case PAGINATION_ACTION_TYPES.SET_MULTIPLE_PROPERTIES:
            return __assign(__assign({}, state), payload);
        default:
            return state;
    }
};
var usePagination = function (filters, initialState) {
    var _a = useReducer((paginationReducer), __assign(__assign(__assign({}, defaultState), initialState), { filters: filters })), state = _a[0], dispatch = _a[1];
    var setPage = useCallback(function (currentPage) {
        return dispatch({
            type: PAGINATION_ACTION_TYPES.SET_PAGE,
            payload: currentPage
        });
    }, []);
    var setTotal = useCallback(function (total) { return dispatch({ type: PAGINATION_ACTION_TYPES.SET_TOTAL, payload: total }); }, []);
    var setIsFetching = useCallback(function (isFetching) {
        return dispatch({
            type: PAGINATION_ACTION_TYPES.SET_IS_FETCHING,
            payload: isFetching
        });
    }, []);
    var setLimit = useCallback(function (limit) { return dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIMIT, payload: limit }); }, []);
    var addNewFilter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    function (filters) {
        return dispatch({
            type: PAGINATION_ACTION_TYPES.ADD_NEW_FILTERS,
            payload: filters
        });
    }, []);
    var resetList = useCallback(function () { return dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIST, payload: {} }); }, []);
    var setList = useCallback(function (list, force) {
        var _a, _b;
        if (force === void 0) { force = false; }
        var newList = force ? (_a = {}, _a[state.page] = list, _a) : __assign(__assign({}, state.list), (_b = {}, _b[state.page] = list, _b));
        dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIST, payload: newList });
    }, [state]);
    var updateAnyFields = useCallback(function (payload) {
        return dispatch({
            type: PAGINATION_ACTION_TYPES.SET_MULTIPLE_PROPERTIES,
            payload: payload
        });
    }, []);
    return __assign({ setPage: setPage, setTotal: setTotal, setLimit: setLimit, setIsFetching: setIsFetching, addNewFilter: addNewFilter, resetList: resetList, setList: setList, updateAnyFields: updateAnyFields }, state);
};
export default usePagination;
//# sourceMappingURL=usePagination.js.map