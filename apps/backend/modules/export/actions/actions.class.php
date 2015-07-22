<?php

/**
 * export actions.
 *
 * @package    ecrins
 * @subpackage export
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
class exportActions extends sfActions {
	/**
	 * Executes index action
	 *
	 * @param sfRequest $request A request object
	 */
	public function executeIndex(sfWebRequest $request) {

	}

	public function executeSynthese(sfWebRequest $request) {

		$this->identification = Doctrine::getTable('Identification')->find($request->getParameter('id'));
		$pdf = new synthesePdf();
		$pdf->setIdentification($this->identification);
		$pdf->generate();
		$pdf_name = $pdf->saveToServer();
		$this->downloadFile($pdf_name);

		return sfView::NONE;
	}

	public function executeComplete(sfWebRequest $request) {

		$identification = Doctrine_Query::create()
            ->from('Identification ide')
            ->leftJoin('ide.BibImplantation bi')
            ->leftJoin('ide.BibClasseArchi bca')
            ->leftJoin('ide.BibFaitage bf')
            ->leftJoin('ide.BibConservation bcon')
            ->leftJoin('ide.BibExposition be')
            ->leftJoin('ide.BibNotepatri bnp')
            ->leftJoin('ide.RelMasques rm')
            ->leftJoin('ide.RelRisquenats rr')
            ->leftJoin('ide.RelProtections rp')
            ->leftJoin('ide.RelIdentPerspectives rip')
            ->where('ide.indexbatiment = ?', $request->getParameter('id'))
            ->fetchOne();

		$pdf = new completePdf('P', 'mm', 'A4');
		$pdf->setIdentification($identification);
		$pdf->generate();
		$pdf_name = $pdf->saveToServer();
		$this->downloadFile($pdf_name);
	}

	public function downloadFile($filename) {
		header('Content-Type: application/pdf');
		header('Content-Length: ' . filesize('uploads/pdf/' . $filename));
		header('Content-disposition: attachment; filename=' . $filename);
		header('Pragma: no-cache');
		header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
		header('Expires: 0');
		readfile('uploads/pdf/' . $filename);
		exit();
	}

}
