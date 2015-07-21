<?php
class sfUniqueRelationValidator extends sfValidatorSchema
{
	public function __construct($options = array(), $messages = array())
	{
		$this->addRequiredOption('column1');
		$this->addRequiredOption('column2');

		// set defaults
		$this->addMessage('unique_error', 'Uniqueness error');
		parent::__construct(null, $options, $messages);
	}
	
	protected function doClean($values)
	{		
		$column1Name = $this->getOption('column1');
		$column2Name = $this->getOption('column2');

		if (isset($values[$column1Name]))
		{
			$processedValues = array();
			$i = 0;
			foreach ($values[$column1Name] as $index => $value)
			{
				// On parcourt les valeurs déjà traitées
				foreach ($processedValues as $relation)
				{
					// On vérifie si le couple existe déjà dans les valeurs déjà traitées
					if (($relation[$column1Name] == $values[$column1Name][$index]) && ($relation[$column2Name] == $values[$column2Name][$index]))
					{ 
						throw new sfValidatorError($this, 'unique_error');
					}
				}
				
				$processedValues[$index] = array();
				$processedValues[$index][$column1Name] = $values[$column1Name][$index];
				$processedValues[$index][$column2Name] = $values[$column2Name][$index];
			}
		}

		return $values;
	}

	/**
	 * Initialize this validator.
	 *
	 * @param sfContext $context    The current application context.
	 * @param array     $parameters An associative array of initialization parameters.
	 *
	 * @return bool true, if initialization completes successfully, otherwise false.
	 */
	public function initialize($context, $parameters = null)
	{
		// initialize parent
		parent::initialize($context);

		$this->getParameterHolder()->add($parameters);

		// check parameters
		if (!$this->getParameter('column1'))
		{
			throw new sfValidatorException('The "column1" parameter is mandatory for the sfPropelUniqueRelationValidator validator.');
		}
		
		if (!$this->getParameter('column2'))
		{
			throw new sfValidatorException('The "column2" parameter is mandatory for the sfPropelUniqueRelationValidator validator.');
		}
		
		return true;
	}
}
