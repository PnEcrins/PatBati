<?php

class completePdf extends basePdf {

	public function generate()
	{
		$this->addTop(basePdf::PDF_TYPE_REPORTING_ALL);
		$this->addLines(basePdf::PDF_TYPE_REPORTING_ALL);
	}

	protected function getType()
	{
		return 'complete';
	}
}
?>