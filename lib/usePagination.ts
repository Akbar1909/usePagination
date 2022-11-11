import { useReducer, useCallback } from "react";

const defaultState: IPaginationState = {
  list: {},
  page: 1,
  limit: 4,
  total: 0,
  filters: {},
  isFetching: false,
};

const paginationReducer = <ListItemType, FiltersType>(
  state: IPaginationState<ListItemType, FiltersType>,
  { type, payload }: TActions
) => {
  switch (type) {
    case PAGINATION_ACTION_TYPES.SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case PAGINATION_ACTION_TYPES.SET_TOTAL:
      return {
        ...state,
        total: payload,
      };
    case PAGINATION_ACTION_TYPES.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: payload,
      };
    case PAGINATION_ACTION_TYPES.SET_LIMIT:
      return {
        ...state,
        limit: payload,
      };
    case PAGINATION_ACTION_TYPES.SET_LIST:
      return {
        ...state,
        list: payload,
      };
    case PAGINATION_ACTION_TYPES.ADD_NEW_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload,
        },
      };
    case PAGINATION_ACTION_TYPES.SET_MULTIPLE_PROPERTIES:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const usePagination = <ListItemType = object, FiltersType = object>(
  filters?: FiltersType,
  initialState?: Partial<IPaginationState<ListItemType, FiltersType>>
) => {
  const [state, dispatch] = useReducer(
    paginationReducer<ListItemType, FiltersType>,
    {
      ...defaultState,
      ...initialState,
      filters,
    }
  );

  const setPage = useCallback(
    (currentPage: IPaginationState["page"]) =>
      dispatch({
        type: PAGINATION_ACTION_TYPES.SET_PAGE,
        payload: currentPage,
      }),
    []
  );

  const setTotal = useCallback(
    (total: IPaginationState["total"]) =>
      dispatch({ type: PAGINATION_ACTION_TYPES.SET_TOTAL, payload: total }),
    []
  );

  const setIsFetching = useCallback(
    (isFetching: boolean) =>
      dispatch({
        type: PAGINATION_ACTION_TYPES.SET_IS_FETCHING,
        payload: isFetching,
      }),
    []
  );

  const setLimit = useCallback(
    (limit: IPaginationState["limit"]) =>
      dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIMIT, payload: limit }),
    []
  );

  const addNewFilter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (filters: Partial<FiltersType>) =>
      dispatch({
        type: PAGINATION_ACTION_TYPES.ADD_NEW_FILTERS,
        payload: filters,
      }),
    []
  );

  const resetList = useCallback(
    () => dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIST, payload: {} }),
    []
  );

  const setList = useCallback(
    (list: ListItemType[], force = false) => {
      const newList = force
        ? { [state.page]: list }
        : { ...state.list, [state.page]: list };
      dispatch({ type: PAGINATION_ACTION_TYPES.SET_LIST, payload: newList });
    },
    [state]
  );

  const updateAnyFields = useCallback(
    (payload: Partial<IPaginationState<ListItemType, FiltersType>>) =>
      dispatch({
        type: PAGINATION_ACTION_TYPES.SET_MULTIPLE_PROPERTIES,
        payload,
      }),
    []
  );

  return {
    setPage,
    setTotal,
    setLimit,
    setIsFetching,
    addNewFilter,
    resetList,
    setList,
    updateAnyFields,
    ...state,
  };
};

export default usePagination;
