const dropArea = document.querySelector('.img__container');
const modal = document.querySelector('.modal');
let modalImage = document.querySelector('#img-area-modal');
let defImage = document.querySelector('#img-area');
const errorFormat = document.querySelector('.error-format');
const errorSize = document.querySelector('.error-size');
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
  let img = e.target.files[0];
  console.log('file', img);
  checkFormatSize(img);
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
  console.log('truedasd');
  e.target.classList.remove('over');
  let img = e.dataTransfer.files[0];
  checkFormatSize(img);
  // let fileReader = new FileReader();

  // fileReader.onload = (result) => {
  //   modalImage.src = result.target.result;
  //   checkShow();
  // };

  // fileReader.readAsDataURL(file);
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

const isImage = (str) => /.+\.(?=png|jpe?g|gif|svg)/i.test(str);
const isSize = (size) => {
  const maxSize = 1;
  const imgSize = size / (1024 * Math.pow(10, 3));
  return imgSize < maxSize ? true : false;
};

const checkFormatSize = (img) => {
  errorFormat.innerText = `${img.name}`;
  errorFormat.style.color = 'inherit';
  if (isImage(img.name) == true) {
    if (isSize(img.size) == true) {
      errorSize.innerText = `размер вашего изображения : ${(
        img.size /
        (1024 * Math.pow(10, 3))
      ).toFixed(2)}мб`;
      errorSize.style.color = 'inherit';
      modal.classList.add('show');
      imgOnload(img);
    } else {
      console.log('true', isSize(img.size) == false);
      errorSize.innerText = ` слишком болшой размер ${(img.size / (1024 * Math.pow(10, 3))).toFixed(
        2,
      )}мб`;
      errorSize.style.color = 'red';
    }
  } else {
    errorFormat.innerText = `формат не поддерживается`;
    errorFormat.style.color = 'red';
    console.log('true', isImage(img.name) == false);
  }
};

const imgOnload = (img) => {
  let imgInput = new FileReader();
  imgInput.onload = (result) => {
    modalImage.src = result.target.result;
    checkShow();
  };
  imgInput.readAsDataURL(img);
};
