import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
interface TableProps {
    header: Array<string>;
    rows?: Array<Array<string>>
}
export const Table = (props: TableProps) => {
    const {
        header,
        rows
    } = props;
    return (
        <div className={cls.Table}>
            <table>
                <thead>
                    <tr>
                        {header.map((item: string) => <th>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row: Array<string>) => {
                        return <tr>
                            {row.map((item: string) => <td>{item}</td>)}
                        </tr>
                    })}                    
                </tbody>
            </table>

            <div className="pagination">
                <a href="#" className="prev">&laquo; Предыдущая</a>
                <a href="#" className="next">Следующая &raquo;</a>
            </div>
        </div>
    );
};