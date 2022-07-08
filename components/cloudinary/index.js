import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

export default function CouldinaryImage({ image, width, height, title, ...props }) {
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'dhanioart',
		},
	});
	const imgUrl = image.split('/').slice(7, 9);
	const removeMimeType = imgUrl.pop().split('.')[0];
	const publicID = imgUrl[0].concat('/', removeMimeType);

	const myImage = cld.image(publicID);

	// Apply the transformation.
	const url = myImage.resize(thumbnail().width(width).height(height));
	return (
		<AdvancedImage
			cldImg={url}
			alt={title}
			width={width}
			height={height}
			className={props.className}
		/>
	);
}
