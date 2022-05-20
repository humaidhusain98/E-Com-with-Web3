import ReactImageMagnify from 'react-image-magnify';
import ReactSlick from 'react-slick';

 import '../styles/react-slick.css';
const Slick=({rimProps,rsProps,image})=>{
    return(
        <ReactSlick
        {...{
            dots: true,
            infinite: true,
            speed: 500,
            arrows:true,
            slidesToShow: 1,
            slidesToScroll: 1
        }}
        {...rsProps}
    >
        {image.map((item, index) => (
            <div key={index}>
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: 'Wristwatch by Versace',
                            isFluidWidth: true,
                            src: item,
                            // srcSet: src.srcSet,
                            sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                        },
                        largeImage: {
                            src:item,
                            width: 500,
                            height: 1000
                        },
                        lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                    }}
                    {...rimProps}
                />
            </div>
        ))}
    </ReactSlick>
    )
}
export default Slick