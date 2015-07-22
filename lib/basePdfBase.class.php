<?php

require_once dirname(__FILE__).'/vendor/symfony/lib/helper/DateHelper.php';

class basePdfBase extends pdfDocument
{
	var $identification;
	var $pdf;
	const PDF_TYPE_SYNTHESE = 1;
	const PDF_TYPE_REPORTING_ALL = 2;



	public function generate()
	{
		$this->addTop();
		$this->addLines();
	}

	public function setIdentification($identification)
	{
		$this->identification = $identification;
	}

	protected function getIdentification()
	{
		return $this->identification;
	}

	protected function addTop($type)
	{
		$this->AddPage();
		$this->SetAutoPageBreak(1, 30);
		$this->SetTextColor(51,51,51);
	}

	protected function addTopInfo()
	{
		$this->SetMargins(80,0,0);
		$this->SetTextColor(255,255,255);
		$identification = $this->getIdentification();
		$this->Ln(1);

		$commune = $identification->getBibCommune();
		$prefix = '';
		
		if(in_array(strtolower(substr($commune, 0, 1)), array('a', 'e', 'i', 'o', 'u', 'y', 'h')))
		{
			//$prefix = 'd\'';
		}
		else
		{
			//$prefix = 'de ';
		}

		$biCommune = $commune ? $prefix.$commune : '';
		$biSecteur = $commune ? $commune->getBibSecteur() : '';


		$title = mb_strtoupper($identification->getAppelation(), 'UTF-8');
		if($identification->getAltitude()) $title.=' Alt. '.$identification->getAltitude().' m';

		$this->addTextWithLn($title);
		$this->Ln(3);
		$this->addTextWithLn($biCommune.' ('.$biSecteur.')');

		$this->resetPosition();
	}

	protected function addLines($type)
	{
		sfContext::getInstance()->getConfiguration()->loadHelpers('Date');

		if($this->getType() == 'synthese')
		{
			$this->addSyntheseInfo();
		}
		else
		{
			$this->addCompleteInfo();
		}
	}

	public function addPageTitle($pageTitle)
	{
		$this->SetFont('Arial','B',12);
		$this->Cell(200, 30, utf8_decode($pageTitle), 0, 0, 'C', 0);
		$this->Ln(4);
		$this->SetFont('Arial','',8);
	}

	public function addBlockTitle($blockTitle, $cell=1)
	{
		$this->SetTextColor(130,56,130);
		$this->Ln(3);
		if($cell!=1)$this->cell($cell);
		$this->addTableTwoColls($blockTitle);
		$this->Ln(1);
		$this->SetTextColor(51,51,51);
	}

	public function addCompleteInfo()
	{
		$identification = $this->getIdentification();

		$this->addInfoGeneral($identification);

		$this->addEnvironnement($identification);

		$this->addtravaux($identification);

		$this->addGrosOeuvre($identification);

		$this->addSecondOeuvre($identification);

		$this->addEquipement($identification);

		$this->addElementPaysager($identification);

		$this->addIllustration($identification);
	}

	public function wrapsString($string, $x, $break)
	{
		return wordwrap($string, $x, $break);
	}

