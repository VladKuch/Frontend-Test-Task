import cls from './Inputs.module.scss';
interface InputProps {
    label: string;
    id: string;
    value?: string;
    onChange: (value: string) => void
}
export const InputText = (props: InputProps) => {
    const {
        label, 
        id,
        value = '',
        onChange
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={cls.Input}>
            <label htmlFor={id}>{label}</label>
            <input type="text" id={id} name={id} onChange={onChangeHandler} value={value}/>
        </div>
    );
};