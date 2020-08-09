<?php
	/*FUNCTIONS*/

	//decides what to do with
	//GET request parameters sent from ajax
	if(isset($_GET['action'])) {
		$action = $_GET['action'];
		switch($action) {
			case 'loadDirectory' :
				$x = loadDirectory($_GET['arg'], $_GET['arg2'], $_GET['arg3']);
				break;
			case 'imagesIn' :
				$x = imagesIn($_GET['arg_dir'], $_GET['arg_retdir']);
				break;
			case 'getLastPage' :
				$x = getLastPage($_GET['arg_dir']);
				break;
			default:
				echo "not a valid action";
				break;
		}
		if ($x) ajaxReturn($x);
	}

	function ajaxReturn($returnval) {
		if (is_array($returnval))
			for($i=0; $i<sizeof($returnval); $i++)
				echo "splitHere" . $returnval[$i];
		else
			echo $returnval;
	}
	
	//get the largest digit in a directory
	function highestInDir($dir, $pattern="/\d+/") {
		$largest = 0;
		for ($i = 0; $i < sizeof($dir); $i++) {
			if(preg_match($pattern, $dir[$i])) {
				preg_match("/\d+/", $dir[$i], $matches);
				if($matches[0] > $largest) {
					$largest = $matches[0];
				}
			}
		}
		return $largest;
	}

	//returns the number of images in dir
	function imagesIn($dir, $returnDir=false) {
		$latestPage = 0;
		//count image files in directory
		if (is_dir($dir)){
		  if ($dh = opendir($dir)){
		    while (($file = readdir($dh)) !== false){
		    	//check if file is image
					//throws permission denied error on localhost idk what to do
		    	if(is_array(getimagesize($dir . $file)))
		    		$latestPage++;
		    }
		    closedir($dh);
		  }
		}
		if ($returnDir)
			return $dir . $latestPage;
		else
			return $latestPage;
	}
		
	/***************LOAD DIRECTORY SHIT********************/
	//to match index to key of sorted array
	function copy_array($array) {
		$new_array = array();
		
		foreach ($array as $a) {
			array_push($new_array, $a);
		}
		
		return $new_array;
	}
	
	//used for file sorting
	class FileObject {
		public $name;
		public $age; 
	}
	//compare ages of file objects 
	function uploaded($a, $b) {
		if ($a->age == $b->age) {
			return 0;
		}
		return ($a->age < $b->age) ? -1 : 1;
	}
	//take an array of file objects
	//and return an array of those file objects names 
	function nameify($fileArray) {
		$newArray = array();
		foreach ($fileArray as $file) {
			array_push($newArray, $file->name);
		}
	
		return $newArray;
	}
	//sort file arrays, isolate them to just names 
	function sortArrayBy($fileArray, $sort) {
		$newArray = array();
		
		//its already sorted alphabetical
		if($sort == 'alphanumerical') {
			$fileArray = nameify($fileArray);
			natsort($fileArray);
			return $fileArray;
		} else {
			//by date uploaded (default)
			usort($fileArray, "uploaded");
			$fileArray = array_reverse($fileArray);
		}

		//isolate array to just filenames
		return nameify($fileArray);
	}
	
	//returns all the filenames in a directory
	//$filter is file extension for if you want to return specific filetypes
	//this is to be used with parsePhpArray() in scripts/util.js
	//$sort can be alphanumerical or uploaded
	function loadDirectory($dir, $filter='', $sort='uploaded') {
		
		$fileArray = array();
		$count = 0;
		
		// Open a directory, and read its contents
		if (is_dir($dir)){
		  if ($dh = opendir($dir)){
		    while (($file = readdir($dh)) !== false) {
				$fileObject = new FileObject();
				$fileObject->name = $file;
				$fileObject->age = filemtime($dir . "/" . $file);
		    	//prevents empty files from showing up
		    	if(substr($file, -1) !== '.' && is_string($file)) {
		    	    if($filter) {
		    	        if(preg_match('/.*.' . $filter . '/', $file)) {
		    	            array_push($fileArray, $fileObject);
    		    		    $count++;
		    	        }
		    	    } else {
    		    		array_push($fileArray, $fileObject);
    		    		$count++;
		    	    }
		      	}
		    }
		    closedir($dh);
		  }
		}
		return sortArrayBy($fileArray, $sort);
	}

	function findPgRange($dir){
    	switch($dir) {
    	    case 'comiccarmix/':
    	        return 7;
    	    default:
				return 1;
    	}
	}

	function displayPages($dir, $collection) {
		foreach($collection as $file) {
				displayPage($dir . $file);
			}
	}

	function displayPage($file) {
		//check that file is image
		//echo $file;
		echo '<img class="page" src="' . $file . '">';
	}

	function getLastPage($dir) {
	    $arcs = arcs($dir);
	    if(!$arcs)
		    $contents = loadDirectory($dir, '.png');
		else {
		    $contents = loadDirectory($dir);
		}
		natsort($contents);
		//array_values will effectively reindex any array passed to it with sequential integer keys.
		$contents = array_values($contents);
		//print_r($contents);
		//echo intval($contents[sizeof($contents)-1]);
		return intval($contents[sizeof($contents)-1]);
	}

	function arcs($dir, $pg=1) {
	   if(file_exists($dir . $pg . '/'))
	        return true;
	   else
	        return false;
	}

  function getLastGodhead($dir='GODHEAD') {
		/*
		GODHEAD FILE STRUCTURE
		ACT -> UPDATE # -> HTML PAGE
		*/
		$acts = loadDirectory($dir);				
		$lastAct = highestInDir($acts, '/ACT/');
		$actUrl = $dir . '/ACT_' . $lastAct;
		
		$updates = loadDirectory($actUrl);
		$lastUpdate = highestInDir($updates);
		$updateUrl = $dir . '/ACT_' . $lastAct . '/' . $lastUpdate;
		
		$pages = loadDirectory($updateUrl);							
		//$lastPage = highestInDir($pages, '/\d/');
		//actually send them to the first page of every batch
		$lastPage = 1;
		$pageUrl = $updateUrl . '/' . $lastPage . '.html';
		
		if(!file_exists($pageUrl)) {
			//it would be better to implement this in a loop
			//that continuosly checks if the previous update exists 
			$updateUrl = $dir . '/ACT_' . $lastAct . '/' . ($lastUpdate - 1);
			$pageUrl = $updateUrl . '/' . $lastPage . '.html';
		}
			
		return  $pageUrl;
  }
  
  
  
?>
