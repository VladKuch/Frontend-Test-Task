import cls from './Inputs.module.scss';
interface NumberProps {
    label: string;
    id: string;
    value?: number;
    onChange: (value: number) => void
}
export const InputNumber = (props: NumberProps) => {
    const {
        label, 
        id,
        value = 0,
        onChange
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(parseFloat(e.target.value));
    };

    return (
        <div className={cls.Input}>
            <label htmlFor={id}>{label}</label>
            <input type="number" id={id} name={id} onChange={onChangeHandler} value={(value > 0) ?  value : ''}/>
        </div>
    );
};