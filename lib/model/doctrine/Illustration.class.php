<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
class Illustration extends BaseIllustration
{
	public function __toString()
	{
		return $this->getBibIllustration()->getIllustration();
	}
	
	public function getListThumb()
	{
		return $this->getIndexilustration();
	}
}