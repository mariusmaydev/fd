<?php
    $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    require_once $rootpath.'/fd/resources/php/Paths.php';
    require_once $rootpath.'/fd/resources/php/converter/image/filter/filterCore.php';

    function UploadImage(Imagick|string $img, int $BoxX, array $filterData) : array {
        if(gettype($img) == 'string') {
            $content = file_get_contents($img);
            $img = new Imagick();
            $img -> readImageBlob($content);
        }
        $width  = $BoxX;
        $height = $img -> getImageHeight() / ($img -> getImageWidth() / $BoxX);
    
        $img -> resizeImage(intval($width), intval($height), Imagick::FILTER_GAUSSIAN, 0);
        $img -> setImageFormat("png");

        $response = array();
        $response[ImageDB::IMAGE_SCALE] = clone $img;
        $response[ImageDB::IMAGE_VIEW]  = Filter::createImage(($img), $filterData);
        $response['width']  = $width;
        $response['height'] = $height;

        return $response;
    }
    /**
     * 
     * @param [type] $UploadFiles
     * @param [type] $BoxX
     * @param [type] $BoxY
     * @return array ImageScale, ImageView, ImageViewColor, ImageView_nT, width, height
     */
    // function UploadImage_scaled($UploadFiles, $BoxX, $BoxY, $filter){
    //     $content = file_get_contents($UploadFiles);

    //     $img = new Imagick();
    //     $img -> readImageBlob($content);
    //     $response = [];
    //     $response = UploadImage($img, $BoxX, $filter);
    //     $response[ImageDB::IMAGE_SCALE] = $img;
    //     return $response;
    
    //     // $width  = $BoxX;
    //     // $height = $img -> getImageHeight() / ($img -> getImageWidth() / $BoxX);
    
    //     // $img -> resizeImage($width, $height, Imagick::FILTER_GAUSSIAN, 0);
    //     // $img -> setImageFormat("png");
    //     // $response = array();
    
    //     // $imgOut = new Filter(clone $img);
    //     // $imgOut -> createImage($filter);
    //     // $response[ImageDB::IMAGE_VIEW] = $imgOut -> get();

    //     // $response['width']  = $width;
    //     // $response['height'] = $height;
    //     // $img -> setImageFormat("png");
    //     // $response[ImageDB::IMAGE_SCALE] = $img;

    //     // imagedestroy($img);
    
    //     // return $response;
    // }

    function resize_image($img, $w, $h, $crop=FALSE) {
        $width  = imagesx($img);
        $height = imagesy($img); 
        $dst = imagecreatetruecolor($w, $h);
        imagecopyresampled($dst, $img, 0, 0, 0, 0, $w, $h, $width, $height);
        return $dst;
    }
    
    function is_image($path){
        $a = getimagesize($path);
        $image_type = $a[2];
            
        return $image_type;
    }
    
    function convertImage($originalImage){
        // $exploded = is_image($originalImage);
        // $ext = $exploded[count($exploded) - 1]; 
    
        // if (preg_match('/jpg|jpeg/i', $ext)){
        //   $imageTmp = imagecreatefromjpeg($originalImage);
        // } else if (preg_match('/png/i', $ext)){
        //   $imageTmp = imagecreatefrompng($originalImage);
        // } else if (preg_match('/gif/i', $ext)){
        //   $imageTmp = imagecreatefromgif($originalImage);
        // } else if (preg_match('/bmp/i', $ext)){
        //   $imageTmp = imagecreatefrombmp($originalImage);
        // } else if (preg_match('/webp/i', $ext)){
        //   $imageTmp = imagecreatefromwebp($originalImage);
        // } else if (preg_match('/wbmp/i', $ext)){
        //   $imageTmp = imagecreatefromwbmp($originalImage);
        // } else if (preg_match('/tga/i', $ext)){
        //   $imageTmp = imagecreatefromtga($originalImage);
        // } else if (preg_match('/xbm/i', $ext)){
        //   $imageTmp = imagecreatefromxbm($originalImage);
        // } else if (preg_match('/xpm/i', $ext)){
        //   $imageTmp = imagecreatefromxpm($originalImage);
        // } else {
        //   return false;
        // }
        ob_start(); 
            imagepng($originalImage);
            $originalImage = ob_get_contents(); 
        ob_end_clean(); 
        return $originalImage;
    }
?>