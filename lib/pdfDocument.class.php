<?php
class pdfDocument extends FPDF
{
	var $default_font_police = 'Arial';
	var $default_font_size = 9;
	var $default_height = 4;
	var $space_by_title_class = array(1 => array(9, 3),
									  2 => array(6, 3),
									  3 => array(4, 1));
	var $default_number_of_lines_break = 5;

	function addTable($header, $body, $cols_width, $link_pos=null, $border_type = 'BLR', $alignement = null, $array_nbr_element = array(), $table_type = null, $border_header=0, $merge_col = 0) {
		$add_links = $this->createEnTete($header, $cols_width, $link_pos=null, $border_header, $merge_col);

		$links = $this->createBody($body, $cols_width, $alignement, $add_links, $link_pos, $border_type, $table_type, $array_nbr_element);

		return $links;
	}

	function addText($text, $style='', $link='', $ln=0, $width=0) {
		$this->SetFont($this->default_font_police, $style, $this->default_font_size);

		$this->Cell($width, $this->default_height, $this->__($text), 0, $ln, '', 0, $link);

		// On r�initialise la police
		$this->reinitFont();
	}

	function addTextWithLn($text, $style='', $link='', $width=0) {
		$this->addText(utf8_decode($text), $style, $link, 2, $width);
	}

	function addTitle($text, $class) {
		switch ($class) {
			case 1:
				$this->SetFont('Arial', 'B', 16);
				break;

			case 2:
				$this->SetFont('Arial', 'B', 13);
				break;

			case 3:
				$this->SetFont('Arial', '', 11);
				break;
		}

		$this->Cell(0,$this->space_by_title_class[$class][0],$this->__($text),0,2,'',0,'');
		$this->Ln($this->space_by_title_class[$class][1]);

		// On r�initialise la police
		$this->reinitFont();
	}

	function reinitFont() {
		$this->SetFont($this->default_font_police,'', $this->default_font_size);
	}

	function addBlock($title_class, $number_of_lines, $space_between_lines=0) {
		/* Cr�e un bloc ins�cable d'un nombre de lignes d�fini par number_of_lines.
		 Si le bloc d�passe la page, il est automatiquement pass� � la page suivante
		 Si le nombre de lignes d�fini n'est pas le nombre de lignes r�el du bloc,
		 il sera coup� au-del� de ce nombre de lignes si besoin.
		 Si on n'entre pas de nombre de lignes, un nombre de lignes par d�faut est d�fini.
		 */

		if ($number_of_lines==0 || !is_int($number_of_lines))
		$number_of_lines = $this->default_number_of_lines_break;

		$height = $this->space_by_title_class[$title_class][0]+$this->space_by_title_class[$title_class][1];

		$height+= $number_of_lines * ($this->default_height+$space_between_lines);

		if($this->y+$height>$this->PageBreakTrigger && !$this->InFooter && $this->AcceptPageBreak()) {
			//Automatic page break
			$x=$this->x;
			$ws=$this->ws;

			if($ws>0) {
				$this->ws=0;
				$this->_out('0 Tw');
			}

			$this->AddPage($this->CurOrientation);
			$this->x=$x;

			if($ws>0) {
				$this->ws=$ws;
				$this->_out(sprintf('%.3f Tw',$ws*$k));
			}
		}
	}

	function addFooterTable($header, $body, $cols_width, $link_pos=null, $border_type = 'BLR', $alignement = null) {
		$add_links = $this->createEnTete($header, $cols_width, $link_pos=null);
		$links = $this->createBody($body, $cols_width, $alignement, $add_links, $link_pos, $border_type, 'footer');

		return $links;
	}

	function addTopTable($header, $body, $cols_width, $link_pos=null, $border_type = 'BLRT', $alignement = null, $array_nbr_element = array(), $border_header = 0, $header_col = 0) {

		$add_links = $this->createEnTete($header, $cols_width, $link_pos=null, $border_header, $header_col);

		$links = $this->createBody($body, $cols_width, $alignement, $add_links, $link_pos, $border_type);

		return $links;
	}

