import { DM_Sans } from '@next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'] });

const fonts = {
    body: dmSans.style.fontFamily,
    heading: dmSans.style.fontFamily,
}

export default fonts