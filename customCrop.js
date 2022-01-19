const dropArea = document.querySelector('.img__container');
const modal = document.querySelector('.modal');
let modalImage = document.querySelector('#img-area-modal');
let defImage = document.querySelector('#img-area');
let cropper;

let fakeInput = document.createElement('input');
fakeInput.type = 'file';
fakeInput.accept = 'image/*';
fakeInput.multiple = true;

dropArea.addEventListener('click', function (e) {
  fakeInput.click();
});

fakeInput.addEventListener('input', (e) => {
  e.preventDefault();
  modal.classList.add('show');
  let img = e.target.files[0];
  let imgInput = new FileReader();
  imgInput.onload = (result) => {
    modalImage.src = result.target.result;
    checkShow();
  };

  imgInput.readAsDataURL(img);
});

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.target.classList.add('over');
});

dropArea.addEventListener('dragleave', (e) => {
  e.target.classList.remove('over');
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();

  e.target.classList.remove('over');
  modal.classList.add('show');
  let file = e.dataTransfer.files[0];
  let fileReader = new FileReader();

  fileReader.onload = (result) => {
    modalImage.src = result.target.result;
    checkShow();
  };

  fileReader.readAsDataURL(file);
});

let crop = document.querySelector('.crop');

crop.addEventListener('click', function (e) {
  canvas = cropper.getCroppedCanvas({
    width: 400,
    height: 400,
  });

  canvas.toBlob(function (blob) {
    url = URL.createObjectURL(blob);

    var reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = function (e) {
      var base64data = e.target.result;
      $.ajax({
        url: 'upload.php',
        method: 'POST',
        data: { image: base64data },
        success: function (data) {
          modal.classList.toggle('show');
          checkShow();
          defImage.src = data;
        },
        error: function (e) {
          console.log('error', e);
        },
      });
    };
  });
});

/* check show */

const checkShow = (show) => {
  if (modal.classList.contains('show')) {
    cropper = new Cropper(modalImage, {
      aspectRatio: 1,
      viewMode: 3,
    });
  } else {
    cropper.destroy();
    cropper = null;
  }
};
