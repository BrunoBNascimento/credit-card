class PaginatedResultDTO<T> {
  constructor(data: Array<T>, page: number, count: number, total: number) {
    this.data = data;
    this.page = page;
    this.count = count;
    this.total = total;
  }

  data: Array<T>;
  page: number;
  count: number;
  total: number;
}

export default PaginatedResultDTO;
