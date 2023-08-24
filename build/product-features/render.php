<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php
    $page_ancestors = get_post_ancestors(get_the_ID());
    if( $page_ancestors ) {
        $page_id = end($page_ancestors);
    } else {
        $page_id = get_the_ID();
    }
    $product_color = get_field('product_color', $page_id);
    $product_categories = get_the_terms(get_the_ID(), 'produktkategorie');
    $product_category = $product_categories[0]->term_id;
    $args = array(
        'post_type'         => array( 'produktartikel' ),
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
        echo '<h3 class="m-b-10">Product Features</h3>';
        while ( $query->have_posts() ) {
            $query->the_post();
            echo '<div class="product-article">';
            echo '<a href="' . get_the_permalink() . '">';
            echo get_the_title();
            echo '</a>';
            echo '</div>';
        }
    }
    wp_reset_postdata();
    ?>
</div>

<style>
    .product-article a {
        background: <?php echo $product_color?>;
    }
</style>