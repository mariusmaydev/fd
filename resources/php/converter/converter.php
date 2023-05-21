<?php
    $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    require_once $rootpath.'/fd/resources/php/CORE.php';
    require_once $rootpath.'/fd/resources/php/converter/image/filter/filterCore.php';
    require_once $rootpath.'/fd/resources/php/converter/image/image.php'; 
    require_once $rootpath.'/fd/resources/php/converter/create/creator.php';
    require_once $rootpath.'/fd/resources/php/converter/SVG/StartGeneratingSVG.php';
    require_once $rootpath.'/fd/resources/php/converter/SVG/generateLaserData.php';
    require_once $rootpath.'/fd/resources/php/converter/3Dprint/3Dprint.php';
    require_once $rootpath.'/fd/resources/php/converter/3Dprint/3DprintVase.php';
    require_once $rootpath.'/fd/resources/php/converter/3mf/3mfConverter.php';
    require_once $rootpath.'/fd/resources/php/project/project.php';

    class Converter {
        const FLIP_TYPE     = "FLIP_TYPE";
        const USER_ID       = "UserID";
        const PROJECT_ID    = "ProjectID";
        // public static function createThumbnail(){
        //     $StorageProject = $_POST["StorageProject"];

        //     $StorageImg     = null;
        //     $StorageText    = null;
        //     if(isset($_POST["StorageImg"])){
        //         $StorageImg     = $_POST["StorageImg"];
        //     }
        //     if(isset($_POST["StorageText"])){
        //         $StorageText    = $_POST["StorageText"];
        //     }
        //     createThumbnail($StorageProject, $StorageImg, $StorageText);
        // }
        public static function filter(){
            $ImageData  = $_POST["Storage"];
            // debugg($ImageData);
            $Filter     = $ImageData[ImageDB::IMAGE_FILTER]; 
            $SessionObj = new Sessions();
            $Sessions = $SessionObj -> save();
            $imgScale = getSingleProjectImage($Sessions[Sessions::USER_ID], $Sessions[Sessions::PROJECT_ID], $ImageData[ImageDB::IMAGE_ID], PATH_Project::IMG_SCALE);
            
            Filter::createImage($imgScale, $Filter);
            $response[ImageDB::IMAGE_VIEW_PATH] = saveSingleProjectImage($ImageData[ImageDB::IMAGE_ID], PATH_Project::IMG_VIEW, $imgScale, $Sessions[Sessions::USER_ID], $Sessions[Sessions::PROJECT_ID]);
            $SessionObj -> unsave();
            Communication::sendBack($response);
        }
        public static function flip(){
            $ImageID = $_POST[ImageDB::IMAGE_ID];
            $flipType = IMG_FLIP_HORIZONTAL;

            $SessionObj = new Sessions();
            $Sessions = $SessionObj -> save();
            
            $Images = [];
            getProjectImages($Images, $Sessions[Sessions::USER_ID], $Sessions[Sessions::PROJECT_ID], $ImageID);

            $response = [];
            $response[ImageDB::IMAGE_SCALE] = getSingleProjectImage($Sessions[Sessions::USER_ID], $Sessions[Sessions::PROJECT_ID], $ImageID, PATH_Project::IMG_SCALE);
            $response[ImageDB::IMAGE_VIEW] = getSingleProjectImage($Sessions[Sessions::USER_ID], $Sessions[Sessions::PROJECT_ID], $ImageID, PATH_Project::IMG_VIEW);

            if($_POST[self::FLIP_TYPE] == "VERTICAL"){
                $response[ImageDB::IMAGE_SCALE] -> flipImage();
                $response[ImageDB::IMAGE_VIEW] -> flipImage();
            } else {
                $response[ImageDB::IMAGE_SCALE] -> flopImage();
                $response[ImageDB::IMAGE_VIEW] -> flopImage();
            }
            $response[ImageDB::IMAGE_SCALE_PATH] = saveSingleProjectImage($ImageID, PATH_Project::IMG_SCALE, $response[ImageDB::IMAGE_SCALE], $Sessions[Sessions::USER_ID], $Sessions[Sessions::PROJECT_ID]);
            $response[ImageDB::IMAGE_VIEW_PATH] = saveSingleProjectImage($ImageID, PATH_Project::IMG_VIEW, $response[ImageDB::IMAGE_VIEW], $Sessions[Sessions::USER_ID], $Sessions[Sessions::PROJECT_ID]);

            $SessionObj -> unsave();

            print_r(json_encode($response));
        }
        public static function create($UserID, $ProjectID){
            global $rootpath;
            // $Storage = [];
            // $Storage["IMG"] = $_POST["StorageImg"];
            // $Storage["TXT"] = $_POST["StorageText"];
            // $Storage["PROJECT"] = $_POST["StorageProject"];
            
            // $vase = new print3Dvase(50, 50, 60);
            // $vase -> draw();
            // $vase -> getNC();
            // start_3mf();
            $ProjectData = Project::get($ProjectID, $UserID, false);
            Debugg::log($UserID);
            $ImageData = Image::get(null, $ProjectID, $UserID, false);
            $TextData = Text::get(null, $UserID, $ProjectID, false);
            // Communication::sendBack($TextData);
            start($ProjectData, $UserID, $ImageData, $TextData);
            // start_generatingLaserData($_POST["StorageProject"], checkIsset($_POST["StorageImg"]), checkIsset($_POST["StorageText"]));


            // debugg("start");
            // $imgScale = imagecreatefrompng($rootpath . "/fd/data/3Dprint/testFlorian2.png");
            // $print = new print3DImage();
            // $print -> gen3DImage($imgScale);
            // debugg("end");
            // $pathObjectIn = print3D::f1($imgScale, imagesx($imgScale), imagesy($imgScale));
            // $pathObject = new PathObject();
            // $pathElements = $pathObjectIn -> getElements();
            // foreach($pathElements as $key => $pathElement){
            //     $p = print3D::sortPathElement($pathElement);
            //     $pathObject -> addElement($p);
            //     // error_log($key);
            //     // break;
            // }
            // print3D::PathObject2Img($pathObject, "3DLayer", imagesx($imgScale), imagesy($imgScale));



            // error_log(print_r($imgArray, true));
            // create_START($_POST["StorageProject"], checkIsset($_POST["StorageImg"]), checkIsset($_POST["StorageText"]));

        }
        public static function createLithopane(){
            global $rootpath;
            Debugg::warn("test");
            Debugg::log("test");
            Debugg::error("test");
            Debugg::time();
            // $imgScale = imagecreatefrompng($rootpath . "/fd/data/3Dprint/4.png");
            // $print = new print3DImage();
            // $print -> x = 100;
            // $print -> y = 100;
            // $print -> stroke = 0.4;
            // $print -> baseHeight = 0.8;
            // $print -> maxHeight = 3.2;

            // $print -> gen3DImage($imgScale);
        }
    }

    function checkIsset(&$value, $else = null){
        if(isset($value)){
            return $value;
        }
        return $else;
    }
?>