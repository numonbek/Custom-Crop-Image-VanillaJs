
<?php
//index.php

?>
<!DOCTYPE html>
<html>
	<head>
		<title>Crop Image Before Upload using CropperJS with PHP</title>
		<link rel="stylesheet" href="style.css"/>
		<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" /> -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>         -->
		<!-- <link rel="stylesheet" href="https://unpkg.com/dropzone/dist/dropzone.css" /> -->
		<link href="https://unpkg.com/cropperjs/dist/cropper.css" rel="stylesheet"/>
		<!-- <script src="https://unpkg.com/dropzone"></script> -->
		<script src="https://unpkg.com/cropperjs"></script>
		<!-- <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script> -->
<!-- <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" /> -->
		
	</head>
	<body>
		<div class="container" align="center">
		
		<div class="img__container">
			<img src="" alt="" id="img-area">
			

		</div>
		<div class="error-format">format</div>
		<div class="error-size">size</div>
		<input type="file" id="imputs"/>
		<div class="modal" style="display:none;">
			<div class="modal__container">
				<div class="modal-content">
				<img style="max-width:100%; height:100%; display:block" src="upload/1642449sds640.png" alt="" id="img-area-modal">
				</div>
				<div style="max-width:100px; height:100px; display:block" class="modal-prev"></div>
				<div class="crop">crop</div>
			</div>
			
		</div>
		<!-- <script src="crop.js"></script> -->
		<script src="customCrop.js"></script>
	</body>
</html>


