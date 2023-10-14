import React from 'react';

const FilterSelector = ({ selectedValue, onChanged, title, data, className, zeroOptionTitle = "",...props}) => {
    selectedValue = (selectedValue === undefined) ? "" : selectedValue
    return (
        <select
            value={selectedValue}
            onChange={onChanged}
            className={["form-select col-xs-11 col-sm-11 col-md-5 col-lg-5" + className].join(' ')}
            aria-label={title}
            {...props}>
            <option value="" disabled>{title}</option>
            {
                (zeroOptionTitle !== "")
                ? <option value={0}>{zeroOptionTitle}</option>
                : null
            }

            {
                (data) ? Object.entries(data).map(entry => {
                    const [key, value] = entry;
                    return <option value={key} key={key}>{value}</option>
                }) : <></>
            }
        </select>
    );
};

export default FilterSelector;