import React, { useState } from 'react';
import styles from '../styles/Components.module.css';

function Checkbox() {
  const [isChecked, setIsChecked] = useState('customer');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <label className="text-base lg:text-lg text-[#B6B6B6] font-light">
        <input
          type="checkbox"
          value="customer"
          checked={isChecked === 'customer'}
          onChange={handleCheckboxChange}
        />
        Customer
      </label>
      <label className="text-base lg:text-lg text-[#B6B6B6] font-light">
        <input
          type="checkbox"
          value="manager"
          checked={isChecked === 'manager'}
          onChange={handleCheckboxChange}
        />
        Manager
      </label>
    </div>
  );
}

export default Checkbox;
