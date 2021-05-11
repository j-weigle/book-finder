function parseRawBooksJson (rawJson) {
  const { items } = rawJson;
  if (!items) return [];

  return items.map(bookItem => {
    const volumeInfo = bookItem.volumeInfo;

    const {
      authors,
      description,
      pageCount,
      previewLink,
      publishedDate,
      publisher,
      subtitle,
      title
    } = volumeInfo;
    const bookCover = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://www.lse.ac.uk/International-History/Images/Books/NoBookCover.png';

    return {
      authors,
      description,
      bookCover,
      pageCount,
      previewLink,
      publishedDate,
      publisher,
      subtitle,
      title,
    };
  });
}

export async function fetchBooksFromAPI (query, startIndex, maxResults) {
  const apiURL = 'https://www.googleapis.com/books/v1/volumes' +
    '?q=' + query +
    '&startIndex=' + startIndex.toString() +
    '&maxResults=' + maxResults.toString();
  try {
    const res = await fetch(apiURL);
    const rawJson = await res.json();
    console.log(res);
    console.log(rawJson);
    const books = parseRawBooksJson(rawJson);
    const { totalItems } = rawJson;
    return { books, totalItems };
  } catch (e) {
    console.error(e);
  }
}