<?php

class myUser extends sfGuardSecurityUser
{
	public function hasCredential($credential, $useAnd = true)
	{
		//for usage in generator => + as credential will return hasCredential=true (even if user has no credentials at all)
		if(empty($credential)) return true;
		//btw => you could have checked for an empty array of credentials which is what the generator is returning
		return parent::hasCredential($credential, $useAnd);
	}
}
