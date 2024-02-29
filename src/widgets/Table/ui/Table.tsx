import cls from './Table.module.scss';
import { Key } from 'react';
import { Loader } from 'widgets/Loader';

interface TableProps {
    header: Array<string>;
    rows?: Array<Array<string>>;
    isLoaded: boolean;
}

export const Table = (props: TableProps) => {
    const {
        header,
        rows,
        isLoaded
    } = props;

    const noResults = isLoaded && (!rows || rows.length === 0);

    return (
        <div className={cls.Table}>
            <table>
                <thead>
                    <tr>
                        {header.map((item: string, key: Key) => <th key={key}>{item}</th>)}
                    </tr>
                </thead>
                {isLoaded && 
                <tbody>
                    {rows.map((row: Array<string>, key: Key) => {
                        return <tr key={key}>
                            {row.map((item: string, key: Key) => <td key={key}>{item}</td>)}
                        </tr>
                    })}                    
                </tbody>
                }
            </table>
            {!isLoaded && <Loader />}

            {noResults && (
                <div className={cls.noResultsMessage}>
                    <p>Результатов не найдено.</p>
                    <p>Попробуйте сбросить фильтры.</p>
                </div>
            )}
        </div>
    );
};