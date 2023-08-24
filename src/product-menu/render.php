<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php
    $args = array(
        'post_type'         => array( 'produktseiten' ),
        'post_status'       => array( 'publish' ),
        'posts_per_page'    => '-1',
        'order'             => 'ASC',
        'orderby'           => 'menu_order',
        'post_parent'       => 0,
    );
    $query = new WP_Query( $args );
    
    if ( $query->have_posts() ) {
        echo '<ul class="product-menu flex gap-20">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $item_class = "product-menu-item";
            echo '<li>';
            echo '<a class="flex gap-5 flex-align-center" href="' . get_the_permalink() . '">';
            echo '<div class="product-square" style="background: ' . get_field('product_color') . '"></div>';
            echo get_the_title();
            echo '</a>';
            echo '</li>';
        }
        echo '</ul>';
    }
    wp_reset_postdata();
    ?>
</div>