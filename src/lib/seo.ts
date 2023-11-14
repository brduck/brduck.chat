import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'brduck ─ developer';
	const description = "Hey 👋 I'm Ben, a developer";

	return {
		title,
		description,
		canonical: `https://brduck.chat/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'brduck',
			url: `https://brduck.chat/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: 'https://brduck.chat/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@brduckdev',
			site: '@brduckdev',
		},
		...props,
	};
}