	public function addSyntheseInfo()
	{
		$identification = $this->getIdentification();

		$arrPerspectives = array();
		foreach($identification->getRelIdentPerspectives() as $BibPerspective){
			$arrPerspectives[] = $BibPerspective;
		}
        $perspectives = implode(", ",$arrPerspectives);
        
        $arrEquipements = array();
		foreach($identification->getEquipementss() as $equipementsObject){
			$arrEquipements[] = $equipementsObject->getBibEquipement()->__toString();
		}
        $equipements = implode(", ",$arrEquipements);
        
		$arrVertical = array();
		foreach($identification->getStructureVerticalePorteuse() as $vertical){
			$arrVertical[] = $vertical->getBibMateriauxGe();
		}
        $structureVertical = implode(", ",$arrVertical);
        
		$arrHorizontal = array();
		foreach($identification->getStructureHorizontalePorteuse() as $horizontal){
			$arrHorizontal[] = $horizontal->getBibMateriauxGe();
		}
        $structureHorizontal = implode(", ",$arrHorizontal);
        
		$arrCharpente = array();
		foreach($identification->getStructureCharpente() as $charpente){
			$arrCharpente[] = $charpente->getBibMateriauxGe();
		}
        $structureCharpente = implode(", ",$arrCharpente);
        
		$arrCouverture = array();
		foreach($identification->getStructureCouverture() as $couverture){
			$arrCouverture[] = $couverture->getBibMateriauxGe();
		}
        $structureCouverture = implode(", ",$arrCouverture);

		$this->Image(sfConfig::get('app_images_upload_dir').$this->getNewConvertImageName(6),10,58,0,0,'');
		$this->Image(sfConfig::get('app_images_upload_dir').$this->getNewConvertImageName(5),10,140,0,0,'');

		$this->addBlockTitle('INFORMATIONS GENERALES',100);
		$this->Ln(15);
		$this->Cell(100);
		if($identification->getProprietaire()!=null && $identification->getProprietaire()!=''){$this->addLinesWithStyle('Propriétaire(s) : ', $identification->getProprietaire());}
		if($identification->getX()!=null && $identification->getY()!=null && $identification->getX()!='' && $identification->getY()!='' ){$this->addLinesWithStyle('Coordonnées : ', 'x: '.$identification->getX().' y: '.$identification->getY());}
		$this->Ln(5);
		$this->Cell(100);
		if($identification->getBibClasseArchi()!=null && $identification->getBibClasseArchi()!=''){$this->addLinesWithStyle('Typologie : ', $identification->getBibClasseArchi());}
        if($identification->getBibClasseArchi()->getClasseDecrite()!=null && $identification->getBibClasseArchi()->getClasseDecrite()!=''){$this->addLinesWithStyleAndSpace(null,explode('<br />',nl2br($this->wrapsString( $identification->getBibClasseArchi()->getClasseDecrite(), 80, "<br />"))));}
		$this->Ln(5);
		$this->Cell(100);
		if($identification->getBibConservation()->getCodeconservation()!=null && $identification->getBibConservation()->getCodeconservation()!=''){$this->addLinesWithStyle('Etat de conservation : ', $identification->getBibConservation()->getCodeconservation() ? $identification->getBibConservation() : '');}
        if($perspectives != null && $perspectives != ''){$this->addLinesWithStyleAndSpace('Perspective : ', explode('<br />',nl2br($this->wrapsString( $perspectives, 45, "<br />"))));}
		if($identification->getLastDateTravaux()!=null && $identification->getLastDateTravaux()!=''){
            if($identification->getLastDateTravaux()->getDateTravaux()){$this->addLinesWithStyle('Date derniers travaux : ', $identification->getLastDateTravaux() ? format_date($identification->getLastDateTravaux()->getDateTravaux(), 'dd/MM/yyyy', 'fr'): '');}
        }
		$this->Ln(5);
		$this->Cell(100);
		if($identification->getNotepatri() != null && $identification->getNotepatri() != ''){$this->addLinesWithStyle('Degré de patrimonialité : ', $identification->getNotepatri().'/6');}
		if($identification->getPatrimonialite() != null && $identification->getPatrimonialite() != ''){$this->addLinesWithStyleAndSpace('Patrimonialité : ',explode('<br />',nl2br($this->wrapsString( $identification->getPatrimonialite(), 45, "<br />"))));}
        if(($structureVertical != null && $structureVertical != '') || ($structureHorizontal != null && $structureHorizontal != '') || ($structureCharpente != null && $structureCharpente != '') || ($structureCouverture != null && $structureCouverture != '')){ 
            $this->Ln(5);
            $this->addBlockTitle('STRUCTURES PORTEUSES',100);
            $this->Ln(15);
            $this->Cell(100);
            if($structureVertical != null && $structureVertical != ''){$this->addLinesWithStyleAndSpace('Structure porteuse verticale : ', explode('<br />',nl2br($this->wrapsString( $structureVertical, 45, "<br />"))));}
            if($structureHorizontal != null && $structureHorizontal != ''){$this->addLinesWithStyleAndSpace('Structure porteuse horizontale : ', explode('<br />',nl2br($this->wrapsString( $structureHorizontal, 45, "<br />"))));}
            if($structureCharpente != null && $structureCharpente != ''){$this->addLinesWithStyleAndSpace('Charpente : ', explode('<br />',nl2br($this->wrapsString( $structureCharpente, 45, "<br />"))));}
            if($structureCouverture != null && $structureCouverture != ''){$this->addLinesWithStyleAndSpace('Couverture : ', explode('<br />',nl2br($this->wrapsString( $structureCouverture, 45, "<br />"))));}
		}
        if($equipements != null && $equipements != ''){
            $this->Ln(5);
            $this->addBlockTitle('EQUIPEMENTS',100);
            $this->Ln(15);
            $this->Cell(100);
            $this->addLinesWithStyleAndSpace('', explode('<br />',nl2br($this->wrapsString( $equipements, 45, "<br />"))));
        }
	}

