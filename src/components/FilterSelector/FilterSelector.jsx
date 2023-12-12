export const FilterSelector = ({ selectedValue, onChanged, title, data, zeroOptionTitle = "",...props}) => {
    selectedValue = (selectedValue === undefined) ? "" : selectedValue
    return (
        <select data-bs-theme="dark"
            value={selectedValue}
            onChange={onChanged}
            className="form-select col-xs-11 col-sm-11 col-md-5 col-lg-5"
            aria-label={title}
            {...props}>
            <option value="" disabled>{title}</option>
            {
                (zeroOptionTitle !== "")
                ? <option value={""}>{zeroOptionTitle}</option>
                : null
            }

            {
                (data) ? data.map(entry => {
                    return <option value={entry.key} key={entry.key}>{entry.value}</option>
                }) : <></>
            }
        </select>
    );
};