export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export enum ProductEvents{
  // Product Nav
  ALL = "Get all products",
  SELECTED = "Get selected products",
  AVAILABLE = "Get available products",
  SEARCH = "Search products",
  // Product List
  SELECT = "On select product",
  EDIT = "On edit product",
  DELETE = "On delete product",
  SET_AVAILAIBILITY = "Set product availaibility"
}