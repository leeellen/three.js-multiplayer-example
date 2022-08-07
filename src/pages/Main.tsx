import { css } from '@emotion/react';
import Icons from '../components/common/icons';

type MainProps = {};

function Main({}: MainProps) {
    return (
        <div css={container}>
            <Icons icon="vite" />
        </div>
    );
}

const container = css``;

export default Main;
