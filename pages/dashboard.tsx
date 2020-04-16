import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import DefaultLayout from '../components/layouts/default.layout';

import { parseCookies } from 'nookies'
import { FaSignOutAlt, FaArrowAltCircleUp, FaQuestionCircle,
	FaUserCircle, FaLock, FaEyeSlash } from 'react-icons/fa';

import { RootAction, ActionGroup,
	UploadHistoryAction } from '../store/_store.types';
import config from '../config.json';

import styles from './index.module.scss';
import HybridForm from '../components/forms/hybrid.form';

const Page: NextPage<RootState> = () => {

	const authorization
		= useSelector((state: RootState) => state.authorization);

	const authLink: {
		href: string,
		icon: JSX.Element,
	} = {
		href: "",
		icon: <FaSignOutAlt />,
	};
	
	const links: {
		key: number,
		href: string,
		icon: JSX.Element,
	}[] = [{
		key: 0,
		href: "/",
		icon: <FaArrowAltCircleUp />,
	},{
		key: 1,
		href: "/faq",
		icon: <FaQuestionCircle />,
	},{
		key: 2,
		href: "/dashboard",
		icon: <FaUserCircle />,
	}];

	const headProps = {
		title: config.title,
		description: config.description,
		url: config.url,
		ogTitle: config.title,
		ogDescription: config.description,
		ogUrl: config.url,
		ogSiteName: config.og.site,
		twSite: config.tw.site,
	}

	const dragInFunc = () => {};

	const dragOutFunc = () => {};

	const dropFunc = () => {};

	const uploadFunc = () => {};

	return (
		<DefaultLayout
		authorization={authorization}
		authLink={authLink} links={links}
		headProps={headProps}>

			<HybridForm />
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = (ctx) => {

	const action: RootAction = { group: ActionGroup.ROOT };
	ctx.store.dispatch({ type: action });

	let rootState: RootState = ctx.store.getState();
	let initialProps: RootState = rootState;

	if (ctx.isServer) {
		const cleanupAction: RootAction = {
			group: ActionGroup.UPLOAD_HISTORY,
			action: UploadHistoryAction.CLEANUP
		};
		ctx.store.dispatch({ type: cleanupAction });
		
		const history = parseCookies(ctx).history;
		if(history) {
			let filteredHistory = JSON.parse(history);
			filteredHistory = filteredHistory.filter((e) => !e.delta);
			initialProps.uploadHistory.list = filteredHistory;
		}
	}

	return initialProps;
};

export default Page;