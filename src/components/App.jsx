import { useState, useEffect, useLayoutEffect } from 'react';
import { animateScroll } from 'react-scroll';
import Notiflix from 'notiflix';
import { fetchArticles } from './SearchApi/Api';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './BtnLoadMore/Button';
import { AppWrap } from './App.styled';

import { Loader } from './Loader/Loader';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setStatus('pending');
    getImages();

    async function getImages() {
      try {
        const newImages = await fetchArticles({
          page,
          searchQuery,
        });

        if (newImages.hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setStatus('rejected');
          return;
        }

        const lastPage = Math.ceil(newImages.totalHits / 12);
        const images = newImages.hits.map(
          ({ webformatURL, id, largeImageURL, tags }) => ({
            webformatURL,
            id,
            largeImageURL,
            tags,
          })
        );
        setImages(prevState => [...prevState, ...images]);
        setStatus('resolved');
        setLastPage(lastPage);
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
  }, [searchQuery, page]);

  useLayoutEffect(() => {
    images.length !== 0 &&
      animateScroll.scrollToBottom({ duration: 1000, smooth: 'behavior' });
  }, [images]);

  function onSubmit(searchQuery) {
    searchQuery === ''
      ? Notiflix.Notify.warning(
          'Serach field is empty,please write something and try again.'
        )
      : setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLastPage(0);
    setStatus('idle');
  }

  const showLoadMoreBtn = status === 'resolved' && page !== lastPage;

  return (
    <AppWrap>
      <Searchbar onSubmit={onSubmit} />

      {images.length > 0 && <ImageGallery imagesList={images} />}

      {showLoadMoreBtn && <Button onLoadMore={setPage} />}

      {status === 'pending' && <Loader />}
    </AppWrap>
  );
}
