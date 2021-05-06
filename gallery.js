import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');


const createGalleryMarkup = galleryItems.map(({ preview, original,  description}) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
        alt="${description}"
        />
      </a>
    </li>`
    ;
}).join(' ');

galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup);


galleryEl.addEventListener('click', onGallaryClick);
modalCloseBtn.addEventListener('click', onCloseModal);
overlay.addEventListener('click', onCloseModal);


function onGallaryClick(e) {
    e.preventDefault();
    
    const target = e.target;
    if (target.nodeName !== 'IMG') {
            return;
        }
   
    openModal();   
    
  modalImg.src = target.dataset.source;

};
  
window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  });
  

function openModal() {
  modalEl.classList.add('is-open');

  console.log('это открытие модалки');
};

function onCloseModal(){
    modalEl.classList.remove('is-open');
  modalImg.src = '';

  console.log('это закрытие модалки');
};

// пролистывание клавишами "влево" и "вправо"

const arrayImages = document.querySelectorAll('.gallery__image');
const imagesSrc = [];

arrayImages.forEach(e => {
  imagesSrc.push(e.getAttribute('data-source'));
});


document.addEventListener('keydown', e => {
  let newIndex = imagesSrc.indexOf(modalImg.src);
  
    if (newIndex < 0) {
    return;
  }
  if (e.code === 'ArrowLeft') {
    newIndex -= 1;
    if (newIndex === -1) {
      newIndex = imagesSrc.length - 1;
    }
  } else if (e.code === 'ArrowRight') {
    newIndex += 1;
    if (newIndex === imagesSrc.length) {
      newIndex = 0;
    }
  }
  modalImg.src = imagesSrc[newIndex];
});


