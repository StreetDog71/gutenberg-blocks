<?php
/**
 * Plugin Name:       MindProcess Blocks
 * Description:       MindProcess Auxiliary Blocks
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            MindProcess
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mindprocess-blocks
 *
 * @package           mindprocess-blocks
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function mindprocess_block_init() {
	register_block_type( __DIR__ . '/build/product-menu' );
	register_block_type( __DIR__ . '/build/display-menu' );
	register_block_type( __DIR__ . '/build/category-products' );
	register_block_type( __DIR__ . '/build/product-features' );
	register_block_type( __DIR__ . '/build/related-articles' );
	register_block_type( __DIR__ . '/build/client-quote' );
	register_block_type( __DIR__ . '/build/cover-background' );
}
add_action( 'init', 'mindprocess_block_init' );

// Create custom block categories

add_filter('block_categories_all', 'create_custom_block_categories');
function create_custom_block_categories( $categories ) {
	$categories[] = array(
		'slug'  => 'mindprocess-blocks',
		'title' => 'MindProcess Blocks'
	);
	return $categories;
}