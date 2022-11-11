interface IPaginationState<ListItemType = any, FiltersType = any> {
  list: Record<IPaginationState["page"], ListItemType[]>;
  page: number;
  limit: number;
  total: number;
  filters: FiltersType;
  isFetching: boolean;
}

declare enum PAGINATION_ACTION_TYPES {
  SET_TOTAL = "pagination/setTotoal",
  SET_LIST = "pagination/setList",
  SET_IS_FETCHING = "pagination/setIsFetching",
  SET_PAGE = "pagination/setPage",
  SET_LIMIT = "pagination/setLimit",
  ADD_NEW_FILTERS = "pagination/addNewFilters",
  SET_MULTIPLE_PROPERTIES = "pagination/setMultipleProperties",
}

interface SetPageAction {
  type: PAGINATION_ACTION_TYPES.SET_PAGE;
  payload: IPaginationState["page"];
}

interface SetTotalAction {
  type: PAGINATION_ACTION_TYPES.SET_TOTAL;
  payload: IPaginationState["total"];
}

interface SetIsFetching {
  type: PAGINATION_ACTION_TYPES.SET_IS_FETCHING;
  payload: IPaginationState["isFetching"];
}

interface SetLimitAction {
  type: PAGINATION_ACTION_TYPES.SET_LIMIT;
  payload: IPaginationState["limit"];
}

interface SetListAction {
  type: PAGINATION_ACTION_TYPES.SET_LIST;
  payload: IPaginationState["list"];
}

interface AddNewFiltersAction {
  type: PAGINATION_ACTION_TYPES.ADD_NEW_FILTERS;
  payload: IPaginationState["filters"];
}

interface SetMultiplePropertiesAction {
  type: PAGINATION_ACTION_TYPES.SET_MULTIPLE_PROPERTIES;
  payload: Partial<IPaginationState>;
}

type TActions =
  | SetPageAction
  | SetTotalAction
  | SetIsFetching
  | SetLimitAction
  | SetListAction
  | AddNewFiltersAction
  | SetMultiplePropertiesAction;
