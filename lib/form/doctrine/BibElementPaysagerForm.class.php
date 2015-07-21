<?php

/**
 * BibElementPaysager form.
 *
 * @package    form
 * @subpackage BibElementPaysager
 * @version    SVN: $Id: sfDoctrineFormTemplate.php 6174 2007-11-27 06:22:40Z fabien $
 */
class BibElementPaysagerForm extends BaseBibElementPaysagerForm
{
  public function configure()
  {
  	$this->setWidget('naturels_construits', new sfWidgetFormChoice(array('choices' => array( 'C' => 'Construit', 'N' => 'Naturel'))));
  	$this->setValidator('naturels_construits', new sfValidatorChoice(array('choices' => array( 'C' => 'C', 'N' => 'N'))));
  } 
}