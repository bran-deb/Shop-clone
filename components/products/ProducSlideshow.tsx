import { FC } from 'react';

//styles de slideshow-image
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';

import styles from './ProductSlideshow.module.css'


interface Props {
    images: string[];
}

export const ProducSlideshow: FC<Props> = ({ images }) => {
    return (
        <Slide
            easing='ease'
            duration={7000}
            indicators>
            {
                images.map(image => {
                    const url = `/products/${image}`
                    return (
                        <div className={styles['each-slide']} key={image}>
                            <div style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: 'cover'
                            }}>
                            </div>
                        </div>
                    )
                })
            }
        </Slide>
    )
};
