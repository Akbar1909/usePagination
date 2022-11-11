'use strict'
exports.__esModule = true
var tslib_1 = require('tslib')
var react_1 = require('react')
var defaultState = {
  list: {},
  page: 1,
  limit: 4,
  total: 0,
  filters: {},
  isFetching: false,
}
var paginationReducer = function (state, _a) {
  var type = _a.type,
    payload = _a.payload
  switch (type) {
    case PAGINATION_ACTION_TYPES.SET_PAGE:
      return tslib_1.__assign(tslib_1.__assign({}, state), { page: payload })
    case PAGINATION_ACTION_TYPES.SET_TOTAL:
      return tslib_1.__assign(tslib_1.__assign({}, state), { total: payload })
    case PAGINATION_ACTION_TYPES.SET_IS_FETCHING:
      return tslib_1.__assign(tslib_1.__assign({}, state), { isFetching: payload })
    case PAGINATION_ACTION_TYPES.SET_LIMIT:
      return tslib_1.__assign(tslib_1.__assign({}, state), { limit: payload })
    case PAGINATION_ACTION_TYPES.SET_LIST:
      return tslib_1.__assign(tslib_1.__assign({}, state), { list: payload })
    case PAGINATION_ACTION_TYPES.ADD_NEW_FILTERS:
      return tslib_1.__assign(tslib_1.__assign({}, state), {
        filters: tslib_1.__assign(tslib_1.__assign({}, state.filters), payload),
      })
    case PAGINATION_ACTION_TYPES.SET_MULTIPLE_PROPERTIES:
      return tslib_1.__assign(tslib_1.__assign({}, state), payload)
    default:
      return state
  }
}
var usePagination = function (filters, initialState) {
  var _a = (0, react_1.useReducer)(
      paginationReducer,
      tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultState), initialState), { filters: filters }),
    ),
    state = _a[0],
    dispatch = _a[1]
  var setPage = (0, react_1.useCallback)(function (currentPage) {
    return dispatch({
      type: PAGINATION_ACTION_TYPES.SET_PAGE,
      payload: currentPage,
    })
  }, [])
  var setTotal = (0, react_1.useCallback)(function (total) {
    return dispatch({ type: PAGINATION_ACTION_TYPES.SET_TOTAL, payload: total })
  }, [])
  var setIsFetching = (0, react_1.useCallback)(function (isFetching) {
    return dispatch({
      type: PAGINATION_ACTION_TYPES.SET_IS_FETCHING,
      payload: isFetching,
    })
  }, [])
  var setLimit = (0, react_1.useCallback)(function (limit) {
    return dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIMIT, payload: limit })
  }, [])
  var addNewFilter = (0, react_1.useCallback)(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    function (filters) {
      return dispatch({
        type: PAGINATION_ACTION_TYPES.ADD_NEW_FILTERS,
        payload: filters,
      })
    },
    [],
  )
  var resetList = (0, react_1.useCallback)(function () {
    return dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIST, payload: {} })
  }, [])
  var setList = (0, react_1.useCallback)(
    function (list, force) {
      var _a, _b
      if (force === void 0) {
        force = false
      }
      var newList = force
        ? ((_a = {}), (_a[state.page] = list), _a)
        : tslib_1.__assign(tslib_1.__assign({}, state.list), ((_b = {}), (_b[state.page] = list), _b))
      dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIST, payload: newList })
    },
    [state],
  )
  var updateAnyFields = (0, react_1.useCallback)(function (payload) {
    return dispatch({
      type: PAGINATION_ACTION_TYPES.SET_MULTIPLE_PROPERTIES,
      payload: payload,
    })
  }, [])
  return tslib_1.__assign(
    {
      setPage: setPage,
      setTotal: setTotal,
      setLimit: setLimit,
      setIsFetching: setIsFetching,
      addNewFilter: addNewFilter,
      resetList: resetList,
      setList: setList,
      updateAnyFields: updateAnyFields,
    },
    state,
  )
}
exports['default'] = usePagination
//# sourceMappingURL=usePagination.js.map
