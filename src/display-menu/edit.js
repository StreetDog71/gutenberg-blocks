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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, SelectControl, FlexBlock, __experimentalUnitControl as UnitControl, Spinner } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { useEntityRecords } from "@wordpress/core-data";

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
export default function Edit( { attributes, setAttributes } ) {
	

	const menus = useEntityRecords( 'root', 'menu' );
	const menuOptions = [{label: "Select Menu", value: ""}];
	
	const {
		selectedmenu,
		hideunder
	} = attributes;
	
	
	return (
		<div { ...useBlockProps() }>
			{ menus.hasResolved && (
				Object.keys(menus.records).forEach(key => {
					menuOptions.push({label: menus.records[key].name, value: menus.records[key].id})
				})
				)}
			<InspectorControls>
				<Panel>
					<PanelBody title="Select Menu" initialOpen={ true }>
						<PanelRow>
							<FlexBlock>
								{ !menus.hasResolved && (
									<Spinner />
								)}
								{ menus.hasResolved && (
									<SelectControl
										label="Menu"
										options={ menuOptions }
										value = { selectedmenu }
										onChange = { (value) => setAttributes({ selectedmenu: value }) }
									/>
								)}
							</FlexBlock>
						</PanelRow>
						<PanelRow>
							<FlexBlock>
								<UnitControl
									label = "Hide under"
									type = "Number"
									units = {[
										{
											label: 'px',
											value: 'px'
										}
									]}
									value = { hideunder }
									onChange = { (value) => setAttributes({hideunder: value}) }
								/>
							</FlexBlock>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			{ !menus.hasResolved && (
				<Spinner />
			)}
			{ menus.hasResolved && (
				<ServerSideRender
					block="mindprocess-blocks/display-menu"
					attributes={{
						...attributes,
						isServerRender: true,
					}}
					
				/>
			)}
		</div>
	);
}