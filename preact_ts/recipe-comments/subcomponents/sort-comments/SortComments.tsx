import { Fragment, h } from 'preact';
import { Options } from '../../types/options.enum';

import './SortComments.scss';
import { IComment } from '../../../../types';

type Props = {
    readonly comments: IComment[];
    readonly onSetComments: (comments: IComment[]) => void;
};

const SortComments = ({ comments, onSetComments }: Props) => {
    const selectOptions = Object.values(Options);

    const compareSortValues = (key, order = 'asc') => {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const firstValue = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
            const secondValue = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (firstValue > secondValue) {
                comparison = 1;
            } else if (firstValue < secondValue) {
                comparison = -1;
            }
            return order === 'desc' ? comparison * -1 : comparison;
        };
    };

    const handleSetSortOption = (e) => {
        switch (e.target.value) {
            case Options.LATEST:
                onSetComments([...comments].sort(compareSortValues('date', 'desc')));
                break;
            case Options.OLDEST:
                onSetComments([...comments].sort(compareSortValues('date')));
                break;
            case Options.MOST_COMMENTED:
                break;
            case Options.TOP_RATED:
                break;
            default:
                onSetComments(comments);
        }
    };

    return (
        <Fragment>
            <div class="sort--component">
                <div class="sort">
                    <label class="label">
                        <span class="info">Pokaż:</span>
                        <select class="select" name="select" onChange={(e) => handleSetSortOption(e)}>
                            {selectOptions &&
                                selectOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div>
            </div>
        </Fragment>
    );
};

export default SortComments;
