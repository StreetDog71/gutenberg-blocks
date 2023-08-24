<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php
    if( get_field('product_page') ) {
        $product_category = get_field('product_category');
        if( get_term_children($product_category, 'produktkategorie') ) {
            $product_category = get_term_children($product_category, 'produktkategorie');
        }
        
        $args = array(
            'post_type'         => array( 'produkte' ),
            'post_status'       => array( 'publish' ),
            'posts_per_page'    => '-1',
            'order'             => 'ASC',
	        'orderby'           => 'menu_order',
            'tax_query'         => array(
                array(
                    'taxonomy'      => 'produktkategorie',
                    'terms'         => $product_category
                ),
            ),
        );

        $query = new WP_Query( $args );

        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                echo '<div>';
                echo '<a href="' . get_the_permalink() . '">';
                echo get_the_title();
                echo '</a>';
                echo '</div>';
            }
        }
        wp_reset_postdata();
    }
    ?>
</div>