	function createEnTete($header, $cols_width, $link_pos=null, $border_header = 0, $merge_cell = 0)
	{
		/*=========== Cr�ation de l'en-t�te ===========*/
		//Couleurs, �paisseur du trait et police grasse
		//$this->SetFillColor(84,162,189);
		$this->SetFillColor(255,255,255); // Couleur de fond des cases
		$this->SetTextColor(0); // Couleur du texte
		$this->SetDrawColor(10,20,50);
		$this->SetLineWidth(.1);
		$this->SetFont($this->default_font_police,'B', $this->default_font_size);

		//En-t�te
		if($header)
		{
			for($i=0;$i<count($header);$i++)
			{
				if(count($header) == $i + 1 )
				{
					if($merge_cell == 'TB')
					{
						$merge_cell = 'RTB';
					}
				}

				if($header[$i] == 'merge_col')
				{
					$this->Cell($cols_width[$i],7,' ',$merge_cell,0,'C',1);
				}
				else
				{
					$this->Cell($cols_width[$i],7,utf8_decode($this->__($header[$i])),$border_header,0,'C',1);
				}
			}
			$this->Ln();
		}
			/*=============================================*/

			/*============= Cr�ation du corps =============*/
			//Restauration des couleurs et de la police
			$this->SetFillColor(255,255,255);
			$this->SetTextColor(0);
			$this->reinitFont();

			if (is_int($link_pos) && ($link_pos>=0) && ($link_pos<count($header)))
			{
				$add_links = true;
			}
			else
			{
				$add_links = false;
			}


			return $add_links;
	}

	function createBody($body, $cols_width, $align, $add_links, $link_pos, $border_type, $type = null, $array_nbr_element = null)
	{
		//Donn�es
		$links = array();
		$j = 0;
		$fill=0;
		$alignement = $align;
		foreach($body as $key => $row) {


			$nbr_line = 1;
			for ($i=0; $i<count($row); $i++) {
				if(isset($row[$i])):
					if ($i>0) {
						if($align != 'L')
						{
							$alignement = $align;
						}
						if (is_int($row[$i])) {
							$content = number_format($this->__($row[$i]),0,',',' ');
						}
						else
						{
							$content = $this->__($row[$i]);
						}
					}
					else {
						$alignement = 'L';
						$content = $this->__($row[$i]);
					}

					if ($add_links && ($link_pos == $i)) {
						$links[$j] = $this->AddLink();
						$link = $links[$j];
					}
					else
					$link = '';

					if(strlen($content) > 90)
					{
						$nbr_line = $this->MultiLineCell($cols_width[$i],6,utf8_decode($content),1,1,$alignement,$fill);
					}
					else
					{
						switch($type)
						{
							case 'footer':

								if($i==0)
								{
									$this->SetX(10);
								}

								if($j == 0 && $i == 0)
								{
									$this->SetFont($this->default_font_police,'B', $this->default_font_size);
								}
								else
								{
									$this->reinitFont();
								}

								if($j == 0 && $i == 3 || $j == 3 && $i == 2)
								{
									if($j == 3)
									{
										$this->Cell($cols_width[$i],6*$nbr_line,utf8_decode($content),$border_type,0,$alignement,$fill, utf8_decode('mailto:'.$content));
									}
									else
									{
										$this->Cell($cols_width[$i],6*$nbr_line,utf8_decode($content),$border_type,0,$alignement,$fill, utf8_decode($content));
									}
								}
								else
								{
									$this->Cell($cols_width[$i],6*$nbr_line,utf8_decode($content),$border_type,0,$alignement,$fill, $link);
								}
							break;

							case 'header':
								if($i == 0 || ($i == 1 && $j == 1))
								{
									$this->SetFont($this->default_font_police,'B', $this->default_font_size);

								}
								else
								{
									$this->reinitFont();
								}

								$this->Cell($cols_width[$i],6*$nbr_line,utf8_decode($content),$border_type,0,$alignement,$fill, $link);
							break;

							case 'lines':
								if(in_array($j, $array_nbr_element))
								{
									$this->SetFontSize(9);
									if(in_array($i, array(1,2,3,4)))
									{
										$border_type_line = 'TB';
									}
									else
									{
										$border_type_line = 'TB';
									}
								}
								else
								{
									$this->SetFontSize(7);
									if(in_array($i, array(1,2,3,4)))
									{
										$fill = 0;
										$alignement = 'L';
									}

									if(in_array($i, array(1,4)))
									{
										$border_type_line = '';
									}
									elseif($i == 2)
									{
										$border_type_line = '';
									}
									else
									{
										$border_type_line = '';
									}
								}
//$border_type_line = 'TBLR';


								$this->Cell($cols_width[$i],4*$nbr_line,utf8_decode($content),$border_type_line,0,$alignement,$fill, $link);
							break;
							case 'basket_resume':
								$alignement = 'L';
								$this->Cell($cols_width[$i],6*$nbr_line,utf8_decode($content),$border_type,0,$alignement,$fill, $link);
							break;
							default:
								$this->Cell($cols_width[$i],6*$nbr_line,utf8_decode($content),$border_type,0,$alignement,$fill, $link);
							break;
						}

					}
				endif;
			}
			$this->Ln();
			$fill=!$fill;
			$j++;
		}

  	    //$this->Cell(array_sum($cols_width),0,'','T');
		/*=============================================*/
	}

	public function __($string)
	{
		return sfContext::getInstance()->getI18N()->__($string);
	}
}?>