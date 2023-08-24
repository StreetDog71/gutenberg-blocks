/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow
} from '@wordpress/block-editor';
import {
	Panel, PanelBody, PanelRow,
	TextControl,
	TextareaControl,
	Flex, FlexItem, FlexBlock,
} from "@wordpress/components";
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	
	const { attributes, setAttributes } = props;
	const { imageUrl, imageId, imageAlt } = attributes;
	const setImageAttributes = (media) => {
		if (!media || !media.url) {
			props.setAttributes({
				imageUrl: null,
				imageId: null,
				imageAlt: null,
			});
			return;
		}
		props.setAttributes({
			imageUrl: media.url,
			imageId: media.id,
			imageAlt: media?.alt,
		});
	};
	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="settings">
				<Panel>
					<PanelBody title="Cover Parameters" initialOpen={ true }>
						<TextControl
							label = "Height"
							type = "string"
							value={ props.attributes.height }
							onChange={ (value) => props.setAttributes({ height: value }) }
						/>
						{!props.attributes.imageId && (
						<MediaPlaceholder
							accept="image/*"
							allowedTypes={['image']}
							onSelect={setImageAttributes}
							multiple={false}
							handleUpload={true}
						/>
						)}
						{props.attributes.imageId && (
							<>
								<img src={props.attributes.imageUrl} />
								<MediaReplaceFlow
									mediaId={imageId}
									mediaUrl={imageUrl}
									allowedTypes={['image']}
									accept="image/*"
									onSelect={setImageAttributes}
									name={!imageUrl ? __('Add Image') : __('Replace Image')}
								/>
							</>
						)}
					</PanelBody>
				</Panel>
			</InspectorControls>
			<ServerSideRender
				block='mindprocess-blocks/cover-background'
				attributes={{ ...attributes }}
				httpMethod="POST"
			/>
		</div>
	);
}