	public function getNewConvertImageName($type)
	{
		$identification = $this->getIdentification();

		$illustration = $identification->getIllustrationByType($type);
		if (empty($illustration) || $illustration->getFichierSource() == null)
		{
			$image = convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), 'no-picture.jpg', 'pdf');
		}
		else
		{
			$image = convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), $illustration->getFichierSource(), 'pdf');
		}

		return $image->url;
	}

	public function addTableTwoColls($first_text, $second_text= null, $first_width = 60, $second_width = 115)
	{
		$this->SetFont('Arial','B',9);
		$this->Cell($first_width, 30, utf8_decode($first_text), 0, 0, 'L', 0);
		$this->SetFont('Arial','',8);
		$this->Cell($second_width, 30, utf8_decode($second_text), 0, 0, 'L', 0);
		$this->Ln(4);
	}

	public function addTableTwoCollsMultiPossibilities($first_text, $possibilities, $func)
	{
		$this->SetFont('Arial','B',9);
		$this->Cell(60, 30, utf8_decode($first_text), 0, 0, 'L', 0);

		$this->SetFont('Arial','',8);
		foreach($possibilities as $possibility)
		{
			$this->Cell(115, 30, utf8_decode(str_replace('œ', 'oe', $possibility->$func())), 0, 0, 'L', 0);

			$this->Ln(4);
			$this->Cell(60, 30, '', 0, 0, 'L', 0);
		}

		$this->Ln(3);
	}

	public function addTableFourCollsMultiPossibilities($first_text, $second_text, $possibilities,$first_func, $getFirstValue, $second_fun, $getSecondValue)
	{

		if(count($possibilities))
		{
			$this->SetFont('Arial','B',9);
			$this->Cell(40, 30, utf8_decode($first_text), 0, 0, 'L', 0);
			$this->SetFont('Arial','',8);

			$i=0;

			foreach ($possibilities as $rel)
			{
				if($i==0)
				{
					$this->Cell(40, 30, utf8_decode($rel->$first_func()->$getFirstValue()), 0, 0, 'L', 0);
					$this->SetFont('Arial','B',9);
					$this->Cell(40, 30, utf8_decode($second_text), 0, 0, 'L', 0);
					$this->SetFont('Arial','',8);
					$this->Cell(40, 30, utf8_decode($rel->$second_fun()->$getSecondValue()), 0, 0, 'L', 0);
					$this->Ln(4);
				}
				else
				{
					$this->Cell(40, 30, '', 0, 0, 'L', 0);
					$this->Cell(40, 30, utf8_decode($rel->$first_func()->$getFirstValue()), 0, 0, 'L', 0);
					$this->Cell(40, 30, '', 0, 0, 'L', 0);
					$this->Cell(40, 30, utf8_decode($rel->$second_fun()->$getSecondValue()), 0, 0, 'L', 0);
					$this->Ln(4);
				}
				$i++;
			}

			$this->Ln(3);
		}
	}


	public function addTableTwoCollsWithArray($first_text, $array)
	{
		$this->SetFont('Arial','B',9);
		$this->Cell(60, 30, utf8_decode($first_text), 0, 0, 'L', 0);

		$this->SetFont('Arial','',8);
		foreach($array as $value)
		{
			$this->Cell(115, 30, utf8_decode($value), 0, 0, 'L', 0);
			$this->Ln(4);
			$this->Cell(60, 30, '', 0, 0, 'L', 0);
		}
		$this->Ln(3);
	}

	public function addLinesWithStyle($first_text, $second_text, $first_style = "B", $second_style = "")
	{
		$this->SetFont('',$first_style);
		$this->write(5, utf8_decode($first_text));
		$this->SetFont('',$second_style);
		$this->write(5, utf8_decode($second_text));
		$this->Ln(5);
		$this->Cell(100);
	}

	public function addLinesWithStyleAndSpace($first_text, $second_text, $first_style = "B", $second_style = "")
	{
		$this->SetFont('',$first_style);
		$this->write(5, utf8_decode($first_text));
		$this->SetFont('',$second_style);
		$x = $this->getX();

		$i=0;
		foreach($second_text as $text)
		{
			//$this->Cell(100);
			$this->write(5, utf8_decode($text));
			$this->Ln(5);
			$this->setX($x);
			$i++;
		}
		$this->Ln(0);
		if($i==0)$this->Ln(5);
		$this->Cell(100);
	}

	protected function getFileName()
	{
		$identification = $this->getIdentification();
		return $this->getType().'_'.date('Y_m_d').'_'.$identification->getIndexbatiment().'.pdf';
	}

	protected function resetPosition()
	{
		$this->setX(10);
		$this->SetMargins(10,0,0);
	}


	public function saveToServer() {
		$pdf_name = $this->getFileName();

		$target_path = "uploads/pdf/";

		$target_path = $target_path . basename($pdf_name);

		$this->Output('uploads/pdf/'.$pdf_name, 'F'); // le deuxi�me argument d�signe le mode de sauvegarde. Ici sauvegarde locale sur le serveur
		return $pdf_name;
	}

	protected function cutString($string, $max)
	{
		if(strlen($string)>=$max)
		{
			$string=substr($string,0,$max);
			$espace=strrpos($string," ");

			if($espace)
			{
				$string=substr($string,0,$espace);
			}

			$string .= '...';
		}
		return $string;
	}

	public function Header() {
		$this->Image('images/header.jpg',0,0,210,0,'');
		$this->SetFont('ARIAL','',12);
		$this->addTopInfo();
		$this->Cell(130,0,'',0,0,'',0,'');
		$this->Ln(15);
	}

	public function Footer() {
		$identification = $this->getIdentification();
		$dateModif = $identification->getDateUpdate() ? $identification->getDateUpdate() : $identification->getDateInsert();
		
		$this->SetY(-30);
		$this->SetX(0);
		$this->SetFont('Arial','',8);
		$this->SetTextColor(255,255,255);
		$this->SetFillColor(116,1,96);
		$this->SetDrawColor(116,1,96);

		if($this->getType() == 'synthese')
		{
			$this->Cell(45, 30, utf8_decode('Fiche-résumé'),'R',0,'C',1);
			$this->Cell(165, 30, utf8_decode('Date de mise à jour : '.format_date($dateModif, 'dd/MM/yyyy', 'fr')).'      ', 'LR',0,'R',1);
			//			$this->Cell(10, 30, '', 'L',0,'R',1);
		}
		else
		{
			$this->Cell(50, 30, utf8_decode('Fiche complète'),'R',0,'C',1);
			$this->Cell(140, 30, utf8_decode('Date de mise à jour : '.format_date($dateModif, 'dd/MM/yyyy', 'fr')), 'LR',0,'C',1);
			$this->Cell(20, 30, 'Page '.$this->PageNo(), 'L',0,'L',1);
		}
	}

	public function addInfoGeneral($identification)
	{

		$this->Image(sfConfig::get('app_images_upload_dir').$this->getNewConvertImageName(6),116,60,0,0,'');
			

		$this->addPageTitle('INFORMATIONS GENERALES');

		$this->addBlockTitle('RENSEIGNEMENTS ');

		$this->addTableTwoColls('Nouveau numéro : ', $identification->getIndexbatiment());
		$this->addTableTwoColls('Ancien numéro : ', $identification->getAncienindexbatiment());
		$this->addTableTwoColls('Appellation : ', $identification->getAppelation());
		$this->addTableTwoColls('Valeur Patrimoniale : ', $identification->getCodeFaitage().'/6');

		$this->addTableTwoCollsWithArray('Commentaires : ', explode('<br />',nl2br($this->wrapsString($identification->getPatrimonialite(), 35, "<br />"))));
		$this->addTableTwoColls('Type architectural : ', $identification->getBibClasseArchi());
		$this->addTableTwoCollsWithArray('Propriétaire : ', explode('<br />',nl2br($this->wrapsString($identification->getProprietaire(), 35, "<br />"))));
		$this->addTableTwoColls('Bâtiment en indivision : ', $identification->getIndivision() ? 'Oui' : 'Non');
		$this->addTableTwoCollsMultiPossibilities('Règlementation : ', $identification->getRelProtections(), 'getProtection');

		$this->Ln(5);

		$this->addBlockTitle('GEOGRAPHIE ');

		$this->addTableTwoColls('Commune : ', $identification->getBibCommune());
		$this->addTableTwoColls('Lieu dit : ', $identification->getLieuDit());
		$this->addTableTwoColls('N° de parcelle du cadastre : ', $identification->getCadastre());
		$this->addTableTwoColls('Coordonnée : ', $identification->getX().' - '.$identification->getY());
		$this->addTableTwoColls('Altitude : ', $identification->getAltitude());
		$this->addTableTwoColls('Dénivelé : ', $identification->getDenivelle());

		$this->Ln(5);

		$this->addBlockTitle('LISTE DES ENQUETES ');

		$this->SetFont('Arial','B',9);
		$this->Cell(60, 30, utf8_decode('Enquêteur'), 0, 0, 'L', 0);
		$this->Cell(60, 30, utf8_decode('Date de l\'enquête'), 0, 0, 'L', 0);
		$this->Cell(60, 30, utf8_decode('Date de rédaction de l\'enquête'), 0, 0, 'L', 0);

		$this->SetFont('Arial','',8);
		$this->Ln(5);
		
		foreach($identification->getEnquetess() as $enquete)
		{
			$this->Cell(60, 30, utf8_decode($enquete->getBibPersonnes()->getPersonne()), 0, 0, 'L', 0);
			$this->Cell(60, 30, utf8_decode(format_date($enquete->getDateEnquete(), 'dd/MM/yyyy', 'fr')), 0, 0, 'L', 0);
			$this->Cell(60, 30, utf8_decode(format_date($enquete->getDateRedaction(), 'dd/MM/yyyy', 'fr')), 0, 0, 'L', 0);
			$this->Ln(4);
		}
		
		$this->Ln(5);
		
		$this->addBlockTitle('ETAT ET PERSPECTIVES');
		
		$this->addTableTwoColls('Etat général : ', $identification->getBibConservation() ? $identification->getBibConservation()->getConservation() : '');
		$this->addTableTwoCollsWithArray('Commentaires : ', explode('<br />',nl2br($this->wrapsString($identification->getRemarques(), 90, "<br />"))));
		$this->addTableTwoCollsMultiPossibilities('Perspectives : ', $identification->getRelIdentPerspectives(), 'getPerspective');
	}

	public function addEnvironnement($identification)
	{
		$this->AddPage();

		$this->Ln(5);
		$this->addBlockTitle('SITUATION');

		$this->addTableTwoColls('Emplacement dans la pente : ', $identification->getBibImplantation() ? $identification->getBibImplantation()->getPem() : '');
		$this->addTableTwoColls('Orientation du faitage : ', $identification->getBibFaitage() ? $identification->getBibFaitage()->getFaitage() : '');
		$this->addTableTwoCollsWithArray('Situation géographique : ', explode('<br />',nl2br($this->wrapsString($identification->getSituationGeo(), 100, "<br />"))));
		$this->addTableTwoColls('Exposition : ', $identification->getBibExposition() ? $identification->getBibExposition()->getNomexposition() :'');
		$this->addTableTwoColls('Pente (en degrés) : ', $identification->getPente());

		$this->Ln(5);
		$this->addBlockTitle('CONTEXTE NATUREL');

		$this->addTableTwoCollsMultiPossibilities('Evènements : ', $identification->getRelRisquenats(), 'getRisque');
		$this->Ln(3);
		$this->addTableTwoCollsWithArray('Commentaire : ', explode('<br />',nl2br($this->wrapsString($identification->getInfoRisquenat(), 100, "<br />"))));
		$this->addTableTwoCollsMultiPossibilities('Masques : ', $identification->getRelMasques(), 'getMasque');
		$this->addTableTwoCollsWithArray('Commentaire : ', explode('<br />',nl2br($this->wrapsString($identification->getInfoMasque(), 100, "<br />"))));




	}

	public function addtravaux($identification)
	{
		$this->AddPage();
		$this->addPageTitle('TRAVAUX');

		$this->Ln(30);

		$this->SetFont('Arial','B',8);
		$this->Cell(16, 4, '', 'RTL', 0, 'L', 0);
		$this->Cell(15, 4,'', 'RT', 0, 'L', 0);
		$this->Cell(19, 4, '', 'RT', 0, 'L', 0);
		$this->Cell(15, 4, '', 'RT', 0, 'L', 0);
		$this->Cell(23, 4, '', 'RT', 0, 'L', 0);
		$this->Cell(15, 4,'', 'RT', 0, 'L', 0);
		$this->Cell(19, 4, '', 'RT', 0, 'L', 0);
		$this->Cell(20, 4, '', 'RT', 0, 'L', 0);
		$this->Cell(20, 4, '', 'RT', 0, 'L', 0);
		$this->Cell(23, 4, '', 'RT', 0, 'L', 0);
		$this->Ln(1);
		$this->Cell(16, 4, utf8_decode('Demande'), 0, 0, 'L', 0);
		$this->Cell(15, 4, utf8_decode('Date'), 0, 0, 'L', 0);
		$this->Cell(19, 4, utf8_decode('Autorisation'), 0, 0, 'L', 0);
		$this->Cell(15, 4, utf8_decode('Date du'), 0, 0, 'L', 0);
		$this->Cell(23, 4, utf8_decode('N° du '), 0, 0, 'L', 0);
		$this->Cell(15, 4, utf8_decode('Date'), 0, 0, 'L', 0);
		$this->Cell(19, 4, utf8_decode('Autorisation'), 0, 0, 'L', 0);
		$this->Cell(20, 4, utf8_decode('Subvention'), 0, 0, 'L', 0);
		$this->Cell(20, 4, utf8_decode('Nature des'), 0, 0, 'L', 0);
		$this->Cell(23, 4, utf8_decode('Nouvel'), 0, 0, 'L', 0);
		$this->Ln(3);
		$this->Cell(16, 6, utf8_decode('de permis'), 'RBL', 0, 'L', 0);
		$this->Cell(15, 6, utf8_decode('demande'), 'RB', 0, 'L', 0);
		$this->Cell(19, 6, utf8_decode('permis'), 'RB', 0, 'L', 0);
		$this->Cell(15, 6, utf8_decode('permis'), 'RB', 0, 'L', 0);
		$this->Cell(23, 6, utf8_decode('permis'), 'RB', 0, 'L', 0);
		$this->Cell(15, 6, utf8_decode('travaux'), 'RB', 0, 'L', 0);
		$this->Cell(19, 6, utf8_decode('du Parc'), 'RB', 0, 'L', 0);
		$this->Cell(20, 6, utf8_decode('accordée '), 'RB', 0, 'L', 0);
		$this->Cell(20, 6, utf8_decode('travaux'), 'RB', 0, 'L', 0);
		$this->Cell(23, 6, utf8_decode('usage'), 'RB', 0, 'L', 0);
		$this->SetFont('Arial','',6);

		$this->Ln(6);

		foreach($identification->getDemandes() as $demande)
		{
			$this->Cell(16, 5, utf8_decode($demande->getDemandep() ? 'Oui' : 'Non'),'LRB', 0, 'L', 0);
			$this->Cell(15, 5, utf8_decode(format_date($demande->getDateDemandep(), 'dd/MM/yyyy', 'fr')), 'RB', 0, 'L', 0);
			$this->Cell(19, 5, utf8_decode($demande->getAutorisationP() ? 'Oui' : 'Non'), 'RB', 0, 'L', 0);
			$this->Cell(15, 5, utf8_decode(format_date($demande->getDatePermis(), 'dd/MM/yyyy', 'fr')), 'RB', 0, 'L', 0);
			$this->Cell(23, 5, utf8_decode($demande->getNumPermis()), 'RB', 0, 'L', 0);

			$i=0;
			foreach($demande->getTravauxs() as $travaux)
			{
				if($i!=0){
					$this->Cell(16, 5, '', 'LRB', 0, 'L', 0);
					$this->Cell(15, 5, '', 'RB', 0, 'L', 0);
					$this->Cell(19, 5, '', 'RB', 0, 'L', 0);
					$this->Cell(15, 5, '', 'RB', 0, 'L', 0);
					$this->Cell(23, 5, '', 'RB', 0, 'L', 0);
				}
				$this->Cell(15, 5, utf8_decode(format_date($travaux->getDateTravaux(), 'dd/MM/yyyy', 'fr')), 'RB', 0, 'L', 0);
				$this->Cell(19, 5, utf8_decode($travaux->getAutorisation() ? 'Oui' : 'Non'), 'RB', 0, 'L', 0);
				$this->Cell(20, 5, utf8_decode($travaux->getSubventionPne()).' euros', 'RB', 0, 'L', 0);
				$this->Cell(20, 5, utf8_decode($travaux->getBibNature()->getNature()), 'RB', 0, 'L', 0);
				$this->Cell(23, 5, utf8_decode($travaux->getBibUsage()->getUsage()), 'RB', 0, 'L', 0);
				$this->Ln(5);
				$i++;
			}
			if($demande->getTravauxs()->count()==0){
				$this->Cell(15, 5, '', 'RB', 0, 'L', 0);
				$this->Cell(19, 5, '', 'RB', 0, 'L', 0);
				$this->Cell(20, 5, '', 'RB', 0, 'L', 0);
				$this->Cell(20, 5, '', 'RB', 0, 'L', 0);
				$this->Cell(23, 5, '', 'RB', 0, 'L', 0);
			}
		}
	}

	public function addGrosOeuvre($identification)
	{
		$this->AddPage();
		$this->addPageTitle('GROS OEUVRE');

		$i=1;

		$structures = Doctrine_Query::create()
			->from('Structures s')
			->where('s.indexbatiment = ?', array($identification->getIndexbatiment()))
			->orderBy('s.codestructure')
			->execute();
		
		foreach($structures as $structure)
		{
			if($i>5)
			{
				$this->AddPage();
				$this->addPageTitle('GROS OEUVRE');
				$i=1;
			}
			$this->addBlockTitle($structure->getBibStructure()->getStructure());
			$this->addTableTwoColls('Structure remarquable : ', $structure->getStructureRem() ? 'Oui' : 'Non');
			$this->addTableTwoColls('Conservation : ', $structure->getBibConservation()->getConservation());
			$this->addTableTwoColls('Materiau principal : ', $structure->getBibMateriauxGe()->getMatge());
			$this->addTableTwoColls('Mise en oeuvre : ', $structure->getBibMeoeuvre()->getMeoeuvre());

			$this->addTableTwoCollsWithArray('Commentaires : ', explode('<br />',nl2br($this->wrapsString($structure->getInfoStructure(), 90, "<br />"))));

			$this->addTableFourCollsMultiPossibilities('Matériau fin : ', 'Finition: ', $structure->getObjectMatFinsAndFinitions(), 'getBibMateriauxFins', 'getMatfins', 'getBibFinition', 'getFinition');

			$this->Ln(8);
			$i++;
		}
	}

	public function addSecondOeuvre($identification)
	{
		$this->AddPage();
		$this->addPageTitle('SECOND OEUVRE');

		$i=1;
		
		$secondOeuvres = Doctrine_Query::create()
		->from('SecondOeuvre so')
		->leftJoin('so.BibSo bs')
		->where('so.indexbatiment = ?', array($identification->getIndexbatiment()))
		->orderBy('bs.codetypeso, so.codeso')
		->execute();

		foreach($secondOeuvres as $secondOeuvre)
		{
			if($i>5)
			{
				$this->AddPage();
				$this->addPageTitle('SECOND OEUVRE');
				$i=1;
			}
			$this->addBlockTitle($secondOeuvre->getBibSo()->getBibTypeSo()->getTypeSo());
			$this->addTableTwoColls('Elément : ', $secondOeuvre->getBibSo()->getSecondOeuvre());
			$this->addTableTwoColls('Remarquable : ', $secondOeuvre->getSoRem() ? 'Oui' : 'Non');
			$this->addTableTwoColls('Conservation : ', $secondOeuvre->getBibConservation()->getConservation());

			$this->addTableTwoCollsWithArray('Commentaires : ', explode('<br />',nl2br($this->wrapsString($secondOeuvre->getInfoSo(), 90, "<br />"))));

			$this->addTableFourCollsMultiPossibilities('Matériau fin : ', 'Finition: ', $secondOeuvre->getObjectMatFinsAndFinitions(), 'getCodematf', 'getMatfins', 'getBibFinition', 'getFinition');

			$this->Ln(6);
			$i++;
		}
	}

	public function addEquipement($identification)
	{
		$this->AddPage();
		$this->addPageTitle('EQUIPEMENTS ET ELEMENTS PAYSAGERS');

		$this->addBlockTitle('EQUIPEMENTS INTERIEURS');


		$this->SetFont('Arial','B',9);
		$this->Cell(30, 30, utf8_decode('Catégorie'), 0, 0, 'L', 0);
		$this->Cell(40, 30, utf8_decode('Equipement'), 0, 0, 'L', 0);
		$this->Cell(25, 30, utf8_decode('Remarquable'), 0, 0, 'L', 0);
		$this->Cell(30, 30, utf8_decode('Conservation'), 0, 0, 'L', 0);
		$this->Cell(60, 30, utf8_decode('Commentaire'), 0, 0, 'L', 0);
		$this->SetFont('Arial','',8);
		$this->Ln(5);


		foreach($identification->getEquipementss() as $equipement)
		{
			$this->Cell(30, 30, utf8_decode($equipement->getBibEquipement()->getBibTypeEquipement()->getTypeEquip()), 0, 0, 'L', 0);
			$this->Cell(40, 30, utf8_decode($equipement->getBibEquipement()->getEquipement()), 0, 0, 'L', 0);
			$this->Cell(25, 30, utf8_decode($equipement->getEquipementRem() ? 'Oui' : 'Non'), 0, 0, 'L', 0);
			$this->Cell(30, 30, utf8_decode($equipement->getBibConservation()->getConservation()), 0, 0, 'L', 0);

			if(strlen($equipement->getInfoEquip()) > 45)
			{
				$arrayComment = explode('<br />',nl2br($this->wrapsString($equipement->getInfoEquip(), 45, "<br />")));

				$i=0;
				foreach($arrayComment as $line)
				{
					if($i==0)
					{
						$this->Cell(60, 30, utf8_decode($line), 0, 0, 'L', 0);
					}
					else
					{
						$this->Cell(30, 30, '', 0, 0, 'L', 0);
						$this->Cell(40, 30, '', 0, 0, 'L', 0);
						$this->Cell(25, 30, '', 0, 0, 'L', 0);
						$this->Cell(30, 30, '', 0, 0, 'L', 0);
						$this->Cell(60, 30, utf8_decode($line), 0, 0, 'L', 0);
					}

					$this->Ln(3);
					$i++;
				}
			}
			$this->Ln(4);
		}
	}

	public function addElementPaysager($identification)
	{
		$this->Ln(6);

		$this->addBlockTitle('ELEMENTS PAYSAGERS');


		$this->SetFont('Arial','B',9);
		$this->Cell(45, 30, utf8_decode('Elément du paysage'), 0, 0, 'L', 0);
		$this->Cell(30, 30, utf8_decode('Remarquable'), 0, 0, 'L', 0);
		$this->Cell(40, 30, utf8_decode('Conservation'), 0, 0, 'L', 0);
		$this->Cell(85, 30, utf8_decode('Commentaire'), 0, 0, 'L', 0);
		$this->SetFont('Arial','',8);
		$this->Ln(5);


		foreach($identification->getElementsPaysagerss() as $equipement)
		{
			$this->Cell(45, 30, utf8_decode($equipement->getBibElementPaysager()->getElementsPaysagers()), 0, 0, 'L', 0);
			$this->Cell(30, 30, utf8_decode($equipement->getEpRem() ? 'Oui' : 'Non'), 0, 0, 'L', 0);
			$this->Cell(40, 30, utf8_decode($equipement->getBibConservation()->getConservation()), 0, 0, 'L', 0);

			if(strlen($equipement->getInfoEp()) > 65)
			{
				$arrayComment = explode('<br />',nl2br($this->wrapsString($equipement->getInfoEp(), 65, "<br />")));

				$i=0;
				foreach($arrayComment as $line)
				{
					if($i==0)
					{
						$this->Cell(85, 30, utf8_decode($line), 0, 0, 'L', 0);
					}
					else
					{
						$this->Cell(45, 30, '', 0, 0, 'L', 0);
						$this->Cell(30, 30, '', 0, 0, 'L', 0);
						$this->Cell(40, 30, '', 0, 0, 'L', 0);
						$this->Cell(85, 30, utf8_decode($line), 0, 0, 'L', 0);
					}

					$this->Ln(3);
					$i++;
				}
			}
			$this->Ln(4);
		}
	}

	public function addIllustration($identification)
	{
		$this->AddPage();
		$this->addPageTitle('ILLUSTRATIONS');
		$this->ln(8);
		$i=60;
		$nbr = 0;
		$title = '';
		$illustration_array = array();
		
		$illustrations = Doctrine_Query::create()
		->from('Illustration i')
		->leftJoin('i.BibIllustration bi')
		->where('i.indexbatiment = ?', array($identification->getIndexbatiment()))
		->orderBy('bi.ordre_illustration')
		->execute();

		foreach($illustrations as $illustration)
		{
			$illustration_array[] = $illustration;
		}


		for($number=0; isset($illustration_array[$number]);$number++)
		{
			$temp = ($number)%4;
			if($temp==0)
			{
				$i=60;
			}else{
				$i=160;
			}

			if($nbr==2)
			{
				$old_y = 10;
				$nbr = 0;
				$this->AddPage();
				$this->addPageTitle('ILLUSTRATIONS');
				$this->ln(8);
			}

			$label1 = utf8_decode($illustration_array[$number]->getBibIllustration()->getIllustration());
			$this->SetFont('Arial', 'B', 9);
			//$this->Cell(100, 30, utf8_decode(strtoupper($illustration_array[$number]->getBibIllustration()->getIllustration())), 0, 0, 'L', 0);
			if(isset($illustration_array[$number+1]))
			{
				$label2 = utf8_decode($illustration_array[$number+1]->getBibIllustration()->getIllustration());
				//$this->Cell(100, 30, utf8_decode(strtoupper($illustration_array[$number+1]->getBibIllustration()->getIllustration())), 0, 0, 'L', 0);
				//$this->Ln(5);
			}



			//$this->SetFont('Arial', 'B', 9);
			if($illustration_array[$number]->getBibPersonnes())
			{
				//$this->Cell(30, 30, utf8_decode('Auteur : '), 0, 0, 'L', 0);
				$this->SetFont('Arial', '', 8);
				$label1 = $label1.', '.utf8_decode($illustration_array[$number]->getBibPersonnes()->getPersonne());
				//$this->Cell(70, 30, utf8_decode($illustration_array[$number]->getBibPersonnes()->getPersonne()), 0, 0, 'L', 0);
				if(isset($illustration_array[$number+1]) && $illustration_array[$number+1]->getBibPersonnes())
				{
					//$this->SetFont('Arial', 'B', 9);
					//$this->Cell(30, 30, utf8_decode('Auteur : '), 0, 0, 'L', 0);
					$this->SetFont('Arial', '', 8);
					$label2 = $label2.', '.utf8_decode($illustration_array[$number+1]->getBibPersonnes()->getPersonne());
					//$this->Cell(70, 30, utf8_decode($illustration_array[$number+1]->getBibPersonnes()->getPersonne()), 0, 0, 'L', 0);
				}
			}

			if($illustration_array[$number]->getDateIllustration())
			{
				//$this->SetFont('Arial', 'B', 9);
				//$this->Cell(30, 30, utf8_decode('Date : '), 0, 0, 'L', 0);
				$this->SetFont('Arial', '', 8);
				$label1 = $label1.', '.format_date($illustration_array[$number]->getDateIllustration(), 'dd/MM/yyyy', 'fr');

				if(isset($illustration_array[$number+1]))
				{
					//$this->SetFont('Arial', 'B', 9);
					//$this->Cell(30, 30, utf8_decode('Date : '), 0, 0, 'L', 0);
					$this->SetFont('Arial', '', 8);
					$label2 = $label2.', '.format_date($illustration_array[$number+1]->getDateIllustration(), 'dd/MM/yyyy', 'fr');

				}
				//$this->Ln(7);
			}

			$this->Cell(70, 30, $label1, 0, 0, 'L', 0);
			$this->Cell(40, 30, $this->Image(sfConfig::get('app_images_upload_dir').convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), $illustration_array[$number]->getFichierSource(), 'pdf')->url,10,$i,0,0,''), 0, 0, 'L', 0);
			//$this->Cell(40, 30, $this->Image(sfConfig::get('app_images_upload_dir').$illustration_array[$number]->getFichierSource(),10,$i,0,0,''), 0, 0, 'L', 0);

			if(isset($illustration_array[$number+1]))
			{
				$this->Cell(70, 30, $label2, 0, 0, 'L', 0);
				//$this->Cell(40, 30, $this->Image(sfConfig::get('app_images_upload_dir').$illustration_array[$number]->getFichierSource(),110,$i,0,0,''), 0, 0, 'L', 0);
				$this->Cell(40, 30, $this->Image(sfConfig::get('app_images_upload_dir').convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), $illustration_array[$number+1]->getFichierSource(), 'pdf')->url,110,$i,0,0,''), 0, 0, 'L', 0);
			}

			$this->Ln(100);

			$nbr++;
			$title = $illustration_array[$number]->getBibIllustration()->getIllustration();
			$number++;
		}
	}

	public function addEtatAndPerspective($identification)
	{
		$this->addPageTitle('ETAT ET PERSPECTIVES');
		$this->addBlockTitle('ETAT');

		$this->addTableTwoColls('Etat général : ', $identification->getBibConservation() ? $identification->getBibConservation()->getConservation() : '');

		$this->addTableTwoCollsWithArray('Commentaires : ', explode('<br />',nl2br($this->wrapsString($identification->getRemarques(), 90, "<br />"))));

		$this->addBlockTitle('PERSPECTIVES');

		$this->addTableTwoCollsMultiPossibilities('Perspectives : ', $identification->getRelIdentPerspectives(), 'getPerspective');

	}

}
?>
