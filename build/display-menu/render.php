<?php
$hideclass= 'block-' . uniqid();
?>
<div <?php echo get_block_wrapper_attributes( [ 'class' => $hideclass ] ); ?>>
    <?php
    if( isset( $attributes['selectedmenu'] ) && $attributes['selectedmenu'] ) {
        $menu = $attributes['selectedmenu'];
        wp_nav_menu( 
            array(
                'menu' => $menu,
                'container' => 'nav',
                'menu_id' => 'main-menu'
            )
        );
    }
    ?>
</div>
<?php 

if( isset($attributes['hideunder']) ) {
    $maxwidth = $attributes['hideunder'];
    if( $maxwidth ) {
    ?>
    <style>
        @media( max-width: <?php echo $maxwidth; ?> ) {
            .<?php echo $hideclass; ?> {
                display: none;
            }
        }
    </style>
<?php }
}
?>