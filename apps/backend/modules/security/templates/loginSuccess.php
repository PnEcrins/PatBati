<?php use_helper('Form') ?>

<h2 class="title">Parc National des Écrins - Patrimoine Bâtiment</h2> 
<form action="<?php echo url_for('@login') ?>" method="post" id="loginForm">
    <?php echo $form?>  
    <?php echo submit_tag('Connexion', 'id=submit') ?>
</form>
