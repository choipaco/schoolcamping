import React, { useState, forwardRef, useEffect } from 'react';
import styles from './PasswordInput.module.css';

interface PasswordInputProps {
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  index: number;
  value: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ onKeyUp, onChange, index, value }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
      setDisplayValue(value ? '*' : '');
    }, [value]);

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyUp(event, index);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // 변경된 값을 부모 컴포넌트로 전달합니다.
      onChange(event, event.target.value);
      // 입력값이 있을 경우에만 별표로 표시합니다.
      setDisplayValue(event.target.value ? '*' : '');
    };

    return (
      <input
        ref={ref}
        type="text"
        maxLength={1}
        className={styles.passwordItem}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        value={displayValue}
      />
    );
  }
);


PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;