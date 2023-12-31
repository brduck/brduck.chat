import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';

import { Animate, Button, List, Pill } from '~/components';
import { EventType, ListActionType, NavigationItemType } from '~/types';
import { Layout } from '~/layouts';

import type { EventProps } from '~/components/Event.component';
import type { ListAction, NavigationItem, Project } from '~/types';
import Image from 'next/image';

const Event = dynamic<EventProps>(
	() => import('~/components/Event.component').then(({ Event }) => Event),
	{
		ssr: false,
	},
);

const ACTIONS: Array<NavigationItem> = [
	{
		type: NavigationItemType.LINK,
		href: '/blog',
		icon: <Icon className="mr-3" icon="feather:edit-3" />,
		text: 'Blog',
	},
	{
		type: NavigationItemType.LINK,
		href: '/projects',
		icon: <Icon className="mr-3" icon="feather:copy" />,
		text: 'Projects',
	},
	{
		type: NavigationItemType.LINK,
		external: true,
		href: 'https://github.com/brduckdev',
		icon: <Icon className="mr-3" icon="feather:github" />,
		text: 'GitHub',
	},
];

const Projects: Project[] = [
	{
		description: 'Customized English lessons and tips based on your native language.',
		name: 'Bilingual Tutor',
		url: 'https://chat.openai.com/g/g-2NPPIfbgD-bilingual-tutor',
		icon: <Image className="mr-3" src={'/aichat.png'} width={70} height={70} />,
		template: false,
	},
];

export default function HomePage(): JSX.Element {
	const today = new Date();
	const birthday = new Date('1997-08-09');
	const isBirthday =
		today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();

	const description = `Tailored GPT chats for all your needs`;

	return (
		<Layout.Default>
			{isBirthday && <Event event={EventType.BIRTHDAY} />}
			<div className="min-h-screen flex items-center justify-center py-12">
				<div className="max-w-md sm:max-w-lg md:sm:max-w-2xl lg:sm:max-w-3xl w-full space-y-8 text-center">
					<Animate
						as="h1"
						animation={{
							opacity: [0, 1],
							scale: [0.75, 1],
						}}
						className="text-gray-500 dark:text-white text-5xl sm:text-6xl md:text-6xl lg:text-8xl tracking-tight font-extrabold">
						Hey <span className="inline-block origin-70 hover:(animate-wave)">👋</span>{' '}
						Welcome <br className="hidden sm:block" />
						to <Pill.Standard className="mt-4">brduck.chat</Pill.Standard>
					</Animate>

					<Animate
						as="p"
						animation={{
							opacity: [0, 1],
							scale: [0.75, 1],
						}}
						className="max-w-xs mt-4 md:mt-8 mx-auto text-base text-gray-400 sm:text-lg md:text-xl md:max-w-3xl"
						transition={{
							delay: 0.5,
						}}>
						{description}
					</Animate>

					<div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0 w-full mt-8 sm:mt-4">
						<List.Container>
							{Projects.map((project, index) => (
								<Animate
									animation={{ y: [50, 0], opacity: [0, 1] }}
									key={index}
									transition={{
										delay: 0.1 * index,
									}}>
									<List.Item
										actions={[
											{
												type: ListActionType.LINK,
												href: project.url,
												icon: 'carbon:machine-learning-model',
												label: 'Chat Link',
											},
										]}
										description={project.description}
										icon={<span className="text-xl">{project.icon}</span>}
										title={project.name}
									/>
								</Animate>
							))}
						</List.Container>
					</div>
				</div>
			</div>
		</Layout.Default>
	);
}
