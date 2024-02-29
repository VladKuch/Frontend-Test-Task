import cls from './Inputs.module.scss';
import { useEffect, useRef, useState } from 'react';
interface SelectProps {
    label: string;
    id: string;
    options: Array<string>;
    value: string;
    onChange: (value: string) => void; 
}
export const Select = (props: SelectProps) => {
    const {
        label, 
        id,
        options,
        value = '',
        onChange
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(value);
   
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setSelectedOption(null);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setSearchTerm('');
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (value != selectedOption) {
        setSelectedOption(value);
    }
    return (
        <div className={cls.Input}>
            <label htmlFor={id}>{label}</label>
            <div className={cls.Select} ref={inputRef}>
                <input 
                    type="text" 
                    id={id}
                    value={selectedOption || searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder=""
                />
                {isOpen && (
                    <ul className={cls.options}>
                        {filteredOptions.map(option => (
                            <li key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};