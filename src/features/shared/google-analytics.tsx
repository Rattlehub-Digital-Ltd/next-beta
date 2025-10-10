import Script from "next/script";
import { useId } from "react";

type GoogleAnalyticsProps = {
	id: string;
};

const GoogleAnalytics = ({ id }: GoogleAnalyticsProps) => {
	return (
		<>
			<Script
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
			/>

			<Script id={useId()} strategy="lazyOnload">
				{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${id}', {
              page_path: window.location.pathname,
              });
          `}
			</Script>
		</>
	);
};

export default GoogleAnalytics;
