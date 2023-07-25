<?php
    
    $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    require_once $rootpath.'/fd/resources/php/CORE.php';
    include_once realpath($_SERVER["DOCUMENT_ROOT"]) . '/Splint/php/DataManagement/shmop/S_shmop.php';

    class ConverterConfig {
        public static $processData = null;
        public static function get(bool $print = false){
            if(self::isForceReload()){
                $processData = DataStorage::get("/converterProcess.json", false);
                if($processData == false){
                    Debugger::error("converterProcess file not found");
                    Communication::sendBack("converterProcess file not found", true, $print);
                    die();
                } else {
                    $processData = json_decode($processData);
                    S_shmop::write("converterProcessData", $processData);
                    self::$processData = $processData;
                    Communication::sendBack(self::$processData, true, $print);
                    return self::$processData;
                }
            }
            if(self::$processData != null){
                Communication::sendBack(self::$processData, true, $print);
                return self::$processData;
            }
            $processData = S_shmop::read("converterProcessData");
            if($processData == null || self::isForceReload()){
                $processData = DataStorage::get("/converterProcess.json", false);
                if($processData == false){
                    Debugger::error("converterProcess file not found");
                    Communication::sendBack("converterProcess file not found", true, $print);
                    die();
                } else {
                    $processData = json_decode($processData);
                    S_shmop::write("converterProcessData", $processData);
                }
            }
            self::$processData = $processData;
            Communication::sendBack($processData, true, $print);
            return $processData;
        }
        private static function isForceReload() : bool {
            if(SPLINT_CONFIG -> settings -> cacheResources -> project -> converterProcessing == false){
                return true;
            }
            return false;
        }
    }