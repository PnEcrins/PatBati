<?php
//"/thumb.php?sourceDirectory=/sites/default/files/&amp;sourceFile=firefox_wallpaper_0.jpg&amp;predefinedSize=lightbox";
//Call it like this : <img src="/thumb.php?sourceDirectory=/asset/Images/&sourceFile=a.jpg&predefinedSize=diaporama" />

//XXX Nécessite le paquet graphicsmagick-imagemagick-compat pour debian ( https://packages.debian.org/wheezy/graphicsmagick-imagemagick-compat )

require_once("../config/ProjectConfiguration.class.php");

class Image
{
	public
		$image,
		$imageType,
		$fileSize;

	public function __construct($url, $image=null, $image_type=null, $file_size=null)
	{
		error_log("newImage(".json_encode($url).")");
		if (($image === null) || ($image_type === null) || ($file_size === null))
		{
			if (($imageType = getimagesize($url)) === FALSE)
			{
				error_log('image is null : '.json_encode(($image === null)));
				error_log('image_type is null : '.json_encode(($image_type === null)));
				error_log('filesize is null : '.json_encode(($file_size === null)));
				return self::badParam();
			}

			$fileName = substr(strrchr($url, '/'), 1);

			$this->url = $fileName;
			$this->image = ($image !== null) ? $image : file_get_contents($url);
			$this->imagetype = ($image_type !== null) ? $image_type : $imageType["mime"];
			$this->filesize = ($file_size !== null) ? $file_size : filesize($url);
			 
		}
		else
		{
			$this->url = !empty($url) ? $url : '';
			$this->image = $image;
			$this->imageType = $image_type;
			$this->fileSize = $file_size;
		}
	}

	protected static function badParam()
	{
		$backtrace = debug_backtrace();
		$callFile = basename($backtrace[0]['file']);
		$callLine = $backtrace[0]['line'];

		$tmpRef = "-";
		if (!empty($_SERVER['HTTP_REFERER'])) {
			$tmpRef = $_SERVER['HTTP_REFERER'];
		}
		error_log('myLog() called @ ' . $callFile . ':' . $callLine . ' - ' . "WARNING BAD PARAMETER - REQUEST_URI : ".$_SERVER['REQUEST_URI']." - HTTP_REFERER : ".$tmpRef);

		//  Send a BEACON image back to the user's browser
//		header( 'Content-type: image/gif' );
		$image = chr(71).chr(73).chr(70).chr(56).chr(57).chr(97).
		chr(1).chr(0).chr(1).chr(0).chr(128).chr(0).
		chr(0).chr(0).chr(0).chr(0).chr(0).chr(0).chr(0).
		chr(33).chr(249).chr(4).chr(1).chr(0).chr(0).
		chr(0).chr(0).chr(44).chr(0).chr(0).chr(0).chr(0).
		chr(1).chr(0).chr(1).chr(0).chr(0).chr(2).chr(2).
		chr(68).chr(1).chr(0).chr(59);

		$url = '';
		$imagetype = 'image/gif';
		$filesize = 0;

		return new Image($url, $image, $imagetype, $filesize);
	}
}

class convertImageToThumb
{
	public static
		$img = 'images/no-picture.jpg',
		$predefinedSizes = array(
	    	'bandeau' => array('height' => '150'),
			'list' => array('height' => '50'),
			'show' => array('height' => '600',
							'width'  => '800'),
			'print' => array('height' => '300',
							'width'  => '500'),
			'pdf' => array('height' => '250',
							'width'  => '250'),
		);

	public static function resize($sourceDirectory, $sourceFile, $predefinedSize)
	{
		if (!array_key_exists($predefinedSize, self::$predefinedSizes)
			|| empty($sourceDirectory)
			|| empty($sourceFile)
		)
		{
			error_log("convertImageToThumb resize(".json_encode($sourceDirectory).",".json_encode($sourceFile).")");
			return Image::badParam();
		}

		if(preg_match("|^([a-z0-9_\-/]*)/$|i",$sourceDirectory) && preg_match("|^([a-z0-9_\-\.]*)$|i",$sourceFile))
		{
			$size = self::$predefinedSizes[$predefinedSize];

			if($size)
			{
				$source = self::sourceFull($sourceDirectory,$sourceFile);

				if(!file_exists($source))
				{
					return Image::badParam();
				}

				$filename = substr($sourceFile, 0, (strrpos($sourceFile, '.')));
				$extension = substr(strrchr($sourceFile, '.'), 1);

				$cibleFile = $filename.'_'.$predefinedSize.'.'.$extension;

				$cibleDirectory = $sourceDirectory;
				$cible = $cibleDirectory.$cibleFile;	//Replace specific characters to something armless

				$exists = true;
				if (file_exists($cible))
				{
					if ((($imageType = getimagesize($cible)) !== FALSE))
					{
						if (isset($size['width']) && ($imageType[0] != ($size['width'])))
						{
							$exists = false;
						}

						if (isset($size['height']) && ($imageType[1] != ($size['height'])))
						{
							$exists = false;
						}

					}
				}
				else
				{
					$exists = false;
				}
				
				error_log("convertImageToThumb file $cibleFile exists : (".json_encode($exists).")");

				if(!$exists)
				{
					error_log("convertImageToThumb l'image $cibleFile n'existe pas, on va la créer");
					@mkdir($cibleDirectory);
					exec("chmod 777 \"$cibleDirectory\"");

					$cmd="";

					// Partie redimentionnement
					$thumbnailCmd = '';
					if (isset($size['width']))
					{
						$thumbnailCmd.= $size['width'];
					}
					else
					{
						$thumbnailCmd.= '>';
					}

					$thumbnailCmd.= 'x';

					if (isset($size['height']))
					{
						$thumbnailCmd.= $size['height'];
					}
					else
					{
						$thumbnailCmd.= '>';
					}
					$cmd.=" -thumbnail \"".$thumbnailCmd."\"";

					foreach($size as $key => $value)
					{
						if (($key != 'width') && ($key != 'height'))
						{
							$cmd.=" -".trim($key)." \"".trim($value)."\"";
						}
					}

					//XXX Nécessite le paquet graphicsmagick-imagemagick-compat pour debian ( https://packages.debian.org/wheezy/graphicsmagick-imagemagick-compat )
					$cmd='/usr/bin/convert "'.self::getAbsolutePath($source).'" '.$cmd.' +profile "*" +repage -quality 90 "'.self::getAbsolutePath($cible).'"';

					error_log("convertImageToThumb : $cmd");

					exec($cmd);
					exec('chmod 777 "'.self::getAbsolutePath($cible).'"');
					$img = self::getAbsolutePath($cible);
					
					error_log("convertImageToThumb result image : $img");

				}
				else
				{
					$img = $cible;
				}

			}
		}
		else
		{
			return Image::badParam();
		}

		return new Image($img);
	}

	protected static function sourceFull($sourceDirectory,$sourceFile)
	{
		return $sourceDirectory.$sourceFile;
	}

	protected static function getAbsolutePath($relativePath)
	{
		return sfConfig::get('sf_root_dir')."/web/".$relativePath;
	}
}
?>