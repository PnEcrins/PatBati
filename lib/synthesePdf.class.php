<?php

class synthesePdf extends basePdf {

	public function generate()
	{
		$this->addTop(basePdf::PDF_TYPE_SYNTHESE);
		$this->addLines(basePdf::PDF_TYPE_SYNTHESE);
	}

	protected function getType()
	{
		return 'synthese';
	}
}
?>