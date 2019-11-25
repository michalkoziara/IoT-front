import {MatPaginatorIntl} from '@angular/material';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Wierszy na stronę:';
  customPaginatorIntl.nextPageLabel = 'Następna strona';
  customPaginatorIntl.previousPageLabel = 'Poprzednia strona';
  customPaginatorIntl.getRangeLabel = customRangeLabel;

  return customPaginatorIntl;
}

const customRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 z ${length}`; }

  length = Math.max(length, 0);
  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} z ${length}`;
};
