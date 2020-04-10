/**
 * index.ts
 * - Application homepage.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { RootAction, ActionGroup, HistoryAction } from '../store/_types';
import HybridForm from '../components/forms/HybridForm';
import DefaultLayout from '../components/layours/DefaultLayour';
import { SyntheticEvent } from 'react';

interface Props {
	authorization: AuthorizationState;
	history: HistoryState;
}

/** Page */
const Page: NextPage<Props> = props => {
	const rootState = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const authorization = rootState.authorization;
	const history = rootState.history;

	const dropFunc = async (event: SyntheticEvent<HTMLDivElement>) => {
	}

	const uploadFunc = async (event:  React.ChangeEvent<HTMLInputElement>) => {
	}

	return (
		<DefaultLayout>
			{/* <div id="screen" className="full screen display-hidden" onDragEnter={dragIn} onDragOver={dragIn} onDragLeave={dragOut} onDrop={dropFunc}/> */}

			<form id="form" encType="multipart/form-data" method="POST">
				<div className="">
					<label id="file-input-label" className="file-input outline">
						select or drop files
						<input type="file" id="file-input" name="file" onChange={uploadFunc} />
					</label>
				</div>
			</form>
		</DefaultLayout>
	);
};

/** Initial props */
Page.getInitialProps = ({ store, isServer }) => {
	if (isServer) {
		/* Do some staff */
	}

	const action: RootAction = { group: ActionGroup.ROOT };

	store.dispatch({ type: action });

	const rootState: RootState = store.getState();
	const initialProps: Props = rootState;

	return initialProps;
};

export default Page;