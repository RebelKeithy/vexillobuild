import { render } from '@testing-library/react';
import { FlagPreview } from './components/flag-renderer/FlagRenderer';
import { LEVELS } from './flags';

describe('Flag Snapshots', () => {
    LEVELS.forEach((level) => {
        test(`renders ${level.name} correctly`, () => {
            const { container } = render(
                <FlagPreview
                    flagState={level.target}
                    currentLevelId={level.id}
                    onInteraction={() => {}}
                    selectedElement={null}
                />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
