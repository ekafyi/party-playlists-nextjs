import Head from "next/head";
import { APP_DESCRIPTION } from "../lib/constants";
// OG_IMG_FILENAME

interface IMetaHead {
  titleKey?: string;
  title: string;
  description?: string;
  url?: string;
}

const MetaHead: React.FunctionComponent<IMetaHead> = ({ titleKey, title, description, url }) => (
  <Head>
    <title key={titleKey}>{title}</title>

    {/* <!-- SEO - Search bots general --> */}
    <meta itemProp="name" content={title} />
    <meta itemProp="description" content={description || APP_DESCRIPTION} />
    {/* TODO opengraph image */}
    {/* {url && <meta itemProp="image" content={`${url}${OG_IMG_FILENAME}`} />} */}

    {/* <!-- SEO - Facebook/OpenGraph --> */}
    {url && <meta property="og:url" content={url} />}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description || APP_DESCRIPTION} />
    {/* {url && <meta property="og:image" content={`${url}${OG_IMG_FILENAME}`} />} */}

    {/* <!-- SEO - Twitter --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description || APP_DESCRIPTION} />
    {/* {url && <meta name="twitter:image" content={`${url}${OG_IMG_FILENAME}`} />} */}
  </Head>
);

export default MetaHead;
