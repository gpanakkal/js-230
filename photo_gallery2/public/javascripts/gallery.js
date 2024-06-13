const select = (selector) => document.querySelector(selector);

const reorder = (arr, i) => arr.slice(i).concat(arr.slice(0, i));

document.addEventListener('DOMContentLoaded', () => {
  const photosTemplate = Handlebars.compile(select('#photos').innerHTML);
  const photoInfoTemplate = Handlebars.compile(select('#photo_information').innerHTML);
  const photoCommentsTemplate = Handlebars.compile(select('#photo_comments').innerHTML);
  const photoCommentTemplate = Handlebars.compile(select('#photo_comment').innerHTML);
  const photoCommentPartial = Handlebars.registerPartial('photo_comment', select('#photo_comment').innerHTML);

  
  const photoInfoElement = select('#photo-info');
  const photoCommentsElement = select('#comments ul');


  const fetchComments = (id) => {
    const commentReq = new XMLHttpRequest();
    commentReq.open('GET', `/comments?photo_id=${id}`);
    commentReq.responseType = 'json';
    commentReq.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  
    commentReq.addEventListener('load', (e) => {
      const comments = commentReq.response;
      console.log({comments})
      photoCommentsElement.innerHTML = photoCommentsTemplate({ comments });
  
    });
  
    commentReq.send();  
  }

  const insertNewComment = (commentObj) => {
    photoCommentsElement.insertAdjacentHTML('beforeend', photoCommentTemplate({ ...commentObj }));
  }
  
  const renderPhotos = (photos, index) => {
    const currentPhoto = photos[index];
    if (!currentPhoto) return;
    const loadedPhotos = select('#slides');
    if (!loadedPhotos.innerHTML) {
      loadedPhotos.innerHTML = photosTemplate({ photos: reorder(photos, index) });
    } else {
      select('#slides').insertAdjacentElement('beforeend', select('#slides figure'));
    }
    photoInfoElement.innerHTML = photoInfoTemplate({ ...currentPhoto });
  
    fetchComments(currentPhoto.id);

    return index;
  }

  const fetchPhotos = new XMLHttpRequest();
  fetchPhotos.open('GET', '/photos');
  fetchPhotos.responseType = 'json';
  fetchPhotos.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

  fetchPhotos.addEventListener('load', (e) => {
    const photos = fetchPhotos.response;
    let currentPhotoIndex = renderPhotos(photos, 0);

    select('a.next').addEventListener('click', (e) => {
      e.preventDefault();
      let nextIdx = currentPhotoIndex + 1;
      if (nextIdx >= photos.length) nextIdx = 0;
      currentPhotoIndex = renderPhotos(photos, nextIdx);
    });

    select('a.prev').addEventListener('click', (e) => {
      e.preventDefault();
      let prevIdx = currentPhotoIndex - 1;
      if (prevIdx < 0) prevIdx = photos.length - 1;
      currentPhotoIndex = renderPhotos(photos, prevIdx);
    });

    const photoActionsElement = select('#photo-info div.actions');
    photoActionsElement.addEventListener('click', (e) => {
      console.log(e.target.tagName)
      e.preventDefault();
      if (e.target.tagName !== 'A') return;

      fetch(e.target.href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: 'photo_id=' + e.target.dataset.id,
      }).then((response) => response.json())
      .then(({ total }) => {
        e.target.textContent = e.target.textContent.replace(/\d+/, total);
      })
      .catch((error) => console.error(error));     
    });

    select('#comments form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);

      fetch(form.action, {
        method: form.getAttribute('method'),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: new URLSearchParams([...formData]),
      })
      .then((response) => response.json())
      .then((data) => {
        insertNewComment(data);
        form.reset();
      })
      .catch((error) => console.error(error)); 
    })
  });

  fetchPhotos.send();

});
