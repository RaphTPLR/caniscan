import Img from './Img';
import Tip from './Tip';
import Formula from './Formula';
import WordLink from './WordLink';
import SmallCenteredImage from './SmallCenteredImage';
import FAQ, { FAQItem } from './FAQ';

export const mdxComponents = {
    Img,
    Tip,
    Formula,
    WordLink,
    SmallCenteredImage,
    FAQ,
    FAQItem,
    h1: (props: any) => (
        <h1
            {...props}
            className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-6 ${props.className || ''}`}
        />
    ),
    h2: (props: any) => (
        <h2
            {...props}
            className={`text-3xl md:text-4xl font-bold mt-12 mb-4 ${props.className || ''}`}
        />
    ),
    h3: (props: any) => (
        <h3
            {...props}
            className={`text-2xl md:text-3xl font-semibold mt-8 mb-3 ${props.className || ''}`}
        />
    ),
};

export type MdxComponents = typeof mdxComponents;


