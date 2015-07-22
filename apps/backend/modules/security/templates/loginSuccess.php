<?php use_helper('Form') ?>

<h2 class="title">Parc national des Écrins - Inventaire du patrimoine bâti</h2> 
<form action="<?php echo url_for('@login') ?>" method="post" id="loginForm">
    <?php echo $form?>  
    <?php echo submit_tag('Connexion', 'id=submit') ?>
</form>
